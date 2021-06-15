import React, { ChangeEvent, useState } from 'react';

import Modal from 'react-modal';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';

import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

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



Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:50
const after = now.clone().add(1, 'hours'); // 3:00:50

export const CalendarModal: React.FC = () => {


    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [dateStart, setDateStart] = useState<Date>(now.toDate());
    const [dateEnd, setDateEnd] = useState<Date>(after.toDate());


    const onRequestClose = () => {
        setIsOpen(false);
    };

    const handleStartDateChange = (date: MaterialUiPickersDate) => {
        setDateStart(date as Date);
    };

    const handleEndDateChange = (date: MaterialUiPickersDate) => {
        setDateEnd(date as Date);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="c">

                <div className="mb-3">
                    <label>Fecha y hora inicio</label>
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
                    <label>Fecha y hora fin</label>
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
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
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
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );

}
