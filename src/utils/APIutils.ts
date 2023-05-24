import { IntrospectionQuery } from 'graphql';
import { request, gql } from 'graphql-request';

const ENDPOINT = 'https://rickandmortyapi.com/graphql';

const INTROSPECTION_QUERY = gql`
  query IntrospectionQuery {
    __schema {
      types {
        ...FullType
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getIntrospectionQueryData = async () => {
  const data = await request<IntrospectionQuery>(ENDPOINT, INTROSPECTION_QUERY);
  return data;
};

export const getDataWithVarsAndHeaders = async (
  query: string,
  variables: string | undefined,
  headers: string | undefined
) => {
  const data = await request(
    ENDPOINT,
    query,
    variables ? JSON.parse(variables) : undefined,
    headers ? JSON.parse(headers) : undefined
  );
  return data;
};
