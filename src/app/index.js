import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Router } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import App from './app';

const history = createHistory();
const MOUNT_NODE = document.getElementById('root');


const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>,
    MOUNT_NODE
  );
};

export default render;
registerServiceWorker();
