/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Linq
  {

    /**
    * @class TS.Linq.Enumerator<T>
    *
    * @descripton  The 'TS.Linq.Enumerator' class is used by the Linq extension functions. The Enumerator class is the
    *  TypeScript equivalent to the ES6 Iteration protocols.
    *
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | MDN}
    *
    * @extends {TS.Linq.BaseEnumerator<T>}
    */
    export class Enumerator<T> extends TS.Linq.BaseEnumerator<T>
    {
      /**
      * @private
      */
      private genFunc: (() => IterableIterator<T>) | null = null;

      /**
      * @description Property which returns an empty 'Enumerator'.
      *
      * @get {Enumerator<any>}
      */
      public static get Empty(): Enumerator<any>
      {
        return new Enumerator(new Array());
      }

      /**
      * @description This function returns the Iterator of the current Enumerator as soon as an iteration starts. E.g.
      *  when a 'for ( let x of enumerator)' is called.
      *
      * @implements {BaseEnumerator<T>}
      *
      * @returns {IterableIterator<T>}, An instance of the iterator type.
      */
      public [Symbol.iterator](): Iterator<T> 
      {
        return new Generator<T>(this.genFunc as () => IterableIterator<T>);
      }

      /**
      * @constructor
      *
      * @description Creates a new 'TS.Linq.Enumerator<T>' object. Takes a  generator function as source. The
      *  generator creates the elements which get treated as the underlying collection of this enumerator. The
      *  constructor throws an exception if the generator is invalid.
      *
      * @param {() => IterableIterator<T>} generator
      *
      * @throws {TS.InvalidInvocationException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      constructor(generator: () => IterableIterator<T>)
      /**
      * @constructor
      *
      * @description Creates a new 'TS.Linq.Enumerator<T>' object. Takes any iterable object or an array like
      *  object as source. The predicate function defines which element becomes an element of underlying collection of
      *  this enumerator. The constructor throws an exception if the source isn't iterable an array like object or if
      *  the predicate function is invalid.
      *
      * @param {Iterable<T>} source
      * @param {(item: T) => boolean} predicate
      *
      * @throws {TS.InvalidInvocationException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      constructor(source: Iterable<T> | ArrayLike<T>, predicate?: (item: T) => boolean)
      constructor(sourceOrGenerator: any, predicate?: (item: T) => boolean)
      {
        super();
        this.genFunc = null;

        TS.Utils.checkParameter("source or generator", sourceOrGenerator, "TS.Linq.Enumerator constructor");

        if (TS.Utils.Assert.isFunction(sourceOrGenerator))
        {
          if (TS.Utils.Assert.isGenerator(sourceOrGenerator))
          {
            this.genFunc = sourceOrGenerator;
          }
          else
          {
            throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid generator function.");
          }
        }
        else if (TS.Utils.Assert.isIterable(sourceOrGenerator) || TS.Utils.Assert.isArrayLike(sourceOrGenerator))
        {
          if (!TS.Utils.Assert.isNullOrUndefined(predicate))
          {
            if (!TS.Utils.Assert.isFunction(predicate))
            {
              throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid selector argument.");
            }
          }
          else
          {
            predicate = (item: T) => true;
          }

          this.genFunc = function* ()
          {
            for (let item of sourceOrGenerator)
            {
              if ((predicate as (item: T) => boolean)(item))
              {
                yield item;
              }
            }
          }
        }
        else
        {
          throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid generator function in argument 'generator' or an iterable or array like type in argument 'source'.");
        }
      }

    }//END class Enumerator


    //*************************************************************************
    // Private class: Generator
    //*************************************************************************

    /**
    * @class Generator<T>
    *
    * @internal
    */
    class Generator<T> implements Iterator<T>
    {
      private genFunc: (() => IterableIterator<T>) | null = null;
      private innerIterator: Iterator<T> | null = null;
      private initalized: boolean = false;

      /**
      * @constructor
      *
      * @param {genFunc: () => IterableIterator<T>} genFunc
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      constructor(genFunc: () => IterableIterator<T>)
      {
        this.initalized = false;
        this.innerIterator = null;
        TS.Utils.checkParameter("genFunc", genFunc, "TS.Linq.Generator");
        TS.Utils.checkFunctionParameter("genFunc", genFunc, "TS.Linq.Generator");
        this.genFunc = genFunc;
      }

      /**
      * @description This function returns a 'IteratorResult<T>' result for each invocation.
      *
      * @returns {IteratorResult<T>}
      */
      public next(): IteratorResult<T>
      {
        if (!this.initalized)
        {
          this.innerIterator = (this.genFunc as () => IterableIterator<T>)();
          this.initalized = true;
        }
        return (this.innerIterator as Iterator<T>).next();
      }
    }//END class

  }//END namespace
}//END namespace