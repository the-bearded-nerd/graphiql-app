import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { MantineProvider } from '@mantine/core';
import './config/i18n/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          'custom-color': [
            '#f0d2d7',
            '#dd96a1',
            '#d37786',
            '#ce6878',
            '#c9596b',
            '#c44a5d',
            '#b63246',
            '#922334',
            '#781c2a',
            '#50131c',
          ],
        },
        globalStyles: (theme) => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
        }),
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
