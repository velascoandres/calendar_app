import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab: React.FC = () => {

    const dispatch = useDispatch();

    const openCreateEventModal = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={openCreateEventModal}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
