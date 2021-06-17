import { IUser } from './../interfaces/user.interface';
import { Reducer } from 'react';
import { AuthTypes } from '../types/auth.types';

export type AuthState = {
    uid: string | null;
    name: string | null;
    checking: boolean;
};


export interface IAuthAction {
    type: AuthTypes;
}

export interface ILoginAction extends IAuthAction {
    type: AuthTypes.login;
    payload: IUser;
}


const initialState: AuthState = {
    uid: null,
    name: null,
    checking: true,
};




export const authReducer: Reducer<AuthState, IAuthAction> = (state = initialState, action) => {

    const { type } = action;



    switch (type) {

        case AuthTypes.login:
            const { payload: user } = action as ILoginAction;
            return {
                ...state,
                uid: user.uid,
                name: user.name,
                checking: false,
            };

        default:
            return {
                ...state,
            };

    }

};
