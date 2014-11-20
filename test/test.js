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
  },
  f: undefined,
  g: null,
  undefined: 666,
  null: {
    true: 1,
    false: -1,
    null: 0,
    undefined: -1000
  },
  0: {
    0: '0'
  },
  1: '1',
};


module.exports = {
  'validate input': function(test) {
    test.throws(function() { args2object(); });
    test.throws(function() { args2object(false); });

    test.done();
  },

  'existing items': function(test) {
    var getter = args2object(object);

    test.deepEqual(object, getter());
    test.strictEqual(true, getter('a'));
    test.strictEqual(false, getter('b'));
    test.strictEqual('hello', getter('c'));
    test.deepEqual({d1:'foo', d2:[1,2,3,4]}, getter('d'));
    test.strictEqual('foo', getter('d','d1'));
    test.deepEqual([1,2,3,4], getter('d','d2'));
    test.strictEqual('here', getter('e','e1','e2','e3','e4'));
    test.strictEqual(undefined, getter('f'));
    test.strictEqual(null, getter('g'));
    test.strictEqual(666, getter(undefined));
    test.strictEqual(1, getter(null,true));
    test.strictEqual(-1, getter(null,false));
    test.strictEqual(0, getter(null,null));
    test.strictEqual(-1000, getter(null,undefined));
    test.strictEqual('0', getter(0,0));
    test.strictEqual('0', getter('0','0'));
    test.strictEqual('1', getter(1));
    test.strictEqual('1', getter('1'));

    test.done();
  },

  'do not fail on not found': function(test) {
    var getter = args2object(object);

    test.strictEqual(undefined, getter('a','a1'));
    test.strictEqual(undefined, getter('f'));
    test.strictEqual(undefined, getter('f','f1','f2'));
    test.strictEqual(undefined, getter('h'));
    test.strictEqual(undefined, getter('g','g1'));
    test.strictEqual(undefined, getter(null,null,null));
    test.strictEqual(undefined, getter(0,1));
    test.strictEqual(undefined, getter('0','1'));
    test.strictEqual(undefined, getter(2));
    test.strictEqual(undefined, getter('2'));

    test.done();
  },

  'fail on not found': function(test) {
    var getter = args2object(object, {failOnNotFound: true});

    test.throws(function() { getter('a','a1'); });
    test.doesNotThrow(function() { getter('f'); });
    test.throws(function() { getter('f','f1','f2'); });
    test.doesNotThrow(function() { getter('g'); });
    test.throws(function() { getter('h'); });
    test.throws(function() { getter(null,null,null); });
    test.throws(function() { getter(0,1); });
    test.throws(function() { getter('0','1'); });
    test.throws(function() { getter(2); });
    test.throws(function() { getter('2'); });

    test.done();
  }
};
