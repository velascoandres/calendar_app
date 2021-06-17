import axios from 'axios';
import { IUser } from '../interfaces/user.interface';
import { HttpMethods } from './httpMethods';


const baseUrl = process.env.REACT_APP_API_URL;

export class AuthService {

    private static _instance: AuthService;
    private url: string;
    private _user: IUser | null;


    protected constructor() {
        this.url = `${baseUrl}/auth`;
        this._user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new AuthService();
        return this._instance;
    }

    public get user(): IUser | null {
        return this._user;
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

        this._user = response.data;
        
        localStorage.setItem('user', JSON.stringify(this._user));
        localStorage.setItem('token-init-date', new Date().getTime().toString());

        return this._user as IUser;

    }


    async register(email: string, password: string): Promise<IUser> {

        const response = await axios(
            `${this.url}/new`,
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

        this._user = response.data;
        localStorage.setItem('user', JSON.stringify(this._user));
        localStorage.setItem('token-init-date', new Date().getTime().toString());
        return response.data;

    }



}
