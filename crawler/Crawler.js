const _ = require('lodash');
const axios = require('axios/index');

const Parser = require('./Parser');
const Writer = require('./Writer');

class Crawler {
  constructor() {
    this._urls = {};
    this._writers = Writer.getAllWriters();
    this._axios = axios.create({
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;',
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      }
    });
  }

  async _crawl(url) {
    if (!this._urls[url]) {
      this._urls[url] = true;
      try {
        let {data} = await this._axios({
          method: 'get',
          url,
        });
        if (!_.isEmpty(data)) {
          const item = Parser.parse(url, data);
          await Promise.all(
            _.map(this._writers,
              (writer) => writer.write([item]))
          );

          console.log('Crawl successfully ' + url, JSON.stringify(item));
          return this.crawl(item.links);
        }
      } catch (error) {
        console.error(`Error when _crawl ${url}`, error);
      }
    }
  };

  async crawl(urls) {
    if (_.isArray(urls)) {
      urls = _.reduce(urls, (array, url) => {
        if (_.isString(url)) {
          url = url.trim();
          !_.isEmpty(url) && array.push(url);
        }
        return array;
      }, []);

      if (!_.isEmpty(urls)) {
        await Promise.all(
          _.map(urls, url => this._crawl(url))
        )
      }
    }
  }
}

module.exports = Crawler;
