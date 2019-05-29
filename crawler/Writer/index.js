const _ = require('lodash');
const writersConfig = require('./writers.config');

class Writer {
  static getAllWriters() {
    if (_.isEmpty(writersConfig)) {
      throw {message: `Doesn't have any writer config.`};
    }

    const result = _.reduce(writersConfig, (array, writerConfig) => {
      try {
        const WriterClass = require(`./${writerConfig.class}`);
        if (!WriterClass) {
          console.log(`Doesn't find class ${writerConfig.class}`);
          return array;
        }

        array.push(new WriterClass(writerConfig.options));
      } catch (error) {
        console.error(`Doesn't find class ${writerConfig.class}`, error);
      }
      return array;
    }, []);

    if (_.isEmpty(result)) {
      throw {message: `Doesn't have any writer.`};
    }
    return result;
  };
}

module.exports = Writer;
