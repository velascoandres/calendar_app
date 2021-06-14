import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter: React.FC = () => {
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

