import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';


import '@testing-library/jest-dom';
import { startLogin, startRegister } from '../../actions/auth';
import { AuthState, IAuthAction } from '../../reducers/authReducer';
import { AuthTypes } from '../../types/auth.types';
import { AuthService } from '../../services/authService';


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

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

    test('startLogin incorrecto', async () => {
        await store.dispatch(startLogin('velasco@1.com', '123456') as any);

        const actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire)
            .toHaveBeenCalledWith('Error', 'Invalid credentials', 'error');

    });


    test('startRegister correcto', async () => {

        AuthService.prototype.register = jest.fn()
        .mockImplementationOnce(
            (name: string, email: string, password: string) => {
                return {
                    uid: '1231231asdasdaSf',
                    name,
                    email,
                    token: 'asdasd123'
                }
            }
        );

        await store.dispatch(
            startRegister(
                {
                    name: 'Pedro',
                    email: 'pedross@mail.com',
                    password: '123343'
                }
            ) as any
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: AuthTypes.startRegister,
                payload: {
                    uid: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    token: expect.any(String),
                }
            }
        );
        // const token = (localStorage.setItem as any).mock.calls[0][1];

    });

})
