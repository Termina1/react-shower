#!/usr/bin/env node
var path = require('path');
global.workingPath = process.cwd();
process.chdir(path.join(__dirname, '..'));
require('../server.dev.js');
