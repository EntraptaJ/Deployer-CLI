// src/Modules/Controller/vCenter/Auth/ensureAuth.ts
import { state } from '../../../State';
import { Credential } from './Credentials';
import { promptAuth } from './promptAuth';

export async function ensureAuth(): Promise<Credential> {
  let authState = state.get('auth');

  if (!authState) {
    authState = await promptAuth();
  }

  return authState as Credential;
}
