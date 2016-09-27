/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Linq
  {

    /**
    * @class OrderedEnumerator<T, TKey>
    *
    * @description The 'TS.Linq.OrderedEnumerator' class is used by the Linq sort functions where every subsequent call to a sort function operate on
    *  the partitions of the enumerator elements without changing the order of previous sortings.
    *
    * @implements {BaseEnumerator<T}
    * @implements {TS.Linq.IOrderedEnumerator<T>}
    */
    export class OrderedEnumerator<T, TKey> extends BaseEnumerator<T> implements TS.Linq.IOrderedEnumerator<T>
    {
      /**
      * @private
      */
      private keySelector: (item: T) => TKey;

      /**
      * @private
      */
      private comparer: (first: TKey, second: TKey) => number;

      /**
      * @private
      */
      private orderedEnumerator: IOrderedEnumerator<T>;

      /**
      * @description Property which returns an empty 'OrderedEnumerator'.
      *
      * @get {TS.Liny.OrderedEnumerator<any, any>}
      */
      public static get Empty(): OrderedEnumerator<any, any>
      {
        return new OrderedEnumerator(Enumerator.Empty, (item: any) => item, (first: any, second: any) => 0);
      }

      /**
       * @implements {TS.Linq.BaseEnumerator<T>}
       *
       * @returns {Iterator<T>}, an instance of the iterator type.
       */
      public [Symbol.iterator](): Iterator<T>
      {
        let flatArray: Array<T> = this.flatPartitions(this.partitionIterator());
        return new ArrayIterator(flatArray);
      }

      /**
       * @implements {TS.Linq.IOrderedEnumerator<T>}
       *
       * @returns {Iterator<Iterator<T>}, an instance of the partitioned iterator type.
       */
      public partitionIterator(): Iterator<Iterator<T>>
      {
        return new PartitionIterator(this.orderedEnumerator, this.keySelector, this.comparer);
      }

      ////Handled by extension function
      ///**
      // * @description Flattens the current ordered enumeration and returns the elements in array which reflects the current order.
      // *
      // * @returns {Array<T>}
      // */
      //public toArray() : Array<T>
      //{
      //  return Array.from(this);
      //}


      ////Handled by extension function
      ///**
      // * @description Flattens the current ordered enumeration and returns the elements in a list which reflects the current order.
      // *
      // * @returns TS.Collections.List<T>}
      // */
      //public toList(): TS.Collections.List<T>
      //{
      //  return new TS.Collections.List(true, this);
      //}


      private flatPartitions(partitionIterator: Iterator<Iterator<T>>): Array<T>
      {
        let resultArray: Array<T>;
        let outerIterator: Iterator<Iterator<T>> = partitionIterator;
        let sourceArray: Array<T> = new Array<T>();
        let outerResult: IteratorResult<Iterator<T>>;
        let innerResult: IteratorResult<T>;

        resultArray = new Array<T>();

        do
        {
          outerResult = outerIterator.next();
          if (!outerResult.done)
          {
            do
            {
              innerResult = outerResult.value.next();
              if (!innerResult.done)
              {
                resultArray.push(innerResult.value);
              }
            } while (!innerResult.done);
          }
        } while (!outerResult.done);

        return resultArray;
      }

      /**
       * @constructor
       *
       * @param {Iterable<T> | IOrderedEnumerator<T>} enumerator
       * @param {(item: T) => TKey} keySelector
       * @param {(first: TKey, second: TKey) => number} comparer
       *
       * @throws {TS.InvalidTypeException}
       * @throws {TS.ArgumentNullOrUndefinedException}
       */
      constructor(enumerator: Iterable<T> | IOrderedEnumerator<T>, keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number)
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.OrderedEnumerator constructor");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.OrderedEnumerator constructor");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.OrderedEnumerator constructor");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.OrderedEnumerator constructor");
        TS.Utils.checkParameter("comparer", comparer, "TS.Linq.OrderedEnumerator constructor");
        TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.OrderedEnumerator constructor");

        super();

        if ((enumerator as IOrderedEnumerator<T>).partitionIterator == undefined)
        {
          this.orderedEnumerator = new BaseOrderedEnumerator((enumerator as Iterable<T>));
        }
        else
        {
          this.orderedEnumerator = (enumerator as IOrderedEnumerator<T>);
        }
        this.keySelector = keySelector;
        this.comparer = comparer;
      }

      //***********************************************************************
      // Implementing the extension functions 'thenByDescending', and 'thenBy' 
      // from TS.Linq.Extensions.
      // Function 'thenBy' and 'thenByDescending' are only available on
      // 'TS.Linq.OrderedEnumerator' objects for obvious reasons.
      //***********************************************************************


      /**
      * @description Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
      *  This function uses a default comparer. The result may differ from the C# counterpart
      *  because of the different implementations of the default comparer.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534743.aspx | MSDN}
      *
      * @param { (item: T) => TKey } keySelector
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public thenBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      /**
      * @description Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534500.aspx | MSDN}
      *
      * @param { (item: T) => TKey } keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public thenBy<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      public thenBy<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      {
        return TS.Linq.Extensions.thenBy(this, keySelector, comparer);
      }


      /**
      * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to
      *  the specified key. This function uses a default comparer. The result may differ from the C# counterpart
      *  because of the different implementations of the default comparer.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534736.aspx | MSDN}
      *
      * @param { (item: T) => TKey } keySelector
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public thenByDescending<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      /**
      * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to the specified key and comparer.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534489.aspx | MSDN}
      *
      * @param { (item: T) => TKey } keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public thenByDescending<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      public thenByDescending<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      {
        return TS.Linq.Extensions.thenByDescending(this, keySelector, comparer);
      }


      //***********************************************************************
      // END OF extension function binding
      //***********************************************************************

    }//END class  OrderedEnumerator





    /*************************************************************************/
    /* Inner class: BaseOrderedEnumerator<T>                           */
    /*************************************************************************/

    /**
    * @class BaseOrderedEnumerator<T>
    *
    * @internal
    */
    class BaseOrderedEnumerator<T> implements IOrderedEnumerator<T>
    {
      private enumerator: Iterable<T>;
      private done: boolean;

      constructor(enumerator: Iterable<T>)
      {
        this.enumerator = enumerator;
        this.done = false;
      }

      public partitionIterator(): Iterator<Iterator<T>>
      {
        return new ArrayIterator([this.enumerator[Symbol.iterator]()]);
      }

    }

    /*************************************************************************/
    /* Inner class: PartitionIterator                                       */
    /*************************************************************************/

    /**
     * @class PartitionIterator<T, TKey>
     * The 'PartitionIterator<T>' class is returned by the 'OrderedEnumerator' class and all
     * derived classes in order to iterate over the class elements. During iteration the 'next' function
     * of this class is called. If the iteration passed the end of the result set, every subsequent
     * call to next will return a 'IteratorResult<T>' object which has the 'done' flag set.
     *
     * @implements {Iterator<Iterator<T>>}
     *
     * @internal
     */
    class PartitionIterator<T, TKey> implements Iterator<Iterator<T>>
    {
      private orderedEnumerator: IOrderedEnumerator<T>
      private keySelector: (item: T) => TKey;
      private comparer: (first: TKey, second: TKey) => number;
      private initalized: boolean = false;
      private resultArray: Array<Array<T>>;

      /**
       * 
       * @param source, the source object or collection used in this iterator.
       * @param selector, a selector function which determines the result set.
       */
      constructor(orderedEnumerator: IOrderedEnumerator<T>, keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number)
      {
        this.orderedEnumerator = orderedEnumerator;
        this.keySelector = keySelector;
        this.comparer = comparer;
        this.initalized = false;
      }

      private init()
      {
        this.resultArray = this.createPartions(this.orderedEnumerator, this.keySelector, this.comparer);
        this.initalized = true;
      }

      private createPartions(orderedEnumerator: IOrderedEnumerator<T>, keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): Array<Array<T>>
      {
        let partitionedArray: Array<Array<T>>;
        let orderedIterator: Iterator<Iterator<T>>;
        let orderedIteratorResult: IteratorResult<Iterator<T>>;

        partitionedArray = new Array<Array<T>>();
        orderedIterator = orderedEnumerator.partitionIterator();

        do
        {
          orderedIteratorResult = orderedIterator.next();
          if (!orderedIteratorResult.done)
          {
            partitionedArray = partitionedArray.concat(sort(orderedIteratorResult.value));
          }
        } while (!orderedIteratorResult.done);

        return partitionedArray;

        function sort(iterator: Iterator<T>): Array<Array<T>>
        {
          let iteratorResult: IteratorResult<T>;
          let sourceArray: Array<T>;
          let partition: Array<T>;
          let resultArray: Array<Array<T>>;
          let lastElement: T = null;

          sourceArray = new Array<T>();

          do
          {
            iteratorResult = iterator.next();
            if (!iteratorResult.done)
            {
              sourceArray.push(iteratorResult.value);
            }
          } while (!iteratorResult.done);


          sourceArray = sourceArray.sort((first, second) => { return comparer(keySelector(first), keySelector(second)); })
          partition = new Array<T>();
          resultArray = new Array<Array<T>>();

          while (sourceArray.length > 0)
          {
            //new partition
            if ((lastElement != null) && (keySelector(lastElement) != keySelector(sourceArray[0])))
            {
              resultArray.push(partition);
              partition = new Array<T>();
            }
            lastElement = sourceArray.shift();
            partition.push(lastElement);
          }
          resultArray.push(partition);

          return resultArray;
        }

      }

      /**
       * @description This is the implementation of the 'Iterator<Iterator<T>>' interface.
       */
      public next(): IteratorResult<Iterator<T>>
      {
        if (!this.initalized)
        {
          this.init();
        }

        while (this.resultArray.length > 0)
        {
          return { done: false, value: new ArrayIterator<T>(this.resultArray.shift()) };
        }

        return { done: true, value: null };
      }
    }//END class TPartitionIterator


    ///*************************************************************************/
    ///* Inner class: ArrayIterator                                            */
    ///*************************************************************************/

    /**
     * @class ArrayIterator<T>
     * @internal
     */
    class ArrayIterator<T> implements Iterator<T>
    {
      private innerArray: Array<T>;
      private initalized: boolean = false;
      private index: number = -1;

      /**
       * 
       * @param source, the source object or collection used in this iterator.
       * @param selector, a selector function which determines the result set.
       * @throws {TS.ArgumentNullOrUndefinedException}
       */
      constructor(source: Array<T>)
      {
        TS.Utils.checkArrayParameter("source", source, "TS.Linq.OrderedEnumerator.TArrayIterator.constructor");
        this.innerArray = TS.Utils.compactArray(source);
      }

      public next(): IteratorResult<T>
      {
        if (this.innerArray.length > 0)
        {
          return { done: false, value: this.innerArray.shift() };
        }

        return { done: true, value: null }
      }
    }//END class

  }
}