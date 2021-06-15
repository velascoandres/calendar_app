import { UITypes } from './../types/types';
import { Reducer } from "react";

export type UIState = {
    modalOpen: boolean;
}

export interface UIAction {
    type: UITypes;
}



const initialState: UIState = {
    modalOpen: false,
};





export const uiReducer: Reducer<UIState, UIAction> = (state: UIState = initialState, action: UIAction): UIState => {

    const { type } = action;

    switch (type) {

        case UITypes.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
            };
        case UITypes.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            };

        default:
            return {
                ...state,
            };

    }



}