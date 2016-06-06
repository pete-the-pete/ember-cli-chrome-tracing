/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-performance-tracing',
  isDevelopingAddon: function() { return true; },
  includedCommands: function() {
    return require('./lib/commands');
  },

  outputReady: function(result) {
    debugger;
  }
};
