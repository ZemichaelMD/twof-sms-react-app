import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import checkJwtStatus  from "./Auth"
import Auth from './Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route{...rest}
            render={(props) => {
                if (Auth.isAuthenticated) {
                    //Status = If refresh Token is needed
                    if (checkJwtStatus() === 'okay') {
                        return <Component {...props} />
                    }

                    else if (checkJwtStatus() === 'expired') {
                        return <Redirect to={{
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }} />
                    }
                    else if ((checkJwtStatus() === 'refresh')) {
                        Auth.refreshToken();
                        return <Component {...props} />
                    }
                    else {
                        return <Redirect to={{
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }} />
                    }
                    //RoleID = if role is Admin
                    //Redirect to dahsboard with userID

                    //RoleID = clerk
                    //redirect to clerk dahsboard

                    //else redirect to login

                }
                else {
                    return <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />
                }
            }
            } />
    )
}

export default ProtectedRoute;
