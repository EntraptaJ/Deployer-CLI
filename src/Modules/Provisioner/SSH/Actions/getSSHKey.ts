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

export async function getPrivateKeyTempPath(): Promise<string> {
  const tempPath = file();

  const { privKey } = await getSSHKeys();

  await outputFile(tempPath, privKey);

  return tempPath;
}
