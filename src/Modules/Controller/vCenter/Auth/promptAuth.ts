// src/Modules/Controller/vCenter/Auth/promptAuth.ts
import inquirer from 'inquirer';
import { Credential } from './Credentials';
import { saveAuth } from './saveAuth';

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
