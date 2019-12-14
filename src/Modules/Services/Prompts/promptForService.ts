// src/Modules/Services/Prompts/promptForService.ts
import inquirer from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';
import { getServices } from '../Actions';

/**
 * Prompts user to select a Deployer service and returns the selected serviceId
 */
export async function promptForService(): Promise<string> {
  const services = await getServices();

  const { serviceId } = await inquirer.prompt([
    {
      name: 'serviceId',
      type: 'list',
      choices: services.map(({ name, id }) => ({ name, value: id } as Choice)),
    },
  ]);

  return serviceId;
}
