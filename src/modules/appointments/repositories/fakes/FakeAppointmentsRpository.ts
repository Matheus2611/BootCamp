import Appointment from '../../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import {uuid} from 'uuidv4'





class AppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.date === date
        )

        return findAppointment

    }

    public async create({date, provider_id}: ICreateAppointmentDTO): Promise<Appointment>{

        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, provider_id})

        this.appointments.push(appointment)

        return appointment


    }


}

export default AppointmentsRepository;
