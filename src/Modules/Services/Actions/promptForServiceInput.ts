// src/Modules/Services/Actions/promptForServiceInput.ts
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import {
  createSession,
  getNetworks,
  loadSession,
} from '../../Controller/vCenter';
import { getDataStores } from '../../Controller/vCenter/DataStore';
import { getHosts } from '../../Controller/vCenter/Host';
import { getCoreTemplates } from '../../CoreTemplates';
import { pushService } from './';
import { promptForServiceNetworks } from './promptForServiceNetworks';

export async function promptForServiceInput(): Promise<void> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const [networks, datastores, coreTemplates, hosts] = await Promise.all([
    getNetworks(vCSA),
    getDataStores(vCSA),
    getCoreTemplates(),
    getHosts(vCSA),
  ]);

  const {
    networkId,
    dataStoreId,
    coreTemplateId,
    name,
    hostId,
  } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
    },

    {
      type: 'list',
      name: 'hostId',
      choices: hosts.map(({ name, host }) => ({ name, value: host } as Choice)),
    },
    {
      type: 'list',
      name: 'networkId',
      choices: networks.map(
        ({ name, network }) => ({ name, value: network } as Choice),
      ),
    },
    {
      type: 'list',
      name: 'dataStoreId',
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

  pushService({
    name,
    networkId,
    dataStoreId,
    hostId,
    coreTemplateId,
    ...(await promptForServiceNetworks()),
  });

  console.log('Service created successfully');
}
