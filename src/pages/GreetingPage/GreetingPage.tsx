import React from 'react';
import { useTranslation } from 'react-i18next';

export const GreetingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <h1>{t('Greeting!')}</h1>
    </div>
  );
};
