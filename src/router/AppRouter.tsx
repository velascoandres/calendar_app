import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthState } from '../reducers/authReducer';
import { RootState } from '../store/store';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter: React.FC = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector<RootState, AuthState>(state => state.auth);

    const isAuthenticated = !!uid;

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch])

    if (checking) {
        return (
            <h5> Wait...</h5>
        );
    }

    return (
        <div>
            <Router>


                <Switch>

                    <PublicRoute
                        exact
                        isAuthenticated={isAuthenticated}
                        path="/login"
                        component={LoginScreen}
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={isAuthenticated}
                        path="/"
                        component={CalendarScreen}
                    />

                </Switch>

            </Router>

        </div>
    );
};

