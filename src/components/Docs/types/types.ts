export interface TypeRef {
  kind: string;
  name: string;
  ofType: TypeRef | null;
}

export interface InputValue {
  name: string;
  description: string;
  type: TypeRef;
  defaultValue: string | null;
}

export interface Field {
  name: string;
  description: string;
  args: InputValue[];
  type: TypeRef;
  isDepricated: boolean;
  depricationReason: string | null;
}

export interface FullType {
  name: string;
  kind: string;
  description: string;
  fields: Field[] | null;
  inputFields: InputValue[] | null;
  interfaces: TypeRef[] | null;
}

export interface DocsFirstPage {
  name: string;
  description: string;
  rootType: FullType;
}
