var _ = require('lodash');

module.exports = function(inputs){
  var sum = _.reduce(inputs, function(acc, val, key){
    return acc + (val * 1);
  }, 0);

  return sum / _.size(inputs);
};
