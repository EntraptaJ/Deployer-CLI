// src/Modules/Controller/vCenter/Host/getHosts.ts
import { vCenter, Hosts } from 'ts-vcenter';

export async function getHosts(vCSA: vCenter): Promise<Hosts[]> {
  return vCSA.getHosts();
}
