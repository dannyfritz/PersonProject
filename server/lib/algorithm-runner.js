var operations = require('./operations');

//TODO (danny): Complete this
module.exports = function (algorithm, answers) {
  var context = algorithm.tasks.reduce(function (context, task) {
    context[task.id] = -100
    return context
  }, {})
  if (!context.result) {
    throw new Error('Error calculating algorithm result\nThere must be an id of result on the survey version\'s algorithm tasks')
  }
  return context.result;
};
