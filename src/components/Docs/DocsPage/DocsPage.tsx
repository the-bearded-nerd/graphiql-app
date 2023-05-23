import {
  FullType,
  InputValue,
  Field,
  TypeRef,
  DocsFirstPage as IDocsFirstPage,
} from '../types/types';

import { isFullType, isField, isDocsFistPage } from '../types/predicats';

import { DocsFirstPage } from '../DocsFirstPage/DocsFirstPage';
import { DocsFullType } from '../DocsFullType/DocsFullType';
import { DocsField } from '../DocsField/DocsField';
import { useTranslation } from 'react-i18next';

interface DocsPageProps {
  elemToShow: FullType | InputValue | Field | TypeRef | IDocsFirstPage;
}

export function DocsPage({ elemToShow }: DocsPageProps) {
  const { t } = useTranslation();
  if (isFullType(elemToShow)) return <DocsFullType elemToShow={elemToShow} />;
  if (isField(elemToShow)) return <DocsField elemToShow={elemToShow} />;
  if (isDocsFistPage(elemToShow))
    return <DocsFirstPage elemToShow={elemToShow} />;
  return (
    <div>
      <h2>{t('Документация')}</h2>
    </div>
  );
}
