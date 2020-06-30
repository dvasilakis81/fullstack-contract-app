import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary/errorboundary';
import Layout from './HOC/Layout/layout';
import { showGenericMessage } from './Components/Common/templates';

const Contracts = lazy(() => import('./Components/Contracts/ContractsPage'));  //import Contracts from './Components/Contracts/contracts';
const NewContract = lazy(() => import('./Components/Contracts/NewContract')); //import NewContract from './Components/Contracts/newcontract';
const NewAccount = lazy(() => import('./Components/Accounts/NewAccount')); //import NewAccount from './Components/Accounts/NewAccount';
const Account = lazy(() => import('./Components/Accounts/AccountPage')); //import Account from './Components/Accounts/account';
const Home = lazy(() => import('./Components/Home/home'));
const Login = lazy(() => import('./Components/Login/login'));
const Administration = lazy(() => import('./Components/Administration/administration'));
const Reservations = lazy(() => import('./Components/Reservations/reservations'));

class Routes extends React.Component {
  
  render() {

    return (
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={showGenericMessage('Παρακαλώ περιμένετε...', false, true)}>
            <Switch>
              <Route path="/newaccount" exact component={NewAccount} />
              <Route path="/account" exact component={Account} />
              <Route path="/newcontract" exact component={NewContract} />
              <Route path="/contracts" exact component={Contracts} />
              <Route path="/administration" exact component={Administration} />
              <Route path="/reservations" exact component={Reservations} />
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Home} />
            </Switch>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    )
  }
}

export default Routes

//Code splitting
// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import asyncComponent from './components/AsyncComponent/asyncComponent'

// const Home = asyncComponent(() =>
//     import('./components/Home/home').then(module => module.default)
// )

// const InsertProtocolWear = asyncComponent(() =>
//     import('./components/Protocols/insertprotocolwear').then(module => module.default)
// )

// const Test = asyncComponent(() =>
//     import('./components/Protocols/test').then(module => module.default)
// )

// const Layout = asyncComponent(() =>
//     import('./hoc/Layout/layout').then(module => module.default)
// )

// class Routes extends React.Component {
//     render() {
//         return (
//             <Layout>
//                 <Switch>
//                     <Route path="/test" exact component={Test} />
//                     <Route path="/insertprotocolwear" exact component={InsertProtocolWear} />
//                     <Route path="/" exact component={Home} />                    
//                 </Switch>
//             </Layout>
//         )
//     }
// }

//export default Routes;