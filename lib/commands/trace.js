
'use strict';

var ServeCommand = require('ember-cli/lib/commands/serve');
var childProcess = require('child_process');

module.exports = ServeCommand.extend({
  name: "trace",
  description: 'Run a performance trace',
  works: 'insideProject',

  /**
   * Options for tracing.
   *  --save: save the run
   *  --save-dest: where to save the output
   *  --save-script: processing of the script
   *  
   *  chrome-tracing params:
   *  --tracing-initializer: which tracing initializer to run
   *  --tracing-script: which tracing benchmark to run
   *
   * Later:
   *  --path: path to a build to use instead of building every the time
   * @type {Array}
   */
  availableOptions: [
    { name: 'save',       type: Boolean,                 description: 'Run the tracing script' },
    { name: 'save-dest',  type: String,                  description: 'the location to save the file to' }
  ].concat(ServeCommand.prototype.availableOptions),

  

  run: function() {
    //TODO: figure out how to get this to run once the serve
    //has started and/or get the serve to return a thenable promise
    //and/or make the command options available in the build hooks
    
    //spawn the chrome-tracing script
    //pass the options
    return this._super.run.apply(this, arguments);
  }
});