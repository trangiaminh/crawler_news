const Normalizer = require('./Normalizer');
const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const VI_FULL_DATE_FORMAT = 'dddd, DD/MM/YYYY, HH:mm';

module.exports = {
  newsConfigs: [
    {
      host: 'vnexpress.net',
      title: {
        selectors: [
          'h1.title_news_detail'
        ],
      },
      author: {
        selectors: [
          'p.author_mail>strong',
          'article p:last-child>strong'
        ],
        normalize: Normalizer.normalizeAuthorFn()
      },
      date: {
        selectors: [
          'span.time.left'
        ],
        normalize: Normalizer.normalizeDateFn(VI_FULL_DATE_FORMAT, DATE_FORMAT),
      },
      links: {
        selectors: [
          'ul.list_title h4>a:not(.icon_commend)'
        ],
        normalize: Normalizer.normalizeLinkFn('https://vnexpress.net'),
      }
    },
    {
      host: 'www.thesaigontimes.vn',
      title: {
        selectors: [
          'h1>span.Title'
        ]
      },
      author: {
        selectors: [
          'span.ReferenceSourceTG'
        ],
        normalize: Normalizer.normalizeAuthorFn()
      },
      date: {
        selectors: [
          'span.Date'
        ],
        normalize: Normalizer.normalizeDateFn(VI_FULL_DATE_FORMAT, DATE_FORMAT),
      },
      links: {
        selectors: [
          '#ctl00_cphContent_Article_LienQuan div.Item1 a'
        ],
        normalize: Normalizer.normalizeLinkFn('https://www.thesaigontimes.vn'),
      }
    }
  ]
};
