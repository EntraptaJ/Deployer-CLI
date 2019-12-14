// src/Modules/Nodes/Node.ts

/**
 * A single controller node
 */
export interface Node {
  /**
   * Name of the controller's node
   */
  name: string;

  /**
   * Controller Id of the node for retrieval
   */
  id: string;

  /**
   * Id of the CoreTemplate used to create this Node
   */
  coreTemplateId: string;

  /**
   * Id of the Service this Node was created for
   */
  serviceId: string;
}
