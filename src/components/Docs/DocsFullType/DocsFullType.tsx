import { useTranslation } from 'react-i18next';
import { FullType } from '../types/types';
import { parseArgs, parseType } from '../utils/utils';

interface DocsFullTypeProps {
  elemToShow: FullType;
}

export function DocsFullType({ elemToShow }: DocsFullTypeProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div>{elemToShow.name}</div>
      <div>{elemToShow.description}</div>
      {elemToShow.fields && (
        <>
          <div>{t('Поля')}</div>
          {elemToShow.fields.map((field, idx) => (
            <div key={idx}>
              <div>
                <span className="field_name">{field.name}</span>
                <span
                  dangerouslySetInnerHTML={{ __html: parseArgs(field.args) }}
                ></span>
                {': '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: parseType(field.type),
                  }}
                ></span>
              </div>
              <div>{field.description}</div>
              <br />
            </div>
          ))}
        </>
      )}
      {elemToShow.inputFields && (
        <>
          <div>{t('Поля')}</div>
          {elemToShow.inputFields.map((field, idx) => (
            <div key={idx}>
              <div>
                {field.name}
                {': '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: parseType(field.type),
                  }}
                ></span>
              </div>
              <div>{field.description}</div>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
