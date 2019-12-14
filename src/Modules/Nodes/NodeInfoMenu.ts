import { loadSession, createSession } from '../Controller/vCenter';
import { getNode } from './getNode';
import { getCoreTemplate } from '../CoreTemplates';
import { loginUserSSH } from '../Provisioner/SSH/Actions';

// src/Modules/Nodes/NodeInfoMenu.ts
// import inquirer from 'inquirer';

const timeout = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function NodeInfoMenu(nodeId: string): Promise<void> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);
  const node = getNode(nodeId);

  const coreTemplate = getCoreTemplate(node.coreTemplateId);

  console.log(node, coreTemplate);

  console.log('Initial Provision Node');

  const result = await vCSA.getGuestInfo(nodeId);

  const provisionSSHClient = await loginUserSSH({
    host: result.ip_address,
    ...coreTemplate,
  });

  console.log(await provisionSSHClient.exec('echo Fucker'));

  await provisionSSHClient.connect();

  console.log('Creating Socket');
  const socket = await provisionSSHClient.shell();
  console.log('Socket', socket);

  await socket.write(`echo '${coreTemplate.password}' | sudo -S ls\n`);
  await socket.write('sudo su root\n');
  await socket.write('mkdir -p /root/.ssh/\n');
  await socket.write(
    `echo 'MotherFucker2Deployer' >> ~/.ssh/authorized_keys \n`,
  );

  await timeout(1500);

  console.log(`Viewing Node: ${nodeId}`);
}
