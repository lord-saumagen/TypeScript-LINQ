var TS_Linq_Enumerator_Test;
(function (TS_Linq_Enumerator_Test) {
  "use strict";
  QUnit.module("TS.Linq.Enumerator (plain js)", {
    before: function () {
      // runs once before anything else in the module
    },
    beforeEach: function () {
      // prepare something for all following tests
    },
    afterEach: function () {
      // clean up after each test
    },
    after: function () {
      // runs once after all unit tests finished (including teardown)
      //personEnumerable = null;
    }
  });

  QUnit.test("constructor (plain js)", (assert) => {
    let enumeratorObj;
    let faileGenerator = () => number;

    assert.throws(() => {
      enumeratorObj = new TS.Linq.Enumerator();
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called without an argument.");

    assert.throws(() => {
      enumeratorObj = new TS.Linq.Enumerator(faileGenerator);
    }, TS.InvalidInvocationException, "The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'generator' argument.");

    assert.throws(() => {
      enumeratorObj = new TS.Linq.Enumerator({});
    }, TS.InvalidInvocationException, "The constructor should fail with a \"TS.InvalidInvocationException\" exception when called with an invalid 'source' argument.");

    assert.throws(() => {
      //call the constructor as a function (without new)
      enumeratorObj = TS.Linq.Enumerator();
      //See: http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    }, TypeError, "The constructor should fail with a \"TypeError\" exception when called as function.");
  });

})(TS_Linq_Enumerator_Test || (TS_Linq_Enumerator_Test = {}));