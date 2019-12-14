// src/Modules/Controller/vCenter/VMTemplates/promptVMTemplate.ts
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import { createSession, loadSession } from '../Auth';
import { getVMTemplates } from './getVMTemplates';

export async function promptVMTemplate(): Promise<string> {
  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const VMTemplates = await getVMTemplates(vCSA);

  const { itemId } = await inquirer.prompt([
    {
      name: 'itemId',
      type: 'list',
      choices: VMTemplates.map(
        ({ name, id }) => ({ name, value: id } as Choice),
      ),
    },
  ]);

  return itemId;
}
