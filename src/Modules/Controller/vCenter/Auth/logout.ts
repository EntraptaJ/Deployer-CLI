// src/Modules/Controller/vCenter/Auth/logout.ts
import { state } from '../../../State';

export async function logout(): Promise<void> {
  state.delete('auth');

  console.log('Auth Credentials have been removed');
}
