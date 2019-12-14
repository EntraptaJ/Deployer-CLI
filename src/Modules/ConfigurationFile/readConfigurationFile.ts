// src/Modules/ConfigurationFile/readConfigurationFile.ts
import { Configuration } from './ConfigurationFile';
import { getConfigurationFilePath } from './getConfigurationFilePath';
import { parseConfigurationFile } from './parseConfigurationFile';
import { readFile } from 'fs-extra';

export async function readConfigurationFile(
  optFilePath?: string,
): Promise<Configuration> {
  const filePath = await getConfigurationFilePath(optFilePath);

  const fileString = await readFile(filePath);

  return parseConfigurationFile(fileString.toString());
}
