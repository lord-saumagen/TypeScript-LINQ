/// <reference path="../_references.ts" />
/// <reference path="./scripts/qunit.d.ts" />
module TS_Linq_Enumerator_Test
{
  "use strict";


  QUnit.module("TS.Linq.Enumerator",
  {
    before: function ()
    {
      // runs once before anything else in the module
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


  QUnit.test("constructor", (assert) =>
  {
    let enumeratorObj: TS.Linq.Enumerator<string>;
    let faileGenerator: () => number;
    let passGenerator = function* ()
    {
      yield Math.floor(Math.random() * 100).toString();
    }

    enumeratorObj = new TS.Linq.Enumerator<string>(passGenerator);
    assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'generator' argument.");
    assert.ok(TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");

    enumeratorObj = new TS.Linq.Enumerator<string>(["1", "2"])
    assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'source' argument.");
    assert.ok(TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");

    enumeratorObj = new TS.Linq.Enumerator<string>(["1", "2"], item => true)
    assert.notEqual(enumeratorObj, null, "The constructor should return an object when called with a valid 'source' and 'selector' argument.");
    assert.ok(TS.Utils.Assert.isIterable(enumeratorObj), "The returned object should be iterable.");
  });


  QUnit.test("iterate", (assert) =>
  {
    let resultNumArray: Array<number> = new Array<number>();
    let resultStr: string = "";
    let stringEnumeratorObj: TS.Linq.Enumerator<string>;
    let numEnumeratorObj: TS.Linq.Enumerator<number>;

    let numGenerator = function* ()
    {
      while (true)
      {
        yield Math.floor(Math.random() * 10);
      }
    }

    let stringGenerator = function* ()
    {
      yield "1";
      yield "2";
      yield "3";
      yield "4";
      yield "5";
      return;
    }

    stringEnumeratorObj = new TS.Linq.Enumerator<string>(stringGenerator);
    assert.notEqual(stringEnumeratorObj, null, "The constructor should return an object when called with a valid 'generator' argument.");
    assert.ok(TS.Utils.Assert.isIterable(stringEnumeratorObj), "The returned object should be iterable.");
    for (let str of stringEnumeratorObj)
    {
      resultStr += str + ", ";
    }
    assert.equal("1, 2, 3, 4, 5, ", resultStr, "Should return the expected result.");


    numEnumeratorObj = new TS.Linq.Enumerator<number>(numGenerator);
    assert.notEqual(numEnumeratorObj, null, "The constructor should return an object when called with a valid 'generator' argument.");
    assert.ok(TS.Utils.Assert.isIterable(numEnumeratorObj), "The returned object should be iterable.");
    for (let num of numEnumeratorObj)
    {
      resultNumArray.push(num);
      if (resultNumArray.length > 9999)
      {
        break;
      }//END if
    }
    assert.equal(resultNumArray.length, 10000, "The returned number array should have the expected number of elements.");

    let testNumArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    numEnumeratorObj = new TS.Linq.Enumerator<number>(testNumArr, item => (item % 2) == 0)
    assert.notEqual(numEnumeratorObj, null, "The constructor should return an object when called with a valid 'generator' argument.");
    assert.ok(TS.Utils.Assert.isIterable(numEnumeratorObj), "The returned object should be iterable.");
    resultNumArray.length = 0;
    for (let num of numEnumeratorObj)
    {
      resultNumArray.push(num);
    }
    assert.deepEqual(resultNumArray, [2, 4, 6, 8, 10], "The returned object should holde the expected elements.");

  });

}//END module