// src/Modules/Controller/vCenter/VMTemplates/promptVMTemplate.ts
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import { loadSession } from '../../Auth';
import { getVMTemplates } from '..';

/**
 * Prompts user for selection of a Core Template from a list
 */
export async function promptVMTemplate(): Promise<string> {
  const vCSA = await loadSession();

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
