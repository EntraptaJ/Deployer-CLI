// src/Modules/ConfigurationFile/Actions/processInstall.ts
import { vCenter } from 'ts-vcenter';
import { loginSSH } from '../../Provisioner/SSH/Actions';

export async function processInstall(
  vCSA: vCenter,
  host: string,
  pkgs: string[],
  nodeId: string,
): Promise<void> {
  const sshClient = await loginSSH(host);

  await sshClient.exec(
    `apt-get update > /dev/null 2>&1 ;echo "$?" && apt-get install -y ${pkgs.join(
      ' ',
    )} > /dev/null 2>&1 ;echo "$?"`,
  );

  console.log(`Installing ${pkgs.toString()}`);
}
