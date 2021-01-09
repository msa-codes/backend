import FakeAppointmentsRepostory from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepostory: FakeAppointmentsRepostory;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepostory = new FakeAppointmentsRepostory();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepostory,
    );
  });

  it('should be able to list the appointments on a specific day ', async () => {
    const appointment1 = await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'any_provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
