/**
 * Dependencies.
 */
var checkOwnProperty = Object.prototype.hasOwnProperty;


/**
 * Expose the args2object function.
 */
module.exports = args2object;


function args2object(object, options) {
  if (! object) {
    throw new Error('must provide something as first argument');
  }

  options = options || { failOnNotFound: false };

  return function() {
    var item = object;

    for (var i=0, len=arguments.length; i<len; i++) {
      var property = arguments[i];

      if (item !== undefined && item !== null && checkOwnProperty.call(item, property)) {
        item = item[property];
      }
      else if (options.failOnNotFound) {
        throw new Error(arguments2string(arguments) + ' not found');
      }
      else {
        return undefined;
      }
    }

    return item;
  };
}


function arguments2string(args) {
  var str = 'object';

  for (var i=0, len=args.length; i<len; i++) {
    str += '[' + args[i] + ']';
  }
  return str;
}
