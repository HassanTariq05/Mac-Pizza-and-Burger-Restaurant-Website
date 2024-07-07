import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import './css/style.css';
import './css/responsive.css';
import { StateProvider } from './components/StateProvider';
import { initialState } from './components/Reducer';
import reducer from './components/Reducer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
);

