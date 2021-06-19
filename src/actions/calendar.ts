import {
    ISetActiveEventAction,
    IClearctiveEventAction,
    IUpdateEventAction,
    IDeleteEventAction,
    IEventsLoadedAction
} from './../reducers/calendarReducer';
import Swal from 'sweetalert2';
import { Dispatch } from 'redux';
import { EventRestService } from './../services/eventRestService';
import { IAddNewEventAction } from '../reducers/calendarReducer';
import { CalendarTypes } from '../types/calendar.types';
import { IEvent } from './../components/calendar/CalendarEvent';
import { RootState } from '../store/store';
import { prepareEvents } from '../helpers/prepareEvents';



export const eventStartAddNew = (event: IEvent) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

        try {
            const createdEvent = await EventRestService.instance.createEvent(event);
            const { uid, name } = getState().auth;
            createdEvent.user = {
                _id: uid as string,
                name: name as string,
            };
            createdEvent.start = event.start;
            createdEvent.end = event.end;
            dispatch(eventAddNew(createdEvent));
            Swal.fire('Info', `Event Created: ${createdEvent.title}`, 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error on create event', 'error');
        }
    }
}



export const eventStartLoading = () => {
    return async (dispatch: Dispatch) => {

        try {
            const response = await EventRestService.instance.getEvents();
            const formatedEvents = prepareEvents(response.data);
            dispatch(eventsLoad(formatedEvents));
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error on list events', 'error');
        }
    }
}





const eventAddNew = (event: IEvent): IAddNewEventAction => (
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


export const updateEvent = (event: IEvent): IUpdateEventAction => (
    {
        type: CalendarTypes.eventUpdate,
        payload: {
            event,
        },
    }
);


export const deleteEvent = (): IDeleteEventAction => (
    {
        type: CalendarTypes.eventDelete,
    }
);


export const clearActiveEvent = (): IClearctiveEventAction => (
    {
        type: CalendarTypes.eventClearActive,
    }
);


const eventsLoad = (events: IEvent[]): IEventsLoadedAction => (
    {
        type: CalendarTypes.eventLoaded,
        payload: {
            events,
        },
    }
);
