// src/Modules/Nodes/NodeInfoMenu.ts
import { getCoreTemplate } from '../CoreTemplates';
import { getNode } from './';

/**
 *
 * @param nodeId
 */
export async function NodeInfoMenu(nodeId: string): Promise<void> {
  const node = getNode(nodeId);
  if (!node) throw new Error('INVALID Node');

  const coreTemplate = getCoreTemplate(node.coreTemplateId);
  if (!coreTemplate) throw new Error('INVALID CoreTemplate');

  console.log(node, coreTemplate);

  console.log('Initial Provision Node');
}
