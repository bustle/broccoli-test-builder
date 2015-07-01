/* jshint node:true */
var jshint = require('broccoli-jshint');
var funnel = require('broccoli-funnel');
var concat = require('broccoli-concat');
var merge = require('broccoli-merge-trees');
//var stew = require('broccoli-stew');

function buildJSHint() {
  var tree = merge([funnel('./src', {
    include: ['**/*.js'],
    destDir: '/tests/jshint'
  }), funnel('./tests', {
    include: ['**/*.js'],
    destDir: '/tests/jshint'
  })]);

  tree = jshint(tree);
  tree = concat(tree, {
    inputFiles: ['tests/jshint/**/*.js'],
    outputFile: '/tests/jshint-test.js'
  });

  return tree;
}

module.exports = {
  build: buildJSHint
};
