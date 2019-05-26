const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class Utils {
  static createFolder(strPath) {
    const {dir} = path.parse(strPath);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  };
}

module.exports = Utils;
