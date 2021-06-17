import { AuthTypes } from './../types/auth.types';
import { IUser } from './../interfaces/user.interface';
import { Dispatch } from 'redux';
import { AuthService } from '../services/authService';

export const startLogin = (email: string, password: string) => {



    return async (dispatch: Dispatch<any>) => {

        const user = await AuthService.instance.login(email, password);

        console.log(user);

        dispatch(login(user));

    };

};


export const login = (user: IUser) => ({
    type: AuthTypes.login,
    payload: user,
});