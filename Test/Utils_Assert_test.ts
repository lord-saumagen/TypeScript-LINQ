/// <reference path="./DATA.ts" />
/// <reference path="../_references.ts" />
/// <reference path="./Scripts/qunit.d.ts" />
module TS_Utils_Assert
{
  "use strict";

  var custEnum: TS.Linq.Enumerator<DATA.ICustomer>;
  var persEnum: TS.Linq.Enumerator<DATA.IPerson>;
  var ordEnum: TS.Linq.Enumerator<DATA.IOrders>;
  var carEnum: TS.Linq.Enumerator<DATA.ICar>;
  var numEnum: TS.Linq.Enumerator<number>;
  var strEnum: TS.Linq.Enumerator<string>;
  var lowCharEnum: TS.Linq.Enumerator<string>;
  var UpCharEnum: TS.Linq.Enumerator<string>;


  QUnit.module("TS.Utils.Assert",
    {
      before: function ()
      {
        // runs once before anything else in the module
        custEnum = new TS.Linq.Enumerator<DATA.ICustomer>(DATA.CreateCustomerArray());
        persEnum = new TS.Linq.Enumerator<DATA.IPerson>(DATA.CreatePersonArray());
        ordEnum = new TS.Linq.Enumerator<DATA.IOrders>(DATA.CreateOrdersArray());
        carEnum = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());
        numEnum = new TS.Linq.Enumerator<number>(DATA.CreateNumberArray());
        strEnum = new TS.Linq.Enumerator<string>(DATA.CreateStringArray());
        lowCharEnum = new TS.Linq.Enumerator<string>(DATA.lowerCharArray);
        UpCharEnum = new TS.Linq.Enumerator<string>(DATA.upperCharArray);
      },
      beforeEach: function ()
      {
        // prepare something for all following tests
      },
      afterEach: function ()
      {
        // clean up after each test
      },
      after: function ()
      {
        // runs once after all unit tests finished (including teardown)
        //personEnumerable = null;
      }
    });


  QUnit.test("isPlainObject", (assert) =>
  {
    assert.equal(TS.Utils.Assert.isPlainObject({}), true, "Should return true for an empty literal object");
    assert.equal(TS.Utils.Assert.isPlainObject(new Object(null)), true, "Should return true for a new created Object with argument 'null'.");
    assert.equal(TS.Utils.Assert.isPlainObject({ "one": 1, "two": 2 }), true, "Should return true for a plain none empty object.");
    assert.equal(TS.Utils.Assert.isPlainObject(new DATA.Car("SUBURA", 200, false, 2020, 50000)), false, "Should return false for a complex object.");
    assert.equal(TS.Utils.Assert.isPlainObject([1, 2, 3]), false, "Should return false when called with an array argument.");
    assert.equal(TS.Utils.Assert.isPlainObject(null), false, "Should return false when called with a null argument.");
    assert.equal(TS.Utils.Assert.isPlainObject(undefined), false, "Should return false when called with an undefined argument.");
  });


  QUnit.test("isPrimitiveType", (assert) =>
  {
    assert.equal(TS.Utils.Assert.isPrimitiveType(true), true, "Should return true for a boolean value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(null), true, "Should return true for a null value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(undefined), true, "Should return true for an undefined value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(12), true, "Should return true for an integer number value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(1.2), true, "Should return true for a floating point number value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(Symbol()), true, "Should return true for a symbol value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new Boolean(false)), false, "Should return false for a boolean object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new Number(12)), false, "Should return false for a number object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new String("two")), false, "Should return false for a string object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType({}), false, "Should return false for a literal object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType([1, 2, 3]), false, "Should return false for an array value.");
  });
}