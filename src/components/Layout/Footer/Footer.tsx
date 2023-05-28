import { useTranslation } from 'react-i18next';
import { RssIcon } from '../../Icons';
import { Flex, Footer, createStyles } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  inner: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      gap: 20,
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    transition: 'transform 0.2s',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '&:hover': {
      transform: 'scale(1.1)',
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  logoLink: {
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

export const FooterCustom = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <Footer height={'auto'} bg={'custom-color'} p={10}>
      <Flex
        align={'center'}
        justify={'space-between'}
        maw={1220}
        m={'0 auto'}
        className={classes.inner}
      >
        <a
          href="https://rs.school/react/"
          target="_blank"
          className={classes.logoLink}
        >
          <RssIcon />
        </a>
        2023
        <Flex wrap={'wrap'} align={'center'} gap={25}>
          <a
            href="https://github.com/avsamoilava"
            target="_blank"
            className={classes.link}
          >
            <IconBrandGithub />
            {t('Саша')}
          </a>
          <a
            href="https://github.com/the-bearded-nerd"
            target="_blank"
            className={classes.link}
          >
            <IconBrandGithub />
            {t('Дима')}
          </a>
        </Flex>
      </Flex>
    </Footer>
  );
};
