// src/Modules/Controller/vCenter/Auth/saveAuth.ts
import { Credential } from './Credentials';
import { state } from '../../../State';

export function saveAuth(credentials: Credential): void {
  state.set('auth', credentials);
}
