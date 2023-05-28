import { Suspense, useState } from 'react';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
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
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.colors.gray[1],
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },
          }),
          colorScheme,
        }}
      >
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback="">
              <Layout>
                <AppRouter />
              </Layout>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
