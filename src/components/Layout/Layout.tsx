import React from 'react';
import cl from './Layout.module.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cl['layout']}>
      <Header />
      <main className={cl['page']}>
        <div className="_container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
