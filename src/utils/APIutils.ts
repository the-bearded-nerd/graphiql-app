const ENDPOINT = 'https://rickandmortyapi.com/graphql';

const INTROSPECTION_QUERY = `
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
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: INTROSPECTION_QUERY,
    }),
  });
  const data = await response.json();
  return data.data;
};

export const getDataWithVarsAndHeaders = async (
  query: string,
  variables: string | undefined,
  headers: string | undefined
) => {
  let data;
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
        headers,
      }),
    });
    data = await response.json();
    return data;
  } catch (e) {
    const error = e as Error;
    return {
      error: {
        message: error.message,
        stack: error.stack,
      },
    };
  }
};
