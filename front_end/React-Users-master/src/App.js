import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";


import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddProduct from "./components/products/AddProduct";
import EditUser from "./components/products/EditProduct";
import User from "./components/products/Customer";
import ExportProduct from "./components/products/ExportProduct"

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />


          <Route exact path="/products/add" component={AddProduct} />
          <Route exact path="/products/edit/:id" component={EditUser} />
          <Route exact path="/products/:id" component={User} />
          <Route exact path="/exportproduct" component={ExportProduct} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
