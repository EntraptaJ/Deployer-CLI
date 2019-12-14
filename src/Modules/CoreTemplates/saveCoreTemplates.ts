// src/Modules/CoreTemplates/saveCoreTemplates.ts
import { CoreTemplate } from './CoreTemplate';
import { state } from '../State';

export function saveCoreTemplates(
  coreTemplates: CoreTemplate[],
): CoreTemplate[] {
  state.set('coreTemplates', coreTemplates);

  return coreTemplates;
}
