import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

export const GreetingPage = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  return (
    <div className="">
      <h1>{t('Greeting!')}</h1>
      {user ? (
        <Link to="/main">{t('на главную')}</Link>
      ) : (
        <Link to="/auth">{t('Войти')}</Link>
      )}
    </div>
  );
};
