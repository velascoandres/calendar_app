import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Birthday',
        start: moment().toDate(),
        end: moment().toDate(),
        bgcolor: '#fafafa',
    },
];

export const CalendarScreen: React.FC = () => {
    return (
        <div className="calendar-screen">
            <Navbar />

                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    events={events}
                    endAccessor="end"
                />

        </div>
    )
}
