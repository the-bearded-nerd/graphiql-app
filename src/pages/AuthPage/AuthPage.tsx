import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignIn, SignUp } from '../../components/Authorization';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Paper, Tabs } from '@mantine/core';

export const AuthPage = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>('sign in');
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/main');
  }, [navigate, user]);

  return (
    <Paper radius="md" p="xl" withBorder maw={300} m={'0 auto'}>
      <Tabs value={activeTab} onTabChange={setActiveTab} color={'custom-color'}>
        <Tabs.List>
          <Tabs.Tab value="sign in" fz={'1.2rem'}>
            {t('Войти')}
          </Tabs.Tab>
          <Tabs.Tab value="sign up" fz={'1.2rem'}>
            {t('Регистрация')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="sign in">
          <SignIn />
        </Tabs.Panel>
        <Tabs.Panel value="sign up">
          <SignUp />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
