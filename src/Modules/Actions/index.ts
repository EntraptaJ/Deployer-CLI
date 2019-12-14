// src/Actions/index.ts
import { readConfigurationFile } from '../ConfigurationFile';
import { ensureAuth } from '../Controller/vCenter';
import { logout } from '../Controller/vCenter/Auth/logout';
import { createCoreTemplate } from '../CoreTemplates';
import { deployNode } from '../Deploy';
import inquirer = require('inquirer');
import { getNodes } from '../Nodes/getNodes';
import Choice = require('inquirer/lib/objects/choice');
import { NodeInfoMenu } from '../Nodes';

interface Option {
  flags: string;
  description: string;
}

interface Action {
  command: string;
  description: string;
  action: (...args: any[]) => any;
  option?: Option[];
}

export const actions: Action[] = [
  {
    command: 'login',
    description: 'Login to controller',
    action: async () => {
      await ensureAuth();
    },
  },
  {
    command: 'logout',
    description: 'Logout',
    action: async () => logout(),
  },
  {
    command: 'lab <lab>',
    description: 'Run a lab function',
    action: async lab => {
      if (lab === 'configFile') {
        console.log('Configuration file lab');
        const configuration = await readConfigurationFile();

        console.log(configuration);
      } else if (lab === 'deployNode') {
        console.log('deployNode Lab');

        await deployNode();
      }
    },
  },
  {
    command: 'deploy <service>',
    description: 'Deploy a service',
    action: async service => {
      console.log(`Start service: ${service}`);
    },
  },
  {
    command: 'stop',
    description: 'Stop CLI service',
    action: () => console.log('Stop command'),
  },
  {
    command: 'VMTemplate:create',
    description: 'Create VMTemplate',
    action: async () => {
      await createCoreTemplate();
    },
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
          choices: nodes.map(({ name, id }) => ({ name, value: id } as Choice)),
        },
      ]);

      await NodeInfoMenu(nodeId);
    },
  },
];
