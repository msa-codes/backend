import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'any_uuid',
      provider_id: 'any_uuid',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_uuid');
  });

  it('should not be able to create two appointments with the same hour', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'any_uuid',
      provider_id: 'any_uuid',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'any_uuid',
        provider_id: 'any_uuid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
