// src/Modules/ConfigurationFile/Actions/fileActions.ts
import { pathExists, readFile } from 'fs-extra';
import {
  Configuration,
  defaultConfigurationFileName,
} from '../ConfigurationFile';
import { parseConfigurationFile } from './parseConfigurationFile';

export async function readConfigurationFile(
  filePath = `./${defaultConfigurationFileName}`,
): Promise<Configuration> {
  const fileExists = await pathExists(filePath);
  if (!fileExists) throw new Error('CONFIGURATION FILE DOES NOT EXIST');

  const configurationFile = await readFile(filePath);

  return parseConfigurationFile(configurationFile.toString());
}
