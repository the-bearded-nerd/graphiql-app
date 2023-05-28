import { useRef, useState } from 'react';

import { getDataWithVarsAndHeaders } from '../../utils/APIutils';
import { useTranslation } from 'react-i18next';

import './GraphqlRequest.css';

export function GraphQLRequest() {
  const queryRef = useRef<HTMLTextAreaElement>(null);
  const variablesRef = useRef<HTMLTextAreaElement>(null);
  const headersRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const [isVariablesShown, setIsVariablesShown] = useState(false);

  const { t } = useTranslation();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = queryRef.current ? queryRef.current.value : '';
    const variables = variablesRef.current
      ? variablesRef.current.value
      : undefined;
    const headers = headersRef.current ? headersRef.current.value : undefined;
    const data = await getDataWithVarsAndHeaders(query, variables, headers);
    const dataByLines = JSON.stringify(data)
      .replaceAll('}', '\r\n}')
      .replaceAll('{', '{\r\n')
      .replaceAll(']', '\r\n]')
      .replaceAll('[', '[\r\n')
      .replaceAll(',', ',\r\n')
      .split('\r\n');
    let tabCount = 0;
    for (let i = 0; i < dataByLines.length; i++) {
      if (dataByLines[i].includes('}')) tabCount -= 2;
      if (dataByLines[i].includes(']')) tabCount--;
      dataByLines[i] = ' '.repeat(tabCount) + dataByLines[i];
      if (dataByLines[i].includes('{')) tabCount += 2;
      if (dataByLines[i].includes('[')) tabCount++;
    }
    if (outputRef.current) {
      outputRef.current.value = dataByLines.join('\r\n');
    }
  };

  return (
    <>
      <form className="graphqlrequest-form" onSubmit={onFormSubmit}>
        <div className="graphqlrequest-content">
          <div className="query-and-variables">
            <h3>{t('Введите запрос')}</h3>
            <textarea
              cols={30}
              rows={10}
              ref={queryRef}
              placeholder="query here"
            ></textarea>
            <button
              type="button"
              onClick={() => {
                setIsVariablesShown(!isVariablesShown);
              }}
            >
              {isVariablesShown
                ? t('Скрыть переменные')
                : t('Показать переменные')}
            </button>
            {isVariablesShown && (
              <>
                <h3>{t('Введите переменные')}</h3>
                <textarea
                  cols={30}
                  rows={10}
                  ref={variablesRef}
                  placeholder="variables here"
                ></textarea>
              </>
            )}
          </div>

          <div className="output">
            <h3>{t('Результат запроса')}</h3>
            <textarea
              cols={30}
              rows={10}
              ref={outputRef}
              readOnly
              placeholder="output here"
            ></textarea>
          </div>
        </div>

        <button type="submit">{t('Отправить запрос')}</button>
      </form>
    </>
  );
}
