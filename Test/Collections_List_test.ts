/// <reference path="./DATA.ts" />
/// <reference path="../_references.ts" />
/// <reference path="./Scripts/qunit.d.ts" />

module TS_Collections_List_test
{
  "use strict";

  declare var document: any;

  var custEnum: TS.Linq.Enumerator<DATA.ICustomer>;
  var persEnum: TS.Linq.Enumerator<DATA.IPerson>;
  var ordEnum: TS.Linq.Enumerator<DATA.IOrders>;
  var carEnum: TS.Linq.Enumerator<DATA.ICar>;
  var numEnum: TS.Linq.Enumerator<number>;
  var strEnum: TS.Linq.Enumerator<string>;
  var lowCharEnum: TS.Linq.Enumerator<string>;
  var UpCharEnum: TS.Linq.Enumerator<string>;

  QUnit.module("TS.Collections.List",
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
      beforEach: function ()
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
      }
    });


  QUnit.test("constructor", (assert) =>
  {
    let List: TS.Collections.List<number>;
    let nullIndex: number;

    List = new TS.Collections.List<number>(true);
    List.count();
    assert.notEqual(List, null, "A call to the constructor should return an object.");
    assert.ok(TS.Utils.Assert.isIterable(List), "The returned object should be iterable.");
    assert.equal(TS.Linq.Extensions.count(List), 0, "The returned collection should be empty.");

    List = new TS.Collections.List<number>(true, [1, 2, 3, null, 4, null, 6]);

    assert.notEqual(List, null, "A call to the constructor should return an object.");
    assert.ok(TS.Utils.Assert.isIterable(List), "The returned object should be iterable.");
    assert.equal(TS.Linq.Extensions.count(List), 7, "The returned collection should have as much elements as expected.");

    assert.throws(() =>
    {
      List = new TS.Collections.List<number>(false, [1, 2, 3, null, 4, null]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call to the constructor with an array which holds null values when 'allowNull' is set to false.");

    assert.throws(() =>
    {
      new TS.Collections.List(null, TS.Linq.Enumerator.Empty);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call to the constructor with an invalid 'allowNull' argument.");

  });


  QUnit.test("add", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(true);
    for (let item of numEnum)
    {
      numList.add(item);
    }

    assert.equal(TS.Linq.Extensions.count(numList), TS.Linq.Extensions.count(numEnum), "The list should have the expected number of elements.")
    assert.deepEqual(TS.Linq.Extensions.toArray(numList), TS.Linq.Extensions.toArray(numEnum), "The list elements should match with the source elements.");

    numList.add(null);
    assert.deepEqual(TS.Linq.Extensions.count(numList), TS.Linq.Extensions.count(numEnum) + 1, "The list should hold as much elements as expected.");

    numList = new TS.Collections.List<number>(false);
    for (let item of numEnum)
    {
      numList.add(item);
    }

    assert.throws(() =>
    {
      numList.add(null);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an attempt to add a null value on a list which has the 'allowNull' flag set to false.");

  });


  QUnit.test("aggregate", (assert) => 
  {
    let numberResult: number;
    let stringResult: string;
    let carNumberResult: number;
    let carStringResult: string;
    let numList: TS.Collections.List<number>;
    let strList: TS.Collections.List<string>;
    let carList: TS.Collections.List<DATA.ICar>;

    numList = new TS.Collections.List<number>(false, numEnum);
    numberResult = numList.aggregate((first, second) =>
    {
      return first + second;
    });
    assert.equal(numberResult, 55, "should return '55' on TS.Linq.Enumerator<number> .");

    strList = new TS.Collections.List<string>(false, strEnum);
    stringResult = strList.aggregate((first, second) =>
    {
      return first + ", " + second;
    });
    assert.equal(stringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on List<string> .");

    carList = new TS.Collections.List<DATA.ICar>(false, carEnum);
    carNumberResult = carList.aggregate((first: number, second: DATA.Car) => first + second.horsePower, 0);
    assert.equal(carNumberResult, 595, "Should return 595 on a List<DATA.Car> with an accumulator function on 'horsePower' and a seed value of '0'.");

    carStringResult = carList.aggregate((first: string, second: DATA.Car) => first + second.name, "");
    assert.equal(carStringResult, "BMWAUDIVWFIATTRABANT", "Should return 'BMWAUDIVWFIATTRABANT' on a List<DATA.Car> with an accumulator function on 'name' and a seed value of \"\".");

    assert.throws(() =>
    {
      new TS.Collections.List<string>(true).aggregate((first, second) => { return first + second; });
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");


    //Null accumulator
    assert.throws(() =>
    {
      carList.aggregate(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.");


    //Undefined accumulator
    assert.throws(() =>
    {
      carList.aggregate(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.");

  });


  QUnit.test("all", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let strList: TS.Collections.List<string>;
    let carList: TS.Collections.List<DATA.ICar>;

    carList = new TS.Collections.List(false, carEnum);
    strList = new TS.Collections.List(false, strEnum);
    numList = new TS.Collections.List(false, numEnum);

    assert.ok(carList.all(item => item.horsePower > 10), "Should return true on a predicate that should pass.");
    assert.ok(strList.all(item => item.length > 2), "Should return true on a predicate that should pass.");
    assert.ok(numList.all(item => item > -1), "Should return true on a predicate that should pass.");
    assert.ok(!carList.all(item => item.disel), "Should return false on a predicate that shouldn't pass.");
    assert.ok(!strList.all(item => item.indexOf("o") > -1), "Should return false on a predicate that shouldn't pass.");
    assert.ok(!numList.all(item => (item % 2) > 0), "Should return false on a predicate that shouldn't pass.");
    numList = new TS.Collections.List(true, [1, null, 3, 4, null, 5, 6, null, 7]);
    assert.ok(!numList.all(item => (item % 2) > 0), "Should return false on a predicate that shouldn't pass.");
    strList = new TS.Collections.List(true, ["one", null, "two", "three", null, "four", "five", null, "six"]);

    assert.throws(() => 
    {
      strList.all(item => item.length > 2);
    }, TypeError, "The call should fail with a \"TypeError\" for an attempt to read a property on a null value.");

    assert.throws(() => 
    {
      strList.all(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");

    assert.throws(() => 
    {
      strList.all(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");

  });


  QUnit.test("any", (assert) => 
  {

    assert.equal(new TS.Collections.List(false).any(item => true), false, "Should return false on an empty 'enumerator'.");

    assert.ok(new TS.Collections.List(false, strEnum).any(item => item.length >= 3), "Should return true on a predicate that should pass.");

    assert.ok(!new TS.Collections.List(false, strEnum).any(item => item.length < 2), "Should return false on a predicate that shouldn't pass.");

    assert.ok(new TS.Collections.List(false, numEnum).any(), "Should return true on a none empty 'List' without predicate.");

    assert.ok(!new TS.Collections.List(false).any(), "Should return false on an empty 'List' without predicate.");

    //assert.throws(() =>
    //{
    //  TS.Linq.Extensions.any<string>(null, (item) => item.length < 0);
    //}, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    //assert.throws(() =>
    //{
    //  TS.Linq.Extensions.any<string>(undefined, (item) => item.length < 0);
    //}, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("average", (assert) => 
  {
    let testNumberArray: Array<number>;
    let List: TS.Collections.List<number>;

    assert.equal(new TS.Collections.List(false, numEnum).average(), 5.5, "Should return the expected average.");

    assert.throws(() =>
    {
      new TS.Collections.List(false).average();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'List' argument.");


    testNumberArray = DATA.CreateNumberArray();
    testNumberArray.push(Number.MAX_VALUE / 2);
    testNumberArray.push(Number.MAX_VALUE);

    assert.throws(() =>
    {
      new TS.Collections.List(false, testNumberArray).average();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which elements sum exceedes the number range.");

    assert.throws(() => 
    {
      List = new TS.Collections.List<number>(true, [1, 2, 3, null, 4, null]);
      List.average();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<number>' which holds null values");

    assert.throws(() =>
    {
      new TS.Collections.List(false, strEnum).average();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'List<string>' which don't allow to calculate an average.");
  });


  QUnit.test("concat", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let strList: TS.Collections.List<string>;

    numList = new TS.Collections.List(false, numEnum);
    numList = numList.concat(numEnum).toList();

    assert.deepEqual(numList.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return the expected result of the concatenation.");


    strList = new TS.Collections.List(false, strEnum);
    strList = strList.concat(strEnum).toList();

    assert.deepEqual(strList.toArray(), ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return the expected result of the concatenation.");

    assert.throws(() =>
    {
      strList.concat(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      strList.concat(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("contains", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let strList: TS.Collections.List<string>;

    numList = new TS.Collections.List(false, numEnum);
    strList = new TS.Collections.List(false, strEnum);

    assert.ok(numList.contains(5), "Should return true for a contained value.")
    assert.ok(strList.contains("six"), "Should return true for a contained value.")
    assert.ok(!numList.contains(200), "Should return false for a value not contained.")
    assert.ok(!strList.contains("nop"), "Should return false for a value not contained.")
    assert.ok(strList.contains("nop", (first, second) => true), "Should return true when using a matching equality comparer.")
    assert.ok(!strList.contains("one", (first, second) => first == "yes"), "Should return false when using a not matching equality comparer.")

  });


  QUnit.test("copyTo", (assert) => 
  {
    let strList: TS.Collections.List<string>;
    let resultArray: Array<string>;
    let controlArray: Array<string>;

    controlArray = ["one", "two", "three", "four", "five", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    strList = new TS.Collections.List(false, strEnum);
    resultArray = new Array<string>();
    strList.copyTo(resultArray);
    assert.equal(resultArray.length, strList.length, "Schould return an array with a matching size.");
    assert.deepEqual(resultArray, DATA.CreateStringArray(), "The array should match with the source array.");
    strList.copyTo(resultArray, 5);
    assert.deepEqual(resultArray, controlArray, "The array should match with the controlArray array after a second copy operation.");

    assert.throws(() =>
    {
      strList.copyTo(resultArray, -1);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.");

    assert.throws(() =>
    {
      strList.copyTo(resultArray, resultArray.length + 1);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an invalid 'destIndex' argument.");

    assert.throws(() =>
    {
      strList.copyTo(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'targetArray' argument.");

    assert.throws(() =>
    {
      strList.copyTo(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'targetArray' argument.");

    //assert.throws(() =>
    //{
    //  strList.copyTo("");
    //}, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'targetArray' argument.");

  });


  QUnit.test("count", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let strList: TS.Collections.List<string>;

    numList = new TS.Collections.List(false, numEnum);
    strList = new TS.Collections.List(false, strEnum);

    assert.equal(numList.count(), 10, "Schould return a number which matches with the source array length.");
    assert.equal(strList.count(), 10, "Schould return a number which matches with the source array length.");
    numList.add(99);
    assert.equal(numList.count(), 11, "Should return a number which reflects the new list length.");
    assert.equal(numList.removeAt(0).removeAt(0).count(), 9, "Should return a number which reflects the new list length.");
    assert.equal(new TS.Collections.List<number>(false).count(), 0, "Should return 0 for an empty list.");

  });


  QUnit.test("cycle", (assert) =>
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List(false, numEnum);

    assert.deepEqual(numList.cycle().take(20).toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "The result list should match with the control array.");
    assert.deepEqual(new TS.Collections.List<string>(false, ["a", "b", "c"]).cycle().take(9).toArray().join(), "a,b,c,a,b,c,a,b,c", "The result list should match with the control string.");
  });


  QUnit.test("defaultIfEmpty", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let carList: TS.Collections.List<DATA.ICar>;

    numList = new TS.Collections.List<number>(false);
    carList = new TS.Collections.List<DATA.ICar>(false);

    assert.deepEqual(numList.defaultIfEmpty(0).toArray(), [0], "The result should match with the default primitive type.");
    assert.deepEqual(carList.defaultIfEmpty(DATA.Car).toArray(), [new DATA.Car()], "The result should match with the default complex type.");

    assert.throws(() =>
    {
      numList.defaultIfEmpty(null).toArray();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.");

    assert.throws(() =>
    {
      numList.defaultIfEmpty(undefined).toArray();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an null 'defaultConstructorOrValue' argument.");
  });


  QUnit.test("distinct", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let resultCarList: TS.Collections.List<DATA.ICar>;
    let doubleCarList: TS.Collections.List<DATA.ICar>;

    doubleCarList = new TS.Collections.List<DATA.ICar>(false, carEnum).add(...DATA.CreateCarsArray());
    resultCarList = doubleCarList.distinct((first, second) => first.name == second.name).toList();
    assert.deepEqual(resultCarList.toArray(), DATA.CreateCarsArray(), "Should return list with the expected elements.");

    numList = new TS.Collections.List(false, [0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9]).distinct().toList();
    assert.equal(numList.count(), 10, "Should return a list with the expected number of elements.");
  });


  QUnit.test("elementAt", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let carList: TS.Collections.List<DATA.ICar>;

    numList = new TS.Collections.List<number>(false, numEnum);
    carList = new TS.Collections.List<DATA.ICar>(false, carEnum);

    assert.deepEqual(carList.elementAt(3), DATA.CreateCarsArray()[3], "The element on the viewed position should matcj with the expected value.");
    assert.equal(numList.elementAt(9), 10, "The element on the viewed position should match with the expected value.");

    assert.throws(() =>
    {
      numList.elementAt(-3);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'index' argument.");

    assert.throws(() =>
    {
      numList.elementAt(200);
    }, TS.IndexOutOfRangeException, "The call should fail with a \"TS.IndexOutOfRangeException\" for an 'index' argument which is out of the range of the enumeration.");

    assert.throws(() =>
    {
      numList.elementAt(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");

    assert.throws(() =>
    {
      numList.elementAt(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");
  });


  QUnit.test("elementAtOrDefault", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let carList: TS.Collections.List<DATA.ICar>;

    numList = new TS.Collections.List<number>(false, numEnum);
    carList = new TS.Collections.List<DATA.ICar>(false, carEnum);

    assert.deepEqual(carList.elementAtOrDefault(3, DATA.Car), DATA.CreateCarsArray()[3], "The element on the viewed position should matct with the expected value.");
    assert.equal(numList.elementAtOrDefault(9, 0), 10, "The element on the viewed position should match with the expected value.");
    assert.deepEqual(carList.elementAtOrDefault(15, DATA.Car), new DATA.Car(), "The default element should be returned.");
    assert.equal(numList.elementAtOrDefault(99, 11), 11, "The default element should be returned.");

    assert.throws(() =>
    {
      carList.elementAtOrDefault(-1, DATA.Car);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");

    assert.throws(() =>
    {
      numList.elementAtOrDefault(3, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");

    assert.throws(() =>
    {
      numList.elementAtOrDefault(3, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");

  });


  QUnit.test("except", (assert) =>
  {
    let strList: TS.Collections.List<string>;

    strList = new TS.Collections.List<string>(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);

    assert.deepEqual(strList.except(lowCharEnum).toArray(), ["A", "B", "C", "D", "E", "F", "G"], "Should return a collection with the expected elements.");
    assert.deepEqual(strList.except(["x", "2", "?"]).toArray(), ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"], "Should return an unchanged collection with 'secondEnumerator' which has no match.");
    assert.deepEqual(strList.except(strList).toArray(), [], "Should return an empty collection whenn called with an identic collection.");

    //assert.throws(() =>
    //{
    //  strList.except({});
    //}, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'secondEnumerator' argument which isn't iterable.");

    assert.throws(() =>
    {
      strList.except(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      strList.except(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("first", (assert) =>
  {
    let strList: TS.Collections.List<string>;
    let carList: TS.Collections.List<DATA.ICar>;

    carList = new TS.Collections.List<DATA.ICar>(false, carEnum);
    strList = new TS.Collections.List<string>(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);

    assert.deepEqual(strList.first(), "a", "Should return the first element in the sequence.");
    assert.deepEqual(carList.first(), carList[0], "Should return the first element in the sequence.");
    assert.deepEqual(strList.first(item => item == "F"), "F", "Should return the first matching element in the sequence.");
    assert.deepEqual(carList.first(item => item.name == "FIAT"), { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 }, "Should return the first matching element in the sequence.");

    assert.throws(() =>
    {
      strList.first(item => item == "X");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which hasn't a match.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).first();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty list.");


    //assert.throws(() =>
    //{
    //  strList.first({});
    //}, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidOperationException\"  for a 'predicate' which isn't a function.");
  });


  QUnit.test("firstOrDefault", (assert) => 
  {
    let strList: TS.Collections.List<string>;
    let carList: TS.Collections.List<DATA.ICar>;

    carList = new TS.Collections.List<DATA.ICar>(false, carEnum);
    strList = new TS.Collections.List<string>(false, ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G"]);

    assert.deepEqual(strList.firstOrDefault("x"), "a", "Should return the first element in the sequence.");
    assert.deepEqual(carList.firstOrDefault(DATA.Car), carList[0], "Should return the first element in the sequence.");

    assert.deepEqual(strList.firstOrDefault("x", item => item == "g"), "g", "Should return the first matching element in the sequence.");
    assert.deepEqual(carList.firstOrDefault(DATA.Car, item => item.name == "FIAT"), { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 }, "Should return the first matching element in the sequence.");
    assert.deepEqual(strList.firstOrDefault("x", item => item == "?"), "x", "Should return the default element for a predicate which hans't a match.");
    assert.deepEqual(carList.firstOrDefault(DATA.Car, item => item.name == "WHAT"), new DATA.Car(), "Should return the default element for a predicate which hans't a match.");

    assert.deepEqual(strList.clear().firstOrDefault("z"), "z", "Should return the default element for an empty sequence.");
    assert.deepEqual(carList.clear().firstOrDefault(DATA.Car, item => item.name == "FIAT"), new DATA.Car, "Should return the default element for an empty sequence.");
  });


  QUnit.test("forEach", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let cusList: TS.Collections.List<DATA.ICustomer>;
    let addAndSum: number;

    numList = new TS.Collections.List(false, numEnum);
    cusList = new TS.Collections.List(false, DATA.CreateCustomerArray());

    addAndSum = 0;
    assert.deepEqual(numList.forEach(item => { item += 10; addAndSum += item }).toArray(), DATA.CreateNumberArray(), "Should have no effect when called on a list of value types.");
    assert.ok(addAndSum > 100, "The summed up value should be greater than 100.");
    assert.deepEqual(cusList.forEach(item => item.ContactName = "NO").where(item => item.ContactName != "NO").count(), 0, "Should effect each element when called on a list of reference types.");

  });


  QUnit.test("groupBy", (assert) =>
  {
    let cusResultList: TS.Collections.List<TS.Linq.Grouping<string, DATA.ICustomer>>;
    let resultProdList: TS.Collections.List<TS.Linq.Grouping<string, DATA.IProduct>>;
    let resultProdListStorageRoom: TS.Collections.List<TS.Linq.Grouping<string, string>>;
    let resultProdListStorageRoomConcat: TS.Collections.List<{ Key: string; RoomConcat: string }>;

    cusResultList = new TS.Collections.List<DATA.ICustomer>(false, custEnum).groupBy(_CUST => _CUST.Country).toList();
    assert.equal(cusResultList.count(), 21, "Should return 21 elements for the executed expression.");


    resultProdList = new TS.Collections.List(false, DATA.CreateProductArray()).groupBy(item => TS.Utils.findSingleCurrency(item.Currency).Code).toList();
    assert.equal(resultProdList.count(), 5, "Should return 5 elements for the executed expression with equalityComparer.");

    //for (let outerItem of resultProdList)
    //{
    //  console.log("***************************************************");
    //  console.log(JSON.stringify(outerItem));
    //  console.log("***************************************************");
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}

    function equComp(first: string, second: string): boolean
    {
      return TS.Utils.findSingleCurrency(first).Code === TS.Utils.findSingleCurrency(second).Code
    }

    resultProdListStorageRoom = new TS.Collections.List(false, DATA.CreateProductArray()).groupBy(item => TS.Utils.findSingleCurrency(item.Currency).Code, equComp, (item) => item.Storage.Room).toList();
    assert.equal(resultProdListStorageRoom.count(), 5, "Should return 5 elements for the executed expression with elementSelector.");

    //for (let outerItem of resultProdListStorageRoom)
    //{
    //  console.log("***************************************************");
    //  console.log(JSON.stringify(outerItem));
    //  console.log("***************************************************");
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}


    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).groupBy(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).groupBy(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.");

  });


  QUnit.test("groupJoin", (assert) =>
  {
    let cusList: TS.Collections.List<DATA.ICustomer>;
    let ordersCount: number;

    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
    //The query will return 91 Results.


    cusList = new TS.Collections.List<DATA.ICustomer>(false, custEnum);
    let result = cusList.groupJoin(ordEnum, (OuterItem) => OuterItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group })).toList();
    assert.equal(result.count(), 91, "Should return 91 elements for the executed expression.");

    ordersCount = 0;
    for (let item of result)
    {
      //console.log("***************************************************");
      //console.log(JSON.stringify(item));
      //console.log("***************************************************");
      for (let order of item.OrderGroup)
      {
        ordersCount++;
      }
    }

    assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");

    //
    //Execute the query once again but using the 'equalityComparer' instead of the default comparer.
    //Should return the same result.
    //
    result = cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey: string, innerKey: string) => outerKey == innerKey).toList();
    assert.equal(result.count(), 91, "Should return 91 elements for the executed expression.");

    ordersCount = 0;
    for (let item of result)
    {
      //console.log("***************************************************");
      //console.log(JSON.stringify(item));
      //console.log("***************************************************");
      for (let order of item.OrderGroup)
      {
        ordersCount++;
      }
    }

    assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      cusList.groupJoin(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");

  });


  QUnit.test("indexOf", (assert) =>
  {
    let numList: TS.Collections.List<number>;
    let cusList: TS.Collections.List<DATA.ICustomer>;
    let searchItem: DATA.ICustomer;
    let foundIndex: number;

    numList = new TS.Collections.List(false, numEnum);
    cusList = new TS.Collections.List(false, custEnum);
    searchItem = DATA.CreateCustomerArray()[4];

    assert.equal(numList.indexOf(5), 4, "The returned value should be the expected position.");
    numList.add(5);
    assert.equal(numList.indexOf(5), 4, "The returned value should be the first position of the element in the sequence.");
    assert.equal(numList.indexOf(5, 5), 10, "The returned value should be the second position of the element in the sequence.");

    foundIndex = cusList.indexOf(searchItem, 0, (first, second) => first.CustomerID == second.CustomerID);
    assert.equal(foundIndex, 4, "The returned value should be the expected position.");

    assert.throws(() =>
    {
      new TS.Collections.List(true, TS.Linq.Enumerator.Empty).indexOf(undefined);
    }, TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.");

    assert.throws(() =>
    {
      cusList.indexOf(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.");

    assert.throws(() =>
    {
      cusList.indexOf(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.");

    assert.throws(() =>
    {
      cusList.indexOf(searchItem, -1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'startIndex' argument.");

    assert.throws(() =>
    {
      cusList.indexOf(searchItem, 2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'startIndex' argument which is not an integer value.");
  });


  QUnit.test("insert", (assert) =>
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List(false, numEnum);

    assert.equal(numList.insert(4, 99).indexOf(99), 4, "The new inserted item should be found at the expected position.");
    assert.ok(numList.count() == numEnum.count() + 1, "The list should have one more element than the original source list.");

    assert.throws(() => 
    {
      numList.insert(99, 11);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an 'index' argument which is out of the range of the list.");

    assert.throws(() => 
    {
      numList.insert(-1, 11);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a nagative 'index' argument.");

    assert.throws(() => 
    {
      numList.insert(2.5, 11);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an 'index' argument which is not an integer.");

    assert.throws(() => 
    {
      new TS.Collections.List<any>(true, TS.Linq.Enumerator.Empty).insert(0, undefined);
    }, TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for an undefined 'item' argument.");

    assert.throws(() => 
    {
      new TS.Collections.List<any>(false, TS.Linq.Enumerator.Empty).insert(0, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'item' argument.");

    assert.throws(() => 
    {
      new TS.Collections.List<any>(false, TS.Linq.Enumerator.Empty).insert(0, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'item' argument.");

  });


  QUnit.test("intersect", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let cusList: TS.Collections.List<DATA.ICustomer>;
    let cusIntersectArray: Array<DATA.ICustomer>;

    numList = new TS.Collections.List(false, numEnum);
    cusList = new TS.Collections.List(false, custEnum);

    numList = numList.intersect([2, 4, 6, 8, 10, 12, 14]).toList();
    assert.deepEqual(numList.toArray(), [2, 4, 6, 8, 10], "Should return the expected sequence.");

    cusIntersectArray = new Array<DATA.ICustomer>();
    cusIntersectArray.push(DATA.CreateCustomerArray()[12]);
    cusIntersectArray.push(DATA.CreateCustomerArray()[44]);
    cusIntersectArray.push(DATA.CreateCustomerArray()[78]);
    cusList = cusList.intersect(cusIntersectArray, (first, second) => first.CustomerID == second.CustomerID).toList();
    assert.deepEqual(cusList.toArray(), cusIntersectArray, "Should return the expected sequence.");

    assert.throws(() =>
    {
      numList.intersect(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      numList.intersect(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("join", (assert) => 
  {
    let cusList: TS.Collections.List<DATA.ICustomer>;


    cusList = new TS.Collections.List(false, custEnum);

    let joinList = cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry })).toList();

    assert.equal(joinList.count(), 830, "Should return 830 records for the executed expression.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      cusList.join(ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");

  });


  QUnit.test("last", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let ordList: TS.Collections.List<DATA.IOrders>;

    numList = new TS.Collections.List(false, numEnum);
    ordList = new TS.Collections.List(false, ordEnum);

    assert.equal(numList.last(), 10, "Should return the expected element.");
    assert.equal(ordList.last(item => item.CustomerID == "GODOS").OrderID, 11037, "Should return the expected element.");
    assert.throws(() => 
    {
      ordList.last(item => item.CustomerID == "NO_SUCH_CUSTOMER");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an 'predicate' argument which has no match.");
  });


  QUnit.test("lastOrDefault", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let ordList: TS.Collections.List<DATA.IOrders>;

    numList = new TS.Collections.List(false, numEnum);
    ordList = new TS.Collections.List(false, ordEnum);

    assert.equal(numList.lastOrDefault(0), 10, "Should return the expected element.");
    assert.equal(numList.lastOrDefault(0, item => item > 100), 0, "Should return the default element.");
    assert.equal(ordList.lastOrDefault(DATA.Order, item => item.CustomerID == "GODOS").OrderID, 11037, "Should return the expected element.");
    assert.equal(ordList.lastOrDefault(DATA.Order, item => item.CustomerID == "NO_SUCH_CUSTOMER").OrderID, 0, "Should return the default element.");

  });


  QUnit.test("length", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(true, [1, 2, null, 4, 5, null, 7]);
    assert.equal(numList.length, 7, "Should return the expected length");
    numList.add(8);
    assert.equal(numList.length, 8, "Should return the expected length");
    numList.remove(0).remove(0);
    assert.equal(numList.length, 6, "Should return the expected length");
    numList.clear();
    assert.equal(numList.length, 0, "Should return the expected length");

  });


  QUnit.test("max", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let ordList: TS.Collections.List<DATA.IOrders>;

    numList = new TS.Collections.List(false, numEnum);
    ordList = new TS.Collections.List(false, ordEnum);

    assert.equal(numList.max(), 10, "Should return the expected value");
    numList.insert(5, 99);
    assert.equal(numList.max(), 99, "Should return the expected value");
    numList.clear();

    assert.throws(() => 
    {
      numList.max();
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.");

    assert.throws(() => 
    {
      ordList.max();
    }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.");

  });


  QUnit.test("min",(assert) => 
  {
    let numList: TS.Collections.List<number>;
    let ordList: TS.Collections.List<DATA.IOrders>;

    numList = new TS.Collections.List(false, numEnum);
    ordList = new TS.Collections.List(false, ordEnum);

    assert.equal(numList.min(), 1, "Should return the expected value");
    numList.insert(5, -99);
    assert.equal(numList.min(), -99, "Should return the expected value");
    numList.clear();

    assert.throws(() => 
    {
      numList.min();
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an invocation with an empty list.");

    assert.throws(() => 
    {
      ordList.min();
    }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an invocation with a list which isn't numeric.");

  });


  QUnit.test("orderBy", (assert) => 
  {
    let sortTestList: TS.Collections.List<DATA.ISortTestItem>;
    let orderCorrect: boolean;
    let lastItem: DATA.ISortTestItem;
    let cusList: TS.Collections.List<DATA.ICustomer>;

    cusList = new TS.Collections.List(false, custEnum);

    sortTestList = new TS.Collections.List<DATA.ISortTestItem>(false, DATA.CreateSortTestArray());
    let resultOrder = sortTestList.orderBy(item => item.color);
    let resultList = resultOrder.toList();
    assert.equal(resultList.length, sortTestList.count(), "The result sequence should have the same size as the source sequence.");

    orderCorrect = true;
    lastItem = null;

    for (let item of resultOrder)
    {
      if ((lastItem != null) && (item.color < lastItem.color))
      {
        orderCorrect = false;
      }
      lastItem = item;
    }//END for

    assert.ok(orderCorrect, "Should returns a list of sort test items sorted by color in ascending order.");

    let partIter = resultOrder.partitionIterator();
    let partCount = 0;

    let partIterResult = partIter.next();
    while (!partIterResult.done)
    {
      partCount++;
      partIterResult = partIter.next();
    }

    assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");

    let numList = new TS.Collections.List(false, DATA.CreateRandomNumberArray(100)).orderBy(item => item).toList();

    orderCorrect = true;
    let lastNumber = 0;

    for (let item of numList)
    {
      if (item < lastNumber)
      {
        orderCorrect = false;
      }
      lastNumber = item;
    }//END for

    assert.ok(orderCorrect, "Should returns a list of numbers sorted in ascending order.");

    cusList = cusList.orderBy(item => item.Country, (first, second) => first.localeCompare(second)).toList();

    let lastCusItem: DATA.ICustomer = null;
    for (let item of cusList)
    {
      if ((lastCusItem != null) && (item.Country < lastCusItem.Country))
      {
        orderCorrect = false;
      }
      lastCusItem = item;
    }//END for

    assert.ok(orderCorrect, "Should returns an list of customers sorted by country in ascending order.");

    let emptyList = new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderBy(item => item).toList();
    assert.equal(emptyList.count(), 0, "A call to 'orderBy' on an empty list should return an empty list.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderBy(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderBy(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
  });


  QUnit.test("orderByDescending", (assert) =>
  {
    let sortTestList: TS.Collections.List<DATA.ISortTestItem>;
    let orderCorrect: boolean;
    let lastItem: DATA.ISortTestItem;
    let cusList: TS.Collections.List<DATA.ICustomer>;

    cusList = new TS.Collections.List(false, custEnum);
    sortTestList = new TS.Collections.List<DATA.ISortTestItem>(false, DATA.CreateSortTestArray());

    let resultOrder = sortTestList.orderByDescending(item => item.color);
    let resultList = resultOrder.toList();
    assert.equal(resultList.length, sortTestList.count(), "The result sequence should have the same size as the source sequence.");

    orderCorrect = true;
    lastItem = null;

    for (let item of resultOrder)
    {
      if ((lastItem != null) && (item.color > lastItem.color))
      {
        orderCorrect = false;
      }
      lastItem = item;
    }//END for

    assert.ok(orderCorrect, "Should returns a list of sort test items sorted by color in descending order.");

    let partIter = resultOrder.partitionIterator();
    let partCount = 0;

    let partIterResult = partIter.next();
    while (!partIterResult.done)
    {
      partCount++;
      partIterResult = partIter.next();
    }

    assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");

    let numList = new TS.Collections.List(false, DATA.CreateRandomNumberArray(100)).orderByDescending(item => item).toList();

    orderCorrect = true;
    let lastNumber = 100;

    for (let item of numList)
    {
      if (item > lastNumber)
      {
        orderCorrect = false;
      }
      lastNumber = item;
    }//END for

    assert.ok(orderCorrect, "Should returns a list of numbers sorted in descending order.");

    cusList = cusList.orderByDescending(item => item.Country, (first, second) => first.localeCompare(second)).toList();

    let lastCusItem: DATA.ICustomer = null;
    for (let item of cusList)
    {
      if ((lastCusItem != null) && (item.Country > lastCusItem.Country))
      {
        orderCorrect = false;
      }
      lastCusItem = item;
    }//END for

    assert.ok(orderCorrect, "Should returns an list of customers sorted by country in descending order.");

    let emptyList = new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderByDescending(item => item).toList();
    assert.equal(emptyList.count(), 0, "A call to 'orderByDescending' on an empty list should return an empty list.");


    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderByDescending(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).orderByDescending(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
  });


  QUnit.test("random", (assert) =>
  {
    let strList: TS.Collections.List<string>;
    let isRandom = false;

    strList = new TS.Collections.List(false, DATA.CreateStringArray()).random().take(50).toList();

    let lastItem: string = null;
    for (let item of strList)
    {
      if ((lastItem != null) && (lastItem != item))
      {
        isRandom = true;
      }
      lastItem = item;
    }

    assert.ok(isRandom, "Should return a string array in random order.");


    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).random().first();
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty list.");

  });


  QUnit.test("reverse", (assert) => 
  {
    let numList: TS.Collections.List<number>;
    let isReverse: boolean;
    let numArray: Array<number>;

    numArray = numEnum.toArray();
    numList = new TS.Collections.List(false, numEnum).reverse().toList();

    isReverse = true;
    for (let index = 0; index < numList.length; index++)
    {
      if (!(numList[index] == numArray[numArray.length - 1 - index]))
      {
        isReverse = false;
      }
    }

    assert.equal(isReverse, true, "Should return a sequence in reverse order.");

    numList = new TS.Collections.List(false, TS.Linq.Enumerator.Empty).reverse().toList();

    assert.equal(numList.length, 0, "Should return an empty list for a call to reverse on an empty sequence.");
  });


  QUnit.test("select", (assert) => 
  {
    let expensiveCount: number;

    let resultList = new TS.Collections.List(false, DATA.CreateCarsArray()).select(item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") })).toList();

    expensiveCount = 0;
    for (let item of resultList)
    {
      if (item.expensive == "yes")
      {
        expensiveCount++;
      }//END if
    }//END for

    assert.equal(expensiveCount, 2, "Should return 2 elements of the expected projection type.");

    assert.throws(() =>
    {
      new TS.Collections.List<any>(false, ["", 1]).select(item => item.NOP).first();
    }, TS.Linq.SelectorException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an invalid 'selector' argument.")

    assert.throws(() =>
    {
      resultList.select(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")

    assert.throws(() =>
    {
      resultList.select(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
  });


  QUnit.test("selectMany", (assert) =>
  {
    let result = new TS.Collections.List(false, custEnum).selectMany(customer =>
    {
      return new TS.Collections.List(false, ordEnum).where(order => order.CustomerID == customer.CustomerID);
    });

    assert.equal(result.count(), ordEnum.count(), "The number of elements in the selctMany result and the orders table should match.");

    assert.throws(() =>
    {
      new TS.Collections.List<any>(false, ["", 1]).selectMany(item => item.NOP).first();
    }, TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.")

    assert.throws(() =>
    {
      result.toList().selectMany(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")

    assert.throws(() =>
    {
      result.toList().selectMany(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");

  });


  QUnit.test("sequenceEqual", (assert) =>
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);
    assert.ok(numList.sequenceEqual(numEnum), "The number list should be equal to the source number enumeration.");

    assert.ok(!numList.insert(5, 99).sequenceEqual(numEnum), "The modified number list should not be equal to the source number enumeration.");
    assert.ok(new TS.Collections.List(false, TS.Linq.Enumerator.Empty).sequenceEqual([]), "The empty list should be equal to any empty iterable sequence.");
    assert.ok(!new TS.Collections.List(false, TS.Linq.Enumerator.Empty).sequenceEqual([1]), "The empty list should not be equal to a not empty iterable sequence.");

    assert.throws(() =>
    {
      numList.sequenceEqual(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.")

    assert.throws(() =>
    {
      numList.sequenceEqual(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("shuffle", (assert) => 
  {
    let result = new TS.Collections.List(false, numEnum).shuffle().toList();

    assert.equal(result.count(), DATA.CreateNumberArray().length, "Should return a result enumerator with the same length as the source array.");
    assert.notDeepEqual(result.toArray(), DATA.CreateNumberArray(), "Should return a shuffled enumerator which doesn't be equal to the source enumerator");
    assert.deepEqual(new TS.Collections.List(false, TS.Linq.Enumerator.Empty).shuffle().toArray(), [], "A shuffeled empty enumerator should still be an empty enumerator.");
  });


  QUnit.test("single", (assert) => 
  {

    let result = new TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "OTTIK").single();
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = new TS.Collections.List(false, custEnum).single(CUST => CUST.CustomerID == "OTTIK");
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, [1, 2, 1, 2]).single();
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list with more than one element.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).single();
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty list.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, [1, 2, 1, 2]).single(item => item == 2);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more than on match with the predicate.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, [1, 2, 3, 4]).single(item => item == 5);
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a list which has no match with the predicate.");
  });


  QUnit.test("singleOrDefault", (assert) => 
  {
    let defaultObj: DATA.Customer = new DATA.Customer("Mainstreet 1", "Central City", "2 Bit 2 Fail", "We call you", "", "International", "FOO", "", "555-55-555", "12345", "");

    let result = new TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "OTTIK").singleOrDefault(DATA.Customer)
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = new TS.Collections.List(false, custEnum).singleOrDefault(DATA.Customer, CUST => CUST.CustomerID == "OTTIK");
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = new TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "NO_CUSTOMER").singleOrDefault(DATA.Customer);
    assert.deepEqual(result, new DATA.Customer(), "Should return the object created with the default constructor.")

    result = new TS.Collections.List(false, custEnum).where(CUST => CUST.CustomerID == "NO_CUSTOMER").singleOrDefault(defaultObj);
    assert.deepEqual(result, defaultObj, "Should return the object which was defined as default object.")

    result = new TS.Collections.List(false, custEnum).singleOrDefault(DATA.Customer, CUST => CUST.CustomerID == "NO_CUSTOMER");
    assert.deepEqual(result, new DATA.Customer(), "Should return the object created with the default constructor.")

    result = new TS.Collections.List(false, custEnum).singleOrDefault(defaultObj, CUST => CUST.CustomerID == "NO_CUSTOMER");
    assert.deepEqual(result, defaultObj, "Should return the object which was defined as default object.")

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).singleOrDefault(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue'."); 

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).singleOrDefault(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue'."); 

    assert.throws(() =>
    {
      new TS.Collections.List(false, [1, 2, 1, 2]).singleOrDefault(1);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an list which has more thatn one element."); 

    assert.throws(() =>
    {
      new TS.Collections.List(false, [1, 2, 1, 2]).singleOrDefault(1, item => item == 2);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for a 'predicate' which selects more than one element from the list."); 
  });


  QUnit.test("skip", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);

    assert.equal(numList.skip(3).count(), 7, "Should returns the expected number of elements.");
    assert.equal(numList.skip(12).count(), 0, "Should returns the expected number of elements.");
    assert.equal(numList.skip(0).count(), 10, "Should returns the expected number of elements.");

    assert.throws(() => 
    {
      numList.skip(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument."); 

    assert.throws(() => 
    {
      numList.skip(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument."); 

    assert.throws(() => 
    {
      numList.skip(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument."); 
  });


  QUnit.test("skipWhile", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);

    assert.equal(numList.skipWhile(item => item <= 3).count(), 7, "Should returns the expected number of elements.");
    assert.equal(numList.skipWhile(item => item <= 12).count(), 0, "Should returns the expected number of elements.");
    assert.equal(numList.skipWhile(item => item < -1).count(), 10, "Should returns the expected number of elements.");

    assert.throws(() => 
    {
      numList.skipWhile(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");

    assert.throws(() => 
    {
      numList.skipWhile(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument."); 
  });


  QUnit.test("sum", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);

    assert.equal(numList.sum(), 55, "Should return the expected value.");

    assert.throws(() => 
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).sum();

    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty list."); 

    assert.throws(() => 
    {
      new TS.Collections.List(false, ["a", "b", "c"]).sum();

    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a none numeric list."); 

    assert.throws(() => 
    {
      new TS.Collections.List(true, [1, 2, null, 3, null, 4]).sum();

    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for list which contains null values."); 

    assert.throws(() => 
    {
      new TS.Collections.List(true, [Number.MAX_SAFE_INTEGER, Number.MAX_VALUE / 2, Number.MAX_VALUE]).sum();

    }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for list which contains values which add up to an invalid value."); 

  });


  QUnit.test("take", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);

    assert.equal(numList.take(5).count(), 5, "Should return the expected number of elements value.");
    assert.equal(numList.take(0).count(), 0, "Should return the expected number of elements value.");
    assert.equal(numList.take(12).count(), 10, "Should return the expected number of elements value.");

    assert.throws(() => 
    {
      numList.take(-12).count();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' values."); 

    assert.throws(() => 
    {
      numList.take(null).count();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'count' values."); 

    assert.throws(() => 
    {
      numList.take(undefined).count();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'count' values."); 
  });


  QUnit.test("takeWhile", (assert) => 
  {
    let numList: TS.Collections.List<number>;

    numList = new TS.Collections.List<number>(false, numEnum);

    assert.equal(numList.takeWhile(item => item < 6).count(), 5, "Should return the expected number of elements value.");
    assert.equal(numList.takeWhile(item => item > 100).count(), 0, "Should return the expected number of elements value.");
    assert.equal(numList.takeWhile(item => item < 100).count(), 10, "Should return the expected number of elements value.");

    numList = new TS.Collections.List<number>(false, [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]);

    assert.deepEqual(numList.takeWhile(item => item < 5).toArray(), [1, 2, 3, 4], "Should only take until the first mismatch.");

    assert.throws(() => 
    {
      numList.takeWhile(null).count();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'predicate' values.");

    assert.throws(() => 
    {
      numList.takeWhile(undefined).count();
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'predicate' values."); 
  });


  QUnit.test("toArray", (assert) => 
  {
    let numArr: Array<number>;

    numArr = new TS.Collections.List(false, numEnum).toArray();

    assert.equal(numArr.length, numEnum.count(), "Should return a result array which matches with the source enumeration.");
    assert.equal(new TS.Collections.List(false, TS.Linq.Enumerator.Empty).toArray().length, 0, "Should return an empty array for an empty list.");

  });


  QUnit.test("union", (assert) => 
  {

    let resultNumArr = new TS.Collections.List<number>(false, [5, 3, 9, 7, 5, 9, 3, 7]).union([8, 3, 6, 4, 4, 9, 1, 0]).toArray();
    assert.deepEqual(resultNumArr, [5, 3, 9, 7, 8, 6, 4, 1, 0], "Should return the expected result when called on numbers array without equality comparer.")

    let resultCarArr1 = new TS.Collections.List<DATA.ICar>(false, carEnum).union(DATA.CreateCarsUnionTestArray()).toArray();
    assert.equal(resultCarArr1.length, 10, "Should return all elements of both test arrays when called without an equality comparer.");

    let resultCarArr2 = new TS.Collections.List(false, carEnum).union(DATA.CreateCarsUnionTestArray(), (first, second) => first.name == second.name).toArray();
    assert.equal(resultCarArr2.length, 8, "Should return only those elements of both test arrays which are uniqe when called with an equality comparer.");

    let emptyList = new TS.Collections.List(false, TS.Linq.Enumerator.Empty).union(TS.Linq.Enumerator.Empty).toList();
    assert.equal(emptyList.count(), 0, "Should return an empty enumerator when calle with empty enumerators.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).union(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, TS.Linq.Enumerator.Empty).union(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("where", (assert) => 
  {
    let resultEnum: Iterable<DATA.IPerson>;

    let result = new TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Bob");
    assert.equal(result.count(), 1, "Should return the expected number of elements for the given query.");

    result = new TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Michael");
    assert.equal(result.count(), 5, "Should return the expected number of elements for the given query.");

    result = new TS.Collections.List(false, persEnum).where(pers => pers.FirstName == "Edward");
    assert.equal(result.count(), 3, "Should return the expected number of elements for the given query.");

    result = new TS.Collections.List(false, persEnum).where(pers => pers.FirstName != "");
    assert.equal(result.count(), 400, "Should return the expected number of elements for the given query.");


    assert.throws(() =>
    {
      new TS.Collections.List(false, persEnum).where(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");

    assert.throws(() =>
    {
      new TS.Collections.List(false, persEnum).where(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
  });


  QUnit.test("zip", (assert) => 
  {

    let resultList = numEnum.zip(custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; }).toList();
    assert.notEqual(resultList, null, "Should return a none empty enumeration.");
    assert.equal(resultList.count(), numEnum.count(), "Should returns as much elements as the shorter of both enumerations has.");
    let resultElement = resultList.first();
    assert.ok((resultElement.number != undefined) && (resultElement.custID != undefined) && (resultElement.custFax != undefined), "Should return an enumeration which contains elements of the expected type.");

    assert.throws(() => 
    {
      numEnum.zip(null, (num, cust) => { return {}; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.");

    assert.throws(() => 
    {
      numEnum.zip(custEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.");

    assert.throws(() => 
    {
      numEnum.zip(undefined, (num, cust) => { return {}; })
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.");

    assert.throws(() => 
    {
      numEnum.zip(custEnum, undefined)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.");
  });

}//END module