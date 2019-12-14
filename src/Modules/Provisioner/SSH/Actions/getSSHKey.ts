// src/Modules/Provisioner/SSH/Actions/getSSHKey.ts
import { file } from 'tempy';
import { outputFile } from 'fs-extra';
import { pki, ssh as forgeSSH } from 'node-forge';
import { state } from '../../../State';

const { rsa } = pki;

interface SSHKeys {
  privKey: string;

  pubKey: string;
}

/**
 * Retrieves or creates a Private/Public SSH Key
 * @returns Private & Public SSH Key
 */
export async function getSSHKeys(): Promise<SSHKeys> {
  let sshState = (await state.get('ssh')) as SSHKeys | undefined;

  if (!sshState) {
    let {
      publicKey: publicRSAKey,
      privateKey: privateRSAKey,
    } = await rsa.generateKeyPair({ bits: 4096, workers: 4 });
    let privKey = forgeSSH.privateKeyToOpenSSH(privateRSAKey);
    let pubKey = forgeSSH.publicKeyToOpenSSH(publicRSAKey);

    sshState = { privKey, pubKey };

    state.set('ssh', sshState);
  }

  return sshState;
}

/**
 * Takes the Deployer's Private SSH Key and outputs to a temporary file on host to use for
 * connecting to a host using SSH2-Promises
 * @returns temporary path (generated with `tempy`) to Deployer's private SSH key
 */
export async function getPrivateKeyTempPath(): Promise<string> {
  const tempPath = file();

  const { privKey } = await getSSHKeys();

  await outputFile(tempPath, privKey);

  return tempPath;
}
