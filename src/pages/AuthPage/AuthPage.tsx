import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cl from './AuthPage.module.scss';
import { SignIn, SignUp } from '../../components/Authorization';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sign in');
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/main');
  }, [navigate, user]);

  return (
    <div className={cl['container']}>
      <div className={cl['tabs']}>
        <button className={cl['tab']} onClick={() => setActiveTab('sign in')}>
          {t('Войти')}
        </button>
        <button className={cl['tab']} onClick={() => setActiveTab('sign up')}>
          {t('Регистрация')}
        </button>
      </div>
      <div className="form">
        {activeTab === 'sign in' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};
