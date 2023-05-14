import { Suspense } from 'react';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback="">
          <Layout>
            <AppRouter />
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
