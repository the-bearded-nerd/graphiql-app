import { Suspense } from 'react';

import LangSwitch from './components/LangSwitch/LangSwitch';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback="">
          <div className="app-content">
            <LangSwitch />
            <AppRouter />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
