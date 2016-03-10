var _ = require('lodash');

module.exports = function(answers){
  var sum = _.reduce(answers, function(acc, val, key){
    return acc + (val * 1);
  }, 0);

  return sum / Object.keys(answers).length;
};
