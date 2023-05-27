import { useRef } from 'react';
import { getDataWithVarsAndHeaders } from '../../utils/APIutils';
import { useTranslation } from 'react-i18next';
import { Text, Button, Flex, Stack, Textarea } from '@mantine/core';
import { useRequestStyles } from './GraphqlRequestStyles';

export function GraphQLRequest() {
  const queryRef = useRef<HTMLTextAreaElement>(null);
  const variablesRef = useRef<HTMLTextAreaElement>(null);
  const headersRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useTranslation();
  const { classes } = useRequestStyles();

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
      <form onSubmit={onFormSubmit} className={classes.form}>
        <Button type="submit" color={'custom-color'} mb={15}>
          {t('Отправить запрос')}
        </Button>
        <Flex gap={15}>
          <Stack w={'50%'}>
            <Stack spacing={0}>
              <Text>{t('Query')}</Text>
              <Textarea
                cols={30}
                rows={100}
                ref={queryRef}
                placeholder="query here"
                sx={{ flexGrow: 1 }}
                classNames={{
                  input: classes.input,
                  wrapper: classes.wrapper,
                }}
              ></Textarea>
            </Stack>
            <Stack spacing={0}>
              <Text>{t('Variables')}</Text>
              <Textarea
                cols={30}
                rows={10}
                ref={variablesRef}
                placeholder="variables here"
                sx={{ flexGrow: 1 }}
                classNames={{
                  input: classes.input,
                }}
              ></Textarea>
            </Stack>
            <Stack spacing={0}>
              <Text>{t('Headers')}</Text>
              <Textarea
                cols={30}
                rows={10}
                ref={headersRef}
                placeholder="headers here"
                sx={{ flexGrow: 1 }}
                classNames={{
                  input: classes.input,
                }}
              ></Textarea>
            </Stack>
          </Stack>
          <Stack w={'50%'} spacing={0}>
            <Text>{t('Output')}</Text>
            <Textarea
              cols={30}
              rows={10}
              ref={outputRef}
              readOnly
              placeholder="output here"
              sx={{
                flexGrow: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            ></Textarea>
          </Stack>
        </Flex>
      </form>
    </>
  );
}
