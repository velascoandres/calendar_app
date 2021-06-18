
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.FC<Record<string, unknown>>;
    path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    isAuthenticated,
    component: Component,
    path,
    exact,
    ...rest
}: PrivateRouteProps) => {

    const pathname = rest?.location?.pathname || '/';
    const search = rest?.location?.search || '';

    const lastPath = `${pathname}${search}`;

    localStorage.setItem('lastPath', lastPath);

    return (
        <Route
            exact={exact || false}
            path={path}
            component={(props: Record<string, unknown>) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};
