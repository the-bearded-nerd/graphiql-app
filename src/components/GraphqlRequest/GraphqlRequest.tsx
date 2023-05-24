import { useRef } from 'react';

import { getDataWithVarsAndHeaders } from '../../utils/APIutils';
import { useTranslation } from 'react-i18next';

export function GraphQLRequest() {
  const queryRef = useRef<HTMLTextAreaElement>(null);
  const variablesRef = useRef<HTMLTextAreaElement>(null);
  const headersRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

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
      <form onSubmit={onFormSubmit}>
        <textarea
          cols={30}
          rows={10}
          ref={queryRef}
          placeholder="query here"
        ></textarea>
        <textarea
          cols={30}
          rows={10}
          ref={variablesRef}
          placeholder="variables here"
        ></textarea>
        <textarea
          cols={30}
          rows={10}
          ref={headersRef}
          placeholder="headers here"
        ></textarea>
        <textarea
          cols={30}
          rows={10}
          ref={outputRef}
          readOnly
          placeholder="output here"
        ></textarea>
        <button type="submit">{t('Отправить запрос')}</button>
      </form>
    </>
  );
}
