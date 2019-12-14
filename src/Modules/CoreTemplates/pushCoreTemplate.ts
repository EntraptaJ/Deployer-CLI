// src/Modules/CoreTemplates/pushCoreTemplate.ts
import { CoreTemplate } from './CoreTemplate';
import { getCoreTemplates } from './getCoreTemplates';
import { saveCoreTemplates } from './saveCoreTemplates';

export function pushCoreTemplate(
  coreTemplateInput: CoreTemplate,
): CoreTemplate[] {
  const coreTemplates = getCoreTemplates();
  coreTemplates.push(coreTemplateInput);

  saveCoreTemplates(coreTemplates);

  return coreTemplates;
}
