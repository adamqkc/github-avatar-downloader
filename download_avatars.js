var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (err, res, body) {
    cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function (err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", JSON.parse(result)[29]);
  var parsedResult = JSON.parse(result);

  for (var i = 0; i < parsedResult.length; i++) {
    console.log(parsedResult[i]['avatar_url']);
  }

});

// https://api.github.com/repos/jquery/jquery/contributors
