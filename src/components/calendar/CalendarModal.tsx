import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import moment from 'moment';

import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { UIState } from '../../reducers/uiReducer';
import { RootState } from '../../store/store';
import { uiCloseModal } from '../../actions/ui';
import { clearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/calendar';
import { IEvent } from './CalendarEvent';
import { CalendarState } from '../../reducers/calendarReducer';

const customStyles: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


export type EventForm = Omit<IEvent, 'bgcolor' | 'user'>

export enum ValueState {
    clean = 'Clear',
    valid = 'Dirty',
    inValid = 'Invalid',
}



Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:50
const after = now.clone().add(1, 'hours'); // 3:00:50

const initialFormValues: EventForm = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate(),
};

export const CalendarModal: React.FC = () => {

    const [formValues, setFormValues] = useState<EventForm>(initialFormValues);

    const { modalOpen } = useSelector<RootState, UIState>(state => state.ui);
    const { activeEvent } = useSelector<RootState, CalendarState>(state => state.calendar);

    const dispatch = useDispatch();


    const [dateStart, setDateStart] = useState<Date>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Date>(after.toDate());
    const [titleValid, setTitleValid] = useState<ValueState>(ValueState.clean);





    const { notes, title, start, end } = formValues;


    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent);
            setDateStart(activeEvent.start);
            setDateEnd(activeEvent.end);
        } else {
            setFormValues(initialFormValues);
        }
    },
        [activeEvent, setFormValues]
    );


    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues(
            {
                ...formValues,
                [target.name]: target.value,
            }
        );
    };


    const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire(
                'Error',
                'La fecha fin debe de ser mayor a la fecha de inicio',
                'error',
            );
            return;
        }

        if (title.trim().length < 2) {
            return setTitleValid(ValueState.inValid);
        }
        setTitleValid(ValueState.valid);


        if (activeEvent) {

            dispatch(
                eventStartUpdate(
                    {
                        ...activeEvent,
                        ...formValues,
                    },
                )
            );
        } else {
            dispatch(
                eventStartAddNew(
                    {
                        ...formValues,
                    }
                )
            );
        }


        closeModal();

    }


    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(clearActiveEvent());
        setFormValues(initialFormValues);
    }


    const onRequestClose = () => {
        closeModal();
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
        setDateStart(date as Date);
        setFormValues(
            {
                ...formValues,
                start: date as Date,
            }
        );

    };

    const handleEndDateChange = (date: MaterialUiPickersDate) => {
        setDateEnd(date as Date);
        setFormValues(
            {
                ...formValues,
                end: date as Date,
            }
        );
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1>
                {
                    activeEvent ? 'Editar Evento' : 'Nuevo evento'
                }
            </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="mb-3">
                    <label>Fecha y hora inicio*</label>
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            id="date"
                            className="form-control"
                            maxDate={dateEnd}
                            value={dateStart}
                            onChange={handleStartDateChange}
                        />
                    </MuiPickersUtilsProvider>

                </div>

                <div className="mb-3">
                    <label>Fecha y hora fin*</label>
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            id="dateEnd"
                            className="form-control"
                            minDate={dateStart}
                            value={dateEnd}
                            onChange={handleEndDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <hr />
                <div className="mb-3">
                    <label>Titulo* y notas</label>
                    <input
                        type="text"
                        className={`form-control ${(titleValid === ValueState.inValid) && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        <i className="far fa-save"></i>
                        <span>
                            {
                                activeEvent ? ' Editar' : ' Guardar'
                            }
                        </span>
                    </button>
                </div>
            </form>
        </Modal>
    );

}
