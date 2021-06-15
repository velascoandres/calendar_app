import React, { useState } from 'react';

import { Calendar, momentLocalizer, stringOrDate, View } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { MESSAGES_ES } from '../../helpers/calendar-messages-es';
import { CalendarEvent, IEvent } from './CalendarEvent';


moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Birthday',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id: '123',
            name: 'Andrés',
        }
    },
];

export const CalendarScreen: React.FC = () => {

    const initialState = (localStorage.getItem('lastView') || 'month') as View;

    const [lastView, setLastView] = useState<View>(initialState);


    const onDoubleClick = (e: IEvent) => {
        console.log(e);
    };

    const onSelectEvent = (e: IEvent) => {
        console.log(e);

    };

    const onViewChange = (view: View) => {
        setLastView(view)
        localStorage.setItem('lastView', view);
    };


    const eventStyleGetter = (event: any, start: stringOrDate, end: stringOrDate, isSelected: boolean) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };

        return {
            style,
        };
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                startAccessor="start"
                events={events}
                endAccessor="end"
                messages={MESSAGES_ES}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={onDoubleClick}
                onView={onViewChange}
                view={lastView}
                onSelectEvent={onSelectEvent}
            />

        </div>
    )
}
