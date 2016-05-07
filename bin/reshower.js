#!/usr/bin/env node
var path = require('path');
global.workingPath = process.cwd();

require('../server.dev.js');
