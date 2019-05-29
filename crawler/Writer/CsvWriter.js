const fs = require('fs');
const _ = require('lodash');
const Utils = require('../Utils');

const normalize = (value) => {
  if (_.isNil(value)) {
    return '';
  }
  if (!_.isString(value)) {
    return value;
  }
  return _.replace(value, new RegExp('"', "g"), '""');
};

const buildTemplate = (header) => {
  return _.template(
    _.map(header.split(','), (col) => `"<%= fn.normalize(${_.toLower(col)}) %>"`).join(','),
    {imports: {fn: {normalize}}}
  );
};

class CsvWriter {
  constructor({filePath, overwrite = false, header}) {
    this.type = 'CSV';
    this.csvPath = filePath;
    this.header = header;

    if (!fs.existsSync(this.csvPath)) {
      Utils.createFolder(this.csvPath);
      fs.writeFileSync(this.csvPath, this.header + '\n');
    } else if (overwrite) {
      fs.writeFileSync(this.csvPath, this.header + '\n');
    }

    this.template = buildTemplate(this.header);
  }

  write(items) {
    if (!_.isEmpty(items)) {
      const str = _.map(items, (item) => this.template(item)).join('\n') + '\n';
      return new Promise((resolve) => {
        fs.appendFile(this.csvPath, str, (err) => {
          if (err) {
            console.error(`Error when write ${str} to ${this.type}`, error);
            return resolve({status: false});
          }
          resolve({status: true});
        });
      });
    }
    return Promise.resolve({status: true});
  }
}

module.exports = CsvWriter;
