import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/pages/Home';

import Navbar from './components/layout/Navbar';

import { Fragment } from 'react';
import { publicRoutes } from './components/routes';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
} from 'react-router-dom';

import NotFound from './components/pages/NotFound';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import DetailProduct from './components/products/DetailProduct';
import ExportProduct from './components/products/ExportProduct';
import AllBillExport from './components/pages/AllBillExport';
import DetailBillExport from './components/pages/DetailBillExport';

import Login from './components/pages/Login';

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
                                {/* <Layout>
                                    <Page />
                                </Layout> */}

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
