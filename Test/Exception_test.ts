/// <reference path="../_references.ts" />
/// <reference path="./Scripts/qunit.d.ts" />
namespace TS_Exception_test
{
  "use strict";

  QUnit.module("TS.Exception",
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
      }
    });

  QUnit.test("TS.AmbiguousResultException constructor", (assert) =>
  {
    var ExceptionMessage = "Ambiguous result exception message";

    assert.throws(function ()
    {
      throw new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage);
    }, new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage, getInnerExcepton());
    }, new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentException constructor", (assert) =>
  {
    var ExceptionMessage = "Argument exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage);
    }, new TS.ArgumentException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentException("ArgName", 5, ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage);
    }, TS.ArgumentNullException, "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentNullException("ArgName", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullOrUndefinedException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null or undefined exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerExcepton());
    },
      new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullUndefOrEmptyException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null undef or empty exception message";

    assert.throws(function () 
    {
      throw new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullUndefOrWhiteSpaceException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null undef or whiteSpace exception message";

    assert.throws(function () 
    {
      throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentOutOfRangeException constructor", function (assert)
  {
    var ExceptionMessage = "Argument out of range exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage);
    }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentUndefinedException constructor", function (assert)
  {
    var ExceptionMessage = "Argument undefined exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentUndefinedException("ArgName",  ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage, getInnerExcepton());
    }, new TS.ArgumentUndefinedException("ArgName", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArithmeticException constructor", (assert) => 
  {
    var ExceptionMessage = "Arithmetic exception message";

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage);
    }, new TS.ArithmeticException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage, getInnerExcepton());
    }, new TS.ArithmeticException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DeprecatedException constructor", (assert) => 
  {
    var ExceptionMessage = "Deprecated exception message";

    assert.throws(function ()
    {
      throw new TS.DeprecatedException(ExceptionMessage);
    }, new TS.DeprecatedException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DeprecatedException(ExceptionMessage, getInnerExcepton());
    }, new TS.DeprecatedException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DirectoryNotFoundException constructor", (assert) => 
  {
    var ExceptionMessage = "Directory not found exception message";

    assert.throws(function ()
    {
      throw new TS.DirectoryNotFoundException("Dir", "C:/" ,ExceptionMessage);
    }, new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage, getInnerExcepton());
    }, new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DividedByZeroException constructor", (assert) => 
  {
    var ExceptionMessage = "Divided by zero exception message";

    assert.throws(function ()
    {
      throw new TS.DividedByZeroException(ExceptionMessage);
    }, new TS.DividedByZeroException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DividedByZeroException(ExceptionMessage, getInnerExcepton());
    }, new TS.DividedByZeroException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.Exception constructor", function (assert)
  {
    var ExceptionMessage = "Exception message";

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage);
    }, new TS.Exception(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage, getInnerExcepton());
    }, new TS.Exception(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.IndexOutOfRangeException constructor", function (assert)
  {
    var ExceptionMessage = "Index out of range exception message";

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage);
    }, new TS.IndexOutOfRangeException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage, getInnerExcepton());
    }, new TS.IndexOutOfRangeException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidCastException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid cast exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage);
    }, new TS.InvalidCastException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage, getInnerExcepton());
    }, new TS.InvalidCastException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidFormatException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid format exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage);
    }, new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage, getInnerExcepton());
    }, new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidInvocationException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid invocation exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidInvocationException(ExceptionMessage);
    }, new TS.InvalidInvocationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidInvocationException(ExceptionMessage, getInnerExcepton());
    }, new TS.InvalidInvocationException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidOperationException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid operation exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage);
    }, new TS.InvalidOperationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage, getInnerExcepton());
    }, new TS.InvalidOperationException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidTypeException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid type exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage);
    }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, getInnerExcepton());
    }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.NotFiniteNumberException constructor", (assert) => 
  {
    var ExceptionMessage = "Not finite number exception message";

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage);
    }, new TS.NotFiniteNumberException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage, getInnerExcepton());
    }, new TS.NotFiniteNumberException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.NotImplementedException constructor", (assert) => 
  {
    var ExceptionMessage = "Not implemented exception message";

    assert.throws(function ()
    {
      throw new TS.NotImplementedException(ExceptionMessage);
    }, new TS.NotImplementedException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.NotImplementedException(ExceptionMessage, getInnerExcepton());
    }, new TS.NotImplementedException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.OverflowException constructor", (assert) => 
  {
    var ExceptionMessage = "Overflow exception message";

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage);
    }, new TS.OverflowException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage, getInnerExcepton());
    }, new TS.OverflowException(ExceptionMessage, getInnerExcepton()), "Should raise an exception instance of the expected type with an inner exception.");
  });



  /**
  *  @description Creates and returns a new exception of type TS.Exception with the message text: "Inner exception message".
  */
  function getInnerExcepton(): TS.Exception
  {
    return new TS.Exception("Inner exception message");
  }

}//END namespace