import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'other_name',
      email: 'other_email@email.com',
    });

    expect(updatedUser.name).toBe('other_name');
    expect(updatedUser.email).toBe('other_email@email.com');
  });

  it('should not  be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non_existing_error',
        name: 'any_name',
        email: 'any_email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const user = await fakeUserRepository.create({
      name: 'other_name',
      email: 'other_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'other_any_name',
        email: 'any_email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'other_name',
      email: 'other_email@email.com',
      old_password: 'any_password',
      password: 'other_password',
    });

    expect(updatedUser.password).toBe('other_password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'other_name',
        email: 'other_email@email.com',
        password: 'other_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'other_name',
        email: 'other_email@email.com',
        old_password: 'wrong_old_password',
        password: 'other_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
