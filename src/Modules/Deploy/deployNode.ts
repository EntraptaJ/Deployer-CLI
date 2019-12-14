// src/Modules/Deploy/deployNode.ts
import { getNetworks, loadSession, createSession } from '../Controller/vCenter';
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import { getDataStores } from '../Controller/vCenter/DataStore';
import { getCoreTemplates } from '../CoreTemplates';
import { getHosts } from '../Controller/vCenter/Host';
import { pushNewNode } from '../Nodes/pushNewNode';
import ora from 'ora';

export async function deployNode(): Promise<void> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const [networks, datastores, coreTemplates, hosts] = await Promise.all([
    getNetworks(vCSA),
    getDataStores(vCSA),
    getCoreTemplates(),
    getHosts(vCSA),
  ]);

  const {
    nodeNetwork,
    nodeDatastore,
    coreTemplateId,
    name,
    host,
  } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
    },

    {
      type: 'list',
      name: 'host',
      choices: hosts.map(({ name, host }) => ({ name, value: host } as Choice)),
    },
    {
      type: 'list',
      name: 'nodeNetwork',
      choices: networks.map(
        ({ name, network }) => ({ name, value: network } as Choice),
      ),
    },
    {
      type: 'list',
      name: 'nodeDatastore',
      choices: datastores.map(
        ({ name, datastore }) => ({ name, value: datastore } as Choice),
      ),
    },
    {
      type: 'list',
      name: 'coreTemplateId',
      choices: coreTemplates.map(
        ({ name, itemId }) => ({ name, value: itemId } as Choice),
      ),
    },
  ]);

  const Folder = await vCSA.getFolders({
    type: 'VIRTUAL_MACHINE',
    names: 'vm',
  });
  if (!Folder) throw new Error();

  const VMTemplate = await vCSA.getVMTemplate(coreTemplateId);

  const spinner = ora('Deploying node');

  spinner.start();
  const newNodeId = await vCSA.depoyVMTemplate(coreTemplateId, {
    placement: { host: host, folder: Folder[0].folder },
    hardware_customization: {
      nics: [
        {
          key: VMTemplate.nics[0].key,
          value: {
            network: nodeNetwork,
          },
        },
      ],
    },
    name: name,
    disk_storage: { datastore: nodeDatastore },
    vm_home_storage: {
      datastore: nodeDatastore,
    },
  });

  spinner.stop();

  pushNewNode({ name, id: newNodeId, coreTemplateId });

  console.log('Node Deployment finished');
}
