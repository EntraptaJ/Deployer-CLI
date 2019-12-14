// src/Modules/OS/Actions/configureOS.ts
import { getNode } from '../../Nodes';
import { loadSession } from '../../Controller/vCenter';
import { getService } from '../../Services';
import { loginSSH } from '../../Provisioner/SSH';
import { getOS } from './osState';

export async function configureNetworking(
  nodeId: string,
  network: 'networkA' | 'networkB' = 'networkA',
): Promise<void> {
  const [node, vCSA] = await Promise.all([getNode(nodeId), loadSession()]);
  if (!node) throw new Error('INVALID Node');

  const [VM, service, vmGuest] = await Promise.all([
    vCSA.getVM(node.id),
    getService(node.serviceId),
    vCSA.getGuestInfo(nodeId),
  ]);
  if (!service) throw new Error('INVALID Service');

  const OS = getOS(vmGuest.name);

  const [sshShell] = await Promise.all([loginSSH(vmGuest.ip_address)]);

  console.log(
    `VM: `,
    VM,
    `\nService: `,
    service,
    `\nVMGuest: `,
    vmGuest,
    `\nWhoami: `,
    await sshShell.exec(`whoami`),
    `\nOS: `,
    OS,
  );

  const newNetwork = service[network];

  console.log(`Configuring networking for ${VM.name}`);

  await sshShell
    .sftp()
    .writeFile('/tmp/networkConfig.sh', OS.commands.networkScript, {});

  await sshShell.sftp().chmod('/tmp/networkConfig.sh', 777);

  const networkExec = await sshShell.exec(`/tmp/networkConfig.sh`, [], {
    env: {
      LC_DHCP: newNetwork.type,
      LC_IP_ADDRESS: newNetwork.cidrIPAddress,
      LC_DNS: newNetwork.dnsServer,
      LC_GW_IP_ADDRESS: newNetwork.gateWayAddress,
    },
  });

  console.log(networkExec);

  await sshShell.close();
}
