import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokensRepository {
  private usersRepository: Repository<UserToken>;

  constructor() {
    this.usersRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.usersRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.usersRepository.create({
      user_id,
    });

    await this.usersRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
