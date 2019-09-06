const arrayDuplicates = require('./arrayDuplicates');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const getReport = (path) => {
  var fs = require('fs')
    , filename = path;
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('File OK: ' + filename);
    summarizeData(data);
  });
}

function groupArray(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

const summarizeData = (data) => {
  const result = data.split('\n');
  const url = [];
  const items = [];
  const pageViews = [];
  result.slice(1).map(line => {
    var obj = line.split('|');
    if(obj.length > 0) {
      var item = {
        url: obj[2],
        views: obj[2] + ' ' + obj[3]
      }
      url.push(item.url);
      pageViews.push(item.views);
      items.push(item);
    }
  });
  var urls = arrayDuplicates.getDuplicates(url);

  var sorted = {};
  for( var i = 0, max = items.length; i < max ; i++ ){
    if( sorted[items[i].url] == undefined ){
      sorted[items[i].url] = [];
    }
    sorted[items[i].url].push(items[i]);
  }

  console.log('|URL           |Page views   |Unique');
  urls.map(url => {
    url.pageViews = items.reduce((acc, cur) => cur.url === url.value ? ++acc : acc, 0);
    url.unique = [...new Set(sorted[url.value].map(item => item.views.split(' ')[2]))];
    console.log(url.value + '  ' + url.pageViews + '             ' + url.unique.length);
  });
  
}

readline.question(`Enter path to report: `, (path) => {
  getReport(path);
  readline.close();
});
