import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from './components/routes';
import Login from './components/pages/Register/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    const getIsValidValue = (data) => {

        return data

    };

    Login(getIsValidValue);

    if(getIsValidValue() === true) {
        console.log('1')
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = route.layout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route key={index} path={route.path}>
                                <Layout />
                                <Page />
                            </Route>
                        );
                    })}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
