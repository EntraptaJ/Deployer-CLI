// src/Modules/Services/Actions/performLifecycle.ts
import { loadSession } from '../../Controller/vCenter';
import { getService } from './serviceState';
import { getNodes } from '../../Nodes';

export async function preformLifecycle(serviceId: string): Promise<void> {
  const [, service, nodes] = await Promise.all([
    loadSession(),
    getService(serviceId),
    getNodes(),
  ]);

  console.log(`Nodes: `, nodes);

  console.log(service);

  console.log('Begining lifecycle of Node');
}
