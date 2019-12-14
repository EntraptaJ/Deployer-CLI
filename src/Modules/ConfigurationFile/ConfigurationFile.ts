// src/Modules/ConfigurationFile/ConfigurationFile.ts
export const defaultConfigurationFileName = 'configuration.yml';

export interface ConfigurationFile {
  copyFiles?: string[];
  copyDirs?: string[];
  install?: string[];
  exec?: string[];
}

export interface CopyFiles {
  from: string;
  to: string;
}

export interface CopyDirs {
  from: string;
  to: string;
}

export interface Configuration {
  copyFiles: CopyFiles[];
  copyDirs: CopyDirs[];
  install: string[];
  exec: string[];
}
