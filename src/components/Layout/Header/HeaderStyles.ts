import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  header: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    transition: 'height 0.3s ease-in-out, background-color 0.3s ease-in-out',
  },
  inner: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
    padding: '0 10px',
    maxWidth: 1220,
    margin: '0 auto',
    width: '100%',
  },
  logo: {
    userSelect: 'none',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));
