import { AuthState } from './../reducers/authReducer';
import { UIState } from './../reducers/uiReducer';
import { rootReducer } from './../reducers/rootReducer';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CalendarState } from '../reducers/calendarReducer';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {ui: UIState, calendar: CalendarState, auth: AuthState};