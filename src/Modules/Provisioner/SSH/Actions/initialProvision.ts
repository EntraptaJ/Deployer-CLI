// src/Modules/Provisioner/SSH/Actions/initialProvision.ts
import {} from '@johnls/ssh2-promise';
import pRetry from 'p-retry';
import { loadSession, createSession } from '../../../Controller/vCenter';
import { getNode } from '../../../Nodes';
import { getCoreTemplate } from '../../../CoreTemplates';
import { loginUserSSH } from './connectSSH';
import { getSSHKeys } from './getSSHKey';
import ora from 'ora';

const timeout = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function initialProvision(nodeId: string): Promise<void> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const spinner = ora('Powering on VM');
  try {
    await spinner.start();
    await vCSA.powerVM(nodeId, 'start');
  } catch {}

  const getHostInfo = async () => vCSA.getGuestInfo(nodeId);

  await spinner.start('Waiting for network connection');
  const result = await pRetry(getHostInfo, {
    retries: 1000,
    minTimeout: 50,
    maxTimeout: 100,
  });

  const node = getNode(nodeId);

  const coreTemplate = getCoreTemplate(node.coreTemplateId);

  console.log(node, coreTemplate);

  console.log('Initial Provision Node');

  await spinner.start('Provisioning Node');

  await timeout(2500);

  const [provisionSSHClient, { pubKey }] = await Promise.all([
    loginUserSSH({
      host: result.ip_address,
      ...coreTemplate,
    }),
    getSSHKeys(),
  ]);

  const socket = await provisionSSHClient.shell();
  await socket.write(`echo '${coreTemplate.password}' | sudo -S ls\n`);
  await socket.write('sudo su root\n');
  await socket.write('mkdir -p /root/.ssh/\n');
  await socket.write(`echo '${pubKey}' >> ~/.ssh/authorized_keys \n`);

  await timeout(1500);

  await provisionSSHClient.close();

  await spinner.stop();
}
