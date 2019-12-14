// src/Modules/CoreTemplates/Actions/coreTemplateState.ts
import { CoreTemplate } from '../CoreTemplate';
import { state } from '../../State';

/**
 * Retrieves Deployer's Core Templates or a new empty array
 * @returns Deployer's Core Templates
 */
export function getCoreTemplates(): CoreTemplate[] {
  const coreTemplates = state.get('coreTemplates') as
    | CoreTemplate[]
    | undefined;
  if (!coreTemplates) return [];

  return coreTemplates;
}

/**
 * Retrieves a single Core Template from Deployer's State
 * @param coreTemplateId Id of the Core Template you would like to retrieve
 * @returns Requested Core Template or undefined
 */
export function getCoreTemplate(
  coreTemplateId: string,
): CoreTemplate | undefined {
  const coreTemplates = getCoreTemplates();

  return coreTemplates.find(({ itemId }) => itemId === coreTemplateId);
}

/**
 * Saves the local Core Template Array to file system
 * @param coreTemplates Local Core Templates Array
 * @returns inputed coreTemplates
 */
export function saveCoreTemplates(
  coreTemplates: CoreTemplate[],
): CoreTemplate[] {
  state.set('coreTemplates', coreTemplates);

  return coreTemplates;
}

/**
 * Pushes a new Core Template into Deployer's State
 * @param input New Core Template Input
 * @returns Updated Deployer's Core Template State
 */
export function pushCoreTemplate(input: CoreTemplate): CoreTemplate[] {
  const coreTemplates = getCoreTemplates();
  coreTemplates.push(input);

  saveCoreTemplates(coreTemplates);

  return coreTemplates;
}
