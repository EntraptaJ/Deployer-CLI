// src/Modules/Environment/Actions/fileActions.ts
import { parse } from 'yaml';
import { pathExists, readFile } from 'fs-extra';
import { EnvironmentSecret, environmentFileDefaultName } from '../Environment';

export async function loadEnvironmentSecrets(
  filePath = `./${environmentFileDefaultName}`,
): Promise<EnvironmentSecret[] | undefined> {
  const fileExists = await pathExists(filePath);
  if (!fileExists) return undefined;

  const envFile = await readFile(filePath);

  const envObj = parse(envFile.toString());

  console.log(envObj);
}
