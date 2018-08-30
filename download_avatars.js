const request = require('request');
// const secrets = require('./secrets.js');
const fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_TOKEN
    }
  };

  request(options, function (err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function (err, result) {
  if (process.argv.length !== 4) {
    console.log("Error: Must supply repo owner and repo name arguments");
  }

  let parsedResult = JSON.parse(result);

  for (let i = 0; i < parsedResult.length; i++) {
    downloadImageByURL(parsedResult[i]['avatar_url'], `./avatars/${parsedResult[i].login}.jpg`);
  }
});