import { useTranslation } from 'react-i18next';
import { GraphQLRequest } from '../../components/GraphqlRequest/GraphqlRequest';
import { Docs } from '../../components/Docs/Docs';

export const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('Main Page')}</h1>
      <Docs />
      <GraphQLRequest />
    </div>
  );
};
