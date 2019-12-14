// src/Modules/Controller/vCenter/Auth/Prompts/AuthPrompt.ts
import inquirer from 'inquirer';
import { saveAuth, Credential } from '..';

/**
 * Prompt User for Controller username/password
 */
export async function promptAuth(): Promise<Credential> {
  const { url, username, password } = await inquirer.prompt([
    {
      type: 'input',

      name: 'url',
    },
    {
      type: 'input',
      name: 'username',
    },
    {
      type: 'password',
      name: 'password',
    },
  ]);

  saveAuth({ url, username, password });

  return { url, username, password };
}
