// src/Modules/ConfigurationFile/parseConfigurationFile.ts
import { Configuration, ConfigurationFile } from '../ConfigurationFile';
import { parse } from 'yaml';

export function parseConfigurationFile(file: string): Configuration {
  const config = parse(file) as ConfigurationFile;

  let Configuration: Configuration = {
    copyFiles: [],
    copyDirs: [],
    install: config.install || [],
    exec: config.exec || [],
  };

  if (config.copyFiles) {
    for (const copy of config.copyFiles) {
      const files = copy.split(':');
      Configuration.copyFiles.push({ from: files[0], to: files[1] });
    }
  }
  if (config.copyDirs) {
    for (const copy of config.copyDirs) {
      const files = copy.split(':');
      Configuration.copyDirs.push({ from: files[0], to: files[1] });
    }
  }

  return Configuration;
}
