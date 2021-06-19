import { IEvent } from './../components/calendar/CalendarEvent';
import { Reducer } from 'react';
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

export interface IEventsLoadedAction extends ICalendarAction {
    type: CalendarTypes.eventLoaded;
    payload: {
        events: IEvent[];
    }
}

export interface IClearctiveEventAction extends ICalendarAction {
    type: CalendarTypes.eventClearActive;
}


export const initialState: CalendarState = {
    events: [],
    activeEvent: null,
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

        case CalendarTypes.eventLoaded:
            const { events } = (action as IEventsLoadedAction).payload;
            return {
                ...state,
                events: [
                    ...events
                ],
            };

        default:
            return state;
    }
};
