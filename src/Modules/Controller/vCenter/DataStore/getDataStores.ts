// src/Modules/Controller/vCenter/DataStore/getDataStores.ts
import { vCenter, Datastores } from 'ts-vcenter';

export async function getDataStores(vCSA: vCenter): Promise<Datastores[]> {
  return vCSA.getDataStores();
}
