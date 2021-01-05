import { container } from 'tsyringe';

import IStorageProivder from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from '../providers/MailProvider/models/IMailProvider';
// import MailProvider from '../providers/MailProvider/implementations/'

container.registerSingleton<IStorageProivder>(
  'DiskStorage',
  DiskStorageProvider,
);
