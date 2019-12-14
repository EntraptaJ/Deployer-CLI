// src/Modules/Nodes/nodeState.ts
import { Node } from '../';
import { state } from '../../State';

/**
 * Retrieves Deployer's Nodes or if no array is present a new array is created
 * @returns Deployer's Node State
 */
export function getNodes(): Node[] {
  const nodes = state.get('nodes') as Node[] | undefined;
  if (!nodes) return [];

  return nodes;
}

/**
 * Retrieves a single Node from Deployer's State
 * @param nodeId Id of the Node you would like to retrieve
 * @returns Requested Node or undefined if it doesn't exist
 */
export function getNode(nodeId: string): Node | undefined {
  const nodes = getNodes();

  return nodes.find(({ id }) => id === nodeId);
}

/**
 * Saves the local Node's array to filesystem
 * @param nodes Local Nodes Array
 */
export function saveNodes(nodes: Node[]): Node[] {
  state.set('nodes', nodes);

  return nodes;
}

/**
 * Pushes a  new  Node into Deployer's Node State
 * @param input New Node Input
 * @returns Updated Deployer's Node State
 */
export function pushNode(input: Node): Node[] {
  const nodes = getNodes();

  nodes.push(input);

  saveNodes(nodes);

  return nodes;
}
