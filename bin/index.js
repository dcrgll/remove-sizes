#! /usr/bin/env node

const {run: jscodeshift} = require('jscodeshift/src/Runner')

const transformPath = require.resolve('../transforms/sizes.js')

const paths = process.argv.slice(2)

options= {
  cpus: 1,
  dry: false
}

const res = jscodeshift(transformPath, paths, options)
console.log(res)
