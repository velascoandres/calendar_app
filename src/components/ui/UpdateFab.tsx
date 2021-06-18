import React from 'react'

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const UpdateFab: React.FC = () => {

    const dispatch = useDispatch();
    const openEditModal = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className="btn btn-secondary fab-secondary"
            onClick={openEditModal}
        >
            <i className="fas fa-edit"> </i>
        </button>
    )
}
