import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './components/GlobalStyles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles><App /></GlobalStyles>
  </React.StrictMode>,
  document.getElementById('root')
);

//test