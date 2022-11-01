import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from './components/routes';
import Login from './components/pages/Register/Login';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Admin from './AppRouter';
// import { privateRoutes } from './components/routes';

function App() {
    return (
        //     <Router>
        //       <Switch>
        //         {publicRoutes.map((route, index) => {
        //           const Page = route.component;

        //           let Layout = route.layout;

        //           if (route.layout) {
        //             Layout = route.layout;
        //           } else if (route.layout === null) {
        //             Layout = Fragment;
        //           }

        //           return (
        //             <Route key={index} path={route.path}>
        //               <Layout />
        //               <Page />
        //             </Route>
        //           );
        //         })}
        //       </Switch>
        //     </Router>
        // )

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

                        return localStorage.getItem('accessToken') ? (
                            <Route key={index} path={route.path}>
                                <Layout />
                                <Page />
                            </Route>
                        ) : (
                            <Route  path='/' component={Login} />
                        );
                    })}

                    {/* {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            render={() => {
                                return localStorage.getItem(
                                    'accessToken',
                                    true,
                                ) ? (
                                    <Admin />
                                ) : (
                                    <Redirect to="/" />
                                );
                            }}
                        />
                    ))} */}
                </Switch>
            </div>
        </Router>

        // return (
        //     <Router>
        //         <div className="App">
        //             <Switch>

        // {privateRoutes.map((route, index) => <Route key={index} path={route.path} render={() => {
        //     return localStorage.getItem('login success', true) ? <Admin /> : <Redirect to="/" />;
        // }}/>)}

        //             </Switch>
        //         </div>
        //     </Router>
        // );
    );
}

export default App;
