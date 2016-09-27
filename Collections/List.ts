/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Collections
  {

    /**
    * @class List<T>
    *
    * @description This class  mimics the .NET counterpart of a List<T> as far as possible in TypeScript.
    *
    * @see {@link https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx | MSDN}
    *
    * @implements {TS.Collections.IList<T>}
    * @implements {Iterable<T>}
    * @implements {ArrayLike<T>}
    */
    export class List<T> extends TS.Linq.BaseEnumerator<T> implements TS.Collections.IList<T>, ArrayLike<T>
    {
      /**
      * @private
      */
      private internalAllowNull: boolean;

      //***********************************************************************
      // Implements   ArrayLike<T>
      //***********************************************************************

      /**
       * @implements  {ArrayLike<T>}
       *
       * @returns {T}
       */
      [index: number]: T;

      /**
       * @implements  {ArrayLike<T>}
       *
       * @returns {number}
       */
      public length: number;

      //***********************************************************************
      // Implements   TS.Linq.BaseEnumerator<T>
      //***********************************************************************

      /**
       * @implements  {TS.Linq.BaseEnumerator<T>}
       *
       * @returns {Iterator<TSource>}
       */
      public [Symbol.iterator](): Iterator<T>
      {
        return new Generator<T>(this);
      }

      //***********************************************************************
      // Implements   TS.Collections.IList<T>
      //***********************************************************************

      /**
      * @description Adds items to the IList<T>.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @param {Array<T>} ...item
      *
      * @returns {this}
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeExceptionn}
      */
      public add(...rest: Array<T>): this
      {
        for (let item of rest)
        {
          if (this.allowNull)
          {
            TS.Utils.checkNotUndefinedParameter("...rest", rest, "TS.Collections.List.add");
          }//END if
          else
          {
            if (item === null)
            {
              throw new TS.InvalidTypeException("...rest", rest, "TS.Collections.List.add");
            }
          }//END else
          this.push(item);
        }
        return this;
      }


      /**
      * @description Signals whether the list accepts null values as elements or not.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @get {boolean} allowNull
      */
      public get allowNull(): boolean
      {
        return this.internalAllowNull;
      }


      /**
      * @description Removes all items from the IList<T>.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @returns {this}
      */
      public clear(): this
      {
        this.length = 0;
        return this;
      }


      //Handled by extension function
      ///**
      //* @description Determines whether the IList<T> contains a specific value.
      //*
      //* @implements {TS.Collections.IList<T>}
      //*
      //* @param {T} item
      //*
      //* @returns {boolean}
      //*/
      //public contains(item: T): boolean
      //{
      //  return this.internalArray.filter((value, index, array) => (value == item)).length > 0;
      //}


      /**
      * @description Copies the elements of the IList<T> to an Array, starting at a particular Array index.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @param {Array<T>} targetArray.
      * @param {number} destIndex?, default value is 0.
      *
      * @returns {this}
      *
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.ArgumentNullOrUndefinedException};
      * @throws {TS.InvalidTypeException};
      */
      public copyTo(targetArray: Array<T>, destIndex?: number): this
      {
        let index: number;

        TS.Utils.checkParameter("targetArray", targetArray, "TS.Collections.List.copyTo");
        TS.Utils.checkArrayParameter("targetArray", targetArray, "TS.Collections.List.copyTo");

        if (TS.Utils.Assert.isNullOrUndefined(destIndex))
        {
          destIndex = 0;
        }

        if (!TS.Utils.Assert.isUnsignedIntegerNumber(destIndex))
        {
          throw new TS.ArgumentOutOfRangeException("destIndex", destIndex, "The argument 'destIndex' must be a valid positive integer in function 'TS.Collections.List.copyTo'.");
        }

        if (destIndex > targetArray.length)
        {
          throw new TS.ArgumentOutOfRangeException("destIndex", destIndex, "The argument 'destIndex' must be a valid positive integer in the range of [0..targetArray.length] in  function 'TS.Collections.List.copyTo'.");
        }

        for (index = 0; index < this.length; index++)
        {
          targetArray[destIndex] = this[index];
          destIndex++;
        }
        return this;
      }


      //Handled by extension function
      ///**
      //* @description Gets the number of elements contained in the IList<T>.
      //*
      //* @implements {TS.Collections.IList<T>}
      //*
      //* @returns {number}
      //*/
      //public count(): number
      //{
      //  return this.internalArray.length;
      //}


      /**
      * @description Searches for the specified object and returns the zero - based index of the first occurrence within the entire List<T>.
      *  Returns -1 if there is no match for the given item.
      *
      * @implements  {TS.Collections.IList<T>}
      *
      * @param {T} item.
      *
      * @returns {number}
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      public indexOf(item: T): number
      /**
      * @description Searches for the specified object and returns the zero - based index of the first occurrence within the range of elements 
      *  in the List<T> that extends from the specified index to the last element.
      *  Returns -1 if there is no match for the given item.
      *
      * @implements  {TS.Collections.IList<T>}
      *
      * @param {T} item
      * @param {number} startIndex
      *
      * @returns {number}
      *
      * @throws {TS.ArgumentUndefinedException}
      *`@throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public indexOf(item: T, startIndex: number): number
      /**
      * @description Searches for the specified object and returns the zero - based index of the first occurrence within the range of elements 
      *  in the List<T> that extends from the specified index to the last element.
      *  The equalityComparer is used to determine a match with the searched item in the List<T>.
      *  Returns -1 if there is no match for the given item.
      *
      * @implements  {TS.Collections.IList<T>}
      *
      * @param {T} item
      * @param {number} startIndex
      * @param {(first: T, second: T) => boolean} equalityComparer
      *
      * @returns {number}
      *
      * @throws {TS.ArgumentUndefinedException}
      *`@throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public indexOf(item: T, startIndex: number, equalityComparer: (first: T, second: T) => boolean): number
      public indexOf(item: T, startIndex?: number, equalityComparer?: (first: T, second: T) => boolean): number
      {
        if (this.allowNull)
        {
          TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.indexOf");
        }//END if
        else
        {
          TS.Utils.checkParameter("item", item, "TS.Collections.List.indexOf");
        }//END else

        if (!TS.Utils.Assert.isNullOrUndefined(startIndex))
        {
          TS.Utils.checkUIntNumberParameter("index", startIndex, "TS.Collections.List.indexOf");
        }
        else
        {
          startIndex = 0;
        }

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.last");
        }//END if
        else
        {
          equalityComparer = (first: T, second: T) => first === second;
        }//END else


        for (let index = startIndex; index < this.length; index++)
        {
          if (equalityComparer(this[index], item))
          {
            return index;
          }
        }

        return -1;
      }


      /**
      * @descriptiong Inserts an element into the List<T> at the specified index.
      *
      * @implements  {TS.Collections.IList<T>}
      *
      * @param {number} index
      * @param {T} item
      *
      * @returns {this}
      *
      * @throws {TS.ArgumentUndefinedException}
      *`@throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      public insert(index: number, item: T): this
      {
        let internalArray: Array<T>;

        if (this.allowNull)
        {
          TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.insert");
        }//END if
        else
        {
          TS.Utils.checkParameter("item", item, "TS.Collections.List.insert");
        }//END else

        TS.Utils.checkUIntNumberParameter("index", index, "TS.Collections.List.insert");

        if (index > this.length)
        {
          throw new TS.ArgumentOutOfRangeException("index", index, "Index must be within the bounds of the List in function 'TS.Collections.List.insert'.")
        }//END if

        internalArray = new Array<T>();
        this.copyTo(internalArray, 0);
        internalArray.splice(index, 0, ...[item]);
        this.clear();
        this.add(...internalArray);
        return this;
      }


      /**
      * @description Removes the first occurrence of the specific object from the IList<T>.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @param {T} item
      *
      * @returns {this}
      *
      * @throws {TS.ArgumentUndefinedException}
      */
      public remove(item: T): this
      {
        let internalArray: Array<T>;

        TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.remove");

        internalArray = new Array<T>();
        this.copyTo(internalArray, 0);

        internalArray.some((value, index, array) =>
        {
          if (value == item)
          {
            internalArray[index] = undefined;
            return true;
          }
        })

        internalArray = TS.Utils.compactArray(internalArray);
        this.clear();
        this.add(...internalArray);
        return this;
      }


      /**
      * @description Removes the element at the specified index of the List<T>.
      *
      * @implements {TS.Collections.IList<T>}
      *
      * @param {number} index
      *
      * @returns {this}
      */
      public removeAt(index: number): this
      {
        let internalArray: Array<T>;

        if ((index < 0) || (index > this.length - 1))
        {
          return this;
        }//END if

        internalArray = new Array<T>();
        this.copyTo(internalArray, 0);
        internalArray.splice(index, 1);
        this.clear();
        this.add(...internalArray);
        return this;
      }


      //Handled by extension function
      ///**
      //* @description Converts the IList<T> into an array of type T.
      //*
      //* @returns {Array<T>}
      //*/
      //public toArray(): Array<T>;

      //***********************************************************************
      // END OF Interface implementations
      //***********************************************************************

      /**
      * @constructor
      *
      * @description This constructor of the List class requires the allowNull flag to be set which determines whether the
      *  List will accept null values as element or not. The default value for that flag is 'true'.
      *  In C# you would declare a List<T> to allow null values or not by using a nullable type as concrete type parameter
      *  or not. Since all types in JavaScript nullable per default, I had to introduce the 'allowNull' flag in the constructor
      *  signature.
      *  The optional generator function will be use to initially fill the list with elements if provided.
      *
      * @param {boolean}, allowNull = true
      * @param{() => IterableIterator<T>} generator?
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidInvocationException}
      */
      constructor(allowNull: boolean, generator?: () => IterableIterator<T>)
      /**
      * @constructor
      *
      * @description Thos constructor of the List class requires the allowNull flag to be set which determines whether the
      *  List will accept null values as element or not. The default value for that flag is 'true'.
      *  In C# you would declare a List<T> to allow null values or not by using a nullable type as concrete type parameter
      *  or not. Since all types in JavaScript nullable per default, I had to introduce the 'allowNull' flag in the constructor
      *  signature.
      *  The optional source will be use to initially fill the list with elements if provided.
      *  The optional predicate determines which elements of the source will become elements of the list.
      *
      * @param {boolean}, allowNull = true
      * @param{Iterable<T> | ArrayLike<T>} source?
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidInvocationException}
      */
      constructor(allowNull: boolean, source?: Iterable<T> | ArrayLike<T>, predicate?: (item: T) => boolean)
      constructor(allowNull: boolean = true, sourceOrGenerator: any, predicate?: (item: T) => boolean)
      {
        super();
        this.length = 0;
        this.internalAllowNull = allowNull;

        TS.Utils.checkBooleanParameter("allowNull", allowNull, "constructor of TS.Collections.List");
        if (!TS.Utils.Assert.isNullOrUndefined(sourceOrGenerator))
        {
          //
          //It's a generator
          //
          if (TS.Utils.Assert.isFunction(sourceOrGenerator))
          {
            if (TS.Utils.Assert.isGenerator(sourceOrGenerator))
            {
              for (let item of sourceOrGenerator)
              {
                if ((item == null) && (!this.internalAllowNull))
                {
                  throw new TS.InvalidTypeException("source or generator", sourceOrGenerator, "Argument 'source or generator' is not allowed to hold null values if flag 'allowNull' is set to false in the constructor of 'TS.Collections.List'.")
                }
                this.push(item);
              }
            }
            else
            {
              throw new TS.InvalidInvocationException("The constructor of ' TS.Collections.List' requires a valid generator function.");
            }
          }
          //
          //It's an Iterable<T> | ArrayLike<T> source
          //
          else if (TS.Utils.Assert.isIterable(sourceOrGenerator) || TS.Utils.Assert.isArrayLike(sourceOrGenerator))
          {
            if (!TS.Utils.Assert.isNullOrUndefined(predicate))
            {
              if (!TS.Utils.Assert.isFunction(predicate))
              {
                throw new TS.InvalidInvocationException("The constructor of 'TS.Collections.List' requires a valid selctor argument.");
              }
            }
            else
            {
              predicate = (item: T) => true;
            }
            for (let item of sourceOrGenerator)
            {
              if (predicate(item))
              {
                if ((item == null) && (!this.internalAllowNull))
                {
                  throw new TS.InvalidTypeException("source or generator", sourceOrGenerator, "Argument 'source or generator' is not allowed to hold null values if flag 'allowNull' is set to false in the constructor of 'TS.Collections.List'.")
                }
                this.push(item);
              }
            }
          }
        }
      }


      /**
      * @private
      */
      private push(item: T): void
      {
        this[this.length] = item;
        this.length++;
      }


      /**
      * @private
      */
      private pop(): T
      {
        if (this.length == 0)
        {
          return undefined;
        }

        let returnValue: T;
        returnValue = this[this.length];
        this.length--;
        return returnValue;
      }


    }//END class

    //*************************************************************************
    // Private class: Generator
    //*************************************************************************

    /**
     * @class Generator<T>
     *
     * @implements {Iterator<T>}
     *
     * @internal
     */
    class Generator<T> implements Iterator<T>
    {
      private innerCollection: ArrayLike<T>;
      private innerIterator: Iterator<T> = null;
      private initalized: boolean = false;
      private genFunc = function* ()
      {
        for (let index = 0; index < this.innerCollection.length; index++)
        {
          yield this.innerCollection[index];
        }
      }

      /**
       * @constructor
       *
       * @param {genFunc: () => IterableIterator<TSource>} genFunc
       *
       * @throws {TS.ArgumentNullOrUndefinedException}
       * @throws {TS.InvalidTypeException}
       */
      constructor(collection: ArrayLike<T>)
      {
        this.initalized = false;
        this.innerIterator = null;
        TS.Utils.checkParameter("collection", collection, "TS.Collections.Generator");
        TS.Utils.checkArrayLikeParameter("collection", collection, "TS.Collections.Generator");
        this.innerCollection = collection;
      }

      /**
       * @description This function returns a 'IteratorResult<TSource>' result for each invocation.
       *
       * @returns {IteratorResult<TSource>}
       */
      public next(): IteratorResult<T>
      {
        if (!this.initalized)
        {
          this.innerIterator = this.genFunc();
          this.initalized = true;
        }
        return this.innerIterator.next();
      }
    }//END class

  }//END namespace
}//END namespace