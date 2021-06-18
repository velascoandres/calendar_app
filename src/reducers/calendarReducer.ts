import { IEvent } from './../components/calendar/CalendarEvent';
import { Reducer } from 'react';
import moment from 'moment';
import { CalendarTypes } from '../types/calendar.types';

export type CalendarState = {
    events: IEvent[];
    activeEvent?: IEvent | null;
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

export interface IUpdateEventAction extends ICalendarAction {
    type: CalendarTypes.eventUpdate;
    payload: {
        event: IEvent;
    }
}

export interface IDeleteEventAction extends ICalendarAction {
    type: CalendarTypes.eventDelete;
}

export interface ISetActiveEventAction extends ICalendarAction {
    type: CalendarTypes.eventSetActive;
    payload: {
        event: IEvent;
    }
}

export interface IClearctiveEventAction extends ICalendarAction {
    type: CalendarTypes.eventClearActive;
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

        case CalendarTypes.eventClearActive:
            return {
                ...state,
                activeEvent: null,
            };

        case CalendarTypes.eventUpdate:

            const { event: updatedEvent } = (action as IUpdateEventAction).payload;

            return {
                ...state,
                events: state.events.map(
                    (event: IEvent) => {
                        if (event.id === updatedEvent.id) {
                            return updatedEvent;
                        }
                        return event;
                    },
                ),
            };

        case CalendarTypes.eventDelete:

            const { id } = state.activeEvent as IEvent;

            return {
                ...state,
                events: state.events.filter(
                    (event: IEvent) => (event.id !== id)
                ),
                activeEvent: null,
            };

        default:
            return state;
    }
};
