import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './components/GlobalStyles';

ReactDOM.render(
    <React.Fragment>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.Fragment>,
    document.getElementById('root'),
);
