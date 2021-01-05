import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'any_avatar_filename',
    });

    expect(user.avatar).toBe('any_avatar_filename');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non_existing_user',
        avatarFilename: 'any_avatar_filename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'any_avatar_filename',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'other_avatar_filename',
    });

    expect(deleteFile).toHaveBeenCalledWith('any_avatar_filename');

    expect(user.avatar).toBe('other_avatar_filename');
  });
});
