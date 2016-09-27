/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";


  export namespace Collections
  {

    /**
    * @class KeyValuePair<TKey, TValue>
    *
    * @description This is the implementation of the key value pair used by the dictionary class.
    *
    * @see {@link https://msdn.microsoft.com/en-us/library/5tbh8a42(v=vs.110).aspx | MSDN}
    */
    export class KeyValuePair<TKey, TValue>
    {
      /**
      * @private
      */
      private internalKey: TKey;

      /**
      * @private
      */
      private internalValue: TValue

      /**
      * @get {TKey} key
      */
      public get key(): TKey
      {
        return this.internalKey;
      }

      /**
      * @get {TValue} value
      */
      public get value(): TValue
      {
        return this.internalValue;
      }

      ///**
      //* @set {TValue} value
      //*/
      //public set value(newValue: TValue)
      //{
      //  if (this.internalValue != newValue)
      //  {
      //    this.internalValue = newValue;
      //  }
      //}

      /**
      * @constructor
      *
      * @param {TKey} key.
      * @param {TValue} value
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      constructor(key: TKey, value: TValue)
      {
        TS.Utils.checkParameter("key", key, "constructor of TS.Collections.KeyValuePair");

        this.internalKey = key;
        this.internalValue = value;
      }

    }//END class

  }//END namespace
}//END namespace
 