import { Dispatch } from 'redux';
import Swal from 'sweetalert2';

import { AuthTypes } from './../types/auth.types';
import { IUser } from './../interfaces/user.interface';
import { AuthService } from '../services/authService';

export const startLogin = (email: string, password: string) => {



    return async (dispatch: Dispatch<any>) => {

        try {
            const user = await AuthService.instance.login(email, password);
            dispatch(login(user));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Credenciales Incorrectas');
        }



    };

};


export const login = (user: IUser) => ({
    type: AuthTypes.login,
    payload: user,
});