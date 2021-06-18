import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import { AuthState } from '../../reducers/authReducer';
import { RootState } from '../../store/store';


export const Navbar: React.FC = () => {

    const { name } = useSelector<RootState, AuthState>(state => state.auth);
    const dispatch = useDispatch();

    const handleLogut = () => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">{name}</span>
                <div className="d-flex">
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogut}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        <span> Salir</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

