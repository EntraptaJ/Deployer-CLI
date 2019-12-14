// src/Modules/Controller/vCenter/Networks/getNetworks.ts
import { vCenter, Networks } from 'ts-vcenter';

export function getNetworks(vCenter: vCenter): Promise<Networks[]> {
  return vCenter.getNetworks();
}
