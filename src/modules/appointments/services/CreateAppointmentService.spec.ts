import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.excute({
      date: new Date(),
      provider_id: 'any_uuid',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_uuid');
  });

  it('should not be able to create two appointments with the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmetnDate = new Date();

    await createAppointment.excute({
      date: appointmetnDate,
      provider_id: 'any_uuid',
    });

    expect(
      createAppointment.excute({
        date: appointmetnDate,
        provider_id: 'any_uuid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
