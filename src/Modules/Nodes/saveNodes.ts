// src/Modules/Nodes/saveNodes.ts
import { Node } from './Node';
import { state } from '../State';

export function saveNodes(nodes: Node[]): Node[] {
  state.set('nodes', nodes);

  return nodes;
}
