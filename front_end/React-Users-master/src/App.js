import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { Fragment } from 'react';
import { publicRoutes } from './components/routes';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
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
