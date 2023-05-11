import { Suspense } from 'react';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback="">
          <div className="app-content">
            <Layout>
              <AppRouter />
            </Layout>
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
