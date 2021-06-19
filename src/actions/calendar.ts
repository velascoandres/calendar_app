import {
    ISetActiveEventAction,
    IClearctiveEventAction,
    IUpdateEventAction,
    IDeleteEventAction,
    IEventsLoadedAction,
    IEventLogoutAction
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


export const eventStartUpdate = (event: IEvent) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

        try {
            const createdEvent = await EventRestService.instance.updateEvent(event.id as string, event);
            const { uid, name } = getState().auth;
            createdEvent.user = {
                _id: uid as string,
                name: name as string,
            };
            createdEvent.start = event.start;
            createdEvent.end = event.end;
            dispatch(updateEvent(createdEvent));
            Swal.fire('Info', `Event Updated: ${createdEvent.title}`, 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error on update event', 'error');
        }
    }
}


export const eventStartDelete = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

        try {
            const { id, title } = getState().calendar.activeEvent as IEvent;
            await EventRestService.instance.deleteEvent(id as string);
            dispatch(deleteEvent());
            Swal.fire('Info', `Event Deleted: ${title}`, 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error on update event', 'error');
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

const updateEvent = (event: IEvent): IUpdateEventAction => (
    {
        type: CalendarTypes.eventUpdate,
        payload: {
            event,
        },
    }
);


const deleteEvent = (): IDeleteEventAction => (
    {
        type: CalendarTypes.eventDelete,
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




export const clearActiveEvent = (): IClearctiveEventAction => (
    {
        type: CalendarTypes.eventClearActive,
    }
);


export const eventLogout = (): IEventLogoutAction => (
    {
        type: CalendarTypes.eventLogout,
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


