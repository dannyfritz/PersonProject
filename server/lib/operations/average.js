var _ = require('lodash');
var getInputs = require('./getInputs');

module.exports = function(context, task, answers){
  var inputs = getInputs(task.inputs, context, answers)
  var sum = _.reduce(inputs, function(acc, val, key){
    return acc + (val * 1);
  }, 0);
  if (_.size(inputs) === 0) {
    throw new Error("Cannot calculate the average of 0 items.")
  }
  if (_.isEmpty(task.output)) {
    throw new Error("Average operation requires an output property to be set.")
  }
  context[task.output] = sum / _.size(inputs);
};
