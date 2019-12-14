// src/Modules/Provisioner/SSH/Actions/connectSSH.ts
import SSH2Promise from '@johnls/ssh2-promise';
import { getPrivateKeyTempPath } from './getSSHKey';

interface ConnectUserSSHInput {
  host: string;
  username: string;

  password: string;
}

export async function loginUserSSH(
  input: ConnectUserSSHInput,
): Promise<SSH2Promise> {
  return new SSH2Promise(input);
}

export async function loginSSH(host: string): Promise<SSH2Promise> {
  return new SSH2Promise({
    host,
    username: 'root',
    identity: await getPrivateKeyTempPath(),
  });
}
