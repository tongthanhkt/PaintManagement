import {publicRoutes} from './components/routes'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React, { Fragment }  from 'react'

function Admin() {
  return (
    <Router>
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
    </Router>
  );
}

export default Admin;
