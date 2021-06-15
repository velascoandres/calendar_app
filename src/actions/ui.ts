import { UITypes } from './../types/types';
import { UIAction } from './../reducers/uiReducer';

export const uiOpenModal = (): UIAction => (
    { type: UITypes.uiOpenModal }
);


export const uiCloseModal = (): UIAction => (
    { type: UITypes.uiCloseModal }
);