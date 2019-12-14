// src/Modules/ConfigurationFile/Actions/processConfigurationFile.ts
import ora from 'ora';
import { loadSession } from '../../Controller/vCenter';
import { loginSSH } from '../../Provisioner/SSH';
import {
  ActionHandler,
  ConfigurationMode,
  configurationModeProhibitedActions,
} from '../ConfigurationFile';
import { readConfigurationFile } from './';

/**
 *
 * @param nodeId Controller Node Id you want to run the Configuration file on
 * @param allowCopy Wether or not to allow copyDir/copyFiles. If false will error if present in Configuration file
 */
export async function processConfigurationFile(
  nodeId: string,
  mode = ConfigurationMode.INITIAL,
): Promise<void> {
  const spinner = ora('Configuration');
  spinner.start();

  const [configurationFile, vCSA] = await Promise.all([
    readConfigurationFile(),
    loadSession(),
  ]);

  const hasProhibitedActions = configurationFile.actions.some(({ type }) =>
    configurationModeProhibitedActions[mode].includes(type),
  );
  if (hasProhibitedActions)
    throw new Error('Configuration File has prohibited actions');

  const guestInfo = await vCSA.getGuestInfo(nodeId);

  const sshClient = await loginSSH(guestInfo.ip_address);

  spinner.start('Installing Configuration Packages');

  async function processInstalls(packages: string[]) {
    console.log('Installing Packages', packages.join(' '));

    return sshClient.exec(
      `apt update && DEBIAN_FRONTEND=noninteractive apt-get install -y ${packages.join(
        ' ',
      )}`,
    );
  }

  async function processExecs(commands: string[]) {
    for (const command of commands) await sshClient.exec(command);
  }

  const actionHandler: ActionHandler = {
    copyDirs: async items => console.debug('WIP: ADD CopyDirs'),
    copyFiles: async items => console.debug('WIP: ADD CopyFiles'),
    install: processInstalls,
    exec: processExecs,
  };

  const actionResults: any[] = [];

  for (const action of configurationFile.actions) {
    if (!actionHandler[action.type]) throw new Error('INVALID ACTION');

    // @ts-ignore
    const result = await actionHandler[action.type](action.items);

    actionResults.push(result);
  }

  spinner.stop();

  await sshClient.close();
  console.log(`Done??`);

  console.log(`Results: `, actionResults.join('\n'));
}
