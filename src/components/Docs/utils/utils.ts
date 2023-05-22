import { TypeRef, InputValue } from '../types/types';

export const parseType = (type: TypeRef): string => {
  if (type.ofType === null)
    return `<span class='type_name'>${type.name}</span>`;

  if (type.kind === 'LIST') return `[${parseType(type.ofType)}]`;
  if (type.kind === 'NON_NULL') return `${parseType(type.ofType)}!`;
  return '';
};

//need to add css white-space: pre to new line correctly
export const parseArgs = (args: InputValue[]) => {
  if (args.length === 0) return '';
  if (args.length === 1) {
    return `(<span class="arg_name">${args[0].name}</span>: ${parseType(
      args[0].type
    )})`;
  }
  return `(
    ${args
      .map(
        (arg) =>
          `<span class="arg_name">${arg.name}</span>: ${parseType(arg.type)}`
      )
      .join('\r\n')}
    )`;
};
