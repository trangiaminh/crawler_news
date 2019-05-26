module.exports = [
  {
    class: 'CsvWriter',
    options: {
      filePath: "output/data.csv",
      overwrite: false,
      header: "URL,Title,Author,Date"
    }
  }
];
