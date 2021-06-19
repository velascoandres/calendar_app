import moment from 'moment';
import { IEvent } from '../components/calendar/CalendarEvent';


export const prepareEvents = (events: IEvent[]): IEvent[] => {
    return events.map(
        (event) => (
            {
                ...event,
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
            }
        )
    );
}