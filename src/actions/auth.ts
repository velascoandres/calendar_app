import { eventLogout } from './calendar';
import { Dispatch } from 'redux';
import Swal from 'sweetalert2';


import { AuthTypes } from './../types/auth.types';
import { IUser } from './../interfaces/user.interface';
import { AuthService } from '../services/authService';
import { ILoginAction, IRegisterAction } from '../reducers/authReducer';
import { IFinishChecking, ILogoutAction } from './../reducers/authReducer';

export const startLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<any>) => {

        try {
            const user = await AuthService.instance.login(email, password);
            dispatch(login(user));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Invalid credentials', 'error');
        }

    };

};


export const startRegister = ({ name, email, password }: Omit<IUser, 'uid' | 'token'>) => {

    return async (dispatch: Dispatch<any>) => {

        try {
            const user = await AuthService.instance.register(name, email, password as string);
            dispatch(register(user));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error on register', 'error');
        }

    };

};



export const startChecking = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const user = await AuthService.instance.renewToken();
            dispatch(login(user));
        } catch (error) {
            console.error(error);
            dispatch(finishChecking());
        }
    }
};



export const startLogout = () => {
    return async (dispatch: Dispatch<any>) => {
        AuthService.instance.logout();
        dispatch(eventLogout());
        dispatch(logout());
    };
}


export const login = (user: IUser): ILoginAction => ({
    type: AuthTypes.login,
    payload: user,
});



export const register = (user: IUser): IRegisterAction => ({
    type: AuthTypes.startRegister,
    payload: user,
});


export const finishChecking = (): IFinishChecking => ({
    type: AuthTypes.authCheckingFinish,
});


export const logout = (): ILogoutAction => ({
    type: AuthTypes.logout,
});

