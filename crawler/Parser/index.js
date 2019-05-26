const _ = require('lodash');
const cheerio = require('cheerio');
const Normalizer = require('./Normalizer');
const parserConfig = require('./parser.config');

const extractText = ($, {selectors, normalize = Normalizer.trimString}) => {
  let result = '';
  _.find(selectors, (selector) => {
    result = normalize($(selector).text());
    return !_.isEmpty(result);
  });

  return result;
};

const extractLinks = ($, {selectors, normalize = Normalizer.trimString}) => {
  return _.reduce(selectors, (array, selector) => {
    $(selector).each(function (i, el) {
      let href = normalize($(el).attr('href'));
      !_.isEmpty(href) && array.push(href);
    });
    return array;
  }, []);
};

class Parser {
  static parse(url, strResponse, config = parserConfig) {
    const {newsConfigs} = config;
    const parseNewsConfig = _.find(newsConfigs, ({host}) => url.indexOf(host) >= 0);
    if (!parseNewsConfig) {
      throw {message: `Doesn't have any parser news config for ${url}.`};
    }

    const $ = cheerio.load(strResponse);
    return {
      url: url,
      title: extractText($, parseNewsConfig.title),
      author: extractText($, parseNewsConfig.author),
      date: extractText($, parseNewsConfig.date),
      links: extractLinks($, parseNewsConfig.links),
    }
  };
}

module.exports = Parser;
