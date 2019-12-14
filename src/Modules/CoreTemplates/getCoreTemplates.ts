// src/Modules/CoreTemplate/getCoreTemplates.ts
import { CoreTemplate } from './CoreTemplate';
import { state } from '../State';

export function getCoreTemplates(): CoreTemplate[] {
  const coreTemplates = state.get('coreTemplates');

  if (!coreTemplates) return [];

  return coreTemplates as CoreTemplate[];
}
