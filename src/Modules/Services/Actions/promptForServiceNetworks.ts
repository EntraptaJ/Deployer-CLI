// src/Modules/Services/Actions/promptForServiceNetworks.ts
import { ServiceNetwork, ServiceNetworkType } from '../';
import inquirer, { Answers, QuestionCollection } from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';

/**
 * Inquirer questions for Network Creation
 */
const networkQuestions: QuestionCollection<Answers>[] = [
  {
    name: 'type',
    type: 'list',
    choices: Object.entries(ServiceNetworkType).map(
      ([name, value]) => ({ name, value } as Choice),
    ),
  },
  {
    name: 'cidrIPAddress',
    type: 'input',
  },
  {
    name: 'gateWayAddress',
    type: 'input',
  },
  {
    name: 'dnsServer',
    type: 'input',
  },
];

/**
 * Prompts user for input of A & B Networks
 * @returns The user's input for networkA & networkB
 */
export async function promptForServiceNetworks(): Promise<{
  networkA: ServiceNetwork;
  networkB: ServiceNetwork;
}> {
  console.log('NetworkA');
  const networkA = (await inquirer.prompt(networkQuestions)) as ServiceNetwork;

  console.log('NetworkB');
  const networkB = (await inquirer.prompt(networkQuestions)) as ServiceNetwork;

  return { networkA, networkB };
}
