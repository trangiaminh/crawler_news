const moment = require('moment');
const _ = require('lodash');

class Normalizer {
  static trimString(strValue, defaultValue = '') {
    if (_.isNil(strValue)) {
      return defaultValue;
    }
    return strValue.trim();
  }

  static normalizeAuthorFn() {
    return function (author) {
      author = Normalizer.trimString(author);
      return author.replace(' (*)', '');
    }
  }

  static normalizeDateFn(parseDateFormat = 'DD/MM/YYYY',
                         dateFormat = 'YYYY-MM-DD HH:mm',
                         locale = 'vi') {
    return function (strDate) {
      strDate = Normalizer.trimString(strDate);
      if (!strDate) {
        return strDate;
      }

      moment.locale(locale);
      return moment(strDate, parseDateFormat).format(dateFormat);
    }
  };

  static normalizeLinkFn(baseUrl) {
    const removeHash = (url) => {
      const index = url.lastIndexOf('#');
      if (index > -1) {
        return url.substr(0, index);
      }
      return url;
    };
    const addBaseUrlIfNeed = (url) => {
      if (!_.isEmpty(url) && url.indexOf(baseUrl) < 0) {
        return baseUrl + url;
      }
      return url;
    };

    return _.flow([Normalizer.trimString, removeHash, addBaseUrlIfNeed]);
  };
}

module.exports = Normalizer;
