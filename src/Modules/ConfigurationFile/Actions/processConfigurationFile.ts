// src/Modules/ConfigurationFile/Actions/processConfigurationFile.ts
import { readConfigurationFile } from './';
import { processInstall } from './processInstall';
import { loadSession, createSession } from '../../Controller/vCenter';

export async function processConfigurationFile(nodeId: string): Promise<void> {
  const configurationFile = await readConfigurationFile();

  const credentials = await loadSession();

  const vCSA = await createSession(credentials);

  const guestInfo = await vCSA.getGuestInfo(nodeId);

  console.log(guestInfo, configurationFile);

  if (configurationFile.install.length > 0)
    await processInstall(
      vCSA,
      guestInfo.ip_address,
      configurationFile.install,
      nodeId,
    );
}
