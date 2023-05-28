import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import {
  Image,
  Paper,
  Stack,
  Title,
  createStyles,
  Text,
  Divider,
} from '@mantine/core';
import Img from '../../assets/greeting.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 100,
    padding: '30px',
    maxWidth: 1200,
    margin: '0 auto',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.dark[0],
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
      gap: 50,
    },
  },
  image: {
    maxWidth: '40%',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  content: {
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1.2rem',
    position: 'relative',
    overflow: 'hidden',
    fontWeight: 600,
    textTransform: 'uppercase',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: '2px',
      backgroundColor:
        theme.colorScheme === 'light' ? theme.colors.dark[8] : theme.white,
      content: '""',
      transform: 'scale(0)',
      transition: 'transform .3s cubic-bezier(0.11, 0.7, 0, 1)',
    },
    '&:hover:after': {
      transform: 'scale(1)',
    },
  },
}));

export const GreetingPage = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const { classes } = useStyles();
  return (
    <Paper className={classes.wrapper} shadow={'md'}>
      <Stack align={'start'} justify={'center'} className={classes.content}>
        <Title variant={'1'}>{t('Приветствие')}</Title>
        <Text fz={'1.4rem'} fw={600} color={'custom-color'}>
          {t('Описание приложения')}
        </Text>
        <Text fz={'1.1rem'}>{t('Цель выполнения')}</Text>
        <Divider size="md" variant="dotted" w={'100%'} />
        <Text fs={'italic'}>{t('Инфо')}</Text>
        <Divider size="md" variant="dotted" w={'100%'} />
        {user ? (
          <Link to="/main" className={classes.link}>
            {t('на главную')}
          </Link>
        ) : (
          <Link to="/auth" className={classes.link}>
            {t('Войти')}
          </Link>
        )}
      </Stack>
      <Image src={Img} className={classes.image} />
    </Paper>
  );
};
