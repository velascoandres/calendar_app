import { ISetActiveEventAction } from './../reducers/calendarReducer';
import { IAddNewEventAction } from '../reducers/calendarReducer';
import { CalendarTypes } from '../types/calendar.types';
import { IEvent } from './../components/calendar/CalendarEvent';

export const eventAddNew = (event: IEvent): IAddNewEventAction => (
    {
        type: CalendarTypes.eventAddNew,
        payload: {
            event,
        },
    }
);


export const setActiveEvent = (event: IEvent): ISetActiveEventAction => (
    {
        type: CalendarTypes.eventSetActive,
        payload: {
            event,
        },
    }
);
