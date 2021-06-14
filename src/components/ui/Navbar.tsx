import React from 'react';

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Andrés</span>
                <div className="d-flex">
                    <button className="btn btn-outline-danger">
                        <i className="fas fa-sign-out-alt"></i>
                        <span> Salir</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

