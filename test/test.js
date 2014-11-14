var args2object = require('../');
var object = {
  a: true,
  b: false,
  c: 'hello',
  d: {
    d1: 'foo',
    d2: [1,2,3,4]
  },
  e: {
    e1: {
      e2: {
        e3: {
          e4: 'here'
        }
      }
    }
  }
};


module.exports = {
  'validate input': function(test) {
    test.throws(function() { args2object(); });
    test.throws(function() { args2object(false); });
    test.throws(function() {
      var getter = args2object(object);
      getter();
    });

    test.done();
  },

  'existing items': function(test) {
    var getter = args2object(object);

    test.strictEqual(true, getter('a'));
    test.strictEqual(false, getter('b'));
    test.strictEqual('hello', getter('c'));
    test.deepEqual({d1:'foo', d2:[1,2,3,4]}, getter('d'));
    test.strictEqual('foo', getter('d','d1'));
    test.deepEqual([1,2,3,4], getter('d','d2'));
    test.strictEqual('here', getter('e','e1','e2','e3','e4'));

    test.done();
  },

  'do not fail on not found': function(test) {
    var getter = args2object(object);

    test.strictEqual(undefined, getter('a','a1'));
    test.strictEqual(undefined, getter('f'));
    test.strictEqual(undefined, getter('f','f1','f2'));

    test.done();
  },

  'fail on not found': function(test) {
    var getter = args2object(object, {failOnNotFound: true});

    test.throws(function() { getter('a','a1'); });
    test.throws(function() { getter('f'); });
    test.throws(function() { getter('f','f1','f2'); });

    test.done();
  }
};
