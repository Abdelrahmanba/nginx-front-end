import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './pages/signIn/signIn'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import HomePage from './pages/homePage/home'
import ProtectedRoute from './utils/protectedRoute'
import NotFound from './pages/NotFound/notFound'
import SignOut from './pages/signOut/signOut'
import Employees from './pages/employees/employees'

import Header from './components/header/header'
import Interviews from './pages/interviews/interviews'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/HR' component={Header} />
        <Switch>
          <Route path='/' exact component={SignIn} />
          <ProtectedRoute exact path={['/HR/Home', '/HR']} component={HomePage} />
          <ProtectedRoute exact path={'/HR/Employees'} component={Employees} />
          <ProtectedRoute exact path={'/HR/Interviews'} component={Interviews} />

          <Route path='/signout' component={SignOut} />
          <Route path='*' exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
