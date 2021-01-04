import { container } from 'tsyringe';

import IStorageProivder from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProivder>(
  'DiskStorage',
  DiskStorageProvider,
);
