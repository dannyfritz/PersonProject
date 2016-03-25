var _ = require('lodash');
var getInputs = require('./getInputs');

module.exports = function (context, task, answers) {
  if (_.isUndefined(task.mappings)) {
    throw new Error("Mapping operation requires a mapping defined on the task.");
  }
  var mappings = task.mappings;
  var inputs = getInputs(task.inputs, context, answers);
  _.forEach(inputs, function (value, key) {
    if (_.isUndefined(task.mappings[value])) {
      throw new Error("Mapping for value, " + value + ", is not accounted for.")
    }
    context[key] = task.mappings[value];
  })
}
