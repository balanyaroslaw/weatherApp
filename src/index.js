import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
try {
  if(localStorage.getItem('coords')===null){
    localStorage.setItem('coords', JSON.stringify([]));
  }
  if(localStorage.getItem('names')===null){
    localStorage.setItem('names', JSON.stringify([]));
  }
} catch (error) {}
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

