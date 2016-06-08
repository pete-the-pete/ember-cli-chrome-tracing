
'use strict';

var ServeCommand = require('ember-cli/lib/commands/serve');

module.exports = ServeCommand.extend({
  name: "trace",
  description: 'Run a performance trace',
  works: 'insideProject',

  /**
   * Options for tracing.
   *  --benchmark: user specified script
   *
   * Later:
   *  --path: path to a build to use instead of building every the time
   * @type {Array}
   */
  availableOptions: [
    { name: 'benchmark', type: String, required: true, description: '(Required) which benchmark to run'}
  ].concat(ServeCommand.prototype.availableOptions),


  run: function(commandArgs) {
    //TODO:
    // - benchmark needs to not be an empty string
    this.project._benchmark = commandArgs.benchmark;

    //start the server
    return this._super.run.apply(this, arguments);
  }
});
