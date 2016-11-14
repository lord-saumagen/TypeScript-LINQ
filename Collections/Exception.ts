/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Collections
  {

    //********************************************************************************
    // Duplicate key exception
    //********************************************************************************

    /**
    * @class TS.Collections.DuplicateKeyException
    *
    * @description This exception signals a duplicate key in a collection.
    *
    * @extends {TS.Exception}
    */
    export class DuplicateKeyException extends TS.Exception
    {

      /**
      * @override {TS.Exception}
      *
      * @get {string} type
      */
      public get type(): string
      {
        return "TS.Collections.DuplicateKeyException";
      }


      /**
      * @constructor
      *
      * @param {string} message.
      * @param {TS.Exception} innerException?, optional inner exception.
      */
      constructor(message: string = "An item with the same key has already been added.", innerException?: Exception)
      {
        super(message, innerException);
      }

    }//END class


    //********************************************************************************
    // Invalid key exception
    //********************************************************************************

    /**
    * @class TS.Collections.InvalidKeyException
    *
    * @description This exception signals a general problem with a key of a collection.
    *
    * @extends {TS.Exception}
    */
    export class InvalidKeyException extends TS.Exception
    {
      /**
      * @private
      */
      private internalKeyValue: any;

      /**
      * @override {TS.Exception}
      *
      * @get {string} type
      */
      public get type(): string
      {
        return "TS.Collections.InvalidKeyException";
      }


      /**
      * @get {any} keyValue
      */
      get keyValue(): any
      {
        return this.internalKeyValue;
      }

      /**
      * @constructor
      *
      * @param {any} keyValue
      * @param {string} message?, optional message.
      * @param {TS.Exception} innerException?, optional inner exception.
      */
      constructor(keyValue: any, message?: string, innerException?: Exception)
      {
        super(message, innerException);
        this.internalKeyValue = keyValue;
      }

    }//END class

  }//END namespace
}//END namespace
