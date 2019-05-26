if (process.argv.length < 3) {
  console.log('Usage: node index.js [url] [url] ...');
  console.log('Examples:');
  console.log('    node index.js https://www.thesaigontimes.vn/121624/Cuoc-cach-mang-dau-khi-da-phien.html https://vnexpress.net/khoa-hoc/phan-mem-tim-thuoc-bao-ve-thuc-vat-tren-dien-thoai-3925258.html');
  return;
}

const _ = require('lodash');
const Crawler = require('./crawler/Crawler');

const indexFileNameInArgv = _.findIndex(process.argv, (value) => value === __filename);
const urls = _.reduce(process.argv, (array, url, index) => {
  if (index > indexFileNameInArgv) {
    array.push(url);
  }
  return array;
}, []);
const crawler = new Crawler();

(async function () {
  await crawler.crawl(urls);
})();
