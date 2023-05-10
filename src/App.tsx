import { Suspense } from 'react';

import LangSwitch from './components/LangSwitch/LangSwitch';
import Authorization from './components/Authorization/Authorization';

function App() {
  return (
    <div className="app">
      <Suspense fallback="">
        <div className="app-content">
          <LangSwitch />
          <Authorization />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
