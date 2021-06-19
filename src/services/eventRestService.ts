import { IEvent } from './../components/calendar/CalendarEvent';
import axios from 'axios';

import { HttpMethods } from './httpMethods';


const baseUrl = process.env.REACT_APP_API_URL;

export class EventRestService {

    private static _instance: EventRestService;
    private url: string;


    protected constructor() {
        this.url = `${baseUrl}/events`;
    }

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new EventRestService();
        return this._instance;
    }

    async getEvents(): Promise<{ data: IEvent[] }> {

        const response = await axios(
            `${this.url}/`,
            {
                headers: {
                    'x-token': localStorage.getItem('token'),
                },
                method: HttpMethods.get,
            }
        );


        return response.data;
    }


    async createEvent(event: IEvent): Promise<IEvent> {

        const response = await axios(
            `${this.url}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('token'),
                },
                data: {
                    ...event,
                },
                method: HttpMethods.post,
            }
        );

        return response.data;
    }


    async updateEvent(uid: string, event: IEvent): Promise<IEvent> {

        const response = await axios(
            `${this.url}/${uid}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('token'),
                },
                data: {
                    ...event,
                },
                method: HttpMethods.put,
            }
        );

        return response.data;
    }


    async deleteEvent(uid: string): Promise<{ok: boolean; msg?: string}> {

        const response = await axios(
            `${this.url}/${uid}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('token'),
                },
                method: HttpMethods.delete,
            }
        );

        return response.data;
    }


}
