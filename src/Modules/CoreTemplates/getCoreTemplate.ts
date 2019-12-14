// src/Modules/CoreTemplates/getCoreTemplate.ts
import { CoreTemplate } from './CoreTemplate';
import { getCoreTemplates } from './getCoreTemplates';

export function getCoreTemplate(templateId: string): CoreTemplate {
  const coreTemplates = getCoreTemplates();

  const coreTemplate = coreTemplates.find(
    ({ itemId }) => itemId === templateId,
  );
  if (!coreTemplate) throw new Error('INVALID NODE');

  return coreTemplate;
}
