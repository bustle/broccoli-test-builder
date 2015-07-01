# broccoli-test-builder

A broccoli plugin to build a tree that includes everything necessary to run tests.

Uses broccoli-jshint to run jshint over the src code and test code.

Builds test files into amd modules and concats them into `tests/built-amd-tests.js`

Transpiles test files from es6 into es5.

Includes an amd loader, qunit.js, qunit.css, and a test-loader. Bring your own `tests/index.html`.

Assumes:

  * source code is in `/src`
  * source code is in es6 format, suitable for transpiling with babel
  * test code is in `/tests`
  * an `index.html` exists in `tests/`

Usage:

```
var testBuilder = require('broccoli-test-builder');

var testTree = testBuilder.build();

/*
 testTree looks like:
/tests
├── built-amd-tests.js
├── index.html
├── loader.js
│   └── loader.js
├── qunit
│   ├── qunit.css
│   └── qunit.js
└── test-loader
    └── test-loader.js
*/
```

This is intended to be used with a test `index.html` that looks like:
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Tests</title>
  <link rel="stylesheet" href="./qunit/qunit.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  
  <script src="./qunit/qunit.js"></script>
  <script src="/testem.js"></script>
  <script src="./loader.js/loader.js"></script>

  <script src="../amd/content-kit-utils.js"></script>
  <script src="./built-amd-tests.js"></script>
  <script src="./test-loader/test-loader.js"></script>
  <script>
    var TestLoader = require('ember-cli/test-loader')['default'];
    var testLoader = new TestLoader();
    testLoader.loadModules();
  </script>
</body>
</html>
```
