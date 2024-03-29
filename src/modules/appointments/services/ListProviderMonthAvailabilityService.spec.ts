import FakeAppointmentsRepostory from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepostory: FakeAppointmentsRepostory;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepostory = new FakeAppointmentsRepostory();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepostory,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'any_provider_id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
