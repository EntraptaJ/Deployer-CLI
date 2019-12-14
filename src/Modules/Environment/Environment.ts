// src/Modules/Environment/Environment.ts

export const environmentFileDefaultName = 'ENV.yml';

export interface EnvironmentSecret {
  key: string;
  value: string;
}
