namespace TS
{
  "use strict";

  export namespace Utils
  {


    /**
    * @description A collection of assertion functions. Those are functions which take on argument and return a boolean value.
    *  The boolean value describes whether the argument satisfies a specific condition or not.
    */
    export namespace Assert
    {


      /**
      * @description Returns true if the type of the argument 'source' is an arguments type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isArguments(source: any): boolean
      {
        if (TS.Utils.Assert.isObject(source))
        {
          return source.toString().toLowerCase().indexOf("arguments") > -1;
        }//END if

        return false;
      }


      /**
      * @description  Returns true if the type of the argument 'source' is an array type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Array.isArray(source);
      }


      /**
      * @description  Returns true if the type of the argument 'source' is an array like type, otherwise false.
      *  Array like types are collections like the arguments collection or DOM collections. They have a
      *  length property but they are actually not arrays because they have no indexer.
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isArrayLike(source: any) : boolean
      {
        //if (TS.Utils.Assert.isIterable(source))
        //{
        //  return false;
        //}

        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }

        if (TS.Utils.Assert.isNullOrUndefined(source.length))
        {
          return false;
        }
        
        if (!TS.Utils.Assert.isUnsignedIntegerNumber(source.length))
        {
          return false;
        }

        return true;
      }



      /**
      * @description Returns true if the type of the argument 'source' is a none empty binary string. If the string
      *  contains other characters than '0' and '1', even white space, the return value will be false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isBinaryString(source: any): boolean
      {
        if (!TS.Utils.Assert.isString(source))
        {
          return false;
        }//END if

        return (/^[01]+$/gmi).test(source);
      }


      /**
      * @description Returns true if the type of the argument 'source' is a boolean type, otherwise false.
      *
      * @see TS.Utils.Assert.isBooleanValue
      * @see TS.Utils.Assert.isBooleanObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isBoolean(source: any): boolean
      {
        return TS.Utils.Assert.isBooleanObject(source) || TS.Utils.Assert.isBooleanValue(source);
      }


      /**
      * @description  Returns true if the type of the argument 'source' is a boolean object type created with
      *  'new Boolean()', otherwise false.
      *
      * @see TS.Utils.Assert.isBooleanValue
      * @see TS.Utils.Assert.isBoolean
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isBooleanObject(source: any): boolean
      {
        if (!TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "boolean"
      }


      /**
      * @description Returns true if the type of the argument 'source' is a boolean value type (true or false),
      *  otherwise false.
      *
      * @see TS.Utils.Assert.isBoolean
      * @see TS.Utils.Assert.isBooleanObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isBooleanValue(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        return typeof (source) == "boolean";
      }


      /**
      * @description Returns true if the type of the argument 'source' is an array of byte values, otherwise false.
      *
      * @see TS.Utils.Assert.isByteValue
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isByteArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return source.every((value: any) => 
        {
          if (TS.Utils.Assert.isArray(value))
          {
            return TS.Utils.Assert.isByteArray(value);
          }//END if
          else
          {
            return TS.Utils.Assert.isByteValue(value)
          }//END else
        });
      }


      /**
      * @description Returns true if the type of the argument 'source' is in the  ranche of signed byte values [-127 .. 127], otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isByteValue(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isIntegerNumber(source))
        {
          return false;
        }//END if

        return ((source >= -127) && (source <= 127));
      }


      /**
      * @description Returns true if the type of the argument 'source' is considered a valid constructor function which
      *  creates a none empty object, otherwise false.
      *  An empty object is one which can be created using an object literal like '{}' or calling the Object constructor
      *  with a null argument 'new Object(null)'. If the constructor function returns such an object the constructor will
      *  fail the test. 
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isConstructor(source: any): boolean
      {
        let object: any;
        let ownPropertyArray: Array<any>;
        let prototype: any;

        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (typeof (source) != "function")
        {
          return false;
        }//END if

        try
        {
          object = new source();
        }//END try
        catch (Ex)
        {
          return false;
        };

        if (TS.Utils.Assert.isNullOrUndefined(object))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isObject(object))
        {
          return false;
        }//END if

        //
        //Assure that the object is at least one created by the constructor function in argument 'source'
        //and not an arbitrary object returned by a factory function.
        //
        if (!(object instanceof source))
        {
          return false;
        }//END if

        if (!(source.prototype.isPrototypeOf(object)))
        {
          return false;
        }//END if


        //
        // Check whether the new created object is an empty object or not. If the object is an empty object (an object without any properties
        // or methods which are not default values.) treat it as erroneous. A constructor function shouldn't return an empty object because
        // that's meaningless.
        //


        //
        // Collect the ownPoperties of the current instance.
        //
        ownPropertyArray = new Array<any>();
        for (let key in object)
        {
          if (Object.prototype.hasOwnProperty.call(object, key))
          {
            ownPropertyArray.push(key);
          }//END if
        }//END for

        //
        // Check whether the base class is 'Object' or not. If the base class isn't object, check the own properties on 
        // the prototype. It may be that only the prototype got subclassed.
        //
        if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null)
        {
          prototype = Object.getPrototypeOf(object);
          for (let key in prototype)
          {
            if (Object.prototype.hasOwnProperty.call(prototype, key))
            {
              ownPropertyArray.push(key);
            }//END if
          }//END for
        }//END if


        //
        // If the 'ownPropertyArray' is still empt consider the object an empty object.
        //
        if (ownPropertyArray.length == 0)
        {
          return false;
        }//END if

        return true;
      }


      /**
      * @description Returns true if the type of the argument 'source' is a date object type created with
      *  'new Date()', otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isDate(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Object.prototype.toString.call(source).indexOf("Date") > 0;
      }


      /**
      * @description Returns true if the type of the argument 'source' is a none empty decimal string. If the string
      *  contains other characters than [0-9], even white space, the return value will be false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isDecimalString(source: any): boolean
      {
        if (!TS.Utils.Assert.isString(source))
        {
          return false;
        }//END if

        return (/^[0-9]+$/gmi).test(source);
      }


      /**
      * @description  Returns true if the type of the argument 'source' is a dense array type. That means
      *  the array contains no element which is undefined. Returns false otherwise.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isDenseArray(source: any): boolean
      {
        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return !(<Array<any>>source).some((value, index, array) => value === undefined);
      }



      /**
      * @description Returns true if the type of the argument 'source' is an enum type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isEnum(source: any): boolean
      {
        let indexArray: Array<string>;

        if (!TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        indexArray = new Array<string>();

        for (let value in source)
        {
          indexArray.push(value);
        }//END for

        if ((indexArray.length % 2) != 0)
        {
          return false;
        }//END if

        indexArray = indexArray.slice(0, indexArray.length / 2);
        for (let index = 0; index < indexArray.length; index++)
        {
          let value = source[indexArray[index]];
          if (TS.Utils.Assert.isNullOrUndefined(value))
          {
            return false;
          }//END if
          if (source[value] != indexArray[index])
          {
            return false;
          }//END if
        }//END for

        return true;
      }


      /**
      * @description Returns true if the type of the argument 'source' is a function type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isFunction(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return typeof (source) == "function";
      }


      /**
      * @description Returns true if the type of the argument 'source' is a generator object type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isGenerator(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isObject(source))
        {
          let genFunc: GeneratorFunction = Object.getPrototypeOf(function* (): any { }).constructor;
          if (source instanceof genFunc)
          {
            return true;
          }
        }

        return (source as Object).toString() == "[object Generator]";
      }


      /**
      * @description Returns true if the type of the argument 'source' is a none empty hexadecimal string. If the string
      *  contains other characters than [0-9, A-F, a-f], even white space, the return value will be false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isHexString(source: any): boolean
      {
        if (!TS.Utils.Assert.isString(source))
        {
          return false;
        }//END if

        return (/^[0-9A-Fa-f]+$/gmi).test(source);
      }


      /**
      * @description Returns true if the type of the argument 'source' is an infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isInfiniteNumber(source: any): boolean
      {
        return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
      }


      /**
      * @description Returns true if the value of the argument 'source' is an integer number in the
      *   range of [Number.MIN_SAFE_INTEGER..Number.MAX_SAFE_INTEGER],
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isPositiveIntegerNumber
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isIntegerNumber(source: any): boolean
      {
        return Number.isSafeInteger(source);
      }


      /**
      * @description Returns true if the value of the argument 'source' is an iterable value, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isIterable(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(source[Symbol.iterator]))
        {
          return false;
        }//END if

        return true;
      } 


      /**
      * @description This function is just a wrapper around the 'Number.isNaN' function. It's only purpose is to make
      *  the assertion functions available in on place.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNaN(source: any): boolean
      {
        return Number.isNaN(source);
      }


      /**
      * @description Returns true if the type of the argument 'source' is a negative
      *              infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNegativInfiniteNumber(source: any): boolean
      {
        return TS.Utils.Assert.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
      }


      /**
      * @description Returns true if the value of the argument 'source' is null, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNull(source: any): boolean
      {
        return source === null;
      }


      /**
      * @description Returns true if the value of the argument 'source' is null or undefined, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNullOrUndefined(source: any): boolean
      {
        if (TS.Utils.Assert.isUndefined(source))
        {
          return true;
        }//END if

        if (TS.Utils.Assert.isNull(source))
        {
          return true;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the value of the argument 'source' is either null or undefined or an empty string or array.
      *  The function returns false for all argument values which are neither null or undefined nor an empty array or empty string.
      * 
      * @param {Array<any> | string} source
      *
      * @returns {boolean}
      */
      export function isNullUndefOrEmpty(source: Array<any>): boolean;
      export function isNullUndefOrEmpty(source: string): boolean;
      export function isNullUndefOrEmpty(source: any): boolean
      {
        if (TS.Utils.Assert.isUndefined(source))
        {
          return true;
        }//END if

        if (TS.Utils.Assert.isNull(source))
        {
          return true;
        }//END if

        if (Array.isArray(source))
        {
          return (<Array<any>> source).length == 0;
        }//END if


        if (TS.Utils.Assert.isString(source))
        {
          return String(source).length == 0;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the argument value is either null or undefined or is a string wich is either
      *  empty or contains only white space characters.
      *
      * @param {string} source
      *
      * @returns {boolean}
      */
      export function isNullUndefOrWhiteSpace(source: string): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return true;
        }//END if

        if (!TS.Utils.Assert.isString(source))
        {
          return false;
        }//END if

        if (source.trim().length == 0)
        {
          return true;
        }//END if

        return false;
      }


      /**
      * @description  Returns true if the type of the argument 'source' is a number type, otherwise false.
      *
      * @see TS.Utils.Assert.isIntegerNumber
      * @see TS.Utils.Assert.isNumberObject
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isPositiveIntegerNumber
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNumber(source: any): boolean
      {
        return TS.Utils.Assert.isNumberObject(source) || TS.Utils.Assert.isNumberValue(source);
      }


      /**
      * @description Returns true if the type of the argument 'source' is a number object type created with 'new Number()', otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      *
      * @param {any} source
      * @returns {boolean}
      */
      export function isNumberObject(source: any): boolean
      {

        if (!TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "number";
      }


      /**
      * @description Returns true if the type of the argument 'source' is a number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNumberValue(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        if (typeof (source) == "number")
        {

          if (Number.isNaN(source))
          {
            return false;
          }//END if

          return true;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the type of the argument 'source' is an object type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isObject(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return typeof (source) == "object";
      }


      /**
      * @description Returns true if the type of argument 'source' is either a boolean value, a number value or
      *  a string value. Otherwise the result value will be false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isPrimitiveType(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isBooleanValue(source))
        {
          return true;
        }//END if

        if (TS.Utils.Assert.isNumberValue(source))
        {
          return true;
        }//END if

        if (TS.Utils.Assert.isStringValue(source))
        {
          return true;
        }//END if

        return false;
      }


      /**
      * @description  Returns true if the type of the argument 'source' is a regular expression type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isRegEx(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Object.prototype.toString.call(source).indexOf("RegExp") > 0;
      }


      /**
      * @description Returns true if the type of the argument 'source' is a string type, otherwise false.
      *
      * @see TS.Utils.Assert.isStringLiteral
      * @see TS.Utils.Assert.isStringObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isString(source: any): boolean
      {
        return TS.Utils.Assert.isStringObject(source) || TS.Utils.Assert.isStringValue(source);
      }


      /**
      * @description Returns true if the type of the argument 'source' is an array of string values, otherwise false.
      *
      * @see TS.Utils.Assert.isStringValue
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isStringArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return source.every((value: any) => 
        {
          if (TS.Utils.Assert.isArray(value))
          {
            return TS.Utils.Assert.isStringArray(value);
          }//END if
          else
          {
            return TS.Utils.Assert.isStringValue(value);
          }//END else
        });
      }


      /**
      * @description Returns true if the type of the argument 'source' is a string object type created with 'new String()',
      *  otherwise false.
      *
      * @see TS.Utils.Assert.isString
      * @see TS.Utils.Assert.isStringLiteral
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isStringObject(source: any): boolean
      {
        if (!TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "string";
      }


      /**
      * @description Returns true if the type of the argument 'source' is a string value type, otherwise false.
      *
      * @see TS.Utils.Assert.isString
      * @see TS.Utils.Assert.isStringObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isStringValue(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source))
        {
          return false;
        }//END if

        return typeof (source) == "string";
      }


      /**
      * @description Returns true if the type of the argument 'source' is a symbol type, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isSymbol(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return typeof (source) == "symbol"
      }


      /**
      * @description Returns true if the value of the argument 'source' is undefined, otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUndefined(source: any): boolean
      {
        return source === undefined;
      }


      /**
      * @description Returns true if the type of the argument 'source' is an array of unsinged byte values, otherwise false.
      *
      * @see TS.Utils.Assert.isUnsignedByteValue
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUnsignedByteArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return source.every((value: any, index: number, array: Array<any>) => 
        {
          if (TS.Utils.Assert.isArray(value))
          {
            return TS.Utils.Assert.isUnsignedByteArray(value);
          }//END if
          else
          {
            return TS.Utils.Assert.isUnsignedByteValue(value);
          }//END else
        });
      }


      /**
      * @description Returns true if the type of the argument 'source' is in the ranche of unsigned byte values [0 .. 255], otherwise false.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUnsignedByteValue(source: any): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isIntegerNumber(source))
        {
          return false;
        }//END if

        return ((0 <= source) && (source < 256));
      }


      /**
      * @description Returns true if the type of the argument 'source' is a positive infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUnsignedInfiniteNumber(source: any): boolean
      {
        return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
      }




      /**
      * @description Returns true if the value of the argument 'source' is a valid integer number in the range of [0..Number.MAX_SAFE_INTEGER], otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isIntegerNumber
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUnsignedIntegerNumber(source: any): boolean
      {
        if (TS.Utils.Assert.isIntegerNumber(source))
        {
          return source > -1;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the value of the argument 'source' is a valid element of the enumeration in argument 'enumObj'.
      *
      * @param {number | string} source
      * @param {Object} enumObj
      *
      * @returns {boolean}
      */
      export function isValueOfEnum(source: number | string, enumObj: Object): boolean
      {
        let elementArray: Array<any>;

        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isNumberValue(source) && !TS.Utils.Assert.isString(source))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(enumObj))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isEnum(enumObj))
        {
          return false;
        }//END if

        elementArray = new Array<any>();
        for (let item in enumObj)
        {
          elementArray.push(item);
        }

        return (elementArray.find((value: any) => value == source) != undefined);
      }
    }//END class

  }
}