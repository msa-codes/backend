import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: 'non_existing_user',
        avatarFilename: 'any_avatar_filename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
