// src/Modules/Services/Actions/promptForServiceNetworks.ts
import { ServiceNetwork, ServiceNetworkType } from '../';
import inquirer, { Answers, QuestionCollection } from 'inquirer';
import Choice from 'inquirer/lib/objects/choice';

const networkQuestions: QuestionCollection<Answers>[] = [
  {
    name: 'type',
    type: 'list',
    choices: Object.entries(ServiceNetworkType).map(
      ([name, value]) => ({ name, value } as Choice),
    ),
  },
  {
    name: 'ipAddress',
    type: 'input',
  },
  {
    name: 'gateWayAddress',
    type: 'input',
  },
  {
    name: 'subnetAddress',
    type: 'input',
  },
];

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
