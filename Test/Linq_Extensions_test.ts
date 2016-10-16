/// <reference path="./DATA.ts" />
/// <reference path="../_references.ts" />
/// <reference path="./Scripts/qunit.d.ts" />
module TS_Linq_Extensions_test
{
  "use strict";

  var custEnum: TS.Linq.Enumerator<DATA.ICustomer>;
  var persEnum: TS.Linq.Enumerator<DATA.IPerson>;
  var ordEnum: TS.Linq.Enumerator<DATA.IOrders>;
  var numEnum: TS.Linq.Enumerator<number>;

  QUnit.module("TS.Linq.Extensions", {
    before: function ()
    {
      // runs once before anything else in the module
      custEnum = new TS.Linq.Enumerator<DATA.ICustomer>(DATA.CreateCustomerArray());
      persEnum = new TS.Linq.Enumerator<DATA.IPerson>(DATA.CreatePersonArray());
      ordEnum = new TS.Linq.Enumerator<DATA.IOrders>(DATA.CreateOrdersArray());
      numEnum = new TS.Linq.Enumerator<number>(DATA.CreateNumberArray());
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


  QUnit.test("aggregate", (assert) => 
  {
    let numberResult: number;
    let stringResult: string;
    let carNumberResult: number;
    let carStringResult: string;

    numberResult = TS.Linq.Extensions.aggregate(DATA.CreateNumberArray(), (first, second) =>
    {
      return first + second;
    });
    assert.equal(numberResult, 55, "Should return '55' on TS.Linq.Enumerator<number> .");

    stringResult = TS.Linq.Extensions.aggregate(DATA.CreateStringArray(), (first, second) =>
    {
      return first + ", " + second;
    });
    assert.equal(stringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "Should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerator<string> .");

    carNumberResult = TS.Linq.Extensions.aggregate(DATA.CreateCarsArray(), (first: number, second: DATA.Car) => first + second.horsePower, 0);
    assert.equal(carNumberResult, 595, "Should return 595 on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'horsePower' and a seed value of '0'.");

    carStringResult = TS.Linq.Extensions.aggregate(DATA.CreateCarsArray(), (first: string, second: DATA.Car) => first + second.name, "");
    assert.equal(carStringResult, "BMWAUDIVWFIATTRABANT", "Should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerator<DATA.Car> collection with an accumulator function on 'name' and a seed value of \"\".");

    //Empty enumerator
    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(TS.Linq.Enumerator.Empty, (first, second) => { return first + second; });
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");

    //Null enumerator
    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(null, (first, second) => { return first + second; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    //Undefined enumerator
    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(undefined, (first, second) => { return first + second; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    //Null accumulator
    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate(DATA.CreateStringArray(), null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'accumulator' argument.");


    //Undefined accumulator
    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate(DATA.CreateStringArray(), undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'accumulator' argument.");

  });


  QUnit.test("all", (assert) =>
  {
    let testResult: boolean;

    assert.equal(TS.Linq.Extensions.all(TS.Linq.Enumerator.Empty, (item) => false), true, "Should return true for an empty enumerator.");

    testResult = TS.Linq.Extensions.all<string>(DATA.CreateStringArray(), (item) => item.length >= 3);
    assert.ok(testResult, "Should return true on a predicate that should pass.");

    testResult = TS.Linq.Extensions.all<string>(DATA.CreateStringArray(), (item) => item.length > 4);
    assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(null, (item) => item.length < 0);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(DATA.CreateStringArray(), null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(undefined, (item) => item.length < 0);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(DATA.CreateStringArray(), undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");

  });


  QUnit.test("any", (assert) => 
  {
    let testResult: boolean;

    assert.equal(TS.Linq.Extensions.any(TS.Linq.Enumerator.Empty, (item) => true), false, "Should return false on an empty 'enumerator'.");

    testResult = TS.Linq.Extensions.any(DATA.CreateStringArray(), (item) => item.length >= 3);
    assert.ok(testResult, "Should return true on a predicate that should pass.");

    testResult = TS.Linq.Extensions.any(DATA.CreateStringArray(), (item) => item.length < 2);
    assert.ok(!testResult, "Should return false on a predicate that shouldn't pass.");

    testResult = TS.Linq.Extensions.any(DATA.CreateStringArray());
    assert.ok(testResult, "Should return true on a none empty 'enumerable' without predicate.");

    testResult = TS.Linq.Extensions.any(TS.Linq.Enumerator.Empty);
    assert.ok(!testResult, "Should return false on an empty 'enumerable' without predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.any<string>(null, (item) => item.length < 0);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.any<string>(undefined, (item) => item.length < 0);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

  });


  QUnit.test("average", (assert) =>
  {
    let testNumberArray: Array<number>;
    let testResult: number;

    testNumberArray = DATA.CreateNumberArray();
    testResult = TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>(testNumberArray));
    assert.equal(testResult, 5.5, "Should return the expected average.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>([]));
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for an empty 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    testNumberArray.push(Number.MAX_VALUE / 2);
    testNumberArray.push(Number.MAX_VALUE);

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(new TS.Linq.Enumerator<number>(testNumberArray));
    }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an 'Enumerator<number>' which elements sum exceedes the number range.");
  });


  QUnit.test("concat", (assert) =>
  {
    let concatenatedNumberEnumerator: TS.Linq.Enumerator<number>;
    let concatenatedStringEnumerator: TS.Linq.Enumerator<string>;
    let numberArray: Array<number>;
    let stringArray: Array<string>;
    let compareNumberArray: Array<number>;

    concatenatedNumberEnumerator = TS.Linq.Extensions.concat<number>(new TS.Linq.Enumerator<number>(DATA.CreateNumberArray()), new TS.Linq.Enumerator<number>(DATA.CreateNumberArray()));
    numberArray = TS.Linq.Extensions.toArray(concatenatedNumberEnumerator);
    assert.deepEqual(numberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return the expected result of the concatenation.");

    concatenatedStringEnumerator = TS.Linq.Extensions.concat<string>(new TS.Linq.Enumerator<string>(DATA.CreateStringArray()), new TS.Linq.Enumerator<string>(DATA.CreateStringArray()));
    stringArray = TS.Linq.Extensions.toArray(concatenatedStringEnumerator);
    assert.deepEqual(stringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return the expected result of the concatenation.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(null, new TS.Linq.Enumerator(DATA.CreateStringArray()));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(new TS.Linq.Enumerator(DATA.CreateStringArray()), null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(undefined, new TS.Linq.Enumerator(DATA.CreateStringArray()));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(new TS.Linq.Enumerator(DATA.CreateStringArray()), undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("contains", (assert) =>
  {
    let testResult: boolean;
    let emptyEnumerator: TS.Linq.Enumerator<any>;
    let testCar: DATA.ICar

    testCar = new DATA.Car("SCODA");

    emptyEnumerator = new TS.Linq.Enumerator<any>([]);

    testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(DATA.CreateNumberArray()), 5);
    assert.ok(testResult, "Should return the expected result of the contains function.");

    testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(DATA.CreateNumberArray()), 11);
    assert.ok(!testResult, "Should return the expected result of the contains function.");

    testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(DATA.CreateStringArray()), "five");
    assert.ok(testResult, "Should return the expected result of the contains function.");

    testResult = TS.Linq.Extensions.contains(new TS.Linq.Enumerator(DATA.CreateStringArray()), "eleven");
    assert.ok(!testResult, "Should return the expected result of the contains function.");

    testResult = TS.Linq.Extensions.contains(emptyEnumerator, 123);
    assert.ok(!testResult, "Should return the expected result of the contains function.");

    testResult = TS.Linq.Extensions.contains<DATA.ICar>(new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray()), DATA.CreateCarsArray()[3], (first: DATA.ICar, second: DATA.ICar) => first.name == second.name);
    assert.ok(testResult, "Should return the expected result of the contains function which uses an equality comparer.");

    testResult = TS.Linq.Extensions.contains<DATA.ICar>(new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray()), testCar, (first: DATA.ICar, second: DATA.ICar) => first.name == second.name);
    assert.ok(!testResult, "Should return the expected result of the contains function which uses an equality comparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(null, 123);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(emptyEnumerator, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'element' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(undefined, 123);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(emptyEnumerator, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");
  });


  QUnit.test("count", (assert) =>
  {
    let numberEnumerator: TS.Linq.Enumerator<number>;
    let stringEnumerator: TS.Linq.Enumerator<string>;
    var carEnumerator: TS.Linq.Enumerator<DATA.ICar>;

    numberEnumerator = new TS.Linq.Enumerator<number>(DATA.CreateNumberArray());
    stringEnumerator = new TS.Linq.Enumerator<string>(DATA.CreateStringArray());
    carEnumerator = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());

    assert.equal(TS.Linq.Extensions.count(numberEnumerator), 10, "Should count 10 numbers out of 10.");
    assert.equal(TS.Linq.Extensions.count(numberEnumerator, (item) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
    assert.equal(TS.Linq.Extensions.count(new TS.Linq.Enumerator([])), 0, "Should counted 0 on an empty enumerator.");
    assert.equal(TS.Linq.Extensions.count(stringEnumerator, (item) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
    assert.equal(TS.Linq.Extensions.count(carEnumerator, (item) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerator<TDATA.Car>' using a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.count(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.count(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("cycle", (assert) =>
  {
    let stringEnumerator: Iterable<string>;
    let resultEnumerator: Iterable<string>;
    let resultArray: Array<string>;

    stringEnumerator = new TS.Linq.Enumerator<string>(DATA.CreateStringArray());
    resultEnumerator = TS.Linq.Extensions.take(TS.Linq.Extensions.cycle(stringEnumerator), 40);
    resultArray = TS.Linq.Extensions.toArray(resultEnumerator);
    assert.equal(resultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");

    resultEnumerator = TS.Linq.Extensions.take<string>(TS.Linq.Extensions.cycle<string>(new TS.Linq.Enumerator<string>([])), 20);
    resultArray = TS.Linq.Extensions.toArray(resultEnumerator);
    assert.equal(resultArray.length, 0, "Should return an empty enumerator if the argument 'enumerator' was also an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.cycle(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.cycle(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("defaultIfEmpty", (assert) =>
  {
    let carEnumerator: Iterable<DATA.ICar>;
    let numEnumerator: Iterable<number>;
    let resultCarArray: Array<DATA.ICar>;
    let resultNumArray: Array<number>;

    carEnumerator = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Enumerator.Empty, DATA.Car);
    resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
    assert.deepEqual(resultCarArray[0], new DATA.Car(), "Should return an enumerator with one default object element if called with an empty enumerator.");

    carEnumerator = TS.Linq.Extensions.defaultIfEmpty<DATA.ICar>(new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray()), DATA.Car);
    resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
    assert.deepEqual(resultCarArray, DATA.CreateCarsArray(), "Should return the original enumerator if called with a none empty enumerator.");

    numEnumerator = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Enumerator.Empty, 1);
    resultNumArray = TS.Linq.Extensions.toArray(numEnumerator);
    assert.deepEqual(resultNumArray, [1], "Should return an enumerator with one default primitive value element if called with an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(null, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(new TS.Linq.Enumerator<DATA.ICar>([]), null)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(undefined, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(new TS.Linq.Enumerator<DATA.ICar>([]), undefined)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");
  });


  QUnit.test("distinct", (assert) =>
  {
    let doubleCarArray: Array<DATA.ICar>;
    let carEnumerator: Iterable<DATA.ICar>;
    let resultCarArray: Array<DATA.ICar>;
    let numberArray: Array<number>;

    doubleCarArray = DATA.CreateCarsArray().concat(DATA.CreateCarsArray());
    carEnumerator = TS.Linq.Extensions.distinct<DATA.ICar>(new TS.Linq.Enumerator<DATA.ICar>(doubleCarArray), (first: DATA.ICar, second: DATA.ICar) => first.name == second.name);
    resultCarArray = TS.Linq.Extensions.toArray(carEnumerator);
    assert.deepEqual(resultCarArray, DATA.CreateCarsArray(), "Should return an enumerator with the expected elements.");

    numberArray = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(new TS.Linq.Enumerator<number>([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9])));
    assert.equal(numberArray.length, 10, "Should return an enumerator with the expected elements.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.distinct(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.distinct(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("elementAt", (assert) =>
  {
    let carEnumerator: TS.Linq.Enumerator<DATA.ICar>;
    let resultCar: DATA.ICar;

    carEnumerator = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());

    resultCar = TS.Linq.Extensions.elementAt(carEnumerator, 3);
    assert.deepEqual(resultCar, DATA.CreateCarsArray()[3], "Should return the element at the required position.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(carEnumerator, -3);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(carEnumerator, 3.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(carEnumerator, 20);
    }, TS.IndexOutOfRangeException, "The call should fail with a \"TS.IndexOutOfRangeException\" for an invalid 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(null, 20);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(carEnumerator, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(undefined, 20);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(carEnumerator, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");

  });


  QUnit.test("elementAtOrDefault", (assert) =>
  {
    let carEnumerator: TS.Linq.Enumerator<DATA.ICar>;
    let resultCar: DATA.ICar;

    carEnumerator = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());

    resultCar = TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 3, DATA.Car);
    assert.deepEqual(resultCar, DATA.CreateCarsArray()[3], "Should return the element at the required position.");

    resultCar = TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, DATA.Car);
    assert.deepEqual(resultCar, new DATA.Car(), "Should return a default element for a required position out of the range of the enumerator.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(carEnumerator, -3, DATA.Car);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument.");;

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(null, 20, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(carEnumerator, null, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(undefined, 20, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(carEnumerator, undefined, DATA.Car);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(carEnumerator, 20, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("empty", (assert) =>
  {
    let emptyCarEnumerator: TS.Linq.Enumerator<DATA.Car>;

    emptyCarEnumerator = new TS.Linq.Enumerator<DATA.Car>(new Array<DATA.Car>());
    assert.ok(TS.Utils.Assert.isIterable(emptyCarEnumerator), "Should create an iterable object.");
    assert.ok(TS.Linq.Extensions.count(emptyCarEnumerator) == 0, "The created enumerator should have 0 elements.");
  });


  QUnit.test("except", (assert) =>
  {
    let lowNumEnum: Iterable<number>;
    let higNumEnum: Iterable<number>;
    let resultEnum: Iterable<number>;
    let resultArray: Array<number>;
    let carEnum: Iterable<DATA.Car>;
    let carResultEnum: Iterable<DATA.Car>;
    let carResultArray: Array<DATA.Car>;

    //var _testInputCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    //var _testCarResultArray: Array<TS_Linq_test_common.Car>;

    lowNumEnum = new TS.Linq.Enumerator<number>([1, 2, 3, 4, 5, 6]);
    higNumEnum = new TS.Linq.Enumerator<number>([4, 5, 6, 7, 8, 9]);
    resultEnum = TS.Linq.Extensions.except(lowNumEnum, higNumEnum);
    resultArray = TS.Linq.Extensions.toArray(resultEnum);
    assert.deepEqual(resultArray, [1, 2, 3], "Should return a result set with 3 elements.");

    resultEnum = TS.Linq.Extensions.except(lowNumEnum, new TS.Linq.Enumerator<number>([1, 2]));
    resultArray = TS.Linq.Extensions.toArray(resultEnum);
    assert.deepEqual(resultArray, [3, 4, 5, 6], "Should return a result set with 4 elements.");

    resultEnum = TS.Linq.Extensions.except(lowNumEnum, new TS.Linq.Enumerator<number>([2, 5]));
    resultArray = TS.Linq.Extensions.toArray(resultEnum);
    assert.deepEqual(resultArray, [1, 3, 4, 6], "Should return a result set with 4 elements.");

    carEnum = new TS.Linq.Enumerator<DATA.Car>([
      new DATA.Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000),
      new DATA.Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000),
      new DATA.Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000),
      new DATA.Car("FIAT", 60, false, Date.parse("1980-01-01"), 500)
    ]);

    carResultEnum = TS.Linq.Extensions.except<DATA.Car>(new TS.Linq.Enumerator<DATA.Car>(DATA.CreateCarsArray()), carEnum, (first, second) => first.name == second.name);
    carResultArray = TS.Linq.Extensions.toArray(carResultEnum);
    assert.equal(carResultArray.length, 3, "Should return a result set with 3 elements.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(null, TS.Linq.Enumerator.Empty);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(TS.Linq.Enumerator.Empty, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(undefined, TS.Linq.Enumerator.Empty);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(TS.Linq.Enumerator.Empty, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("first", (assert) =>
  {
    let result: DATA.IPerson;

    result = TS.Linq.Extensions.first(persEnum);
    assert.equal(result.LastName, "Sánchez", "Should return the first match in the result set.");

    result = TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Michael");
    assert.equal(result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      result = TS.Linq.Extensions.first(persEnum, (item) => item.FirstName == "Snow-white");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for call with no match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(TS.Linq.Enumerator.Empty);
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(persEnum, (item: any) => item.NoAttribute == "NOP");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an invalid predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(TS.Linq.Enumerator.Empty, (item: number) => item.toString() == "5");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a call with an empty 'enumerator' and a 'predicate'.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.first(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.first(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

  });


  QUnit.test("firstOrDefault", (assert) =>
  {
    let result: any;
    let carEnum: TS.Linq.Enumerator<DATA.Car>;


    carEnum = new TS.Linq.Enumerator<DATA.Car>(DATA.CreateCarsArray());

    result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car);
    assert.equal(result.name, "BMW", "Should return the first match in the result set.");

    result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item) => item.name == "faöejrfkesjköpaf")
    assert.deepEqual(result, new DATA.Car(), "Should return a default object for a call with a predicate with no match.");

    result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item) => item.name == "AUDI");
    assert.equal(result.name, "AUDI", "Should return the first match in the result set when called with a matching predicate.");

    result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item) => item.name == "faöejrfkesjköpaf");
    assert.deepEqual(result, new DATA.Car(), "Should return a default object for a call with a predicate with no match.");

    result = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item: any) => item.noValidAttribute == 5);
    assert.deepEqual(result, new DATA.Car(), "Should return a default object for a call with a invalid predicate.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.firstOrDefault(null, DATA.Car, (item) => true);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.firstOrDefault(TS.Linq.Enumerator.Empty, null, (item) => true);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructorOrValue' argument.");


    assert.throws(() => 
    {
      TS.Linq.Extensions.firstOrDefault(undefined, DATA.Car, (item) => true);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.firstOrDefault(TS.Linq.Enumerator.Empty, undefined, (item) => true);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructorOrValue' argument.");

  });


  QUnit.test("foreach", (assert) => 
  {
    var passed: boolean;
    let carEnum: Iterable<DATA.Car>;

    carEnum = new TS.Linq.Enumerator<DATA.Car>(DATA.CreateCarsArray().concat(DATA.CreateCarsUnionTestArray()));

    carEnum = TS.Linq.Extensions.forEach(carEnum, (item) => item.horsePower = 12);

    passed = true;
    for (let item of carEnum)
    {
      if (item.horsePower != 12)
      {
        passed = false;
      }
    }

    assert.ok(passed, "Should return an enumeration with the expected changes on each element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.forEach(null, item => { });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.forEach(undefined, item => { });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.forEach(carEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'action' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.forEach(carEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'action' argument.");

  });


  QUnit.test("groupBy", (assert) =>
  {
    let resultCustomerEnum: TS.Linq.Enumerator<TS.Linq.Grouping<string, DATA.ICustomer>>;
    let resultProductEnum: TS.Linq.Enumerator<TS.Linq.Grouping<string, DATA.IProduct>>;
    let resultProductEnumStorageRoom: TS.Linq.Enumerator<TS.Linq.Grouping<string, string>>;
    let resultProductEnumerableStorageRoomConcat: TS.Linq.Enumerator<{ Key: string; RoomConcat: string }>;

    resultCustomerEnum = TS.Linq.Extensions.groupBy(custEnum, _CUST => _CUST.Country);
    assert.equal(TS.Linq.Extensions.count(resultCustomerEnum), 21, "Should return 21 elements for the executed expression.");

    let resProArr = DATA.CreateProductArray()

    resultProductEnum = TS.Linq.Extensions.groupBy(new TS.Linq.Enumerator<DATA.IProduct>(resProArr), item => TS.Utils.findSingleCurrency(item.Currency).Code);
    assert.equal(TS.Linq.Extensions.count(resultProductEnum), 5, "Should return 5 elements for the executed expression with equalityComparer.");

    //for (let outerItem of resultProductEnum)
    //{
    //  console.log(JSON.stringify(outerItem));
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}

    function equComp(first: string, second: string): boolean
    {
      return TS.Utils.findSingleCurrency(first).Code === TS.Utils.findSingleCurrency(second).Code
    }

    resultProductEnumStorageRoom = TS.Linq.Extensions.groupBy(new TS.Linq.Enumerator<DATA.IProduct>(resProArr), item => TS.Utils.findSingleCurrency(item.Currency).Code, equComp, (item) => item.Storage.Room);
    assert.equal(TS.Linq.Extensions.count(resultProductEnumStorageRoom), 5, "Should return 5 elements for the executed expression with elementSelector.");

    //for (let outerItem of resultProductEnumStorageRoom)
    //{
    //  console.log(JSON.stringify(outerItem));
    //  for (let innerItem of outerItem)
    //  {
    //    console.log("  " + JSON.stringify(innerItem));
    //  }
    //}

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(null, _CUST => _CUST);;
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(undefined, _CUST => _CUST);;
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(TS.Linq.Enumerator.Empty, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'keySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(TS.Linq.Enumerator.Empty, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'keySelector' argument.");

  });


  QUnit.test("groupJoin", (assert) =>
  {
    let jointEnum: Iterable<any>;
    let ordersCount: number;

    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
    //The query will return 91 Results.


    jointEnum = TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID,  (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }));
    assert.equal(TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");

    ordersCount = 0;
    for (let item of jointEnum)
    {
      //console.log("***************************************************");
      //console.log(JSON.stringify(item));
      //console.log("***************************************************");
      
      for (let order of item.OrderGroup)
      {
        ordersCount++;
        //console.log("  " + JSON.stringify(order));
      }
    }
    console.log("Total orders: " + ordersCount);
    assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");

    //
    //Call the query once again but using the 'equalityComparer' instead of the default comparer.
    //Should return the same result.
    //
    jointEnum = TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey: string, innerKey: string) => outerKey == innerKey);
    assert.equal(TS.Linq.Extensions.count(jointEnum), 91, "Should return 91 elements for the executed expression.");

    ordersCount = 0;
    for (let item of jointEnum)
    {
      //console.log("***************************************************");
      //console.log(JSON.stringify(item));
      //console.log("***************************************************");
      for (let order of item.OrderGroup)
      {
        ordersCount++;
        //console.log("  " + JSON.stringify(order));
      }
    }

    assert.equal(ordersCount, 830, "Should return 830 order records for the executed expression.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
  });


  QUnit.test("intersect", (assert) => 
  {
    let carsUnionEnum: Iterable<DATA.Car>;
    let carsEnum: Iterable<DATA.Car>;
    let carsIntersect: Iterable<DATA.Car>;
    let numberEnumFirst: Iterable<number>;
    let numberEnumSecond: Iterable<number>;
    let numberIntersect: Iterable<number>;

    carsUnionEnum = new TS.Linq.Enumerator<DATA.Car>(DATA.CreateCarsUnionTestArray());
    carsEnum = new TS.Linq.Enumerator<DATA.Car>(DATA.CreateCarsArray());

    carsIntersect = TS.Linq.Extensions.intersect(carsEnum, carsUnionEnum, (first, second) => first.name === second.name);

    assert.equal(TS.Linq.Extensions.count(carsIntersect), 2, "Schould return a result set with 2 elements when called with an equality comparer.");

    numberEnumFirst = new TS.Linq.Enumerator<number>(DATA.CreateNumberArray());
    numberEnumSecond = new TS.Linq.Enumerator<number>([2, 4, 7, 8]);
    numberIntersect = TS.Linq.Extensions.intersect(numberEnumFirst, numberEnumSecond);

    assert.equal(TS.Linq.Extensions.count(numberIntersect), 4, "Schould return a result set with 4 elements when called without an equality comparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(null, numberEnumSecond);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(undefined, numberEnumSecond);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(numberEnumFirst, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(numberEnumFirst, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");
  });


  QUnit.test("join", (assert) =>
  {
    let jointEnum: TS.Linq.Enumerator<any>;



    jointEnum = TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));

    assert.equal(TS.Linq.Extensions.count(jointEnum), 830, "Should return 830 records for the executed expression.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'resultSelector' argument.");
  });


  QUnit.test("last", (assert) =>
  {
    let result: DATA.IPerson;

    result = TS.Linq.Extensions.last(persEnum);
    assert.equal(result.LastName, "Cox", "Should return the last element in the result set.");

    result = TS.Linq.Extensions.last(persEnum, (item) => item.FirstName == "Michael");
    assert.equal(result.LastName, "Martin", "Should return the last match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(TS.Linq.Enumerator.Empty);
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(persEnum, (item: any) => item.NoAttribute == "NOP");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" when called with a predicate that doesn't match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(TS.Linq.Enumerator.Empty, (item: number) => item.toString() == "5");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" on an empty enumerator when called with a predicate.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.last(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.last(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

  });


  QUnit.test("lastOrDefault", (assert) =>
  {
    let result: DATA.ICustomer;

    result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.Customer);
    assert.equal(result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");

    result = TS.Linq.Extensions.lastOrDefault(TS.Linq.Enumerator.Empty, DATA.Customer);
    assert.deepEqual(result, new DATA.Customer(), "Should return a default object if the enumerable is empyt.");

    result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.Customer, (Item) => Item.Country == "USA");
    assert.equal(result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate.");

    result = TS.Linq.Extensions.lastOrDefault(custEnum, DATA.Customer, (Item) => Item.Country == "NOP");
    assert.deepEqual(result, new DATA.Customer(), "Should return a default object when called with a predicate that doesn't match.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(null, DATA.Customer);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(undefined, DATA.Customer);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(custEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(custEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");

    //assert.ok(false, "Not implemented.");
  });


  QUnit.test("max", (assert) =>
  {
    let max: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Max().Dump();
    //The query will return 1007.6400

    max = TS.Linq.Extensions.max(TS.Linq.Extensions.select(ordEnum, (_ORD => _ORD.Freight)));
    assert.equal(max, 1007.64, "Should return the expected value.");

    max = TS.Linq.Extensions.max(new TS.Linq.Enumerator<number>(DATA.CreateNumberArray()));
    assert.equal(max, 10, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(TS.Linq.Enumerator.Empty);
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorException\" for a empty 'enumerator' argument.");
  });


  QUnit.test("min", (assert) =>
  {
    let min: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Min().Dump();
    //The query will return 0.0200

    min = TS.Linq.Extensions.min(TS.Linq.Extensions.select(ordEnum, _ORD => _ORD.Freight));
    assert.equal(min, 0.02, "Should return the expected value.");

    min = TS.Linq.Extensions.min(new TS.Linq.Enumerator<number>(DATA.CreateNumberArray()));
    assert.equal(min, 1, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(TS.Linq.Enumerator.Empty);
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptio\" for a empty 'enumerable' argument.");
  });


  QUnit.test("orderBy", (assert) =>
  {
    let orderedEnumerator: TS.Linq.OrderedEnumerator<any, any>;
    let orderCorrect: boolean;
    let index: number;
    let partIter: Iterator<Iterator<any>>;
    let partIterResult: IteratorResult<Iterator<any>>;
    let partCount = 0;
    let lastItem = "";
    let lastItemColor = "";
    let lastItemCountry = "";
    let lastNumber = 0;

    orderedEnumerator = TS.Linq.Extensions.orderBy(new TS.Linq.Enumerator<DATA.ISortTestItem>(DATA.CreateSortTestArray()), (item) => item.color);

    orderCorrect = true;
    lastItemColor = "";

    for (let item of orderedEnumerator)
    {
      if (item.color < lastItemColor)
      {
        orderCorrect = false;
      }
      lastItemColor = item.color;
    }//END for

    assert.ok(orderCorrect, "The orderedEnumerator items should be sorted by color in ascending order.");

    partIter = orderedEnumerator.partitionIterator();
    partCount = 0;

    partIterResult = partIter.next();
    while (!partIterResult.done)
    {
      partCount++;
      partIterResult = partIter.next();
    }

    assert.equal(partCount, 3, "The orderedEnumerator should hold three partitions for the different colors found during last sort.");

    orderedEnumerator = TS.Linq.Extensions.orderBy<number, number>(new TS.Linq.Enumerator<number>(DATA.CreateRandomNumberArray(100)), (item) => item);

    orderCorrect = true;
    lastNumber = 0;

    for (let item of orderedEnumerator)
    {
      if (item < lastNumber)
      {
        orderCorrect = false;
      }
      lastNumber = item;
    }//END for

    assert.ok(orderCorrect, "Should returns an array of numbers sorted in ascending order.");

    orderedEnumerator = TS.Linq.Extensions.orderBy<DATA.Customer, string>(custEnum, item => item.Country, (first, second) => first.localeCompare(second));

    lastItemCountry = "";
    for (let item of orderedEnumerator)
    {
      if (item.Country < lastItemCountry)
      {
        orderCorrect = false;
      }
      lastItemCountry = item.Country;
    }//END for

    assert.ok(orderCorrect, "Should returns an array of customers sorted by country in ascending order.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(null, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(undefined, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(TS.Linq.Enumerator.Empty, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selctor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(TS.Linq.Enumerator.Empty, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");

  });


  QUnit.test("orderByDescending", (assert) =>
  {
    let sortTestEnum: TS.Linq.Enumerator<DATA.ISortTestItem>;
    let randomNumberEnum: TS.Linq.Enumerator<number>;
    let resultSortTestEnum: TS.Linq.OrderedEnumerator<DATA.ISortTestItem, string>;
    let resultNumberEnum: TS.Linq.OrderedEnumerator<number, number>;
    let resultCustomersEnum: TS.Linq.OrderedEnumerator<DATA.ICustomer, string>;
    let orderCorrect: boolean;

    sortTestEnum = new TS.Linq.Enumerator<DATA.ISortTestItem>(DATA.CreateSortTestArray());
    resultSortTestEnum = TS.Linq.Extensions.orderByDescending(sortTestEnum, (item) => item.color);

    orderCorrect = true;
    let lastColor: string = null;

    for (let item of resultSortTestEnum)
    {
      if (lastColor != null)
      {
        if (lastColor < item.color)
        {
          orderCorrect = false;
        }
        lastColor = item.color;
      }
    }

    assert.ok(orderCorrect, "The array of ISortTestItems should be sorted by color in descending order.");

    randomNumberEnum = new TS.Linq.Enumerator<number>(DATA.CreateRandomNumberArray(100));
    resultNumberEnum = TS.Linq.Extensions.orderByDescending(randomNumberEnum, item => item);

    orderCorrect = true;
    let lastNumber: number = null;

    for (let item of resultNumberEnum)
    {
      if (lastNumber != null)
      {
        if (lastNumber < item)
        {
          orderCorrect = false;
        }
        lastNumber = item;
      }
    }

    assert.ok(orderCorrect, "Should returns an array of numbers sorted in descending order.");

    resultCustomersEnum = TS.Linq.Extensions.orderByDescending(custEnum, item => item.Country, (first, second) =>
    {
      if (first > second)
      {
        return 1;
      };
      if (first < second)
      {
        return -1;
      };
      return 0;
    });

    let resultString = TS.Linq.Extensions.first(resultCustomersEnum).Country + ", " + TS.Linq.Extensions.last(resultCustomersEnum).Country;

    assert.equal(resultString, "Venezuela, Argentina", "Should return an array sorted by country in descending order using the specified key and comparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(null, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(undefined, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(custEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(custEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.");

  });


  QUnit.test("random", (assert) =>
  {
    let stringResultEnum: Iterable<string>;
    let isRandom = false;

    stringResultEnum = TS.Linq.Extensions.take(TS.Linq.Extensions.random(DATA.CreateStringArray()), 50);

    let lastItem: string = null;
    for (let item of stringResultEnum)
    {
      if (lastItem != null)
      {
        if (lastItem != item)
        {
          isRandom = true;
        }
      }
      lastItem = item;
    }

    assert.ok(isRandom, "Should return a string array in random order.");


    assert.throws(() =>
    {
      TS.Linq.Extensions.first(TS.Linq.Extensions.random(TS.Linq.Enumerator.Empty));
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumeratorExceptionn\" for an empty 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.random(null)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.random(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerable' argument.");
  });


  QUnit.test("range", (assert) => 
  {
    let resultEnum: Iterable<Number>;

    resultEnum = TS.Linq.Extensions.range(1, 50);
    assert.equal(TS.Linq.Extensions.count(resultEnum), 50, "Should return an enumerator with 50 elements.");

    resultEnum = TS.Linq.Extensions.range(111, 0);
    assert.equal(TS.Linq.Extensions.count(resultEnum), 0, "Should return an enumerable with 0 elements.");


    assert.throws(() =>
    {
      TS.Linq.Extensions.range(Number.MAX_SAFE_INTEGER - 2, 5);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a 'start, count' combination which exceedes the allowed range.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(Number.MAX_VALUE, 5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer in the range [Number.MIN_SAFE_INTEGER .. Number.MAX_SAFE_INTEGER]");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(5.5, 5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'start' argument which is not an integer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(1, -3);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(null, 33);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'start' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(undefined, 33);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'start' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(12, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(12, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'count' argument.");
  });


  QUnit.test("repeat", (assert) =>
  {
    let sourceElement: DATA.ICar;
    let resultEnum: Iterable<DATA.ICar>;

    sourceElement = DATA.CreateCarsArray()[0];

    resultEnum = TS.Linq.Extensions.repeat(sourceElement, 50);
    assert.ok(TS.Linq.Extensions.count(resultEnum) == 50 && TS.Linq.Extensions.first(resultEnum).name == "BMW" && TS.Linq.Extensions.last(resultEnum).name == "BMW", "Should return a result with as much elements as required and of the same type.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.repeat(undefined, 33);
    }, TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'element' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.repeat(sourceElement, -33);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeExceptionn\" for a negative 'count' argument.");
  });


  QUnit.test("reverse", (assert) =>
  {
    let resultEnum: Iterable<number>;
    let controlArray: Array<number>;
    let isReverse: boolean;


    controlArray = DATA.CreateNumberArray().reverse();
    resultEnum = TS.Linq.Extensions.reverse(DATA.CreateNumberArray());

    isReverse = true;
    for (let item of resultEnum)
    {
      if (item != controlArray.shift())
      {
        isReverse = false;
        break;
      }//END if
    }//END for

    assert.ok(isReverse, "Should return an enumerator in reverse order.");

    resultEnum = TS.Linq.Extensions.reverse(TS.Linq.Enumerator.Empty);

    assert.equal(TS.Linq.Extensions.count(resultEnum), 0, "Should return an empty enumerator if the input enumerator was also empty.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.reverse(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");


    assert.throws(() =>
    {
      TS.Linq.Extensions.reverse(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

  });


  QUnit.test("select", (assert) =>
  {
    let resultEnum: TS.Linq.Enumerator<any>;
    let expensiveCount: number;

    resultEnum = TS.Linq.Extensions.select(DATA.CreateCarsArray(), item => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") }));

    expensiveCount = 0;
    for (let item of resultEnum)
    {
      if (item.expensive == "yes")
      {
        expensiveCount++;
      }//END if
    }//END for

    assert.equal(expensiveCount, 2, "Should return two expensive cars from the cars enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(resultEnum, item => item.NOP).first();
    }, TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorException\" for a call with an invalid 'selector' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(null, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(undefined, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(resultEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(resultEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
  });


  QUnit.test("selectMany", (assert) =>
  {
    let resultSelectMany: Iterable<string>;
    let resultSelectManyOrder: Iterable<{ CustomerID: string, OrderID: number }>;

    interface IPetOwner 
    {
      Name: string,
      Pets: Array<string>
    }

    let petOwners: Array<IPetOwner> = [{ Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
      { Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
      { Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }];

    resultSelectMany = TS.Linq.Extensions.selectMany<IPetOwner, string>(petOwners, owner => owner.Pets);
    assert.equal(TS.Linq.Extensions.count(resultSelectMany), 6, "Should return the full list of pet names.");


    let result = TS.Linq.Extensions.selectMany(custEnum, customer =>
    {
      return TS.Linq.Extensions.where(ordEnum, order => order.CustomerID == customer.CustomerID);
    });

    assert.equal(TS.Linq.Extensions.count(result), TS.Linq.Extensions.count(ordEnum), "The number of elements in the selctMany result and the orders table should match.");

    assert.throws(() =>
    {
      let tempEnum = new TS.Linq.Enumerator<any>(["", 1]);
      TS.Linq.Extensions.selectMany(tempEnum, item => item.NOP).first();
    }, TS.Linq.SelectorException, "The call should fail with a \"TS.Linq.SelectorExceptionn\" for a call with an invalid 'selector' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(null, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(undefined, item => item);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(TS.Linq.Enumerator.Empty, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'selector' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(TS.Linq.Enumerator.Empty, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"Should throw a TS.ArgumentNullOrUndefinedException\" for an undefined 'selector' argument.");
  });


  QUnit.test("sequenceEqual", (assert) =>
  {
    let numArray: Array<Number>;
    let custEnumEx: TS.Linq.Enumerator<DATA.ICustomer>;
    let custArray: Array<DATA.ICustomer>;
    let compareResult: boolean;


    compareResult = TS.Linq.Extensions.sequenceEqual(DATA.CreateNumberArray(), DATA.CreateNumberArray());
    assert.ok(compareResult, "Should return true when comparing two equal enumerators");

    compareResult = TS.Linq.Extensions.sequenceEqual(custEnum, custEnum, (first, second) => first.ContactName == second.ContactName);
    assert.ok(compareResult, "Should return true when comparing two equal enumerators using an equalityComparer");

    custArray = custEnum.toArray();
    custArray[12] = new DATA.Customer("", "", "", "No contact name");
    custEnumEx = new TS.Linq.Enumerator<DATA.ICustomer>(custArray);
    compareResult = TS.Linq.Extensions.sequenceEqual(custEnum, custEnumEx, (first, second) => first.ContactName == second.ContactName);
    assert.ok(!compareResult, "Should return false when comparing two enumerators with different elements usin an equalityComparer");

    numArray = DATA.CreateNumberArray();
    numArray.push(99);
    compareResult = TS.Linq.Extensions.sequenceEqual(DATA.CreateNumberArray(), numArray);
    assert.ok(!compareResult, "Should return false when comparing two enumerators with different length");


    numArray = DATA.CreateNumberArray()
    numArray[5] = Math.PI;
    compareResult = TS.Linq.Extensions.sequenceEqual(DATA.CreateNumberArray(), numArray);
    assert.ok(!compareResult, "Should return false when comparing two unequal enumerators");


    compareResult = TS.Linq.Extensions.sequenceEqual(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty);
    assert.ok(compareResult, "Should return true when comparing two empty enumerators");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(null, numArray);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(undefined, numArray);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(numArray, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(numArray, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnumerator' argument.");

  });


  QUnit.test("shuffle", (assert) =>
  {
    let numEnum: TS.Linq.Enumerator<number>;

    numEnum = TS.Linq.Extensions.shuffle(DATA.CreateNumberArray());

    assert.equal(TS.Linq.Extensions.count(numEnum), DATA.CreateNumberArray().length, "Should return a result enumerator with the same length as the source array.");
    assert.notDeepEqual(TS.Linq.Extensions.toArray(numEnum), DATA.CreateNumberArray(), "Should return a shuffled enumerator which doesn't be equal to the source enumerator");
    assert.deepEqual(TS.Linq.Extensions.shuffle(TS.Linq.Enumerator.Empty).toArray(), [], "A shuffeled empty enumerator should still be an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.shuffle(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.shuffle(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("single", (assert) =>
  {
    let result: DATA.ICustomer;

    result = TS.Linq.Extensions.single(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"));
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID == "OTTIK");
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1));
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an 'enumerator' argument with more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(TS.Linq.Enumerator.Empty);
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for an empty 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(TS.Linq.Enumerator.Empty, CUST => CUST.CustomerID == "NOP");
    }, TS.InvalidOperationException, "The call should fail with a \"TS.InvalidOperationException\" for a 'predicate' which doesn't match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("singleOrDefault", (assert) =>
  {
    let result: DATA.Customer;

    result = TS.Linq.Extensions.singleOrDefault(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID == "OTTIK"), DATA.Customer);
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = TS.Linq.Extensions.singleOrDefault(custEnum, DATA.Customer, CUST => CUST.CustomerID == "OTTIK");
    assert.equal(result.CustomerID, "OTTIK", "Should return the expected single result.");

    result = TS.Linq.Extensions.singleOrDefault(TS.Linq.Enumerator.Empty, DATA.Customer);
    assert.deepEqual(result, new DATA.Customer(), "Shoud return a default object for an 'enumerator' which is empty.");

    result = TS.Linq.Extensions.singleOrDefault(custEnum, DATA.Customer, CUST => CUST.CustomerID == "NOP");
    assert.deepEqual(result, new DATA.Customer(), "Shoud return a default object for a 'predicate' which has no match with the enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(TS.Linq.Extensions.where(custEnum, CUST => CUST.CustomerID.indexOf("BO") > -1), DATA.Customer);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException' for an 'enumerator' argument with more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(custEnum, DATA.Customer, CUST => CUST.CustomerID.indexOf("BO") > -1);
    }, TS.Linq.MoreThanOneElementException, "The call should fail with a \"TS.Linq.MoreThanOneElementException\" for an for a 'predicate' which matches more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(null, DATA.Customer);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(undefined, DATA.Customer);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(custEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'defaultConstructor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(custEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'defaultConstructor' argument.");

  });


  QUnit.test("skip", (assert) =>
  {
    let numEnum: Iterable<number>;

    numEnum = TS.Linq.Extensions.skip(DATA.CreateNumberArray(), 4);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a result array which matches with the expected array.");

    numEnum = TS.Linq.Extensions.skip(TS.Linq.Enumerator.Empty, 4);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result when used on an empty enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(DATA.CreateNumberArray(), -5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(null, 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(undefined, 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("skipWhile", (assert) =>
  {
    let numEnum: Iterable<number>;

    numEnum = TS.Linq.Extensions.skipWhile(DATA.CreateNumberArray(), item => item < 5);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 6, 7, 8, 9, 10], "Should return a enumerator which holds the expected value.");

    numEnum = TS.Linq.Extensions.skipWhile(DATA.CreateNumberArray(), item => item < 20);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with a predicate that has no match.");

    numEnum = TS.Linq.Extensions.skipWhile(TS.Linq.Enumerator.Empty, item => true);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty), "Should return an empty result enumerator when used with ab empty source enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(null, (item) => item < 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(undefined, (item) => item < 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(DATA.CreateNumberArray(), null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(DATA.CreateNumberArray(), undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
  });


  QUnit.test("sum", (assert) =>
  {
    let result: number;

    result = TS.Linq.Extensions.sum(DATA.CreateNumberArray());
    assert.equal(result, 55, "Should return expected sum.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(TS.Linq.Enumerator.Empty);
    }, TS.Linq.EmptyEnumeratorException, "The call should fail with a \"TS.Linq.EmptyEnumerableException\" for an empty 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum([(Number.MAX_VALUE / 2), Number.MAX_VALUE]);
    }, TS.OverflowException, "The call should fail with a \"TS.OverflowException\" for an enumerator which exceeds the number range in sum.");

    //assert.throws(() =>
    //{
    //  TS.Linq.Extensions.sum([1, 2, "three", 4, 5]);
    //}, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an enumerator which holds none numerical elements.");
  });


  QUnit.test("take", (assert) =>
  {
    let numberEnum: Iterable<number>;

    numberEnum = TS.Linq.Extensions.take(DATA.CreateNumberArray(), 4);
    assert.deepEqual(TS.Linq.Extensions.toArray(numberEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(DATA.CreateNumberArray(), -5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(null, 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(undefined, 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("takeWhile", (assert) =>
  {
    let numEnum: Iterable<number>;

    numEnum = TS.Linq.Extensions.takeWhile(DATA.CreateNumberArray(), item => item < 5);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should return a result array which matches with the expected array.");


    numEnum = TS.Linq.Extensions.takeWhile([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], item => item < 5);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [1, 2, 3, 4], "Should only return alements util the first mismatch.");

    numEnum = TS.Linq.Extensions.takeWhile(DATA.CreateNumberArray(), item => item < -1);
    assert.deepEqual(TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator for a predicate which has no match.");

    numEnum = TS.Linq.Extensions.takeWhile(TS.Linq.Enumerator.Empty, item => true);
    assert.deepEqual(TS.Linq.Extensions.count(numEnum), 0, "Should return an empty result enumerator when used against an empt source enumerator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(null, item => true);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(undefined, item => item < 5);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(DATA.CreateNumberArray(), null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(DATA.CreateNumberArray(), undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'predicate' argument.");
  });


  QUnit.test("toArray", (assert) =>
  {
    let numArr: Array<number>;

    numArr = TS.Linq.Extensions.toArray(numEnum);

    assert.equal(numArr.length, numEnum.count(), "Should return a result array which matches with the source enumeator.");
    assert.equal(TS.Linq.Extensions.toArray(TS.Linq.Enumerator.Empty).length, 0, "Should return an empty array for an empty enumeator.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("toDictionary", (assert) =>
  {

    let resultDict = TS.Linq.Extensions.toDictionary(persEnum,item => item.BusinessEntityID);

    assert.notEqual(resultDict, null, "Should return a none null result object.");
    assert.equal(resultDict.count(), persEnum.count(), "The result collections should have as much elements as the source.");
    assert.equal(resultDict.getItem(10802).value.FirstName, "Katherine", "The dictionary should be accessible by key.");
    assert.equal(resultDict.getItem(10802).value.LastName, "Jones", "The dictionary should be accessible by key.");

    let doubleElement = persEnum.elementAt(120);
    doubleElement.BusinessEntityID = 10802;
    doubleElement.FirstName = "No first name";
    doubleElement.LastName = "No last name";

    assert.throws(() => 
    {
      let resultDict = TS.Linq.Extensions.toDictionary(persEnum, item => item.BusinessEntityID);
    }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for a key selector function which returns a duplicate key.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("toList", (assert) =>
  {
    let numList: TS.Collections.List<number>;

    numList = TS.Linq.Extensions.toList(numEnum);

    assert.equal(numList.count(), numEnum.count(), "Should return a list which has the same length as the original enumerable.");
    assert.equal(TS.Linq.Extensions.toList(TS.Linq.Enumerator.Empty).count(), 0, "Should return an empty list for an empty enumeator.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.toList(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.toList(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  //
  //Tested in the OrderedEnumerator test
  //
  // thenBy

  //
  //Tested in the OrderedEnumerator test
  //
  // thenByDescending


  QUnit.test("union", (assert) =>
  {
    let emptyEnum: Iterable<any>;
    let carsEnum: Iterable<DATA.ICar>;
    let carsEnumResult: Iterable<DATA.ICar>;
    let carsArrayResult: Array<DATA.ICar>;
    let numEnum: Iterable<number>;


    numEnum = TS.Linq.Extensions.union([5, 3, 9, 7, 5, 9, 3, 7], [8, 3, 6, 4, 4, 9, 1, 0]);
    assert.deepEqual(TS.Linq.Extensions.toArray(numEnum), [5, 3, 9, 7, 8, 6, 4, 1, 0], "Should return the expected result when called on numbers array without equality comparer.")

    carsEnumResult = TS.Linq.Extensions.union(DATA.CreateCarsArray(), DATA.CreateCarsUnionTestArray());
    carsArrayResult = TS.Linq.Extensions.toArray(carsEnumResult);
    assert.equal(carsArrayResult.length, 10, "Should return all elements of both test arrays when called without an equality comparer.");

    carsEnumResult = TS.Linq.Extensions.union(DATA.CreateCarsArray(), DATA.CreateCarsUnionTestArray(), (first, second) => first.name == second.name);
    carsArrayResult = TS.Linq.Extensions.toArray(carsEnumResult);
    assert.equal(carsArrayResult.length, 8, "Should return only those elements of both test arrays which are uniqe when called with an equality comparer.");

    emptyEnum = TS.Linq.Extensions.union(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty);
    assert.equal(TS.Linq.Extensions.count(emptyEnum), 0, "Should return an empty enumerator when calle with empty enumerators.");

    carsEnum = new TS.Linq.Enumerator<DATA.ICar>(DATA.CreateCarsArray());
    assert.throws(() =>
    {
      TS.Linq.Extensions.union(null, carsEnum);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null first 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(carsEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null second 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(undefined, carsEnum);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined first 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(carsEnum, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerator' argument.");
  });


  QUnit.test("where", (assert) =>
  {
    let resultEnum: Iterable<DATA.IPerson>;

    resultEnum = TS.Linq.Extensions.where<DATA.IPerson>(persEnum, item => item.FirstName == "Bob");
    assert.equal(TS.Linq.Extensions.count(resultEnum), 1, "Should return the expected number of elements for the given query.");

    resultEnum = TS.Linq.Extensions.where<DATA.IPerson>(persEnum, item => item.FirstName == "Michael");
    assert.equal(TS.Linq.Extensions.count(resultEnum), 5, "Should return the expected number of elements for the given query.");

    resultEnum = TS.Linq.Extensions.where<DATA.IPerson>(persEnum, item => item.FirstName == "Edward");
    assert.equal(TS.Linq.Extensions.count(resultEnum), 3, "Should return the expected number of elements for the given query.");

    resultEnum = TS.Linq.Extensions.where<DATA.IPerson>(persEnum, item => item.FirstName != "");
    assert.equal(TS.Linq.Extensions.count(resultEnum), 400, "Should return the expected number of elements for the given query.");


    assert.throws(() =>
    {
      TS.Linq.Extensions.where(null, (item: any) => item.FirstName != "");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'enumerator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.where(undefined, (item: any) => item.FirstName != "");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'enumerator' argument.");
  });


  QUnit.test("zip", (assert) => 
  {
    let resultEnum: TS.Linq.Enumerator<any>;

    resultEnum = TS.Linq.Extensions.zip(numEnum, custEnum, (num, cust) => { return { number: num, custID: cust.CustomerID, custFax: cust.Fax, custPhone: cust.Phone }; });

    assert.notEqual(resultEnum, null, "Should return a none empty enumeration.");
    assert.equal(resultEnum.count(), numEnum.count(), "Should returns as much elements as the shorter of both enumerations has.");
    let resultElement = TS.Linq.Extensions.first(resultEnum);
    assert.ok((resultElement.number != undefined) && (resultElement.custID != undefined) && (resultElement.custFax != undefined), "Should return an enumeration which contains elements of the expected type.");
    
    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(null, custEnum, (num, cust) => { return {}; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'firstEnum' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(numEnum, null, (num, cust) => { return {}; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'secondEnum' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(numEnum, custEnum, null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'func' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(undefined, custEnum, (num, cust) => { return {}; })
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'firstEnum' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(numEnum, undefined, (num, cust) => { return {}; })
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'secondEnum' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.zip(numEnum, custEnum, undefined)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'func' argument.");
  });
}//END module