!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.args2object=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});