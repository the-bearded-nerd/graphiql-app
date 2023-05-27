import LangSwitch from '../../LangSwitch/LangSwitch';
import { auth, logout } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import {
  Group,
  Text,
  Button,
  Flex,
  Header,
  useMantineTheme,
} from '@mantine/core';
import { IconBrandGraphql } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHeaderStyles } from './HeaderStyles';
import { ThemeSwitch } from '../../ThemeSwitch/ThemeSwitch';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const HeaderCustom = () => {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLElement>(null);
  const [prevPos, setPrevPos] = useState(window.pageYOffset);
  const { classes } = useHeaderStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollHandler = () => {
      const currentPos = window.pageYOffset;
      const header = headerRef.current as HTMLElement;
      header.style.height = prevPos > currentPos ? '80px' : '60px';
      header.style.backgroundColor =
        prevPos > currentPos
          ? 'transparent'
          : theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[5];
      setPrevPos(currentPos);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [prevPos]);

  const handleNavigate = () => {
    navigate('/auth');
  };

  return (
    <Header className={classes.header} ref={headerRef} height={80}>
      <Flex className={classes.inner}>
        <Link to="/" className={classes.logoLink}>
          <Group>
            <IconBrandGraphql size={50} color={'#781c2a'} />
            <Text fz={'1.5rem'} fw={500} className={classes.logo}>
              {t('Логотип')}
            </Text>
          </Group>
        </Link>

        <LangSwitch />
        <ThemeSwitch />
        {user ? (
          <Button onClick={logout} radius={'md'} color={'custom-color'}>
            {t('выйти')}
          </Button>
        ) : pathname === '/' ? (
          <Group>
            <Button
              onClick={handleNavigate}
              color={'custom-color'}
              radius={'md'}
            >
              {t('Войти')}
            </Button>
            <Button
              onClick={handleNavigate}
              color={'custom-color'}
              radius={'md'}
            >
              {t('Регистрация')}
            </Button>
          </Group>
        ) : (
          <></>
        )}
      </Flex>
    </Header>
  );
};
