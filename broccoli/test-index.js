var Funnel = require('broccoli-funnel');
var Replace = require('broccoli-replace');

var patterns = [
  {
    match: 'QUNIT_CSS',
    replacement: '<link rel="stylesheet" href="./qunit/qunit.css">'
  },
  {
    match: 'QUNIT_DOM',
    replacement: '<div id="qunit"></div><div id="qunit-fixture"></div>'
  },
  {
    match: 'QUNIT_JS',
    replacement: '<script src="./qunit/qunit.js"></script>'
  },
  {
    match: 'LOADER_JS',
    replacement: '<script src="./loader.js/loader.js"></script>'
  },
  {
    match: 'AMD_TEST_JS',
    replacement: '<script src="./built-amd-tests.js"></script>'
  },
  {
    match: 'TEST_LOADER_JS',
    replacement: '<script src="./test-loader/test-loader.js"></script>\n' +
      '<script>var TestLoader = require("ember-cli/test-loader")["default"]; new TestLoader().loadModules();</script>'
  }
];

module.exports = {
  build: function(destDir) {
    if (!destDir) { destDir = '/tests'; }

    var tree = new Replace('./tests', {
      files: ['index.html'],
      patterns: patterns
    });

    tree = new Funnel(tree, {
      include: ['index.html'],
      destDir: destDir
    });

    return tree;
  }
};
