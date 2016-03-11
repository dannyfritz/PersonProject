var _ = require('lodash');
var operations = require('./operations');
var getInputs = require('./operations/getInputs');

module.exports = function (algorithm, answers) {
  var context = algorithm.tasks.reduce(function (context, task) {
    if (!_.includes(_.keys(operations), task.operation)) {
      throw new Error('Trying to use algorithm operation, "' + task.operation + '", that does not exist!');
    }
    operations[task.operation](context, task, answers);
    console.log(task);
    console.log(context);
    return context;
  }, {});
  if (!context.result) {
    throw new Error('Error calculating algorithm result\nThere must be an output of "result" on the survey version\'s algorithm tasks');
  }
  return context.result;
};
