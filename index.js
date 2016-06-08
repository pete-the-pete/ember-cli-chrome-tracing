/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-chrome-tracing',
  config: function(env, baseConfig) {
    this.modulePrefix = baseConfig.modulePrefix;
    return this._super.config.apply(this, arguments);
  },

  isDevelopingAddon: function() { return true; },
  includedCommands: function() {
    return require('./lib/commands');
  },

  preprocessTree: function(type, tree) {
    var self = this;
    var benchmark = this.project._benchmark;
    var benchmarkInitializerPath = new RegExp('initializers/' + benchmark + '.js$');

    var Funnel = require('broccoli-funnel');
    return new Funnel(tree, {
      getDestinationPath: function(relativePath) {
        if(relativePath.match(benchmarkInitializerPath)) {
          self.benchmarkScript = tree.outputPath + '/' + self.modulePrefix + '/lib/chrome-tracing/benchmarks/' + benchmark + '.js';
          return relativePath.replace('lib/chrome-tracing/', '');
        }
        return relativePath;
      }
    });
  },

  outputReady: function(result) {
    //start the script after some delay
    //TODO:
    //  - probably don't respawn on rebuild
    //  - make sure the node process didn't fail
    var childProcess = require('child_process');
    console.log(childProcess.spawn('node', [this.benchmarkScript]));
  }
};
