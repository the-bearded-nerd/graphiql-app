import { Suspense } from 'react';

import LangSwitch from './components/LangSwitch/LangSwitch';

function App() {
  return (
    <div className="app">
      <Suspense fallback="">
        <div className="app-content">
          <LangSwitch />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
