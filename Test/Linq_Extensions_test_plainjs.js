"use strict";
var TS_Linq_Extensions_test;
(function (TS_Linq_Extensions_test) {
  var custEnum;
  var persEnum;
  var ordEnum;
  var numEnum;
  var carEnum;
  QUnit.module("TS.Linq.Extensions (plain js)", {
    before: function () {
      // runs once before anything else in the module
      custEnum = new TS.Linq.Enumerator(DATA.CreateCustomerArray());
      persEnum = new TS.Linq.Enumerator(DATA.CreatePersonArray());
      ordEnum = new TS.Linq.Enumerator(DATA.CreateOrdersArray());
      numEnum = new TS.Linq.Enumerator(DATA.CreateNumberArray());
      carEnum = new TS.Linq.Enumerator(DATA.CreateCarsArray())
    },
    beforeEach: function () {
      // prepare something for all following tests
    },
    afterEach: function () {
      // clean up after each test
    },
    after: function () {
      // runs once after all unit tests finished (including teardown)
    }
  });

  QUnit.test("aggregate (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.aggregate({ firstName: "John", lastName: "Doe" }, (first, second) => { return { firstName: first.firstName + ", " + second.firstName, lastName: first.lastName + ", " + second.lastName }; }, null);
    }, TS.InvalidTypeException, "The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.aggregate(new TS.Linq.Enumerator(DATA.lowerCharArray), new DATA.Car(), null);
    }, TS.InvalidTypeException, "The aggregate function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'accumulator' argument type.");
  });


  QUnit.test("all (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.all(new TS.Linq.Enumerator(DATA.CreateStringArray()), {});
    }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'predicate' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.all({}, () => false);
    }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");
  });


  QUnit.test("any (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.any({}, () => false);
    }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" for a call with an invalid 'enumerator' argument type.");


    assert.throws(() => {
      TS.Linq.Extensions.any(new TS.Linq.Enumerator(DATA.CreateStringArray()), {});
    }, TS.InvalidTypeException, "The all function should fail with a \"TS.InvalidTypeException\" fo ra call with an invalid 'predicate' argument type.");
  });


  QUnit.test("average (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.average({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.average(new TS.Linq.Enumerator([1, 2, 3, {}, ""]));
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");
  });


  QUnit.test("concat (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.concat({}, new TS.Linq.Enumerator(DATA.CreateStringArray()));
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.concat(new TS.Linq.Enumerator(DATA.CreateStringArray()), {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument.");
  });


  QUnit.test("contains (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.contains(new TS.Linq.Enumerator(DATA.CreateStringArray()), "NOP", {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
  });


  QUnit.test("count (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.count({}, (item) => { return true; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.count(numEnum, "");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("cycle (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.cycle({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
  });


  QUnit.test("defaultIfEmpty (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.defaultIfEmpty({}, "Five");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
  });


  QUnit.test("distinct (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.distinct({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.distinct(carEnum, "Five");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
  });


  QUnit.test("elementAt (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.elementAt({}, "Five");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.elementAt(carEnum, "Five");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.");
  });


  QUnit.test("elementAtOrDefault (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.elementAtOrDefault({}, 2, DATA.Car);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.elementAtOrDefault(carEnum, "2", DATA.Car);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'index' argument type.");
  });


  QUnit.test("except (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.except({}, carEnum);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.except(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.except(carEnum, carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
  });


  QUnit.test("first (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.first({}, (item) => { return true; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerable' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.first(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("firstOrDefault (plain js)", (assert) => {

    let resultCar;

    resultCar = TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, (item) => { return item.NOP == "NOP" });
    assert.deepEqual(resultCar, new DATA.Car(), "Should return a default object if the predicate is erroneous.");

    assert.throws(() => {
      TS.Linq.Extensions.firstOrDefault({}, DATA.Car, (item) => { return true; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.firstOrDefault(carEnum, DATA.Car, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("forEach (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.forEach({}, (item) => { });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'enumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.forEach(TS.Linq.Enumerator.Empty, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for for an invalid 'action' argument.");

  });


  QUnit.test("groupBy (plain js)", (assert) => {

    let productEnumerator;

    productEnumerator = new TS.Linq.Enumerator(DATA.CreateProductArray());

    assert.throws(() => {
      TS.Linq.Extensions.groupBy({}, (Item) => { return Item.Currency })
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupBy(productEnumerator, {})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupBy(productEnumerator, (Item) => { return Item.Currency }, {})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupBy(productEnumerator, (Item) => { return Item.Currency }, (first, second) => { return first === second; }, {})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'elementSelector' argument.");
  });


  QUnit.test("groupJoin (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(null, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(undefined, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin({}, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, null, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, undefined, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, {}, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerable' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, {}, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, {}, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; });
    }, TS.InvalidTypeException, "Should throw a 'TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.groupJoin(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, group) => { return { Customer: outerItem, OrderGroup: group }; }, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument.");
  });


  QUnit.test("intersect (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.intersect({}, TS.Linq.Enumerator.Empty);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'firstEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.intersect(TS.Linq.Enumerator.Empty, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'secondEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.intersect(TS.Linq.Enumerator.Empty, TS.Linq.Enumerator.Empty, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid 'equalityComparer' argument.");
  });


  QUnit.test("join (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.join(null, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'outerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(undefined, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'outerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join({}, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(custEnum, null, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'innerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(custEnum, undefined, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'innerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(custEnum, {}, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerEnumerator' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(ordEnum, ordEnum, {}, (innerItem) => { return innerItem.CustomerID; }, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'outerKeySelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, {}, (outerItem, innerItem) => { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'innerKeySelector' argument.");

    assert.throws(() => {
      TS.Linq.Extensions.join(custEnum, ordEnum, (outerItem) => { return outerItem.CustomerID; }, (innerItem) => { return innerItem.CustomerID; }, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'resultSelector' argument.");
  });


  QUnit.test("last (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.last({}, (item) => { return true; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.last(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("lastOrDefault (plain js)", (assert) => {
    let resultCar;

    resultCar = TS.Linq.Extensions.lastOrDefault(carEnum, DATA.Car, (item) => { return item.NOP == "NOP" });
    assert.deepEqual(resultCar, new DATA.Car(), "Should return a default object if the predicate doesn't qualify an element as result.");

    assert.throws(() => {
      TS.Linq.Extensions.lastOrDefault({}, DATA.Car, (item) => { return true; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.lastOrDefault(carEnum, DATA.Car, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("max (plain js)", (assert) => {

    let strEnum = new TS.Linq.Enumerator(DATA.CreateStringArray());

    assert.throws(() => {
      TS.Linq.Extensions.max({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.max(strEnum);
    }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.");
  });


  QUnit.test("min (plain js)", (assert) => {

    let strEnum = new TS.Linq.Enumerator(DATA.CreateStringArray());

    assert.throws(() => {
      TS.Linq.Extensions.min({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.min(strEnum);
    }, TS.ArgumentException, "The call should fail with a \"TS.ArgumentException\" for an an 'enumerator' argument which is not of type 'Enumerator<number>'.");
  });


  QUnit.test("orderBy (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.orderBy({}, (item) => { return item; }, (first, second) => { return first == second; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.orderBy(carEnum, {}, (first, second) => { return first == second; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.orderBy(carEnum, (item) => { return item; }, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
  });


  QUnit.test("orderByDescending (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.orderByDescending({}, (item) => { return item; }, (first, second) => { return first == second; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.orderByDescending(carEnum, {}, (first, second) => { return first == second; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.orderByDescending(carEnum, (item) => { return item; }, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
  });


  QUnit.test("range (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.range({}, 5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'start' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.range(12, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
  });


  QUnit.test("repeat (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.repeat("NOP", {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
  });


  QUnit.test("reverse (plain js)", (assert) => {

    assert.throws(() => {
      let result = TS.Linq.Extensions.reverse(4.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
  });


  QUnit.test("select (plain js)", (assert) => {

    let resultArray;

    assert.throws(() => {
      resultArray = TS.Linq.Extensions.select({}, (item) => { return item; }).toArray();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      resultArray = TS.Linq.Extensions.select(carEnum, false).toArray();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
  });


  QUnit.test("selectMany (plain js)", (assert) => {

    let resultArray;

    assert.throws(() => {
      resultArray = TS.Linq.Extensions.selectMany({}, (item) => { return item.subitem; }).toArray();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      resultArray = TS.Linq.Extensions.selectMany(carEnum, false).toArray();
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");
  });


  QUnit.test("sequenceEqual (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.sequenceEqual({}, numEnum);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.sequenceEqual(numEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.sequenceEqual(numEnum, numEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'equalityComparer' argument type.");
  });


  QUnit.test("skip (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.skip({}, 50);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.skip(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
  });


  QUnit.test("skipWhile (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.skipWhile({}, (item) => { return item.name != "VW"; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.skipWhile(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("sum (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.sum({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.sum(new TS.Linq.Enumerator([1, 2, 3, {}, ""]), {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");
  });


  QUnit.test("take (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.take({}, 50);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.take(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'count' argument type.");
  });


  QUnit.test("takeWhile (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.takeWhile(carEnum, "NOP");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("thenBy (plain js)", (assert) => {

    let sortTestEnumerator;
    let orderedEnumerator;

    sortTestEnumerator = new TS.Linq.Enumerator(DATA.CreateSortTestArray());
    orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });

    assert.throws(() => {
      TS.Linq.Extensions.thenBy(orderedEnumerator, "NOP");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.thenBy(orderedEnumerator, (item) => { return item; }, "NOP");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
  });


  QUnit.test("thenByDescending (plain js)", (assert) => {

    let sortTestEnumerator;
    let orderedEnumerator;

    sortTestEnumerator = new TS.Linq.Enumerator(DATA.CreateSortTestArray());
    orderedEnumerator = sortTestEnumerator.orderBy((item) => { return item.color; });

    assert.throws(() => {
      TS.Linq.Extensions.thenByDescending(orderedEnumerator, "NOP");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'selector' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.thenByDescending(orderedEnumerator, (item) => { return item; }, "NOP");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'comparer' argument type.");
  });


  QUnit.test("toArray (plain js)", (assert) => {
    assert.throws(() => {
      TS.Linq.Extensions.toArray({})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")
  });

  QUnit.test("toDictionary (plain js)", (assert) => {
    assert.throws(() => {
      TS.Linq.Extensions.toDictionary({}, item => item)
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")

    assert.throws(() => {
      TS.Linq.Extensions.toDictionary([1, 2], {})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'keySelector' argument type.")
  });

  QUnit.test("toList (plain js)", (assert) => {
    assert.throws(() => {
      TS.Linq.Extensions.toList({})
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.")
  });

  QUnit.test("union (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.union({}, carEnum);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'firstEnumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.union(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'secondEnumerator' argument type.");
  });


  QUnit.test("where (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.where({}, (item) => { return item.name != "VW"; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'enumerator' argument type.");

    assert.throws(() => {
      TS.Linq.Extensions.where(carEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid 'predicate' argument type.");
  });


  QUnit.test("zip (plain js)", (assert) => {

    assert.throws(() => {
      TS.Linq.Extensions.zip({}, custEnum, (num, cust) => { return {}; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'firstEnum' argument which is not iterable.");

    assert.throws(() => {
      TS.Linq.Extensions.zip(numEnum, {}, (num, cust) => { return {}; });
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'secondEnum' argument which is not iterable.");

    assert.throws(() => {
      TS.Linq.Extensions.zip(numEnum, custEnum, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'func' which is not a function.");
  });


})(TS_Linq_Extensions_test || (TS_Linq_Extensions_test = {})); //END module
