import React from 'react';
import ReactDOM from 'react-dom';
import classes from './index.css';
import App from './Containers/App';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';


const store = createStore(() => {}, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
