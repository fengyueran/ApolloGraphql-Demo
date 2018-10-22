
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../views/home';
import Example1 from '../examples/example1';
import Example2 from '../examples/example2';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/example1" component={Example1} />
    <Route path="/example2" component={Example2} />
  </Switch>
);


export default App;