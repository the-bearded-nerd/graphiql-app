import { useTranslation } from 'react-i18next';
import { DocsFirstPage as IDocsFirstPage } from '../types/types';

interface DocsFirsPageProps {
  elemToShow: IDocsFirstPage;
}

export function DocsFirstPage({ elemToShow }: DocsFirsPageProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div>{elemToShow.name}</div>
      <div>{elemToShow.description}</div>
      <div>{t('Root Type')}</div>
      <div>
        {t('query')}: <span className="type_name">{t('Query')}</span>
      </div>
    </div>
  );
}
