import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(tmpFolder, 'uploads');

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2',
    },
  },
} as IUploadConfig;
