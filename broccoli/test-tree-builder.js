var funnel = require('broccoli-funnel');
var es6 = require('broccoli-babel-transpiler');
var concat = require('broccoli-concat');
var merge = require('broccoli-merge-trees');
var jsHintBuilder = require('./jshint-tree-builder');
var amdLoader = require('broccoli-amd-loader');
var testIndexBuilder = require('./test-index');

var path = require('path');

function qunitTree() {
  var qunitDir = path.dirname(require.resolve('qunitjs'));

  return funnel(qunitDir, {
    include: [
      'qunit.js',
      'qunit.css',
    ],
    destDir: '/tests/qunit'
  });
}

function emberCLITestLoaderTree() {
  var testLoaderPath = path.join(__dirname, '..', 'ext');
  return funnel(testLoaderPath, {
    include: [ 'test-loader.js' ],
    destDir: '/tests/test-loader/'
  });
}

function buildTestTree(options) {
  if (!options) { options = {}; }

  var libDirName = options.libDirName || 'lib';

  var testJSTree = funnel('./tests', {
    include: ['**/*.js'],
    destDir: '/tests'
  });

  testJSTree = es6(testJSTree, {
    moduleIds: true,
    modules: 'amdStrict'
  });

  testJSTree = merge([testJSTree, jsHintBuilder.build(libDirName)]);

  testJSTree = concat(testJSTree, {
    inputFiles: ['**/*.js'],
    outputFile: '/tests/built-amd-tests.js'
  });

  var testExtTree = merge([
    qunitTree(),
    emberCLITestLoaderTree()
  ]);

  var testHTMLTree = testIndexBuilder.build('/tests');

  var testTree = merge([
    testJSTree,
    testExtTree,
    testHTMLTree
  ]);
  testTree = amdLoader(testTree, {
    destDir: '/tests/loader.js'
  });

  return testTree;
}

module.exports = {
  build: buildTestTree
};
