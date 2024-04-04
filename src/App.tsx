import React from 'react';
import { AddressInput } from './features/addressForm/ui';
import { BalancesList} from './features/balances/ui';
import { ProgressBar } from './features/progress/ui';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethereum Address Explorer</h1>
      </header>
      <main>
        <AddressInput />
        <ProgressBar/>
        <BalancesList />
      </main>
    </div>
  );
}

export default App;
