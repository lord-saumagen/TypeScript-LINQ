/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Linq
  {

    /**
     * @class
     *
     * @description This exceptions signals an error which occured in a selector function for specific value.
     *
     * @extends {TS.Exception}
     */
    export class SelectorException extends TS.Exception
    {
      /**
      * @private
      */
      private internalSelector: (item: any) => any = null;

      /**
      * @private
      */
      private internalValue: any = null;

      /**
      * @override {TS.Exception}
      */
      get type(): string
      {
        return "TS.Linq.SelectorException";
      }

      /**
      * @description The selector which caused the exception.
      *
      * @get {(item: any) => Enumerator<any>} selector
      */
      get selector(): (item: any) => Enumerator<any>
      {
        return this.internalSelector;
      }

      /**
      * @description The value which caused the exception.
      *
      * @get {any} value
      */
      get value(): any
      {
        return this.internalValue;
      }

      /**
      * @constructor
      * @param {(item: any) => Enumerator<any>} selector
      * @param {any} value
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(selector: (item: any) => Enumerator<any>, value: any, message?: string, innerException?: TS.Exception)
      /**
      * @constructor
      * @param { (item: any) => Array<any>} selector
      * @param {any} value
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(selector: (item: any) => Array<any>, value: any, message?: string, innerException?: TS.Exception)
      /**
      * @constructor
      * @param { (item: any) =>any} selector
      * @param {any} value
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(selector: (item: any) => any, value: any, message?: string, innerException?: TS.Exception)
      constructor(selector: any, value: any, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this.internalSelector = selector;
        this.internalValue = value;
      }
    }//END class

    /**
     * @class
     *
     * @description This exceptions signals an error in a function which expects a none empty enumerator to operate on.
     *
     * @extends {TS.Exception}
     */
    export class EmptyEnumeratorException extends TS.Exception
    {
      /**
      * @private
      */
      private internalEnumerator: Iterable<any> = null;

      /**
      * @override {TS.Exception}
      */
      get type(): string
      {
        return "TS.Linq.EmptyEnumeratorException";
      }

      /**
      * @description The enumerator which caused the exception.
      *
      * @get {Iterable<any>} enumerator
      */
      get enumerator(): Iterable<any>
      {
        return this.internalEnumerator;
      }

      /**
      *  @constructor
      */
      constructor(enumerator: Iterable<any>, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this.internalEnumerator = enumerator;
      }

    }//END class

    export class MoreThanOneElementException extends TS.Exception
    {
      private internalEnumerator: Iterable<any> = null;

      /**
      * @overwrite
      */
      get type(): string
      {
        return "TS.Linq.MoreThanOneElementException";
      }

      get enumerator(): Iterable<any>
      {
        return this.internalEnumerator;
      }

      /**
      * @constructor
      * @param {Iterable<any>} enumerator
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(enumerator: Iterable<any>, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this.internalEnumerator = enumerator;
      }

    }//END class

  }

}