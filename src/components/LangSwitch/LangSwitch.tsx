import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';

const LangSwitch = () => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      radius={'50%'}
      onClick={toggle}
      variant={'outline'}
      color={'custom-color'}
    >
      {t('Перевод')}
    </Button>
  );
};

export default LangSwitch;
