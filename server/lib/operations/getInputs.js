module.exports = function getInputs (targets, context, answers) {
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
