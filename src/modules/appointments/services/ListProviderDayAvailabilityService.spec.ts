import FakeAppointmentsRepostory from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepostory: FakeAppointmentsRepostory;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepostory = new FakeAppointmentsRepostory();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepostory,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'any_provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
