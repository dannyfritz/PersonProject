var _ = require('lodash');
var operations = require('./operations');

module.exports = function (algorithm, answers) {
  var context = algorithm.tasks.reduce(function (context, task) {
    if (!_.includes(_.keys(operations), task.operation)) {
      throw new Error('Trying to use algorithm operation, "' + task.operation + '", that does not exist!')
    }
    //INFO (danny): inputs can either come from Answers or Context
    var inputs = getInputs(task.targets, context, answers);
    //INFO (danny): When done calculating a task, store the output in context keyed by task id
    context[task.id] = operations[task.operation](inputs);
    console.log(task, context)
    return context
  }, {})
  //INFO (danny): There must be a task with the id "result" in the algorithm
  if (!context.result) {
    throw new Error('Error calculating algorithm result\nThere must be an id of result on the survey version\'s algorithm tasks')
  }
  return context.result;
};

function getInputs (targets, context, answers) {
  var inputs = targets.map(function (target) {
    if (context[target]) {
      return context[target];
    } else if (answers[target]) {
      return answers[target];
    }
    throw new Error('Target, "' + target + '", missing from Algorithm.')
  });
  return inputs;
}
