/// <reference path="DATA.ts" />
/// <reference path="../_references.ts" />
/// <reference path="./Scripts/qunit.d.ts" />

module TS_Linq_OrderedEnumerator_test
{
  "use strict";

  declare var document : any;

  QUnit.module("TS.Linq.OrderedEnumerator",
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
    let orderedEnumerator: TS.Linq.OrderedEnumerator<any, string>;
    let resultArray: Array<any>;

    orderedEnumerator = new TS.Linq.OrderedEnumerator<any, string>(DATA.CreateSortTestArray(), item => item.color, (first: string, second: string) => first.localeCompare(second));
    assert.notEqual(orderedEnumerator, null, "The constructor should return an object when called with proper arguments.");
    assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");

    resultArray = orderedEnumerator.toArray();

    assert.equal(resultArray.length, DATA.CreateSortTestArray().length, "Should hold as much elements as originally used during construction.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(null, (item) => item, (first, second) => 0);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'enumerator' argument.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, null, (first, second) => 0);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'keySelector' argument.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, (item) => item, null);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null 'comparer' argument.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(undefined, (item) => item, (first, second) => 0);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, undefined, (first, second) => 0);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'keySelector' argument.");

    assert.throws(() =>
    {
      let obj = new TS.Linq.OrderedEnumerator<any, any>(TS.Linq.Enumerator.Empty, (item) => item, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an undefined 'comparer' argument.");
  });


  QUnit.test("thenBy", (assert) => 
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<DATA.ISortTestItem, string>;
    let resultArray: Array<DATA.ISortTestItem>;
    let sortedByColor: boolean;
    let sortedByLocation: boolean;
    let colorsArray: Array<string> = ["red", "blue", "green"];

    orderedEnumerator = new TS.Linq.Enumerator(DATA.CreateSortTestArray()).orderBy(item => item.color);
    orderedEnumerator = orderedEnumerator.thenBy(item => item.location);
    assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
    assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");
    resultArray = orderedEnumerator.toArray();

    //
    //Check that the items are sorted by color as 
    //expected.
    //
    sortedByColor = true;
    let lastItem: DATA.ISortTestItem = null;
    for (let item of resultArray)
    {

      if (lastItem != null)
      {
        if (lastItem.color > item.color)
        {
          sortedByColor = false;
          break;
        }//END if
      }//END if

      lastItem = item;
    }//END for

    assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");

    //
    //Check that in each color group the items 
    //are sorted by location as expected.
    //
    sortedByLocation = true;
    for (let color of colorsArray)
    {
      let colorGroupArray: Array<DATA.ISortTestItem> = resultArray.filter(Item => Item.color == color);
      let lastItem: DATA.ISortTestItem = null;

      for (let item of colorGroupArray)
      {
        if (lastItem != null)
        {
          if (lastItem.location > item.location)
          {
            sortedByLocation = false;
            break;
          }//END if
        }//END if

        lastItem = item;
      }
    }

    assert.ok(sortedByLocation, "The result array should be sorted by location in the second place.");

    orderedEnumerator = TS.Linq.OrderedEnumerator.Empty.thenBy(Item => Item.location);
    assert.equal(orderedEnumerator.count(), 0, "An empty OrderedEnumerator should stay empty even after subsequent sort requests.");

    assert.throws(() =>
    {
      orderedEnumerator.thenBy(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" when called with a null 'keySelector' argument.");

    assert.throws(() =>
    {
      orderedEnumerator.thenBy(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\"  when called with an undefined 'keySelector' argument.");
  });


  QUnit.test("thenByDescending", (assert) =>
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<DATA.ISortTestItem, any>;
    let resultArray: Array<DATA.ISortTestItem>;
    let sortedByColor: boolean;
    let sortedByLocation: boolean;
    let colorsArray: Array<string> = ["red", "blue", "green"];

    orderedEnumerator = TS.Linq.Extensions.orderBy(DATA.CreateSortTestArray(), (Item => Item.color));
    orderedEnumerator = TS.Linq.Extensions.thenByDescending<DATA.ISortTestItem, string>(orderedEnumerator, Item => Item.location);
    assert.ok(orderedEnumerator != null, "The call to 'thenBy' should return an object.");
    assert.ok(TS.Utils.Assert.isIterable(orderedEnumerator), "The returned object should be iterable.");

    //
    //Check that the items are sorted by color as 
    //expected.
    //
    sortedByColor = true;
    let lastItem: DATA.ISortTestItem = null;
    for (let item of orderedEnumerator)
    {

      if (lastItem != null)
      {
        if (lastItem.color > item.color)
        {
          sortedByColor = false;
          break;
        }//END if
      }//END if

      lastItem = item;
    }//END for

    assert.ok(sortedByColor, "The result array should be sorted by color in the first place.");

    //
    //Check that in each color group the items 
    //are sorted by location as expected.
    //
    resultArray = TS.Linq.Extensions.toArray(orderedEnumerator);
    sortedByLocation = true;
    for (let color of colorsArray)
    {
      let colorGroupArray: Array<DATA.ISortTestItem> = resultArray.filter(Item => Item.color == color);
      let lastItem: DATA.ISortTestItem = null;

      for (let item of colorGroupArray)
      {
        if (lastItem != null)
        {
          if (lastItem.location < item.location)
          {
            sortedByLocation = false;
            break;
          }//END if
        }//END if

        lastItem = item;
      }
    }

    assert.ok(sortedByLocation, "The result array should be sorted by location descending in the second place.");

    orderedEnumerator = TS.Linq.Extensions.thenByDescending<any, any>(TS.Linq.OrderedEnumerator.Empty, Item => Item.location);
    assert.equal(TS.Linq.Extensions.count(orderedEnumerator), 0, "Should return an empty enumerator when called with an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenByDescending<DATA.ISortTestItem, string>(null, Item => Item.location);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenByDescending<DATA.ISortTestItem, string>(undefined, Item => Item.location);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });

}//END module