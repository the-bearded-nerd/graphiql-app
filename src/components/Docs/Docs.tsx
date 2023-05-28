import { useState, useEffect } from 'react';
import {
  FullType,
  InputValue,
  Field,
  TypeRef,
  DocsFirstPage,
} from './types/types';

import { DocsPage } from './DocsPage/DocsPage';
import { getIntrospectionQueryData } from '../../utils/APIutils';
import { useTranslation } from 'react-i18next';

import { Button, Container, Title } from '@mantine/core';

export function Docs() {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [schemaTypes, setSchemaTypes] = useState<null | FullType[]>(null);
  const [currentShownElement, setCurrentShownElement] = useState<
    null | FullType | InputValue | Field | TypeRef | DocsFirstPage
  >(null);
  const [history, setHistory] = useState<(FullType | Field | DocsFirstPage)[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIntrospectionQueryData();
      const schema_types = (data.__schema.types as FullType[]).filter(
        (type) => !type.name.startsWith('__')
      );
      setSchemaTypes(schema_types);
      const startElem: DocsFirstPage = {
        name: 'Docs',
        description:
          'A GraphQL schema provides a root type for each kind of operation.',
        rootType: schema_types[0],
      };
      setCurrentShownElement(startElem);
      setHistory([startElem]);
    };
    fetchData()
      .then(() => {
        setIsLoaded(true);
      })
      .catch(console.error);
  }, []);

  const onDivClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('type_name')) {
      console.log('clicked on type');
      const clickedType = schemaTypes?.filter(
        (type) => type.name === target.innerHTML
      )[0];
      console.log(clickedType);
      if (clickedType) setCurrentShownElement(clickedType);
      if (history && clickedType) setHistory([...history, clickedType]);
    }
    if (target.classList.contains('field_name')) {
      console.log('clicked on field_name');
      const clickedField = (currentShownElement as FullType).fields?.filter(
        (elem) => elem.name === target.innerHTML
      )[0];
      console.log(clickedField);
      if (clickedField) setCurrentShownElement(clickedField);
      if (history && clickedField) setHistory([...history, clickedField]);
    }
  };

  const onBackButtonClick = () => {
    if (history.length > 1) {
      const newCurrent = history[history.length - 2];
      setHistory(history.slice(0, -1));
      setCurrentShownElement(newCurrent);
    }
  };

  return (
    <Container w={320} onClick={onDivClick}>
      <Title variant={'2'}>{t('Документация')}</Title>
      {isLoaded && (
        <>
          <p>{t('Схема загружена')}</p>
          <Button
            color={'custom-color'}
            onClick={() => {
              setIsShown(!isShown);
            }}
            m={'10px 0'}
          >
            {isShown ? t('Скрыть') : t('Показать')}
          </Button>
        </>
      )}
      {isShown && (
        <div>
          {!!(history.length > 1) && (
            <Button
              color={'custom-color'}
              variant={'outline'}
              onClick={onBackButtonClick}
            >{`< ${history[history.length - 2].name}`}</Button>
          )}
          {schemaTypes && currentShownElement && (
            <DocsPage elemToShow={currentShownElement} />
          )}
        </div>
      )}
    </Container>
  );
}
