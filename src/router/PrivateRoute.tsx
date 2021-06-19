import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.FC<Record<string, unknown>>;
    path: string;
}

export const PrivateRoute = ({component, isAuthenticated, ...rest}: PrivateRouteProps) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
