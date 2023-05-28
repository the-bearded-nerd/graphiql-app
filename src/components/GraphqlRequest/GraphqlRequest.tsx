import { useRef, useState } from 'react';

import { getDataWithVarsAndHeaders } from '../../utils/APIutils';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Stack, createStyles } from '@mantine/core';

const useStyles = createStyles({
  area: {
    padding: 5,
  },
});

export function GraphQLRequest() {
  const queryRef = useRef<HTMLTextAreaElement>(null);
  const variablesRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const [isVariablesShown, setIsVariablesShown] = useState(false);

  const { t } = useTranslation();
  const { classes } = useStyles();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = queryRef.current ? queryRef.current.value : '';
    const variables = variablesRef.current
      ? variablesRef.current.value
      : undefined;
    const data = await getDataWithVarsAndHeaders(query, variables);
    if (data.error) {
      if (outputRef.current)
        outputRef.current.value = `{
        "errors": [
          {
            "message": ${data.error.message},
            "stack": ${data.error.stack}
          }
        ]
      }`;
    } else {
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
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Flex miw={320} wrap={'wrap'} gap={10}>
          <Stack miw={320}>
            <h3>{t('Введите запрос')}</h3>
            <textarea
              cols={30}
              rows={10}
              ref={queryRef}
              placeholder="query here"
              className={classes.area}
            ></textarea>
            <Button
              color={'custom-color'}
              type="button"
              variant={'outline'}
              onClick={() => {
                setIsVariablesShown(!isVariablesShown);
              }}
            >
              {isVariablesShown
                ? t('Скрыть переменные')
                : t('Показать переменные')}
            </Button>
            {isVariablesShown && (
              <>
                <h3>{t('Введите переменные')}</h3>
                <textarea
                  cols={30}
                  rows={10}
                  ref={variablesRef}
                  placeholder="variables here"
                  className={classes.area}
                ></textarea>
              </>
            )}
          </Stack>

          <Stack miw={320}>
            <h3>{t('Результат запроса')}</h3>
            <textarea
              cols={30}
              rows={10}
              ref={outputRef}
              readOnly
              placeholder="output here"
              className={classes.area}
            ></textarea>
          </Stack>
        </Flex>

        <Button color={'custom-color'} type="submit" mt={10}>
          {t('Отправить запрос')}
        </Button>
      </form>
    </>
  );
}
