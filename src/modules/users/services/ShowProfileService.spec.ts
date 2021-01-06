import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('any_name');
    expect(profile.email).toBe('any_email@email.com');
  });

  it('should not  be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non_existing_error',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
