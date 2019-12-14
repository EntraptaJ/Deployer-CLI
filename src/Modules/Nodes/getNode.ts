// src/Modules/Nodes/getNode.ts
import { Node } from './Node';
import { getNodes } from './getNodes';

export function getNode(nodeId: string): Node {
  const nodes = getNodes();

  const node = nodes.find(({ id }) => id === nodeId);
  if (!node) throw new Error('INVALID NODE');

  return node;
}
