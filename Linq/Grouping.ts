/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Linq
  {

    /**
    * @interface IGrouping<TKey, T>
    */
    export interface IGrouping<TKey, T> 
    {
      /**
      * @readonly
      *
      * @member {TKey} key
      */
      key: TKey;
    }//END interface

    /**
     * @class Grouping<TKey, T>
     *
     * @description This class is an extension of the TS.Linq.Enumerator<T> class and is the returned type of the TS.Linq.Extensions.groupBy function.
     *
     * @extends {TS.Linq.Enumerator<T>}
     *
     * @implements {IGrouping<TKey, T>}
     */
    export class Grouping<TKey, T> extends TS.Linq.Enumerator<T> implements TS.Linq.IGrouping<TKey, T>
    {
      private innerKey: TKey;

      /**
      * @implements {TS.Linq.IGrouping<TKey, T>}
      *
      * @get {TKey} key
      */
      public get key(): TKey
      {
        return this.innerKey;
      }

      /**
       * @constructor
       *
       * @param {TKey} key
       * @param {Iterable<T>} enumerator
       * @param {(item: T) => TKey} keySelector
       * @param {(first: TKey, second: TKey) => boolean} equalityComparer
       * @param {(item: T) => any} elementSelector?
       *
       * @throws {TS.InvalidTypeException}
       * @throws {TS.ArgumentNullOrUndefinedException}
       */
      constructor(key: TKey, enumerator: Iterable<T>, keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector?: (item: T) => any)
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.Grouping constructor");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.Grouping constructor");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.Grouping constructor");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.Grouping constructor");
        TS.Utils.checkParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.Grouping constructor");
        TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.Grouping constructor");
        
        if (!TS.Utils.Assert.isNullOrUndefined(elementSelector))
        {
          TS.Utils.checkFunctionParameter("elementSelector", elementSelector, "TS.Linq.Extensions.Grouping constructor");
        }
        else
        {
          //Default element selector
          elementSelector = (item: T) => item;
        }

        let generatorFunction = function* ()
        {
          let result: TS.Linq.Enumerator<any> = TS.Linq.Extensions.select(TS.Linq.Extensions.where(enumerator, item => equalityComparer(keySelector(item), key)), item => elementSelector(item));
          for (let item of result)
          {
            yield item;
          }
        }

        super(generatorFunction);
        this.innerKey = key;
      }
    }//END class


  }
}
