import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const user2 = await fakeUserRepository.create({
      name: 'other_name',
      email: 'other_email@email.com',
      password: 'other_password',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'loggedUser_name',
      email: 'loggedUser_email@email.com',
      password: 'loggedUser_password',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
