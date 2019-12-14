// src/Modules/OS/OS.ts

export interface OSCommands {
  /**
   * Command used to install packages
   */
  install: string;

  /**
   * Command used to update package list
   */
  update: string;

  /**
   * Script to set network INFO.
   * See README.md
   */
  networkScript: string;
}

/**
 * OS Entity for executing custom commands and actions on different OS types.
 */
export interface OS {
  /**
   * Friendly name of OS
   */
  name: string;

  /**
   * Controller OS Types (WIP)
   */
  controllerOS: string;

  /**
   * OS Specific commands
   */
  commands: OSCommands;

  /**
   * TBD
   */
}
