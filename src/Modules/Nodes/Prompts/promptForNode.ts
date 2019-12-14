// src/Modules/Nodes/Prompts/promptForNode.ts
import inquirer from 'inquirer';
import { getNodes } from '..';
import Choice from 'inquirer/lib/objects/choice';

/**
 * Prompts user to select a Deployer Node and returns the selected NodeId
 */
export async function promptForNode(): Promise<string> {
  const nodes = getNodes();

  const { nodeId } = await inquirer.prompt([
    {
      name: 'nodeId',
      type: 'list',
      choices: nodes.map(({ name, id }) => ({ name, value: id } as Choice)),
    },
  ]);

  return nodeId;
}
