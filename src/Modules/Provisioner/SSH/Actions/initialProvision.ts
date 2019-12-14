// src/Modules/Provisioner/SSH/Actions/initialProvision.ts
import {} from '@johnls/ssh2-promise';
import ora from 'ora';
import pRetry from 'p-retry';
import { loadSession } from '../../../Controller/vCenter';
import { getCoreTemplate } from '../../../CoreTemplates';
import { getNode } from '../../../Nodes';
import { loginUserSSH } from './connectSSH';
import { getSSHKeys } from './getSSHKey';

const timeout = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Preforms initial provisioning of a Controller Node
 * @param nodeId Node Id of the Controller node to provision
 */
export async function initialProvision(nodeId: string): Promise<void> {
  const vCSA = await loadSession();

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
  if (!node) throw new Error('INVALID NODE');

  const coreTemplate = getCoreTemplate(node.coreTemplateId);
  if (!coreTemplate) throw new Error('INVALID CORE TEMPLATE');

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

  /**
   * Create a SSH socket on the Node so we can
   * echo user's password to stdin and
   * then sudo su root to then echo Deploy's private SSH key to
   * be able to use the root user with SSH private key auth on future connections
   */

  spinner.start('Escalating and adding SSH Key');

  const socket = await provisionSSHClient.shell();
  await socket.write(`echo '${coreTemplate.password}' | sudo -S ls\n`);
  await socket.write('sudo su root\n');
  await socket.write('mkdir -p /root/.ssh/\n');
  await socket.write(`echo '${pubKey}' >> ~/.ssh/authorized_keys \n`);

  await timeout(1500);

  await provisionSSHClient.close();

  await spinner.stop();
}
