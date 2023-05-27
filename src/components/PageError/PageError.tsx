import { useTranslation } from 'react-i18next';
import { Button, Title, Stack, Image } from '@mantine/core';
import Img from '../../assets/error.svg';

const PageError = () => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <Stack align={'center'} justify={'center'} h={'100vH'} w={'100%'}>
      <Image src={Img} maw={300} />
      <Title variant={'1'} ta={'center'}>
        {t('Произошла непредвиденная ошибка')}
      </Title>
      <Button onClick={reloadPage} color={'custom-color'}>
        {t('Обновить страницу')}
      </Button>
    </Stack>
  );
};

export default PageError;
