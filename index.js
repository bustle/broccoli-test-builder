var testTreeBuilder = require('./broccoli/test-tree-builder');

module.exports = {
  build: function build(options) {
    return testTreeBuilder.build(options);
  }
};
