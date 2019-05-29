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
    },
    {
      host: 'news.zing.vn',
      title: {
        selectors: [
          '.the-article-header .the-article-title',
          'div.video-info h2.video-title'
        ]
      },
      author: {
        selectors: [
          'div.the-article-credit p.author',
          'div.video-info p.video-author>strong'
        ],
        normalize: Normalizer.normalizeAuthorFn()
      },
      date: {
        selectors: [
          '.the-article-header .the-article-publish',
          'div.video-info span.publish'
        ],
        normalize: Normalizer.normalizeDateFn('HH:mm DD/MM/YYYY', DATE_FORMAT),
      },
      links: {
        selectors: [
          '.recommendation .article-item .article-title>a',
          '#video-mostview .article-item .article-title>a'
        ],
        normalize: Normalizer.normalizeLinkFn('https://news.zing.vn'),
      }
    },
    {
      host: 'tuoitre.vn',
      title: {
        selectors: [
          '#content h1.article-title'
        ]
      },
      author: {
        selectors: [
          '#content div.author'
        ],
        normalize: Normalizer.normalizeAuthorFn()
      },
      date: {
        selectors: [
          '#content div.date-time'
        ],
        normalize: Normalizer.normalizeDateFn('DD/MM/YYYY HH:mm', DATE_FORMAT),
      },
      links: {
        selectors: [
          'div.box-newsrelated .list-news div.name-title>a'
        ],
        normalize: Normalizer.normalizeLinkFn('https://tuoitre.vn'),
      }
    }
  ]
};
