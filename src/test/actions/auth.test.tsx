import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { AuthState, IAuthAction } from '../../reducers/authReducer';
import { AuthTypes } from '../../types/auth.types';


const middlewares = [thunk];
const mockStore = configureStore<AuthState, IAuthAction>(middlewares);


const initState: AuthState = {
    name: null,
    uid: null,
    checking: false,
};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();


describe('Pruebas en las acciones Auth', () => {

    beforeEach(() => {

        store = mockStore(initState);
        jest.clearAllMocks();

    });


    test('startLogin correcto', async () => {
        await store.dispatch(startLogin('velasco.andrs@gmail.com', '123456') as any);

        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: AuthTypes.login,
                payload: {
                    uid: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    token: expect.any(String),
                }
            }
        );

        expect(localStorage.setItem)
            .toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem)
            .toHaveBeenCalledWith('token-init-date', expect.any(String));

        // const token = (localStorage.setItem as any).mock.calls[0][1];

    });



})
