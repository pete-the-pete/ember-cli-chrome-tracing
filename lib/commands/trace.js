/* eslint-env node */
'use strict';

var Command = require('ember-cli/lib/models/command');
var ServeCommand = require('ember-cli/lib/commands/serve');

module.exports = Command.extend({
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


  run: function(commandOptions) {
    //TODO:
    // - benchmark needs to not be an empty string
    this.project._tracing = true;
    this.project._benchmark = commandOptions.benchmark;

    //start the server, disable liveReload
    commandOptions.environment = 'production';
    return new ServeCommand({
      ui:        this.ui,
      analytics: this.analytics,
      commands:  this.commands,
      tasks:     this.tasks,
      project:   this.project,
      settings:  this.settings,
      testing:   this.testing,
      cli: this
    }).run(commandOptions);
  }
});
