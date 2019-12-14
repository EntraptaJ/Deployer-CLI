// src/Modules/Nodes/pushNewNode.ts
import { Node } from './Node';
import { getNodes } from './getNodes';
import { saveNodes } from './saveNodes';

export function pushNewNode(nodeInput: Node): Node[] {
  const nodeState = getNodes();

  nodeState.push(nodeInput);
  saveNodes(nodeState);

  return nodeState;
}
