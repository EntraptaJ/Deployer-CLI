// src/Modules/CoreTemplates/createCoreTemplate.ts
import { promptVMTemplate } from '../Controller/vCenter/VMTemplates/promptVMTemplate';
import inquirer from 'inquirer';
import { pushCoreTemplate } from './pushCoreTemplate';

export async function createCoreTemplate(): Promise<void> {
  const itemId = await promptVMTemplate();

  const { name, username, password } = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
    },
    {
      name: 'username',
      type: 'input',
    },
    {
      name: 'password',
      type: 'password',
    },
  ]);

  await pushCoreTemplate({ name, username, password, itemId });
}
