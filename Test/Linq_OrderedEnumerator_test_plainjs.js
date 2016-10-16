/// <reference path="DATA.ts" />
/// <reference path="Scripts/qunit.d.ts" />
/// <reference path="../exception/exception.ts" />
/// <reference path="../utils/assert.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../linq/exception.ts" />
/// <reference path="../linq/extensions.ts" />
/// <reference path="../linq/enumerator.ts" />
/// <reference path="../linq/iorderedenumerator.ts" />
/// <reference path="../linq/orderedenumerator.ts" />
var TS_Linq_OrderedEnumerator_test;
(function (TS_Linq_OrderedEnumerator_test) {
  "use strict";
  QUnit.module("TS.Linq.OrderedEnumerator (plain js)", {
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

    assert.throws(() => {
      let obj = new TS.Linq.OrderedEnumerator({}, (item) => item, (first, second) => 0);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'enumerator' argument which is not iterable.");

    assert.throws(() => {
      let obj = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, {}, (first, second) => 0);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'keySelector' argument which is not a function.");

    assert.throws(() => {
      let obj = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, (item) => item, {});
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a 'comparer' argument which is not a function.");
  });

  QUnit.test("thenBy (plain js)", (assert) => {

    let orderedEnumerator = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, item => item, (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; });

    assert.throws(() => {
      orderedEnumerator.thenBy(item => item, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a function.");

  });

  QUnit.test("thenByDescending (plain js)", (assert) => {

    let orderedEnumerator = new TS.Linq.OrderedEnumerator(TS.Linq.Enumerator.Empty, item => item, (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; });

    assert.throws(() => {
      orderedEnumerator.thenByDescending(item => item, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\"  when called with a 'comparer' argument which is not a  function.");

  });

})(TS_Linq_OrderedEnumerator_test || (TS_Linq_OrderedEnumerator_test = {})); //END module
//# sourceMappingURL=Linq_OrderedEnumerator_test.js.map