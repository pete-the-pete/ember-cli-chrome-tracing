/* eslint-env node */
'use strict';

/**
 * Ex command: ember trace --benchmark='initial-render'
 */
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

  /**
   * FYI hooks call order:
   *  includedCommands
   *  included
   *  treeFor
   *  preprocessTree
   *  postprocessTree
   *  lintTree
   *  preBuild
   *  serverMiddleware
   *  contentFor
   *  postBuild
   *  outputReady
   */
  preprocessTree: function(type, tree) {

    if(!this.project._tracing) {
      const stew = require('broccoli-stew');
      if (type === 'js') {
        return stew.rm(tree, 'lib/chrome-tracing');
      }
      return tree;
    } else {
      const benchmark = this.project._benchmark;
      const benchmarkInitializerPath = new RegExp('initializers/' + benchmark + '.js$');
      const Funnel = require('broccoli-funnel');

      return new Funnel(tree, {
        getDestinationPath: (relativePath) => {
          if(relativePath.match(benchmarkInitializerPath)) {
            this.benchmarkScript = tree.outputPath + '/' + this.modulePrefix + '/lib/chrome-tracing/benchmarks/' + benchmark + '.js';
            return relativePath.replace('lib/chrome-tracing/', '');
          }
          return relativePath;
        }
      });
    }
  },

  outputReady: function() {
    if(this.benchmarkScript) {
      //start the script after some delay
      //TODO:
      //  - probably don't respawn on rebuild
      //  - make sure the node process didn't fail
      const spawn = require('child_process').spawn;
      const childProcess = spawn('node', [this.benchmarkScript]);

      childProcess.stdout.on('data', (data) => {
        const _data = JSON.parse(data.toString());
        if(_data.meta) {
          const util = require('util');
          this.ui.write(util.inspect(_data, false, null));
        }
      });

      childProcess.stderr.on('data', (data) => {
        this.ui.writeLine(`benchmark error: ${data}`);
      });

      childProcess.on('close', (code) => {
        process.exit(code);
      });
    }
  }
};
