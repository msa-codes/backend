import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: 'any_email',
        password: 'any_email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
