/// <reference path="DATA.ts" />
/// <reference path="Scripts/qunit.d.ts" />
/// <reference path="../_references.ts" />
var TS_Collections_List_test;
(function (TS_Collections_List_test) {
  "use strict";
  var custEnum;
  var persEnum;
  var ordEnum;
  var carEnum;
  var numEnum;
  var strEnum;
  var lowCharEnum;
  var UpCharEnum;
  QUnit.module("TS.Collections.List (plain js)", {
    before: function () {
      // runs once before anything else in the module
      custEnum = new TS.Linq.Enumerator(DATA.CreateCustomerArray());
      persEnum = new TS.Linq.Enumerator(DATA.CreatePersonArray());
      ordEnum = new TS.Linq.Enumerator(DATA.CreateOrdersArray());
      carEnum = new TS.Linq.Enumerator(DATA.CreateCarsArray());
      numEnum = new TS.Linq.Enumerator(DATA.CreateNumberArray());
      strEnum = new TS.Linq.Enumerator(DATA.CreateStringArray());
      lowCharEnum = new TS.Linq.Enumerator(DATA.lowerCharArray);
      UpCharEnum = new TS.Linq.Enumerator(DATA.upperCharArray);
    },
    beforEach: function () {
      // prepare something for all following tests
    },
    afterEach: function () {
      // clean up after each test
    },
    after: function () {
      // runs once after all unit tests finished (including teardown)
    }
  });


  QUnit.test("single (plain js)", (assert) => {
    assert.throws(() => {
      new TS.Collections.List(false, [1, 2, 3, 4]).single({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'predicate' which is not a function.");
  });


  QUnit.test("skipWhile (plain js)", (assert) => {
    let numList = new TS.Collections.List(false, numEnum);

    assert.throws(() => {
      numList.skipWhile({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'predicate' which is not a function.");
  });


  QUnit.test("takeWhile (plain js)", (assert) => {
    let numList = new TS.Collections.List(false, numEnum);

    assert.throws(() => {
      numList.takeWhile({}).count();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'predicate' which is not a function.");
  });


  QUnit.test("union (plain js)", (assert) => {
    assert.throws(() => {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).union(TS.Linq.Enumerator.Empty, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an 'equalityComparer' which is not a function.");
  });


  QUnit.test("where (plain js)", (assert) => {

    assert.throws(() =>
    {
      new TS.Collections.List(false, persEnum).where({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'predicate' which is not a function.");
  });

})(TS_Collections_List_test || (TS_Collections_List_test = {})); //END module
