var TS_NG_Utils_test;
(function (TS_NG_Utils_test) {
  "use strict";
  var TestConstructorCallClass = (function () {
    function TestConstructorCallClass(ID) {
      if (ID === void 0) { ID = "1"; }
      this.ID = ID;
      TS.Utils.checkConstructorCall(this, TS_NG_Utils_test.TestConstructorCallClass);
    }
    return TestConstructorCallClass;
  })();
  TS_NG_Utils_test.TestConstructorCallClass = TestConstructorCallClass;
  QUnit.module("TS.Utils (plain js)", {
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

  QUnit.test("checkBitStringParameter (plain js)", (assert) => {
    assert.throws(() => {
      TS.Utils.checkBitStringParameter("object", {}, "checkBitStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an objct 'parameter' argument.");
  });

  QUnit.test("byteToBitString (plain js)", function (assert) {
    assert.throws(function () {
      TS.Utils.byteToBitString({});
    }, TS.InvalidTypeException, "Should throw a 'TS.InvalidTypeException' for a call with a value which is not a number.");
  });

  QUnit.test("UByteToHexString (plain js)", (assert) => {
    assert.throws(() => {
      TS.Utils.UByteToHexString({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't a number.");
  });

  QUnit.test("UInt32To4ByteArray (plain js)", (assert) => {
    assert.throws(() => {
      TS.Utils.UInt32To4ByteArray({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
  });

  QUnit.test("UInt32ToHexString (plain js)", (assert) => {
    assert.throws(() => {
      TS.Utils.UInt32ToHexString({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
  });

  QUnit.test("UInt32ToHexString", (assert) => {
    assert.throws(() => {
      TS.Utils.UInt32ToHexString({});
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a number.");
  });

})(TS_NG_Utils_test || (TS_NG_Utils_test = {}));