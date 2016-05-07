#!/usr/bin/env node
var path = require('path');
var exec = require('child_process').exec;

var cmd = process.argv.slice(-1)[0]
switch (cmd) {
  case "build":
    var stream = exec("node_modules/.bin/webpack --config webpack.prod.config.js --progress --colors -p && cp -R js/utils build/js");
    stream.stdout.pipe(process.stdout);
    stream.stderr.pipe(process.stderr);
    break;
  default:
    require('../server.dev.js');
    break;
}
