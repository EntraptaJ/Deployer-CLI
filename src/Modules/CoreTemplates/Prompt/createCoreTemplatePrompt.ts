// src/Modules/CoreTemplates/Prompt/createCoreTemplatePrompt.ts
import inquirer from 'inquirer';
import { pushCoreTemplate } from '..';
import { promptVMTemplate } from '../../Controller/vCenter/VMTemplates';

export async function createCoreTemplatePrompt(): Promise<void> {
  const vmTemplateId = await promptVMTemplate();

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

  pushCoreTemplate({ name, username, password, itemId: vmTemplateId });
}
