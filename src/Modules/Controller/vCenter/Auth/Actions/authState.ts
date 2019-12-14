// src/Modules/Controller/vCenter/Auth/authState.ts
import { Credential, promptAuth } from '../..';
import { state } from '../../../../State';
import { vCenter, loginVCSA } from 'ts-vcenter';

/**
 * Deletes the store user credentials on disk
 */
export function logoutAuth(): void {
  state.delete('auth');

  console.log('Controller credentials have been deleted');
}

/**
 * Saves the provided Controller Credentials to disk
 * @param credentials Controller Credentials
 */
export function saveAuth(credentials: Credential): void {
  state.set('auth', credentials);
}

/**
 * Ensure the user has stored their Controller Credentials
 */
export async function ensureAuth(): Promise<Credential> {
  let authState = state.get('auth');

  if (!authState) authState = await promptAuth();

  return authState as Credential;
}

/**
 * Create a session with the Controller
 */
export async function loadSession(): Promise<vCenter> {
  const credentials = await ensureAuth();

  const vCSAToken = await loginVCSA(credentials);

  return new vCenter({
    url: credentials.url,
    token: vCSAToken,
  });
}
