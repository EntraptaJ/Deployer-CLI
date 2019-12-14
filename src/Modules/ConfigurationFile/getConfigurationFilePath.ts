// src/Modules/ConfigurationFile/getConfigurationFilePath.ts
import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { defaultConfigurationFileName } from './ConfigurationFile';

export async function getConfigurationFilePath(
  optionalPath?: string,
): Promise<string> {
  if (optionalPath) return optionalPath;

  const defPath = `./${defaultConfigurationFileName}`;

  const defaultExists = await pathExists(defPath);

  if (!defaultExists) throw new Error('INVALID CONFIGURATION PATH');

  return resolve(defPath);
}
