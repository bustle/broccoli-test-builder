# broccoli-test-builder

A broccoli plugin to build a tree that includes everything necessary to run tests.

Uses broccoli-lint-eslint to run jshint over the src code and test code.

Builds test files into amd modules and concats them into `tests/built-amd-tests.js`

Transpiles test files from es6 into es5.

Includes an amd loader, qunit.js, qunit.css, and a test-loader. Bring your own `tests/index.html`.

Assumes:

  * source code is in `lib/` (if not, specify a different path with `options.libDirName`)
  * source code is in es6 format, suitable for transpiling with babel
  * test code is in `tests/`
  * an `index.html` exists in `tests/`

Usage:

```
var testBuilder = require('broccoli-test-builder');

var options = {
  libDirName: 'path-to-your-lib-dir', // default: 'lib'
};
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

This is intended to be used with a test `index.html` that looks like the following.
The capitalized variable markers will be replaced with the correct output.
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>YOUR TEST TITLE</title>

  @@QUNIT_CSS
</head>
<body>

  @@QUNIT_DOM

  @@QUNIT_JS

  <script src="/testem.js"></script>

  @@LOADER_JS
  <script src="../amd/YOUR-BUILT-AMD-CODE.js"></script>

  @@AMD_TEST_JS
  @@TEST_LOADER_JS
</body>
</html>
```
