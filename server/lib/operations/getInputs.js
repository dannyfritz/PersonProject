module.exports = function getInputs (inputs, context, answers) {
  var result = inputs.reduce(function (result, key) {
    if (context[key]) {
      result[key] = context[key];
      return result;
    } else if (answers[key]) {
      result[key] = answers[key];
      return result;
    }
    throw new Error('Target, "' + target + '", missing from Algorithm.')
  }, {});
  return result;
}
