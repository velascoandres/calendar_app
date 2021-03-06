import React from 'react'



export interface IEvent {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    bgcolor?: string;
    notes: string;
    user?: { _id?: string; name: string };
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
