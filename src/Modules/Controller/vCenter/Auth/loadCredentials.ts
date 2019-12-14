// src/Modules/Controller/vCenter/Auth/loadCredentials.ts
import { Credential } from './Credentials';
import { ensureAuth } from './ensureAuth';

export async function loadSession(): Promise<Credential> {
  return ensureAuth();
}
