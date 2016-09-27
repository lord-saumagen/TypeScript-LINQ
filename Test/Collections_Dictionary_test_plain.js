/// <reference path="data.ts" />
/// <reference path="scripts/qunit.d.ts" />
/// <reference path="../_references.ts" />
//
// Set the correct module
//
var TS_Collections_Dictionary_test;
(function (TS_Collections_Dictionary_test) {
  "use strict";
  //
  // Initialize some test specific objects or variables if necessary.
  //
  var custEnum;
  var persEnum;
  var ordEnum;
  var carEnum;
  var numEnum;
  var strEnum;
  var lowCharEnum;
  var UpCharEnum;
  var SIUnitMeterArray;
  var openWithItemArray;
  //
  // Set a unique unit test module name.
  //
  QUnit.module("TS.Collections.Dictionary", {
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
      SIUnitMeterArray = new Array();
      SIUnitMeterArray.push(new TS.Collections.KeyValuePair("m", 1));
      SIUnitMeterArray.push(new TS.Collections.KeyValuePair("dm", 0.1));
      SIUnitMeterArray.push(new TS.Collections.KeyValuePair("cm", 0.01));
      SIUnitMeterArray.push(new TS.Collections.KeyValuePair("mm", 0.001));
      openWithItemArray = new Array();
      openWithItemArray.push(new TS.Collections.KeyValuePair("bmp", { appName: "Paint", appPath: "C:/windows" }));
      openWithItemArray.push(new TS.Collections.KeyValuePair("txt", { appName: "Notepad++", appPath: "C:/programs/Notepadpp" }));
      openWithItemArray.push(new TS.Collections.KeyValuePair("mp3", { appName: "VLC", appPath: "C:/programs/VLC" }));
      openWithItemArray.push(new TS.Collections.KeyValuePair("linq", { appName: "LINQPad5", appPath: "C:/System32/Linqpad" }));
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


  QUnit.test("constructor (plain js)", (assert) => {
    assert.throws(() => {
      new TS.Collections.Dictionary(null, {});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'equalityComparer' which is not a function.");

    assert.throws(() => {
      new TS.Collections.Dictionary({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'source' which is not iterable.");

    assert.throws(() => {
      new TS.Collections.Dictionary([1, 2, 3]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'source' which is iterable but not a KeyValue collection.");

  });


  QUnit.test("copyTo (plain js)", (assert) => {
    
    let SIUnitMeterDict = new TS.Collections.Dictionary(SIUnitMeterArray);

    assert.throws(() => {
      SIUnitMeterDict.copyTo({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'targetArray' argument which isn't an array.");

    assert.throws(() => {
      SIUnitMeterDict.copyTo([], "");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'destIndex' argument which isn't a number.");

  });


  QUnit.test("remove (plain js)", (assert) => {

    let openWithDict = new TS.Collections.Dictionary(openWithItemArray);

    assert.throws(() => {
      openWithDict.remove(openWithItemArray[1], "");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a 'equalityComparer' argument which isn't a function.");

  });
})(TS_Collections_Dictionary_test || (TS_Collections_Dictionary_test = {})); 
//# sourceMappingURL=Collections_Dictionary_test.js.map