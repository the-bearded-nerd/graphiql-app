import { useTranslation } from 'react-i18next';
import { Field } from '../types/types';
import { parseArgs, parseType } from '../utils/utils';

interface DocsFieldProps {
  elemToShow: Field;
}

export function DocsField({ elemToShow }: DocsFieldProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div>{elemToShow.name}</div>
      <div>{elemToShow.description}</div>
      {elemToShow.type && (
        <>
          <div>{t('Тип')}</div>
          <div
            dangerouslySetInnerHTML={{ __html: parseType(elemToShow.type) }}
          ></div>
        </>
      )}
      {elemToShow.args && (
        <>
          <div>{t('Аргументы')}</div>
          <div
            dangerouslySetInnerHTML={{ __html: parseArgs(elemToShow.args) }}
          ></div>
        </>
      )}
    </div>
  );
}
