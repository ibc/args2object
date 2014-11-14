module.exports = args2object;


function args2object(object, options) {
  if (! object) {
    throw new Error('must provide something as first argument');
  }

  options = options || { failOnNotFound: false };

  return function() {
    if (typeof arguments[0] === 'undefined') {
      throw new Error('must provide at least one argument');
    }

    var item = object[arguments[0]];

    try {
      for (var i=1, len=arguments.length; i<len; i++) {
        item = item[arguments[i]];
      }
    }
    catch(e) {
      if (options.failOnNotFound) {
        throw new Error(arguments2string(arguments) + ' not found (' + e + ')');
      }
      else {
        return undefined;
      }
    }

    if (typeof item === 'undefined' && options.failOnNotFound) {
      throw new Error(arguments2string(arguments) + ' not found');
    }
    else {
      return item;
    }
  };
}


function arguments2string(args) {
  var str = 'object';

  for (var i=0, len=args.length; i<len; i++) {
    str += '[' + args[i] + ']';
  }
  return str;
}
