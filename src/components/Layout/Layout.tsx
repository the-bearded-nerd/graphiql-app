import React from 'react';
import { HeaderCustom as Header } from './Header/Header';
import { FooterCustom as Footer } from './Footer/Footer';
import { Stack, createStyles } from '@mantine/core';

const useStyles = createStyles({
  page: {
    padding: '100px 20px',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles();
  return (
    <Stack mih={'100%'}>
      <Header />
      <main className={classes.page}>{children}</main>
      <Footer />
    </Stack>
  );
};
