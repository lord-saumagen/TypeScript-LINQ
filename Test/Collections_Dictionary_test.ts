/// <reference path="data.ts" />
/// <reference path="../_references.ts" />
/// <reference path="./scripts/qunit.d.ts" />

module TS_Collections_Dictionary_test
{
  "use strict";

  declare var document: any;

  //
  // Initialize some test specific objects or variables if necessary.
  //


  var custEnum: TS.Linq.Enumerator<DATA.ICustomer>;
  var persEnum: TS.Linq.Enumerator<DATA.IPerson>;
  var ordEnum: TS.Linq.Enumerator<DATA.IOrders>;
  var carEnum: TS.Linq.Enumerator<DATA.ICar>;
  var numEnum: TS.Linq.Enumerator<number>;
  var strEnum: TS.Linq.Enumerator<string>;
  var lowCharEnum: TS.Linq.Enumerator<string>;
  var UpCharEnum: TS.Linq.Enumerator<string>;
  var SIUnitMeterArray: Array<TS.Collections.KeyValuePair<string, number>>;
  var openWithItemArray: Array<TS.Collections.KeyValuePair<string, AppInfo>>;
  type AppInfo = { appName: string, appPath: string };


  //
  // Set a unique unit test module name.
  //

  QUnit.module("TS.Collections.Dictionary",
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

        SIUnitMeterArray = new Array<TS.Collections.KeyValuePair<string, number>>();
        SIUnitMeterArray.push(new TS.Collections.KeyValuePair("m", 1));
        SIUnitMeterArray.push(new TS.Collections.KeyValuePair("dm", 0.1));
        SIUnitMeterArray.push(new TS.Collections.KeyValuePair("cm", 0.01));
        SIUnitMeterArray.push(new TS.Collections.KeyValuePair("mm", 0.001));

        openWithItemArray = new Array<TS.Collections.KeyValuePair<string, AppInfo>>();
        openWithItemArray.push(new TS.Collections.KeyValuePair("bmp", { appName: "Paint", appPath: "C:/windows" }));
        openWithItemArray.push(new TS.Collections.KeyValuePair("txt", { appName: "Notepad++", appPath: "C:/programs/Notepadpp" }));
        openWithItemArray.push(new TS.Collections.KeyValuePair("mp3", { appName: "VLC", appPath: "C:/programs/VLC" }));
        openWithItemArray.push(new TS.Collections.KeyValuePair("linq", { appName: "LINQPad5", appPath: "C:/System32/Linqpad" }));

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
      }
    });


  QUnit.test("constructor", (assert) =>
  {
    let defaultDict: TS.Collections.Dictionary<string, string>;
    let compareDict: TS.Collections.Dictionary<string, string>;
    let SIUnitDict: TS.Collections.Dictionary<string, number>;
    let testDict: TS.Collections.Dictionary<any, any>;

    defaultDict = new TS.Collections.Dictionary<string, string>();

    assert.notEqual(defaultDict, null, "The constructor should return a none null object.");
    assert.equal(defaultDict.count(), 0, "The object should have 0 elements.");

    compareDict = new TS.Collections.Dictionary<string, string>(null, (first, second) => first.length == second.length);

    assert.notEqual(compareDict, null, "The constructor should return a none null object.");
    assert.equal(compareDict.count(), 0, "The object should have 0 elements.");

    SIUnitDict = new TS.Collections.Dictionary<string, number>(SIUnitMeterArray);
    assert.notEqual(SIUnitDict, null, "The constructor should return a none null object.");
    assert.equal(SIUnitDict.count(), 4, "The object should have the expected 4 elements.");

    testDict = new TS.Collections.Dictionary(SIUnitDict);
    assert.notEqual(testDict, null, "The constructor should return a none null object.");
    assert.equal(testDict.count(), 4, "The object should have the expected 4 elements.");
    assert.deepEqual(testDict.toArray(), SIUnitDict.toArray(), "The cloned dictionary should be equal to the source dictionary.");
  });


  QUnit.test("add", (assert) => 
  {
    let defaultDict: TS.Collections.Dictionary<string, string>;
    let compareDict: TS.Collections.Dictionary<complexKey, string>;
    type complexKey = { ID: number, GUID: string, references: Array<string> };

    defaultDict = new TS.Collections.Dictionary<string, string>();
    compareDict = new TS.Collections.Dictionary<complexKey, string>(null, (first, second) => first.ID == second.ID && first.GUID == second.GUID);

    defaultDict.add("one", "value: one");
    assert.equal(defaultDict.count(), 1, "The dictionary should contain one element after a call to add.");

    defaultDict.add("two", "value: two");
    assert.equal(defaultDict.count(), 2, "The dictionary should contain two element after a second call to add.");

    defaultDict.add(new TS.Collections.KeyValuePair("three", "value: three"));
    assert.equal(defaultDict.count(), 3, "The dictionary should contain three element after adding a third item as KeyValuePiar.");

    assert.throws(() => 
    {
      defaultDict.add("two", "value: another two");
    }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for an attempt to add a new item with an already used key.");

    assert.throws(() => 
    {
      defaultDict.add(new TS.Collections.KeyValuePair("three", "value: another three"));
    }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for an attempt to add a new item as KeyValuePair with an already used key.");

    let key1: complexKey = { ID: 1, GUID: TS.Utils.createGUID(), references: new Array<string>() };
    compareDict.add(key1, "value: one");
    assert.equal(compareDict.count(), 1, "The dictionary should contain one element after a call to add.");

    let key2: complexKey = { ID: 2, GUID: TS.Utils.createGUID(), references: new Array<string>("http://www.microsoft.com", "https://developer.mozilla.org") };
    compareDict.add(key2, "value: two");
    assert.equal(compareDict.count(), 2, "The dictionary should contain two element after a second call to add.");

    let key3: complexKey = { ID: 3, GUID: key1.GUID, references: key2.references };
    compareDict.add(new TS.Collections.KeyValuePair(key3, "value: three"));
    assert.equal(compareDict.count(), 3, "The dictionary should contain three element after adding a third item as KeyValuePiar.");


    assert.throws(() => 
    {
      let key4: complexKey = { ID: key1.ID, GUID: key1.GUID, references: key2.references }
      compareDict.add(key4, "value: four");
    }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for an attempt to add a new item with an already used key.");

    assert.throws(() => 
    {
      let key5: complexKey = { ID: key2.ID, GUID: key2.GUID, references: new Array<string>("foo", "bar", "baz") };
      compareDict.add(new TS.Collections.KeyValuePair(key5, "value: five"));
    }, TS.Collections.DuplicateKeyException, "The call should fail with a \"TS.Collections.DuplicateKeyException\" for an attempt to add a new item as KeyValuePair with an already used key.");

  });


  QUnit.test("clear", (assert) => 
  {
    let defaultDict: TS.Collections.Dictionary<string, string>;

    defaultDict = new TS.Collections.Dictionary<string, string>();

    defaultDict.add("one", "value: one").add("two", "value: two").add("three", "value: three");

    assert.ok(defaultDict.count() > 0, "The dictionary should contain three element.");
    defaultDict.clear();
    assert.equal(defaultDict.count(), 0, "The dictionary should be empty after a call to clear.");

  });


  QUnit.test("contains", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    let SIUnitMeterDict: TS.Collections.Dictionary<string, number>;


    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.ok(openWithDict.contains(openWithItemArray[2]), "Should find the item in the dictionary.");
    openWithItemArray[2].value.appPath += "/bin";
    assert.ok(openWithDict.contains(openWithItemArray[2]), "Should find the item in the dictionary even after changes in the value because the value is a reference type.");
    assert.ok(!openWithDict.contains(new TS.Collections.KeyValuePair("txt", { appName: "Notepad++", appPath: "C:/programs/Notepadpp" })), "Should fail to find an item in the dictionary for a search item which is identical to one in the dictionary but has a new created reference type value.");


    SIUnitMeterDict = new TS.Collections.Dictionary<string, number>(SIUnitMeterArray);

    assert.ok(SIUnitMeterDict.contains(SIUnitMeterArray[2]), "Should find the item in the dictionary.");
    SIUnitMeterDict.setItem("cm", 0.02);
    assert.ok(!SIUnitMeterDict.contains(SIUnitMeterArray[2]), "Shouldn't find the item in the dictionary after changes to the value. Since the value is a primitive type (value type) the value of the dictionary item is independent from the original item.");
    assert.ok(SIUnitMeterDict.contains(new TS.Collections.KeyValuePair("mm", 0.001)), "Should find the item in the dictionary even for a new created search item since there are only value types involved.");
  });


  QUnit.test("containsKey", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;


    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.ok(openWithDict.containsKey("mp3"), "Should find the key in the dictionary.");
    assert.ok(!openWithDict.containsKey("nop"), "Shouldn't find an unknown key in the dictionary.");
    assert.ok(!openWithDict.containsKey(null), "Shouldn't find a 'null' key in the dictionary.");
    assert.ok(!openWithDict.containsKey(undefined), "Shouldn't find a 'undefined' key in the dictionary.");

  });


  QUnit.test("containsValue", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    let SIUnitMeterDict: TS.Collections.Dictionary<string, number>;

    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);
    SIUnitMeterDict = new TS.Collections.Dictionary<string, number>(SIUnitMeterArray);

    assert.ok(SIUnitMeterDict.containsValue(0.01), "Should find the value in the dictionary.");
    assert.ok(!SIUnitMeterDict.containsValue(1000), "Shouldn't find an unknown value in the dictionary.");
    assert.ok(!SIUnitMeterDict.containsValue(undefined), "Shouldn't find an undefined value in the dictionary.");
    SIUnitMeterDict.add(new TS.Collections.KeyValuePair("um", null));
    assert.ok(SIUnitMeterDict.containsValue(null), "Should find an null value in the dictionary.");

    assert.ok(openWithDict.containsValue({ appName: "VLC", appPath: "C:/programs/VLC" }, (first, second) => first.appName == second.appName), "Should find a new created complex value when using an appropriate equalityComparer.");
    assert.ok(!openWithDict.containsValue({ appName: "VLC", appPath: "C:/programs/VLC" }), "Shouldn't find a new created complex value without an appropriate equalityComparer.");
    assert.ok(openWithDict.containsValue(openWithItemArray[1].value), "Should find a complex value when using the original value reference.");
  });


  QUnit.test("copyTo", (assert) => 
  {
    let copyArray: TS.Collections.Dictionary<string, AppInfo>;
    let copyWithItemArray: Array<TS.Collections.KeyValuePair<string, AppInfo>>;

    copyWithItemArray = new Array<TS.Collections.KeyValuePair<string, AppInfo>>();

    copyArray = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);


    copyArray.copyTo(copyWithItemArray);
    assert.deepEqual(copyWithItemArray, openWithItemArray, "Should copy the whole dictionary to an array which should be equal to the source array.");
    copyArray.copyTo(copyWithItemArray, copyWithItemArray.length);
    assert.equal(copyWithItemArray.length, openWithItemArray.length * 2, "Should copy the whole dictionary to the target array beinning at the specified index.");

    assert.throws(() => 
    {
      copyArray.copyTo(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a null 'targetArray' argument.");

    assert.throws(() => 
    {
      copyArray.copyTo(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a undefined 'targetArray' argument.");

    assert.throws(() => 
    {
      copyArray.copyTo([], -1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call with a negative  undefined 'destIndex' argument.");

  });


  QUnit.test("count", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.equal(openWithDict.count(), 4, "Should return the expected dictionary size.");
    assert.equal(new TS.Collections.Dictionary<any, any>().count(), 0, "Should return 0 for an empty dictionary.");
  });


  QUnit.test("getItem", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.deepEqual(openWithDict.getItem("txt"), openWithItemArray[1], "Should return the expected item.");
    assert.equal(openWithDict.getItem("nop"), undefined, "Should return undefined for an unknown key.");
    assert.equal(openWithDict.getItem(null), undefined, "Should return undefined for a null key.");
    assert.equal(openWithDict.getItem(undefined), undefined, "Should return undefined for an undefined key.");
  });


  QUnit.test("getValue", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.deepEqual(openWithDict.getValue("txt"), openWithItemArray[1].value, "Should return the expected value.");
    assert.equal(openWithDict.getValue("nop"), undefined, "Should return undefined for an unknown key.");
    assert.equal(openWithDict.getValue(null), undefined, "Should return undefined for a null key.");
    assert.equal(openWithDict.getValue(undefined), undefined, "Should return undefined for an undefined key.");
  });


  QUnit.test("Keys", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);

    assert.equal(openWithDict.keys.count(), 4, "Should return the expected number of keys.");
    assert.equal(new TS.Collections.Dictionary<any, any>().keys.count(), 0, "Should return 0 keys for an empty dictionary.");
  });


  QUnit.test("remove", (assert) => 
  {
    let openWithDict: TS.Collections.Dictionary<string, AppInfo>;
    let custDictLength: number;
    let custDict: TS.Collections.Dictionary<string, TS.Collections.List<TS.Collections.KeyValuePair<string, string>>>;
    let item: TS.Collections.KeyValuePair<string, TS.Collections.List<TS.Collections.KeyValuePair<string, string>>>;
    openWithDict = new TS.Collections.Dictionary<string, AppInfo>(openWithItemArray);
    custDict = DATA.CreateCustomerDictionary();

    //FURIB, GROSR
    custDictLength = custDict.count();
    custDict.remove("FURIB");
    assert.equal(custDict.count(), custDictLength - 1, "Should remove the item from the dictionary with the matching key.");

    let val = new TS.Collections.List<TS.Collections.KeyValuePair<string, string>>(true);
    val.add(new TS.Collections.KeyValuePair("CompanyName", "GROSELLA-Restaurante"));
    item = new TS.Collections.KeyValuePair<string, TS.Collections.List<TS.Collections.KeyValuePair<string, string>>>("GROSR", val);
    custDictLength = custDict.count();
    custDict.remove(item, (first, second) => first.single(pair => pair.key == "CompanyName").value == second.single(pair => pair.key == "CompanyName").value);
    assert.equal(custDict.count(), custDictLength - 1, "Should remove theitem from the dictionary with a matching king and a value wich compares to the value of the item argument using the provided equality comparer.");
    custDict.clear();
    custDict.remove(item, (first, second) => first.single(pair => pair.key == "CompanyName").value == second.single(pair => pair.key == "CompanyName").value);

    assert.throws(() => 
    {
      openWithDict.remove(null)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'key' argument.");

    assert.throws(() => 
    {
      openWithDict.remove(undefined)
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'key' argument.");
  });
}//END module