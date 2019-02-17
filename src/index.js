import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './index.css';

import Logic from './components/Logic'

// ========================================

ReactDOM.render(
  <BrowserRouter basename='/Preview5'>
    <div>
      <Switch>
        <Route path='/q/:query' component={Logic}></Route>
        <Route path='/id/:id' component={Logic}></Route>
        <Route path='/' component={Logic}></Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);