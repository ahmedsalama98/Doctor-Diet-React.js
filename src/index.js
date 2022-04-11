import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import AppSettingProvider from './AppSettingsContext';
import AppAuthContextProvider from './AppAuthContext';

ReactDOM.render(
<AppSettingProvider>
    <BrowserRouter>
      <AppAuthContextProvider>
      <App />
      </AppAuthContextProvider>
    </BrowserRouter>
</AppSettingProvider>
  ,
  document.getElementById('root')
);


