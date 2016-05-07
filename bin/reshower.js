#!/usr/bin/env node
var path = require('path');
var exec = require('child_process').exec;

var cmd = process.argv.slice(-1)[0]
switch (cmd) {
  case "build":
    var confpath = path.join(__dirname, "..", "webpack.prod.config.js");
    var utils = path.join(__dirname, "..", "js/utils");
    var utilsDest = path.join(process.cwd(), "build/js");
    var stream = exec("node_modules/.bin/webpack --config " + confpath + "  --progress --colors -p && cp -R " + utils + " " + utilsDest);
    stream.stdout.pipe(process.stdout);
    stream.stderr.pipe(process.stderr);
    break;
  default:
    require('../server.dev.js');
    break;
}
