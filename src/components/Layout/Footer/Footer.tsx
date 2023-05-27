import { useTranslation } from 'react-i18next';
import { RssIcon } from '../../Icons';
import { Flex, Footer, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none',
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
        <a href="https://rs.school/react/" target="_blank">
          <RssIcon />
        </a>
        2023
        <Flex wrap={'wrap'} align={'center'} gap={15}>
          <a
            href="https://github.com/avsamoilava"
            target="_blank"
            className={classes.link}
          >
            {t('Саша')}
          </a>
          <a
            href="https://github.com/the-bearded-nerd"
            target="_blank"
            className={classes.link}
          >
            {t('Дима')}
          </a>
        </Flex>
      </Flex>
    </Footer>
  );
};
