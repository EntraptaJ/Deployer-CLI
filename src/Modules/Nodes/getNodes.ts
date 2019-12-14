// src/Modules/Nodes/getNodes.ts
import { state } from '../State';
import { Node } from './Node';

export function getNodes(): Node[] {
  const nodeState = state.get('nodes') as undefined | Node[];

  if (!nodeState) return [];

  return nodeState;
}
