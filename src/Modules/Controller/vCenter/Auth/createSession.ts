// src/Modules/Controller/vCenter/Auth/createSession.ts
import { loginVCSA, vCenter } from 'ts-vcenter';
import { Credential } from './Credentials';

export async function createSession(credentials: Credential): Promise<vCenter> {
  const token = await loginVCSA(credentials);

  return new vCenter({
    url: credentials.url,
    token,
  });
}
