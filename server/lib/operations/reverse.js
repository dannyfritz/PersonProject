var _ = require('lodash');
var mapping = require('./mapping')

module.exports = function(context, task, answers){
  var min = task.min || 1;
  if (_.isUndefined(task.max)) {
    throw new Error("Reverse operation requires a max set on the task");
  }
  var max = task.max;
  task.mappings = {}
  for (var i=min; i<=max; i++) {
    task.mappings[max-i+1] = i;
  }
  mapping(context, task, answers)
};
