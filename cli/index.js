#!/usr/bin/env node

const chalk = require('chalk')
const prompt = require('./generator/prompt')

console.log(chalk.yellow(`
  ///////////////////////////////////////////////
  /// ol-kit an open source mapping framework ///
  ///////////////////////////////////////////////\n`))


prompt.getAppName()
  .then(prompt.getProjectDirectoryName)
  .then(prompt.finish)
