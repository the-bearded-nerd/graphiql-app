import cl from './Header.module.scss';
import LangSwitch from '../../LangSwitch/LangSwitch';
import { BugButton } from '../../BugButton/BugButton';
import { logout } from '../../../firebase';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Group, Text, Button, Flex } from '@mantine/core';
import { IconBrandGraphql } from '@tabler/icons-react';

export const Header = () => {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const [prevPos, setPrevPos] = useState(window.pageYOffset);

  useEffect(() => {
    const scrollHandler = () => {
      const currentPos = window.pageYOffset;
      const el = headerRef.current as HTMLElement;
      el.style.height = prevPos > currentPos ? '60px' : '40px';
      el.style.backgroundColor = prevPos > currentPos ? '#ffffff' : '#0d3800';
      setPrevPos(currentPos);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [prevPos]);

  return (
    <header className={cl['header']} ref={headerRef}>
      <Flex
        align={'center'}
        sx={{ justifyContent: 'space-between' }}
        gap={20}
        w={'100%'}
        maw={1220}
        p={'0 10px'}
        m={'0 auto'}
      >
        <Group>
          <IconBrandGraphql size={50} color={'#781c2a'} />
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <Text fz={'1.5rem'} fw={500} sx={{ userSelect: 'none' }}>
            GraphiQL-clone
          </Text>
        </Group>
        <LangSwitch />
        {/* BugButton added for test purposes only! */}
        <BugButton />
        <Button onClick={logout} radius={'md'} color={'custom-color'}>
          {t('выйти')}
        </Button>
      </Flex>
    </header>
  );
};
