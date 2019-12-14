// src/Modules/Environment/loadEnvironment.ts
import { EnvironmentSecret } from './Environment';

export async function loadEnvironment(): Promise<EnvironmentSecret[]> {
  return [
    {
      key: 'GITHUB_TOKEN',
      value: '123456',
    },
  ];
}
