// src/Actions/index.ts
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import { readConfigurationFile } from '../ConfigurationFile';
import { ensureAuth } from '../Controller/vCenter';
import { logoutAuth } from '../Controller/vCenter/Auth';
import { createCoreTemplatePrompt } from '../CoreTemplates';
import { deployNode } from '../Deploy';
import { loadEnvironmentSecrets } from '../Environment';
import { getNodes, NodeInfoMenu } from '../Nodes';
import {
  getServices,
  promptForServiceInput,
  preformLifecycle,
} from '../Services';
import { state } from '../State';
import { promptForService } from '../Services/Prompts';

/**
 * CLI Command Option
 */
interface Option {
  /**
   * Inquirer Option Flag
   */
  flags: string;

  /**
   * Inquirer Option Description
   */
  description: string;
}

/**
 * CLI Command
 */
interface Action {
  /**
   * Command to register with inquirer
   */
  command: string;

  /**
   * Description to register with inquirer
   */
  description: string;

  /**
   * Action to preform on Command invocation
   */
  action: (...args: any[]) => any;

  /**
   * Optional options to provide to inquirer
   */
  option?: Option[];
}

/**
 * Array of Inquirer Commands
 */
export const actions: Action[] = [
  {
    command: 'auth:login',
    description: 'Login to controller',
    action: () => ensureAuth(),
  },
  {
    command: 'auth:logout',
    description: 'Forget the Controller credentials from system',
    action: () => logoutAuth(),
  },
  {
    command: 'coreTemplate:create',
    description: 'Create VMTemplate',
    action: createCoreTemplatePrompt,
  },
  {
    command: 'node:deploy',
    description: 'Deploy a new Node',
    action: () => deployNode(),
  },
  {
    command: 'node:list',
    description: 'List Nodes',
    action: async () => {
      const nodes = await getNodes();

      const { nodeId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'nodeId',
          message: 'Node',
          choices: nodes.map(({ name, id }) => ({ name, value: id } as Choice)),
        },
      ]);

      await NodeInfoMenu(nodeId);
    },
  },
  {
    command: 'lab:envFile',
    description: 'Environment file lab',
    action: async ({ envFile }) => {
      await loadEnvironmentSecrets(envFile);
    },
    option: [
      {
        flags: '--envFile [envFile]',
        description: 'Path to envFile if not ./ENV.yml',
      },
    ],
  },
  {
    command: 'lab:configFile',
    description: 'Configuration file lab',
    action: async ({ configFile }) => {
      const configuration = await readConfigurationFile(configFile);

      console.log('Configuration File Lab\n', configuration);
    },
    option: [
      {
        flags: '--configFile [confFile]',
        description: 'Path to configuration file if not `./Configuration.yml`',
      },
    ],
  },
  {
    command: 'reset',
    description: 'Reset all CLI configuration/state',
    action: () => {
      state.clear();
      console.log('CLI State/Config has been reset');
    },
  },
  {
    command: 'service:create',
    description: 'Create new service',
    action: promptForServiceInput,
  },
  {
    command: 'service:list',
    description: 'Lists all services',
    action: async () => {
      const { serviceId } = await inquirer.prompt([
        {
          name: 'serviceId',
          type: 'list',
          choices: getServices().map(
            ({ id, name }) => ({ name, value: id } as Choice),
          ),
        },
      ]);

      console.log(`Service ${serviceId}`);
    },
  },
  {
    command: 'service:deploy',
    description: 'Deploys a new node of a service',
    action: async () => {},
  },
  {
    command: 'service:lifecycle',
    description: 'Lifecycles a service',
    action: async () => {
      const serviceId = await promptForService();
      await preformLifecycle(serviceId);
    },
  },
];
