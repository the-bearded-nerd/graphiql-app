import React from 'react';
import cl from './Header.module.scss';
import LangSwitch from '../../LangSwitch/LangSwitch';
import { logout } from '../../../firebase';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className={cl['header']}>
      <LangSwitch />
      <button onClick={logout}>{t('выйти')}</button>
    </header>
  );
};
