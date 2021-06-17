import { useState } from 'react';

export type ChangeInputCallback = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => void;
export type ResetCallback<T> = (newValue: T) => void;
export type UseForm = <T>(initial: T) => [T, ChangeInputCallback, ResetCallback<T>];


export const useForm: UseForm = <T>(initial: T) => {
    const [formState, setFormState] = useState<T>(initial);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement  >) => {

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const reset = (newValue: T = initial): void => {
        setFormState(newValue);
    }

    return [formState, onChange, reset];
};