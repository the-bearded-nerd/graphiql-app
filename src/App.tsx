import { Suspense } from 'react';

import LangSwitch from './components/LangSwitch/LangSwitch';
import { AuthPage } from './pages';

function App() {
  return (
    <div className="app">
      <Suspense fallback="">
        <div className="app-content">
          <LangSwitch />
          <AuthPage></AuthPage>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
