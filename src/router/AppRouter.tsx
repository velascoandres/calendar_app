import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch])

    return (
        <div>
            <Router>


                <Switch>

                    <Route path="/login" exact>
                        <LoginScreen />
                    </Route>

                    <Route path="/" exact>
                        <CalendarScreen />
                    </Route>

                </Switch>

            </Router>

        </div>
    );
};

