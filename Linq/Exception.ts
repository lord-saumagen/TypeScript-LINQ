/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Linq
  {

    /**
    * @class TS.Linq.SelectorException
    *
    * @description This exceptions signals an error which occurred in a selector function for specific value.
    *
    * @extends {TS.Exception}
    */
    export class SelectorException extends TS.Exception
    {
      /**
      * @private
      */
      private internalSelector: ((item: any) => any) | null = null;

      /**
      * @private
      */
      private internalValue: any = null;

      /**
      * @override
      *
      * @get {string} type
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
        return this.internalSelector as (item: any) => any;
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
      *
      * @param {(item: any) => Enumerator<any>} selector
      * @param {any} value
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(selector: (item: any) => Enumerator<any>, value: any, message?: string, innerException?: TS.Exception)
      /**
      * @constructor
      *
      * @param { (item: any) => Array<any>} selector
      * @param {any} value
      * @param {string} message?
      * @param {TS.Exception} innerException)
      */
      constructor(selector: (item: any) => Array<any>, value: any, message?: string, innerException?: TS.Exception)
      /**
      * @constructor
      *
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
    * @class TS.Linq.EmptyEnumeratorException
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
      private internalEnumerator: Iterable<any> | null = null;

      /**
      * @override
      *
      * @get {string} type
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
        return (this.internalEnumerator as Iterable<any>);
      }

      /**
      * @constructor
      *
      * @param {Iterable<any>} enumerator
      * @param {string}  message?
      */
      constructor(enumerator: Iterable<any>, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this.internalEnumerator = enumerator;
      }

    }//END class


    /**
    * @class TS.Linq.MoreThanOneElementException
    *
    * @description This exceptions signals an error in a function where only one element is allowed but multiple
    *  elements are available.
    *
    * @extends {TS.Exception}
    */
    export class MoreThanOneElementException extends TS.Exception
    {
      /**
      * @private
      */
      private internalEnumerator: Iterable<any> | null = null;

      /**
      * @override
      *
      * @get {string} type
      */
      get type(): string
      {
        return "TS.Linq.MoreThanOneElementException";
      }

      /**
      * @description The enumerator which caused the exception.
      *
      * @get {Iterable<any>} enumerator
      */
      get enumerator(): Iterable<any>
      {
        return (this.internalEnumerator as Iterable<any>);
      }

      /**
      * @constructor
      *
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

  }//END namespace
}//END namespace