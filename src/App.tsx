import { Suspense } from 'react';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="">
        <Layout>
          <AppRouter />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
