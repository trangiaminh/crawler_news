# Crawler news
Crawler news: VNExpress, TuoiTre, TheSaiGonTime, ... to csv

#### Installation:
- Nodejs >= v8.12, [Download](https://nodejs.org/en/download/)
- `npm install`

#### Config:
- Add news config in **"crawler/Parser/parser.config.js"**
```javascript
newsConfigs: [
  ...,
  { // add a config for 'www.thesaigontimes.vn'
    host: 'www.thesaigontimes.vn',
    title: {
      selectors: ['h1>span.Title'] // first selector match in array
    },
    author: {
      selectors: ['span.ReferenceSourceTG'],
      normalize: Normalizer.normalizeAuthorFn()
    },
    date: {
      selectors: ['span.Date'],
      normalize: Normalizer.normalizeDateFn('DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm'), // 'DD/MM/YYYY HH:mm' -> 'YYYY-MM-DD HH:mm'
    },
    links: {
      selectors: ['#ctl00_cphContent_Article_LienQuan div.Item1 a'], // all selectors in array
      normalize: Normalizer.normalizeLinkFn('https://www.thesaigontimes.vn'), // baseUrl: 'https://www.thesaigontimes.vn'
    }
  }
]
```
- Create a new writer class and declare it in **"crawler/Writer/writers.config.js"** to use
```javascript
// Create a class CsvWriter
class CsvWriter {
  constructor(options) {
    //...
  }
  
  write(items) {
    // ...
  }
}

// config in "crawler/Writer/writers.config.js"
[
  ...,
  {
    class: 'CsvWriter', // className
    options: { // options in constructor of class
      filePath: "output/data.csv",
      overwrite: false,
      header: "URL,Title,Author,Date"
    }
  }
]
```

#### Usage:
`node index.js [url] [url] ...`

#### Examples:
`node index.js https://www.thesaigontimes.vn/121624/Cuoc-cach-mang-dau-khi-da-phien.html https://vnexpress.net/khoa-hoc/phan-mem-tim-thuoc-bao-ve-thuc-vat-tren-dien-thoai-3925258.html`
