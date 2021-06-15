import { IEvent } from './../components/calendar/CalendarEvent';
import { Reducer } from 'react';
import moment from 'moment';
import { CalendarTypes } from '../types/calendar.types';

export type CalendarState = {
    events: IEvent[];
    activeEvent?: IEvent;
};

export interface ICalendarAction {
    type: CalendarTypes;
}

export interface IAddNewEventAction extends ICalendarAction {
    type: CalendarTypes.eventAddNew;
    payload: {
        event: IEvent;
    }
}

export interface ISetActiveEventAction extends ICalendarAction {
    type: CalendarTypes.eventSetActive;
    payload: {
        event: IEvent;
    }
}


export const initialState: CalendarState = {
    events: [
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
    ],
};



export const calendarReducer: Reducer<CalendarState, ICalendarAction> = (state = initialState, action): CalendarState => {

    const { type } = action;

    switch (type) {
        case CalendarTypes.eventAddNew:
            const newEvent = (action as IAddNewEventAction).payload.event;

            return {
                ...state,
                events: [
                    ...state.events,
                    newEvent,
                ]
            };

        case CalendarTypes.eventSetActive:
            const activeEvent = (action as ISetActiveEventAction).payload.event;

            return {
                ...state,
                activeEvent,
            };

        default:
            return {
                ...state,
            };
    }
};
