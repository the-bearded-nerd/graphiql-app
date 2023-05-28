import { FullType, InputValue, Field, TypeRef, DocsFirstPage } from './types';

export function isFullType(
  obj: FullType | InputValue | Field | TypeRef | DocsFirstPage
): obj is FullType {
  return (obj as FullType).interfaces !== undefined;
}

export function isField(
  obj: FullType | InputValue | Field | TypeRef | DocsFirstPage
): obj is Field {
  return (obj as Field).args !== undefined;
}

export function isDocsFistPage(
  obj: FullType | InputValue | Field | TypeRef | DocsFirstPage
): obj is DocsFirstPage {
  return (obj as DocsFirstPage).rootType !== undefined;
}
