// src/Modules/Deploy/deployNode.ts
import { loadSession, createSession } from '../Controller/vCenter';
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import ora from 'ora';
import { initialProvision } from '../Provisioner/SSH/Actions';
import { getServices, getService } from '../Services';
import { pushNewNode } from '../Nodes';

export async function deployNode(): Promise<void> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const { serviceId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'serviceId',
      choices: getServices().map(
        ({ id, name }) => ({ name, value: id } as Choice),
      ),
    },
  ]);

  const service = await getService(serviceId);
  if (!service) throw new Error('INVALID Service');

  const Folder = await vCSA.getFolders({
    type: 'VIRTUAL_MACHINE',
    names: 'vm',
  });
  if (!Folder) throw new Error();

  const VMTemplate = await vCSA.getVMTemplate(service.coreTemplateId);

  console.log(VMTemplate, service);

  const spinner = ora('Deploying node');

  spinner.start();

  const nodeName = `${service.name}-prod`;
  const newNodeId = await vCSA.depoyVMTemplate(service.coreTemplateId, {
    placement: { host: service.hostId, folder: Folder[0].folder },
    hardware_customization: {
      nics: [
        {
          key: VMTemplate.nics[0].key,
          value: {
            network: service.networkId,
          },
        },
      ],
    },
    name: nodeName,
    disk_storage: { datastore: service.dataStoreId },
    vm_home_storage: {
      datastore: service.dataStoreId,
    },
  });

  pushNewNode({
    name: nodeName,
    coreTemplateId: service.coreTemplateId,
    id: newNodeId,
    serviceId,
  });

  spinner.stop();
  console.log('Node Deployment finished. Starting Initial Provision');

  await initialProvision(newNodeId);
}
