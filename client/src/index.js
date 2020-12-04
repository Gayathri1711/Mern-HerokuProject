import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './index.css';
import Landing from './components/Landing';
import CreateArticle from './components/CreateArticle'
import * as serviceWorker from './serviceWorker';

// import configureStore from './store/configureStore';
// const store = configureStore();
ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route component={Landing} path="/dashboard" />
        <Route component={CreateArticle} path="/create" />
        <Route>
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
