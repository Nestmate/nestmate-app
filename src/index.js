import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProviderWrapper } from './context/user.context';
import { MantineProvider } from '@mantine/core';
import { OnNotification } from './components/elements/OnNotification';
import { theme } from './theme/theme';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <UserProviderWrapper>
          <MantineProvider
            theme={theme}>
            <OnNotification>
              <App />
            </OnNotification>
          </MantineProvider>
        </UserProviderWrapper>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
