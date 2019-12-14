// src/Modules/ConfigurationFile/ConfigurationFile.ts
export const defaultConfigurationFileName = 'configuration.yml';

export enum ActionType {
  'copyFiles' = 'copyFiles',
  'copyDirs' = 'copyDirs',
  'install' = 'install',
  'exec' = 'exec',
}

export enum ConfigurationMode {
  'INITIAL' = 'INITIAL',
  'LIFECYCLE' = 'LIFECYCLE',
}

type ConfigurationProhibitedActionsMap = {
  [mode in ConfigurationMode]: ActionType[];
};

export const configurationModeProhibitedActions: ConfigurationProhibitedActionsMap = {
  INITIAL: [ActionType.copyDirs, ActionType.copyFiles],
  LIFECYCLE: [],
};

interface CopyItem {
  from: string;
  to: string;
}

interface CopyFilesAction {
  type: ActionType.copyFiles;
  items: CopyItem[];
}

export interface CopyDirsAction {
  type: ActionType.copyDirs;
  items: CopyItem[];
}

export interface InstallAction {
  type: ActionType.install;
  items: string[];
}

export interface ExecAction {
  type: ActionType.exec;
  items: string[];
}

export type Action =
  | CopyFilesAction
  | CopyDirsAction
  | InstallAction
  | ExecAction;

export interface ActionItems {
  copyFiles: CopyItem[];
  copyDirs: CopyItem[];
  install: string[];
  exec: string[];
}

export type ActionHandlerFn = {
  [A in ActionType]: (items: ActionItems[A]) => Promise<any>;
};

export type ActionHandler = {
  [x in ActionType]: ActionHandlerFn[x];
};

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
  actions: Action[];
}
