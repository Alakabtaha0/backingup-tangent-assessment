import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './state/store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
