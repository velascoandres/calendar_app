import React from 'react'
import { IUser } from '../../interfaces/user.interface';



export interface IEvent {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    bgcolor?: string;
    notes: string;
    user?: Omit<IUser, 'token' | 'email' | 'password' >;
}

export type EventProps = {
    event: IEvent;
}


export const CalendarEvent: React.FC<EventProps> = ({ event }: EventProps) => {

    const { title, user } = event;

    return (
        <div>
            <span> {title} </span>
            <span> {user?.name} </span>
        </div>
    );
}
