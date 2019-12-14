// src/Modules/Controller/vCenter/VMTemplates/getVMTemplates.ts
import { vCenter, ContentLibraryItem } from 'ts-vcenter';

export async function getVMTemplates(
  vCSA: vCenter,
): Promise<ContentLibraryItem[]> {
  const contentLibraries = await vCSA.getContentLibrarys();

  return contentLibraries.flatMap(({ items }) =>
    items.filter(({ type }) => type === 'vm-template'),
  );
}
