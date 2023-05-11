import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cl from './AuthPage.module.scss';
import { SignIn, SignUp } from '../../components/Authorization';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sign in');
  return (
    <div className={cl['container']}>
      <div className="tabs">
        <button onClick={() => setActiveTab('sign in')}>{t('Войти')}</button>
        <button onClick={() => setActiveTab('sign up')}>
          {t('Регистрация')}
        </button>
      </div>
      <div className="form">
        {activeTab === 'sign in' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};