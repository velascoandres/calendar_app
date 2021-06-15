import React from 'react'
import { AppRouter } from './router/AppRouter'

import { Provider } from 'react-redux';
import { store } from './store/store';


export const CalendarApp: React.FC = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
