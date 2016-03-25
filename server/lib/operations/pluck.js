var _ = require('lodash');
var getInputs = require('./getInputs');

module.exports = function (context, task, answers) {
  if (_.isUndefined(task.output)) {
    throw new Error("Pluck operation requires an output.")
  }
  var output = task.output;
  var inputs = getInputs(task.inputs, context, answers);
  context[output] = _.reduce(inputs, function (result, value, key) {
    result[key] = value;
    return result;
  }, {})
}
