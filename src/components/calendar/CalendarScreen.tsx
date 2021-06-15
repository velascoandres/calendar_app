import React, { useState } from 'react';
import { Calendar, momentLocalizer, stringOrDate, View } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import { MESSAGES_ES } from '../../helpers/calendar-messages-es';
import { CalendarEvent, IEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { setActiveEvent } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { RootState } from '../../store/store';
import { CalendarState } from '../../reducers/calendarReducer';


moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen: React.FC = () => {

    const initialState = (localStorage.getItem('lastView') || 'month') as View;

    const [lastView, setLastView] = useState<View>(initialState);
    const dispatch = useDispatch();
    const { events } = useSelector<RootState, CalendarState>(state => state.calendar);

    const onDoubleClick = (e: IEvent) => {
        dispatch(
            uiOpenModal(),
        );
    };

    const onSelectEvent = (event: IEvent) => {
        dispatch(setActiveEvent(event))
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

            <AddNewFab />

            <CalendarModal />

        </div>
    )
}
