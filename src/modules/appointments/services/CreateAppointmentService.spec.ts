import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRpository'
import CreateAppointmentService from './CreateAppointmentService';



describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointment =  await createAppointment.execute({
            date: new Date(),
            provider_id: '123123'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123')

    })

   /*  it('should not be able to create two appointments at the same time', () => {

    }) */
})


