// src/Modules/Environment/Environment.ts

/**
 * Default file name for Environment Files
 */
export const environmentFileDefaultName = 'ENV.yml';

/**
 * Environment Secret
 * A key/value of a secret provided to be used in Deployer's functions and hidden from public view
 */
export interface EnvironmentSecret {
  /**
   * The key of the secret
   */
  key: string;

  /**
   * The value of the secret
   */
  value: string;
}
