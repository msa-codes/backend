import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import User from '../infra/typeorm/entities/User';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to create a new user with the same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_email',
    });

    expect(
      createUser.execute({
        name: 'any_name',
        email: 'any_email',
        password: 'any_email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
