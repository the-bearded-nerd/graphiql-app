import { useTranslation } from 'react-i18next';
import { GraphQLRequest } from '../../components/GraphqlRequest/GraphqlRequest';
import { Docs } from '../../components/Docs/Docs';
import { Flex } from '@mantine/core';

export const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Flex
      justify={'space-between'}
      gap={15}
      sx={{ alignSelf: 'stretch' }}
      w={'100%'}
    >
      <GraphQLRequest />
      <Docs />
    </Flex>
  );
};
