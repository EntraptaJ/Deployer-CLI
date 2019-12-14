// src/Modules/ConfigurationFile/Actions/fileActions.ts
import { pathExists, readFile } from 'fs-extra';
import { parse } from 'yaml';
import {
  Configuration,
  defaultConfigurationFileName,
} from '../ConfigurationFile';

export async function readConfigurationFile(
  filePath = `./${defaultConfigurationFileName}`,
): Promise<Configuration> {
  const fileExists = await pathExists(filePath);
  if (!fileExists) throw new Error('CONFIGURATION FILE DOES NOT EXIST');

  const configurationFile = await readFile(filePath);

  return parse(configurationFile.toString());
}
