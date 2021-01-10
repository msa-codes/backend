import Notification from '../infra/typeorm/schemas/Notification';
import ICreateNotififcationDTO from '../dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(data: ICreateNotififcationDTO): Promise<Notification>;
}
