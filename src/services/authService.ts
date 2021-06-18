import axios from 'axios';

import { IUser } from './../interfaces/user.interface';
import { HttpMethods } from './httpMethods';


const baseUrl = process.env.REACT_APP_API_URL;

export class AuthService {

    private static _instance: AuthService;
    private url: string;


    protected constructor() {
        this.url = `${baseUrl}/auth`;
    }

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new AuthService();
        return this._instance;
    }

    async login(email: string, password: string): Promise<IUser> {

        const response = await axios(
            this.url,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email,
                    password,
                },
                method: HttpMethods.post,
            }
        );

        const user = (response.data as IUser);
        this.handleLocalStorage(user);
        return user;

    }


    async register(name: string, email: string, password: string): Promise<IUser> {

        const response = await axios(
            `${this.url}/new`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    name,
                    email,
                    password,
                },
                method: HttpMethods.post,
            }
        );

        const user = (response.data as IUser);
        this.handleLocalStorage(user);
        return response.data;
    }


    async renewToken() {
        const token = localStorage.getItem('token') || '';
        const response = await axios(
            `${this.url}/renew`,
            {
                headers: {
                    'x-token': token,
                },
                method: HttpMethods.get,
            }
        );
        const user = response.data;
        this.handleLocalStorage(user);
        return user;
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
    }


    private handleLocalStorage(user: IUser): void {
        const token = user.token;
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime().toString());
    }


}
