import React from 'react';

import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/userForm';
import './login.css';


export type LoginForm = { email: string; password: string };
export type RegisterForm = { email: string; password: string; repassword: string; name: string };



export const LoginScreen: React.FC = () => {

    const dispatch = useDispatch()

    const initialLoginForm: LoginForm = {
        email: '',
        password: '',
    };

    const initialRegisterForm: RegisterForm = {
        email: '',
        password: '',
        repassword: '',
        name: '',
    };

    const [formLoginValues, handleLoginInputChange] = useForm<LoginForm>(initialLoginForm);
    const [formRegisterValues, handleRegisterInputChange] = useForm<RegisterForm>(initialRegisterForm);

    const { email: lEmail, password: lPassword } = formLoginValues;
    const { email: rEmail, password: rPassword, repassword, name: rName } = formRegisterValues;


    const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        dispatch(startLogin(lEmail, lPassword));

    };


    const handleRegister = (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (rPassword !== repassword) {
            return Swal.fire('Error', 'The passwords must be equal', 'error');
        }
        dispatch(startRegister(formRegisterValues));

    };


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={handleLoginInputChange}
                                value={lEmail}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={handleLoginInputChange}
                                value={lPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="repassword"
                                value={repassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}