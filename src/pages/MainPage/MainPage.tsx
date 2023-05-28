import { GraphQLRequest } from '../../components/GraphqlRequest/GraphqlRequest';
import { Docs } from '../../components/Docs/Docs';
import { Flex } from '@mantine/core';

export const MainPage = () => {
  return (
    <div>
      <Flex wrap={'wrap'}>
        <Docs />
        <GraphQLRequest />
      </Flex>
    </div>
  );
};
