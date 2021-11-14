import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const hr = useSelector((state) => state.hr)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hr.token) {
          return <Component {...rest} {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                  redirected: true,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
