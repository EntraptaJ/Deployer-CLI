// src/Modules/Provisioner/SSH/Actions/connectSSH.ts
import SSH2Promise from '@johnls/ssh2-promise';
import { getPrivateKeyTempPath } from './getSSHKey';

/**
 * Params used to connect to a SSH host using username/password
 */
interface ConnectUserSSHInput {
  host: string;
  username: string;

  password: string;
}

/**
 * Connect to a SSH Host using username/password instead of SSH Key
 * @param input
 * @returns SSH2 Instance if successful
 */
export async function loginUserSSH(
  input: ConnectUserSSHInput,
): Promise<SSH2Promise> {
  return new SSH2Promise(input);
}

/**
 * Connects the a SSH server using the Deployer's auto generated SSH private key.
 * @param host Hostname of the SSH server
 */
export async function loginSSH(host: string): Promise<SSH2Promise> {
  return new SSH2Promise({
    host,
    username: 'root',
    identity: await getPrivateKeyTempPath(),
  });
}
