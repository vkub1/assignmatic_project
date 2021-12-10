import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const AuthRoute = ({ component: Component, isAuth, path, ...props }) => {
    if(!isAuth) {
        return <Navigate to='/sign_in' />;
    }
    return <Route path={path} element={<Component />} />
};

export default AuthRoute;