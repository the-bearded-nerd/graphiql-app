import { Suspense } from 'react';

import LangSwitch from './components/LangSwitch/LangSwitch';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { logout } from './firebase';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback="">
          <div className="app-content">
            <LangSwitch />
            <button onClick={logout}>{t('выйти')}</button>
            <AppRouter />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
