import logger from '../config/winston';
var path = require('path');
import fsExtra from 'fs-extra';

interface Utils {
  echoLog: (...args: any[]) => void;
  uploadFile: (file: FileObject, dest: string) => Promise<string>;
}

interface FileObject {
  path: string;
}

// Helper functions
const utils: Utils = {
  // Log to a file via winston
  echoLog: (...args) => {
    if (process.env.SHOW_LOG === 'true') {
      try {
        logger.info(args);
      } catch (e) {
        logger.log(e);
      }
    }
  },

  // Upload file helper
  uploadFile: async (file: FileObject, dest: string): Promise<string> => {
    if (file) {
      const fileName = new Date().getTime() + path.extname(file.path);

      let filepath = file.path;
      let newpath = `${global.__basedir}/uploads/${dest}/`;

      await fsExtra.ensureDir(newpath);
      newpath += fileName;

      await fsExtra.move(filepath, newpath, { overwrite: true });

      return fileName;
    }
    return null;
  },
};

export default utils;
