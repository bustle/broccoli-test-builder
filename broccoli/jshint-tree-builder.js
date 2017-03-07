/* jshint node:true */
var JSHinter = require('broccoli-jshint');
var Funnel = require('broccoli-funnel');
var Concat = require('broccoli-concat');
var Merge = require('broccoli-merge-trees');

function buildJSHint(libDirName) {
  var tree = new Merge([new Funnel(libDirName, {
    include: ['**/*.js'],
    destDir: '/tests/jshint'
  }), new Funnel('./tests', {
    include: ['**/*.js'],
    destDir: '/tests/jshint'
  })]);

  tree = new JSHinter(tree, {
    jshintrcPath: 'tests/.jshintrc',
    log: true
  });
  tree = new Concat(tree, {
    inputFiles: ['tests/jshint/**/*.js'],
    outputFile: '/tests/jshint-test.js'
  });

  return tree;
}

module.exports = {
  build: buildJSHint
};
