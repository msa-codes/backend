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
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepostory.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
