import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
} from '@mantine/core';
import image from '../../assets/404.svg';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const NotFoundPage = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>{t('Что-то не так')}</Title>
          <Text color="dimmed" size="lg">
            {t('Страница не найдена')}
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            <NavLink className={classes.link} to="/main">
              {t('Вернуться')}
            </NavLink>
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};
