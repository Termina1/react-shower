#!/usr/bin/env node
var path = require('path');
var exec = require('child_process').exec;

var cmd = process.argv[2]
switch (cmd) {
  case "build":
    var confpath = path.join(__dirname, "..", "webpack.prod.config.js");
    var utils = path.join(__dirname, "..", "js/utils");
    var utilsDest = path.join(process.cwd(), "build/js");
    var dest = process.argv[3];
    var stream = exec("node_modules/.bin/webpack --config " + confpath + "  --progress --colors -p && cp -R " + utils + " " + utilsDest, function(err) {
      console.log(err, dest);
      if (!err && dest) {
        exec('mv ./build ' + dest);
      }
    });
    stream.stdout.pipe(process.stdout);
    stream.stderr.pipe(process.stderr);
    break;
  default:
    require('../server.dev.js');
    break;
}
