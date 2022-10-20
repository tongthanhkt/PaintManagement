import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/pages/Home';

import Navbar from './components/layout/Navbar';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import DetailProduct from './components/products/DetailProduct';
import ExportProduct from './components/products/ExportProduct';
import AllBillExport from './components/pages/AllBillExport';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />

                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/products/add" component={AddProduct} />
                    <Route
                        exact
                        path="/products/edit/:id"
                        component={EditProduct}
                    />
                    <Route
                        exact
                        path="/products/:id"
                        component={DetailProduct}
                    />
                    <Route
                        exact
                        path="/exportproduct"
                        component={ExportProduct}
                    />

                    <Route
                        exact
                        path="/detailbillexport"
                        component={AllBillExport}
                    />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
