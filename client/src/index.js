import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import store from './Redux/Store/store'
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter style={{ overflowY: 'hidden'}}>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));  


//import App from './App'
//ReactDOM.render(<App />, document.getElementById('root'));
