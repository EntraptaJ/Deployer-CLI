// src/Modules/Environment/loadEnvironment.ts
import { EnvironmentSecret } from './Environment';

/**
 * Loads an environment YAML file into a javascript object
 */
export async function loadEnvironment(): Promise<EnvironmentSecret[]> {
  return [
    {
      key: 'GITHUB_TOKEN',
      value: '123456',
    },
  ];
}
