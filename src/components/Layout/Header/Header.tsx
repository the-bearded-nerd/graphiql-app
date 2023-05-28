import LangSwitch from '../../LangSwitch/LangSwitch';
import { auth, logout } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import {
  Group,
  Text,
  Button,
  Flex,
  Header,
  useMantineTheme,
  Burger,
  Transition,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandGraphql } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHeaderStyles } from './HeaderStyles';
import { ThemeSwitch } from '../../ThemeSwitch/ThemeSwitch';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const HeaderCustom = () => {
  const [prevPos, setPrevPos] = useState(window.pageYOffset);
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLElement>(null);
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
  }, [prevPos, theme.colorScheme, theme.colors.dark, theme.colors.gray]);

  const handleNavigate = () => {
    navigate('/auth');
  };

  const closeBurger = () => {
    close();
  };

  const NavItems = () => {
    return (
      <React.Fragment>
        <LangSwitch cb={closeBurger} />
        <ThemeSwitch cb={closeBurger} />
        {user ? (
          <Button
            onClick={() => {
              logout();
              close();
            }}
            radius={'md'}
            color={'custom-color'}
          >
            {t('выйти')}
          </Button>
        ) : pathname === '/' ? (
          <Group className={classes.signBtns}>
            <Button
              onClick={() => {
                handleNavigate();
                close();
              }}
              color={'custom-color'}
              radius={'md'}
              className={classes.signBtn}
            >
              {t('Войти')}
            </Button>
            <Button
              onClick={() => {
                handleNavigate();
                close();
              }}
              color={'custom-color'}
              radius={'md'}
              className={classes.signBtn}
            >
              {t('Регистрация')}
            </Button>
          </Group>
        ) : (
          <></>
        )}
      </React.Fragment>
    );
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

        <Group className={classes.navItems}>
          <NavItems />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <NavItems />
            </Paper>
          )}
        </Transition>
      </Flex>
    </Header>
  );
};
