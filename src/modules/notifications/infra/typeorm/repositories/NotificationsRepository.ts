import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.ormRepository.create({
      content,
      recipient_id,
    });

    return notification;
  }
}

export default NotificationsRepository;
