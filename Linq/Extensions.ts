/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Linq
  {

    export module Extensions
    {

      // -------------------------------------
      // LINQ Extensions
      // https://msdn.microsoft.com/en-us/library/bb397896.aspx (Standard query operators)
      // https://msdn.microsoft.com/en-us/library/system.linq.enumerable_methods(v=vs.110).aspx (List of all extension functions assigned to Enumerable)
      // https://msdn.microsoft.com/en-us/library/bb882641.aspx (Classification of Standard Query Operators by Manner of Execution)
      // http://referencesource.microsoft.com/#System.Core/System/Linq/Enumerable.cs (Reference Source)
      // -------------------------------------


      /**
      * @description Applies an accumulator function over a sequence.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548651.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(first: TSource, second: TSource) => TSource} accumulator
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @throws {TS.InvalidTypeException}
      */
      export function aggregate<TSource>(enumerator: Iterable<TSource>, accumulator: (first: TSource, second: TSource) => TSource): TSource
      /**
      * @description Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549218.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(first: TAccumulate, second: TSource) => TAccumulate} accumulator
      * @param {TAccumulate} seed
      *
      * @returns {TAccumulate}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function aggregate<TSource, TAccumulate>(enumerator: Iterable<TSource>, accumulator: (first: TAccumulate, second: TSource) => TAccumulate, seed: TAccumulate): TAccumulate
      export function aggregate<TSource, TAccumulate>(enumerator: Iterable<TSource>, accumulator: (first: (TSource | TAccumulate), second: TSource) => (TSource | TAccumulate), seed?: TAccumulate): TSource | TAccumulate
      {
        let resultValue: any;
        let isEmpty: boolean = true;
        let isFirst: boolean = true;
        let useSeed: boolean = false;

        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.aggregate");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.aggregate");
        TS.Utils.checkParameter("accumulator", accumulator, "TS.Linq.Extensions.aggregate");
        TS.Utils.checkFunctionParameter("accumulator", accumulator, "TS.Linq.Extensions.aggregate");

        useSeed = !TS.Utils.Assert.isNullOrUndefined(seed);

        for (let current of enumerator)
        {
          if (isFirst)
          {
            if (useSeed)
            {
              resultValue = accumulator(seed, current);
            }
            else
            {
              resultValue = current;
            }
            isFirst = false;
          }
          else
          {
            resultValue = accumulator(resultValue, current);
          }
        }

        if (isFirst)
        {
          if (useSeed)
          {
            resultValue = seed;
          }
          else
          {
            throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.aggregate'.");
          }
        }

        return resultValue;
      }


      /**
      * @description Determines whether all elements of a sequence satisfy a condition.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548541.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function all<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): boolean
      {

        let resultValue = true;

        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.all");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.all");
        TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.all");
        TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.all");

        for (let item of enumerator)
        {
          if (!predicate(item))
          {
            return false;
          }
        }

        return true;
      }


      /**
      * @description Determines whether a sequence contains any elements.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb337697.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function any<TSource>(enumerator: Iterable<TSource>): boolean
      /**
      * @description Determines whether any element of a sequence satisfies a condition.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534972.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function any<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): boolean
      export function any<TSource>(enumerator: Iterable<TSource>, predicate?: (item: TSource) => boolean): boolean
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.any");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.any");


        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.any");
        }//END if
        else
        {
          predicate = item => true;
        }//END else


        for (let item of enumerator)
        {
          if (predicate(item))
          {
            return true;
          }
        }

        return false;
      }


      /**
      * @description Computes the average of a sequence of number values.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb354760.aspx | MSDN}
      *
      * @param {Iterable<number>} enumerator
      *
      * @returns {number} The average of all items in the enumerable.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @throws {TS.OverflowException}
      */
      export function average(enumerator: Iterable<number>): number
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.average");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.average");

        let sum = 0;
        let count = 0;

        for (let item of enumerator)
        {
          if (!TS.Utils.Assert.isNumberValue(item))
          {
            throw new TS.InvalidTypeException("enumerator", enumerator, "Enumerator is not a valid number enumerator in function 'TS.Linq.Extensions.average'.");
          }

          sum += item;
          count++;
        }

        if (!TS.Utils.Assert.isNumberValue(sum))
        {
          throw new TS.InvalidTypeException("enumerator", enumerator, "Enumerator is not a valid number enumerator in function 'TS.Linq.Extensions.average'.");
        }

        if (TS.Utils.Assert.isInfiniteNumber(sum))
        {
          throw new TS.OverflowException("An arrithmetic overflow occured during the execution of 'TS.Extensions.average'.");
        }

        if (count == 0)
        {
          throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.average'.");
        }

        return sum / count;
      }


      /**
      * @description Concatenates two sequences.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb302894.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @returns { TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}.
      */
      export function concat<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      {

        TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.concat");
        TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.concat");
        TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.concat");
        TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.concat");

        var _arr: Array<TSource>;
        let resultEnumerator: Enumerator<TSource>

        let generatorFunc = function* ()
        {
          let firstIter = firstEnumerator[Symbol.iterator]();
          let secondIter = secondEnumerator[Symbol.iterator]();
          let result: IteratorResult<TSource>;

          do
          {
            result = firstIter.next();
            if (!result.done)
            {
              yield result.value;
            }
          } while (!result.done)

          do
          {
            result = secondIter.next();
            if (!result.done)
            {
              yield result.value;
            }
          } while (!result.done)
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunc);
      }


      /**
      * @description Determines whether a sequence contains a specified element by using the default equality comparer.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to determine whether an elements in
      *  the enumeration matches with the specified search element.
      *  This function may produce results that differ from the C# counterpart,
      *  because the comparsion operators have different implementations in C#
      *  and javascript.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb352880.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {TSource} element
      *
      * @returns {boolen}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function contains<TSource>(enumerator: Iterable<TSource>, element: TSource): boolean
      /**
      * @description Determines whether a sequence contains a specified element by using a specified equality comparer.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb339118.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {TSource} element
      * @param {(first: TSource, second: TSource) => boolean} equalityComparer
      *
      * @returns {boolen}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function contains<TSource>(enumerator: Iterable<TSource>, element: TSource, equalityComparer: (first: TSource, second: TSource) => boolean): boolean
      export function contains<TSource>(enumerator: Iterable<TSource>, element: TSource, equalityComparer?: (first: TSource, second: TSource) => boolean): boolean
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.contains");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.contains");
        TS.Utils.checkParameter("element", element, "TS.Linq.Extensions.contains");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.contains");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        for (let item of enumerator)
        {
          if (equalityComparer(item, element))
          {
            return true;
          }
        }

        return false;
      }


      /**
      * @description Returns the number of elements in a sequence.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function count<TSource>(enumerator: Iterable<TSource>): number
      /**
      * @description Returns a number that represents how many elements in the specified sequence satisfy a condition.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535181.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function count<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): number
      export function count<TSource>(enumerator: Iterable<TSource>, predicate?: (item: TSource) => boolean): number
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.count");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.count");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.count");
        }//END if
        else
        {
          predicate = item => true;
        }//END else

        let count: number = 0;

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            count++;
          }
        }

        return count;
      }


      /**
      * @description This function retuns an endless number of elements from the underlying sequence by running over the
      *  that sequence in cycles.
      *  The function enumerates the elements of the base sequence from the start to then end
      *  and starts over with the first element as soon as the last element is reached.
      *  This function will never run out of data. There is one exception of that rule. If the underlying
      *  sequence is an empty sequence, the cycle function will never give a result.
      *
      *  Attention:
      *  Limit the number of returned elements by calling a 'take' operator or some other limiting operator.
      *  Otherwise you will run out fo memory.
      *
      *  This function is not a Linq function.
      * @description Deferred execution.
      *
      * @param  {Iterable<TSource>} enumerator
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function cycle<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.cycle");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.cycle");

        let generatorFunction = function* ()
        {
          if (TS.Linq.Extensions.count(enumerator) == 0)
          {
            return null;
          }

          while (true)
          {
            for (let item of enumerator)
            {
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns the elements of an enumerator, or a default valued singleton collection if the sequence is empty.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.defaultifempty.aspx | MSDN}
      *
      * @param  {Iterable<TSource>} enumerator
      * @param  { new (): TSource; } | T) defaultConstructorOrValue
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function defaultIfEmpty<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.defaultIfEmpty");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.defaultIfEmpty");
        TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.defaultIfEmpty");

        let generatorFunction = function* ()
        {
          let hasElements = false;
          for (let item of enumerator)
          {
            hasElements = true;
            yield item;
          }

          if (!hasElements)
          {
            if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue))
            {
              yield new (defaultConstructorOrValue as { new (): TSource })();
            }
            else
            {
              yield defaultConstructorOrValue as TSource;
            }

          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns distinct elements from a sequence by using the default equality comparer to compare values.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to achieve distinction.
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have
      *  different implementations in C# and javascript.
      * @description Deferred execution
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      * @param  {Iterable<TSource>} enumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function distinct<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      /**
      * @description Returns distinct elements from a sequence by using a specified equality comparer to compare values.
      * @description Deferred execution
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(first: TSource, second: TSource) => boolean} equalityComparer
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function distinct<TSource>(enumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      export function distinct<TSource>(enumerator: Iterable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.distinct");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.distinct");


        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.distinct");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else


        let generatorFunction = function* ()
        {

          let tempArray: Array<TSource> = new Array<TSource>();

          for (let item of enumerator)
          {
            if (tempArray.find((value, index, arr) => { return equalityComparer(value, item); }) == undefined)
            {
              tempArray.push(item);
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns the element at a specified index in a sequence.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb299233(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {number} index
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.IndexOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      */
      export function elementAt<TSource>(enumerator: Iterable<TSource>, index: number): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAt");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAt");
        TS.Utils.checkUIntNumberParameter("index", index, "TS.Linq.Extensions.elementAt");


        let temArray: Array<TSource> = TS.Linq.Extensions.toArray(enumerator);
        if (index < temArray.length)
        {
          return temArray[index];
        }

        throw new TS.IndexOutOfRangeException("The 'index' in function 'TS.Linq.Extensions.elementAt' is out of the range of the current enumerator.");
      }


      /**
      * @description Returns the element at a specified index in a sequence or a default value
      *  if the index is out of the range of the sequence.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb494386(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {number} index
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function elementAtOrDefault<TSource>(enumerator: Iterable<TSource>, index: number, defaultConstructorOrValue: { new (): TSource; } | TSource): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAtOrDefault");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAtOrDefault");
        TS.Utils.checkUIntNumberParameter("index", index, "TS.Linq.Extensions.elementAtOrDefault");
        TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.elementAtOrDefault");


        let temArray: Array<TSource> = TS.Linq.Extensions.toArray(enumerator);
        if (index < temArray.length)
        {
          return temArray[index];
        }

        if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue))
        {
          return new (defaultConstructorOrValue as { new (): TSource })();
        }
        else
        {
          return defaultConstructorOrValue as TSource;
        }
      }


      /**
      * @description Produces the set difference of two sequences.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to achieve distinction.
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have
      *  different implementations in C# and javascript.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb300779.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function except<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      /**
      * @description Produces the set difference of two sequences by using the specified equality comparer to compare values.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb336390.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      * @param {(first: TSource, second: TSource) => boolean)} equalityComparer
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function except<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      export function except<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.except");
        TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.except");
        TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.except");
        TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.except");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.except");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        let generatorFunction = function* ()
        {
          for (let firstItem of firstEnumerator)
          {
            let match = false;
            for (let secondItem of secondEnumerator)
            {
              if (equalityComparer(firstItem, secondItem))
              {
                match = true;
              }
            }
            if (!match)
            {
              yield firstItem;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns the first element of a sequence.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.InvalidTypeException}
      */
      export function first<TSource>(enumerator: Iterable<TSource>): TSource
      /**
      * @description Returns the first element in a sequence that satisfies a specified condition.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.InvalidTypeException}
      */
      export function first<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function first<TSource>(enumerator: Iterable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.first");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.first");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.first");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            return item;
          }
        }

        throw new TS.InvalidOperationException("The'enumerator' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.first'.");
      }


      /**
      * @description Returns the first element of a sequence, or a default value if the sequence contains no elements.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function firstOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource): TSource
      /**
      * @description Returns the first element of the sequence that satisfies a condition or a default value if no element satisfied the condition.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param { new (): TSource; } | TSource defaultConstructorOrValue
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function firstOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate: (item: TSource) => boolean): TSource
      export function firstOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.firstOrDefault");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.firstOrDefault");
        TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.firstOrDefault");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.firstOrDefault");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            return item;
          }
        }

        if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue))
        {
          return new (defaultConstructorOrValue as { new (): TSource })();
        }
        else
        {
          return defaultConstructorOrValue as TSource;
        }
      }


      /**
      * @description Performs the specified action on each element of the underlying sequence.
      *  I implemented this extension for your convenience. Without that function
      *  you had to call 'toArray' first before you could use the array method
      *  for each. Please read the article below from 'Eric Lippert's' blog to
      *  make sure that you understand all the implications of this extension
      *  function.
      *
      *  This function is not a Linq function.
      * @description Immediate execution.
      *
      * @see {@link http://blogs.msdn.com/b/ericlippert/archive/2009/05/18/foreach-vs-foreach.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => void } action
      *
      * @retuns {Iterable<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function forEach<TSource>(enumerator: Iterable<TSource>, action: (item: TSource) => void): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.forEach");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.forEach");
        TS.Utils.checkParameter("action", action, "TS.Linq.Extensions.foreach");
        TS.Utils.checkFunctionParameter("action", action, "TS.Linq.Extensions.forEach");

        for (let item of enumerator)
        {
          action(item);
        }

        return new TS.Linq.Enumerator(enumerator);
      }


      /**
      * @description Groups the elements of a sequence according to a specified key selector function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      * 
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      *
      * @returns {TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TSource>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function groupBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.Enumerator<Grouping<TKey, TSource>>
      /**
      * @description Groups the elements of a sequence according to a specified key selector function.
      *  The keys are compared by using the specified comparer in argument 'equalityComparer'.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      *
      * @returns {TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TSource>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function groupBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<Grouping<TKey, TSource>>
      /**
      * @description Groups the elements of a sequence according to a specified key selector function and projects the elements
      *  for each group by using a specified selector function. The keys are compared by using the specified comparer in argument
      *  'equalityComparer' if provided.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      * @param {(item: TSource) => TElement} elementSelector?
      *
      * @returns {TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TElement>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function groupBy<TSource, TKey, TElement>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector: (item: TSource) => TElement): TS.Linq.Enumerator<Grouping<TKey, TElement>>
      export function groupBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer?: (first: TKey, second: TKey) => boolean, elementSelector?: (item: TSource) => any): TS.Linq.Enumerator<any>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.groupBy");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.groupBy");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.groupBy");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.groupBy");


        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.groupBy");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        if (!TS.Utils.Assert.isNullOrUndefined(elementSelector))
        {
          TS.Utils.checkFunctionParameter("elementSelector", elementSelector, "TS.Linq.Extensions.groupBy");
        }//END if
        else
        {
          elementSelector = (item) => item;
        }//END else


        let generatorFunction = function* () 
        {
          let keys: Iterable<TKey> = distinct(select(enumerator, keySelector));
          for (let key of keys)
          {
            yield new Grouping(key, enumerator, keySelector, equalityComparer, elementSelector);
          }
        }

        return new TS.Linq.Enumerator<any>(generatorFunction);
      }


      /**
      * @description Correlates the elements of two sequences based on equality of keys and groups the results.
      *  The default equality comparer is used to compare the keys.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534297.aspx | MSDN}
      *
      * @param {Iterable<TOuter>} outerEnumerator
      * @param {Iterable<TInner>} innerEnumerator
      * @param {(outerItem: TOuter) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: TOuter, group: Iterable<TInner>) => TResult} resultSelector
      *
      * @returns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: Iterable<TInner>) => TResult): TS.Linq.Enumerator<TResult>
      /**
      * @description Correlates the elements of two sequences based on key equality and groups the results. 
      *  A specified equalityComparer is used to compare the keys.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535047.aspx | MSDN}
      *
      * @param {Iterable<TOuter>} outerEnumerator
      * @param {Iterable<TInner>} innerEnumerator
      * @param {(outerItem: TOuter) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: TOuter, group: Iterable<TInner>) => TResult} resultSelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      *
      * @returns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: Iterable<TInner>) => TResult, equalityComparer: <TKey>(first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<TResult>
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: Iterable<TInner>) => TResult, equalityComparer?: (first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<TResult>
      {
        TS.Utils.checkParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkParameter("resultSelector", resultSelector, "TS.Linq.Extensions.groupJoin");
        TS.Utils.checkFunctionParameter("resultSelector", resultSelector, "TS.Linq.Extensions.groupJoin");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.groupJoin");
        }//END if
        else
        {
          equalityComparer = (outerKey: TKey, innerKey: TKey) =>
          {
            return outerKey === innerKey;
          }
        }//END else

        let generatorFunction = function* () 
        {
          for (let outerItem of outerEnumerator)
          {
            let outerKey = outerKeySelector(outerItem);
            yield resultSelector(outerItem, new TS.Linq.Enumerator<TInner>(function* ()
            {
              for (let innerItem of innerEnumerator)
              {
                if (equalityComparer(outerKey, innerKeySelector(innerItem)))
                {
                  yield innerItem;
                }
              }
            }));
          }
        }

        return new TS.Linq.Enumerator<TResult>(generatorFunction);
      }


      /**
      * @description Produces the set intersection of two sequences by using the default equality comparer (===) to compare values.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb460136.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function intersect<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      /**
      * @description Produces the set intersection of two sequences by using the specified equalityComparer to compare values.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb355408.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      * @param {(first: TSource, second: TSource) => boolean} equalityComparer
      *
      * @retuns { TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function intersect<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      export function intersect<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.intersect");
        TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.intersect");
        TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.intersect");
        TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.intersect");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("predicate", equalityComparer, "TS.Linq.Extensions.intersect");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        let generatorFunction = function* ()
        {
          for (let firstItem of firstEnumerator)
          {
            for (let secondItem of secondEnumerator)
            {
              if (equalityComparer(firstItem, secondItem))
              {
                yield firstItem;
              }
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Correlates the elements of two sequences based on matching keys.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534675(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TOuter>} outerEnumerator
      * @param {Iterable<TInner>} innerEnumerator
      * @param {(outerItem: TOuter) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: TOuter, innerItem: TInner) => TResult} resultSelector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function join<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, innerItem: TInner) => TResult): TS.Linq.Enumerator<TResult>
      {
        TS.Utils.checkParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.join");
        TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.join");
        TS.Utils.checkParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.join");
        TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.join");
        TS.Utils.checkParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.join");
        TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.join");
        TS.Utils.checkParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.join");
        TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.join");
        TS.Utils.checkParameter("resultSelector", resultSelector, "TS.Linq.Extensions.join");
        TS.Utils.checkFunctionParameter("resultSelector", resultSelector, "TS.Linq.Extensions.join");


        let generatorFunction = function* ()
        {
          for (let outerItem of outerEnumerator)
          {
            let outerKey = outerKeySelector(outerItem);
            let joinEnumerator = where(innerEnumerator, item => outerKey == innerKeySelector(item));
            for (let joinItem of joinEnumerator)
            {
              yield resultSelector(outerItem, joinItem);
            }
          }
        }

        return new TS.Linq.Enumerator<TResult>(generatorFunction);
      }


      /**
      * @description Returns the last element of a sequence.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358775.aspx | MSDN}
      * 
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function last<TSource>(enumerator: Iterable<TSource> | OrderedEnumerator<TSource, any>): TSource
      /**
      * @description Returns the last element of a sequence that satisfies a specified condition.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549138.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      export function last<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function last<TSource>(enumerator: Iterable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.last");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.last");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.last");
        }//END if
        else
        {
          predicate = item => true;
        }//END else

        let resultItem: TSource;

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            resultItem = item;
          }
        }

        if (resultItem == undefined)
        {
          throw new TS.InvalidOperationException("The'enumerable' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.last'.");
        }

        return resultItem;
      }


      /**
      * @description Returns the last element of a sequence, or a default value if the sequence contains no elements.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflection or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb301849.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function lastOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource): TSource
      /**
      * @description Returns the last element of a sequence that satisfies a specified condition, or a default value if no such element is found.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflection or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548915.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      * @param {(item: TSource) => boolean } predicate
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function lastOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate: (item: TSource) => boolean): TSource
      export function lastOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.lastOrDefault");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.lastOrDefault");
        TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.lastOrDefault");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.lastOrDefault");
        }//END if
        else
        {
          predicate = item => true;
        }//END else

        let resultItem: TSource;

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            resultItem = item;
          }
        }

        if (resultItem == undefined)
        {
          if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue))
          {
            resultItem = new (defaultConstructorOrValue as { new (): TSource })();
          }
          else
          {
            resultItem = defaultConstructorOrValue as TSource;
          }
        }

        return resultItem;
      }


      /**
      * @description Returns the maximum value in a sequence of values.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.max.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      */
      export function max<Number>(enumerator: Iterable<Number>): number
      /**
      * @description Invokes a transform function on each element of a sequence and returns the maximum number value.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.max.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @trhows {TS.ArgumentException}
      */
      export function max<TSource, Number>(enumerator: Iterable<TSource>, selector: (item: TSource) => number): number
      export function max<TSource, Number>(enumerator: Iterable<TSource>, selector?: (item: TSource) => number): number
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.max");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.max");

        if (!TS.Utils.Assert.isNullOrUndefined(selector))
        {
          TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.max");
        }
        else
        {
          selector = (item) =>
          {

            if (!TS.Utils.Assert.isNumber(item as any))
            {
              throw new TS.ArgumentException("item", item, "Argument item must be of type number in function 'TS.Linq.Extensions.max'.");
            }
            else
            {
              return ((item as any) as number);
            }
          };
        }

        if (count(enumerator) == 0)
        {
          throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty in function 'TS.Linq.Extensions.max'.");
        }//END if


        let tempMax = Number.MIN_VALUE;

        for (let item of enumerator)
        {
          let temp = selector(item);
          if (!TS.Utils.Assert.isNumber(temp))
          {
            throw new TS.InvalidTypeException("temp", temp, "The selected value of the current enumerator has the wrong type. All values must be of type 'number' in function 'TS.Linq.Extensions.max'.");
          }
          if (temp > tempMax)
          {
            tempMax = temp;
          }
        }

        return tempMax;
      }


      /**
      * @description Returns the minimum value in a sequence of values.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.min.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      */
      export function min<Number>(enumerator: Iterable<Number>): number
      /**
      * @description Invokes a transform function on each element of a sequence and returns the minimum number value.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.min.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @trhows {TS.ArgumentException}
      */
      export function min<TSource, Number>(enumerator: Iterable<TSource>, selector: (item: TSource) => number): number
      export function min<TSource, Number>(enumerator: Iterable<TSource>, selector?: (item: TSource) => number): number
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.min");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.min");

        if (!TS.Utils.Assert.isNullOrUndefined(selector))
        {
          TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.min");
        }
        else
        {
          selector = (item) =>
          {

            if (!TS.Utils.Assert.isNumber(item as any))
            {
              throw new TS.ArgumentException("item", item, "Argument item must be of type number in function 'TS.Linq.Extensions.min'.");
            }
            else
            {
              return ((item as any) as number);
            }
          };
        }

        if (count(enumerator) == 0)
        {
          throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerable in function 'TS.Linq.Extensions.min'.");
        }//END if

        let tempMin = Number.MAX_VALUE;

        for (let item of enumerator)
        {
          let temp = selector(item);
          if (!TS.Utils.Assert.isNumber(temp))
          {
            throw new TS.InvalidTypeException("temp", temp, "The selected value of the current enumerator has the wrong type. All values must be of type 'number' in function 'TS.Linq.Extensions.min'.");
          }
          if (temp < tempMin)
          {
            tempMin = temp;
          }
        }

        return tempMin;
      }


      /**
      * @description Sorts the elements of a sequence in ascending order according to a key.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534966.aspx | MSDN}
      * 
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function orderBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.OrderedEnumerator<TSource, TKey>
      /**
      * @description Sorts the elements of a sequence in ascending order by using a specified comparer and key.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549422.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function orderBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      export function orderBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");

        if (!TS.Utils.Assert.isNullOrUndefined(comparer))
        {
          TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderBy");
        }//END if
        else
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; };
        }

        return new OrderedEnumerator<TSource, TKey>(enumerator, keySelector, comparer);
      }


      /**
      * @description Sorts the elements of a sequence in descending order according to a key.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534855.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function orderByDescending<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): OrderedEnumerator<TSource, TKey>
      /**
      * @description Sorts the elements of a sequence in descending order by using a specified comparer.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548916.aspx | MSDN}
      * 
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function orderByDescending<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      export function orderByDescending<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderByDescending");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderByDescending");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderByDescending");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderByDescending");


        if (!TS.Utils.Assert.isNullOrUndefined(comparer))
        {
          TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderByDescending");
        }
        else
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (first, second) => { if (first < second) { return -1; }; if (first > second) { return 1 }; return 0; };
        }//END if

        if (count(enumerator) == 0)
        {
          return OrderedEnumerator.Empty;
        }

        function reverseComparer(first: TKey, second: TKey): number
        {
          return -1 * comparer(first, second);
        }

        return new OrderedEnumerator<TSource, TKey>(enumerator, keySelector, reverseComparer);
      }


      /**
      * @description Retuns random elements from the base enumeration. 
      *  The function uses a generator to select the current random element. For that reason the 
      *  function will return as much elements as required, regardless how much elements the underlying 
      *  sequence holds.
      *
      *  The function throws a 'TS.Linq.EmptyEnumeratorException' If the underlying sequence is empty.
      *
      *  Attention:
      *  Limit the number of returned elements by calling a 'take' operator or some other limiting operator.
      *  Otherwise you will run out fo memory.
      *
      *
      *  This function is not a Linq function.
      * @description Deferred execution.
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      */
      export function random<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.random");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.random");


        let generatorFunction = function* ()
        {
          if (count(enumerator) == 0)
          {
            throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.random'.");
          }

          let index: number;
          let tempArray: Array<TSource> = toArray(enumerator);

          while (true)
          {
            do
            {
              index = Math.floor(Math.random() * tempArray.length);
            } while (index >= tempArray.length);

            yield tempArray[index];
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Generates a sequence of integral integer numbers within a specified range.
      * @description Deferred execution
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.range.aspx | MSDN}
      * 
      * @param {number} start
      * @param {number} count
      *
      * @retuns {TS.Linq.Enumerator<Number>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      export function range(start: number, count: number): TS.Linq.Enumerator<Number>
      {
        TS.Utils.checkIntNumberParameter("start", start, "TS.Linq.Extensions.range");
        TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.range");

        if ((start + count) > Number.MAX_SAFE_INTEGER)
        {
          throw new TS.ArgumentOutOfRangeException("start + count", start + count, "The arguments 'start', 'count' exceed the Number.MAX_SAFE_INTEGER in function 'TS.Linq.Extensions.range'.");
        }

        let generatorFunction = function* ()
        {
          let index = 0;
          while (index < count)
          {
            index++;
            yield start + index;
          }
        }

        return new TS.Linq.Enumerator<number>(generatorFunction);
      }


      /**
      * @description Generates a sequence that contains one repeated element as often as specified in count.
      * @description Deferred execution
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb348899(v=vs.110).aspx | MSDN}
      *
      * @param {TSource} element
      * @param {number} count
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function repeat<TSource>(element: TSource, count: number): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkNotUndefinedParameter("element", element, "TS.Linq.Extensions.repeat");
        TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.repeat");

        let generatorFunction = function* ()
        {
          let index = 0;
          while (index < count)
          {
            index++;
            yield element;
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Inverts the order of the elements in a sequence.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358497(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function reverse<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.reverse");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.reverse");

        let generatorFunction = function* ()
        {
          let tempArray: Array<TSource> = toArray(enumerator);
          tempArray = tempArray.reverse();
          for (let item of tempArray)
          {
            yield item;
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Projects each element of a sequence into a new form.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.select(v=vs.110).aspx | MSDN}
      * 
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TResult} selector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.SelectorException}
      */
      export function select<TSource, TResult>(enumerator: Iterable<TSource>, selector: (item: TSource) => TResult): TS.Linq.Enumerator<TResult>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.select");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.select");
        TS.Utils.checkParameter("selector", selector, "TS.Linq.Extensions.select");
        TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.select");

        let generatorFunction = function* ()
        {
          for (let item of enumerator)
          {
            let result = selector(item);
            if (TS.Utils.Assert.isUndefined(result))
            {
              throw new TS.Linq.SelectorException(selector, result, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.select' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(item)) ? "null or undefined" : item.toString()) + "'.");
            }//END if
            yield result;
          }
        }

        return new TS.Linq.Enumerator<TResult>(generatorFunction);
      }


      /**
      * @description Projects each element of a sequence to an Iterable<TSource> and flattens the resulting sequences into one sequence
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.selectmany(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => TResult} selector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.SelectorException}
      */
      export function selectMany<TSource, TResult>(enumerator: Iterable<TSource>, selector: (item: TSource) => Iterable<TResult>): TS.Linq.Enumerator<TResult>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.selectMany");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.selectMany");
        TS.Utils.checkParameter("selector", selector, "TS.Linq.Extensions.selectMany");
        TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.selectMany");


        let generatorFunction = function* ()
        {
          for (let outerItem of enumerator)
          {
            let innerSequence = selector(outerItem);
            if (TS.Utils.Assert.isNullOrUndefined(innerSequence))
            {
              throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'.");
            }

            if (!TS.Utils.Assert.isIterable(innerSequence))
            {
              throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'. The selector did not return an iterable collection.");
            }

            for (let innerItem of selector(outerItem))
            {
              if (TS.Utils.Assert.isUndefined(innerItem))
              {
                throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'. The selector returned a collection with undefined elements.");
              }
              yield innerItem;
            }
          }
        }

        return new TS.Linq.Enumerator<TResult>(generatorFunction);
      }


      /**
      * @description Determines whether two sequences are equal by comparing their elements using the default equality comparer (===).
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb348567.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @retuns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function sequenceEqual<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): boolean
      /**
      * @description Determines whether two sequences are equal by comparing their elements using a specified equalityComparer.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342073(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      * @param {(first: TSource, second: TSource) => boolean} equalityComparer
      *
      * @retuns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function sequenceEqual<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): boolean
      export function sequenceEqual<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): boolean
      {
        TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.sequenceEqual");
        TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.sequenceEqual");
        TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.sequenceEqual");
        TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.sequenceEqual");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.sequenceEqual");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        let firstItemArray = toArray(firstEnumerator);
        let secondItemArray = toArray(secondEnumerator);

        if (firstItemArray.length != secondItemArray.length)
        {
          return false;
        }

        for (let index = 0; index < firstItemArray.length; index++)
        {
          if (!equalityComparer(firstItemArray[index], secondItemArray[index]))
          {
            return false;
          }
        }

        return true;
      }


      /**
      * @description Creates and returns a new enumerator which holds exact the same elements as the input enumerator but in randomized order.
      *
      *  This function is not a Linq function.
      * @description Deferred execution.
      *
      * @see {@link http://www.dotnetperls.com/fisher-yates-shuffle}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function shuffle<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.shuffle");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.shuffle");


        let generatorFunction = function* ()
        {
          let sourceArray = toArray(enumerator);
          let targetArray: Array<TSource> = new Array<TSource>();
          let index: number;

          while (sourceArray.length > 0)
          {
            do
            {
              index = Math.floor(Math.random() * sourceArray.length);
            } while (index >= sourceArray.length);

            targetArray.push(...sourceArray.splice(index, 1));
          }//END while

          while (targetArray.length > 0)
          {
            yield targetArray.pop();
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns the only element of a sequence, or throws an exception if there is not exactly one element in the sequence.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb155325.aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      * @throws {TS.InvalidOperationException}
      */
      export function single<TSource>(enumerator: Iterable<TSource>): TSource
      /**
      * @description Returns the only element of a sequence that satisfies a specified condition or throws an exception if more than one such elements exists.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535118.aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      * @throws {TS.InvalidOperationException}
      */
      export function single<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function single<TSource>(enumerator: Iterable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.single");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.single");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.single");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else


        let gotOne = false;
        let result: TSource;

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            if (!gotOne)
            {
              gotOne = true;
              result = item;
            }
            else
            {
              throw new TS.Linq.MoreThanOneElementException(enumerator, "The 'enumerator' hase more than one result element in function 'TS.Linq.Extensions.single'.");
            }
          }
        }


        if (!gotOne)
        {
          throw new TS.InvalidOperationException("The'enumerator' is either empty or has no matche using the given predicate in function 'TS.Linq.Extensions.single'.");
        }//END if

        return result;
      }


      /**
      * @description Returns the only element of a sequence, or a default value if the sequence is empty. This method throws an 
      *  exception if there is more than one element in the sequence.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342451.aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      */
      export function singleOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource): TSource
      /**
      * @description Returns the only element of a sequence that satisfies a specified condition or a default value 
      *  if no such element exists, This method throws an exception if more than one element satisfie the condition.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549274.aspx : MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      * @param {{ new (): TSource; } | TSource} defaultConstructorOrValue
      * @param {item: TSource) => boolean} predicate
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      */
      export function singleOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate: (item: TSource) => boolean): TSource
      export function singleOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: { new (): TSource; } | TSource, predicate?: (item: TSource) => boolean): TSource
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.singleOrDefault");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.singleOrDefault");
        TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.singleOrDefault");

        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.singleOrDefault");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else


        let gotOne = false;
        let result: TSource;

        for (let item of enumerator)
        {
          if (predicate(item))
          {
            if (!gotOne)
            {
              gotOne = true;
              result = item;
            }
            else
            {
              throw new TS.Linq.MoreThanOneElementException(enumerator, "The 'enumerator' hase more than one result element in function 'TS.Linq.Extensions.singleOrDefault'.");
            }
          }
        }

        if (!gotOne)
        {
          if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue))
          {
            return new (defaultConstructorOrValue as { new (): TSource })();
          }
          else
          {
            return defaultConstructorOrValue as TSource;
          }
        }//END if

        return result;
      }


      /**
      * @description Bypasses a specified number of elements in a sequence and returns the remaining elements.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358985.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @paream {number} count
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function skip<TSource>(enumerator: Iterable<TSource>, count: number): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.skip");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.skip");
        TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.skip");


        let generatorFunction = function* ()
        {
          let index = -1;
          for (let item of enumerator)
          {
            index++
            if (index >= count)
            {
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.skipwhile.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @parem {(item: TSource) => boolean} predicate
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function skipWhile<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.skipWhile");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.skipWhile");
        TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.skipWhile");
        TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.skipWhile");


        let generatorFunction = function* ()
        {
          for (let item of enumerator)
          {
            if (!predicate(item))
            {
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Computes the sum of a sequence of numeric values.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.sum.aspx | MSDN}
      *
      * @param {Iterable<number>} enumerator
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @throws {TS.OverflowException}
      */
      export function sum(enumerator: Iterable<number>): number
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.sum");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.sum");

        if (count(enumerator) == 0)
        {
          throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty in function 'TS.Linq.Extensions.sum'.");
        }//END if

        let result: number = 0;

        for (let item of enumerator)
        {
          if (!TS.Utils.Assert.isNumber(item))
          {
            throw new TS.InvalidTypeException("enumerator", enumerator, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.sum'.");
          }
          result += item;
          if (Math.abs(result) > Number.MAX_VALUE)
          {
            throw new TS.OverflowException("The current value left the supported numerical range in function 'TS.Linq.Extensions.sum'.")
          }
        }

        return result;
      }


      /**
      * @description Returns a specified number of contiguous elements from the start of a sequence.
      * @description Deferred execution
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/bb503062.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function take<TSource>(enumerator: Iterable<TSource>, count: number): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.take");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.take");
        TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.take");

        let generatorFunction = function* ()
        {
          let resulCount = 0;
          for (let item of enumerator)
          {
            resulCount++;

            if (resulCount <= count)
            {
              yield item;
            }//END if
            else
            {
              return undefined;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Returns elements from a sequence as long as a specified condition is true. 
      * @description Deferred execution
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534804.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param { (item: TSource) => boolean} predicate
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function takeWhile<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.takeWhile");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.takeWhile");
        TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.takeWhile");
        TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.takeWhile");

        let generatorFunction = function* ()
        {
          for (let item of enumerator)
          {
            if (predicate(item))
            {
              yield item;
            }//END if
            else
            {
              return undefined;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
      *  This function uses a default comparer. The result may differ from the C# counterpart
      *  because of the different implementations of the default comparer.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534743.aspx | MSDN}
      *
      * @param {IOrderedEnumerator<TSource>} enumerator
      * @param { (item: TSource) => TKey } keySelector
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function thenBy<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey): OrderedEnumerator<TSource, TKey>
      /**
      * @description Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534500.aspx | MSDN}
      *
      * @param {IOrderedEnumerator<TSource>} enumerator
      * @param { (item: TSource) => TKey } keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function thenBy<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      export function thenBy<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");

        if (TS.Utils.Assert.isNullOrUndefined(enumerator.partitionIterator))
        {
          throw new TS.InvalidTypeException("enumerator", enumerator, "Argument enumerable must be of type 'IOrderedEnumerator' in function 'TS.Linq.Extensions.thenBy'.");
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderBy");
        }//END else

        return new OrderedEnumerator<TSource, TKey>(enumerator, keySelector, comparer);
      }


      /**
      * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to
      *  the specified key. This function uses a default comparer. The result may differ from the C# counterpart
      *  because of the different implementations of the default comparer.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534736.aspx | MSDN}
      *
      * @param {IOrderedEnumerator<TSource>} enumerator
      * @param { (item: TSource) => TKey } keySelector
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function thenByDescending<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey): OrderedEnumerator<TSource, TKey>
      /**
      * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to the specified key and comparer.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534489.aspx | MSDN}
      *
      * @param {IOrderedEnumerator<TSource>} enumerator
      * @param { (item: TSource) => TKey } keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<TSource, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function thenByDescending<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      export function thenByDescending<TSource, TKey>(enumerator: IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerator<TSource, TKey>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.thenByDescending");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.thenByDescending");
        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.thenByDescending");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.thenByDescending");



        if (TS.Utils.Assert.isNullOrUndefined(enumerator.partitionIterator))
        {
          throw new TS.InvalidTypeException("enumerator", enumerator, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenByDescending'.");
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.thenByDescending");
        }//END else

        function reverseComparer(first: TKey, second: TKey): number
        {
          return -1 * comparer(first, second);
        }

        return new OrderedEnumerator<TSource, TKey>(enumerator, keySelector, reverseComparer);
      }


      /**
      * @description Creates an Array<TSource> from an Iterable<TSource>
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb298736 | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @returns {Array<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function toArray<TSource>(enumerator: Iterable<TSource>): Array<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toArray");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toArray");

        return Array.from(enumerator);
      }

      /**
      * @description Creates a Dictionary<TKey, TSource> from an Iterable<TSource> according to a specified key selector function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549277(v=vs.110).aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      * @param { (item: TSource) => TKey} keySelector
      *
      * @returns {TS.Collections.Dictionary<TKey, TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.Collections.DuplicateKeyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
       */
      export function toDictionary<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Collections.Dictionary<TKey, TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toDictionary");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toDictionary");

        TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.toDictionary");
        TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.toDictionary");

        let resultDictionary: TS.Collections.Dictionary<TKey, TSource>;
        resultDictionary = new TS.Collections.Dictionary<TKey, TSource>();

        for (let item of enumerator)
        {
            resultDictionary.add(keySelector(item), item);
        }

        return resultDictionary;
      }


      /**
      * @description Creates a List<TSource> from an Iterable<TSource>. The list will have the 'allowNull' flag set to true.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342261(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @returns {TS.Collections.List<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function toList<TSource>(enumerator: Iterable<TSource>): TS.Collections.List<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toList");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toList");

        return new TS.Collections.List(true, enumerator);
      }


      /**
      * @description Produces the set union of two sequences by using the strict comparsion operator (===).
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have different
      *  implementations in C# and javascript.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb341731.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function union<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>
      /**
      * @description Produces the set union of two sequences by using the comparsion operator provide in argument 'equalityComparer'.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358407.aspx | MSDN}
      *
      * @param {Iterable<TSource>} firstEnumerator
      * @param {Iterable<TSource>} secondEnumerator
      * @parem {(first: TSource, second: TSource) => boolean} equalityComparer?
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function union<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      export function union<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.union");
        TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.union");
        TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.union");
        TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.union");

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.union");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        let generatorFunction = function* ()
        {
          let tempArrayFirst: Array<TSource> = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(firstEnumerator, equalityComparer));

          for (let item of tempArrayFirst)
          {
            yield item;
          }

          let tempArraySecond: Array<TSource> = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(secondEnumerator, equalityComparer));

          for (let item of tempArraySecond)
          {
            if (!TS.Linq.Extensions.contains(tempArrayFirst, item, equalityComparer))
            {
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);

      }


      /**
      * @description Filters a sequence of values based on a predicate.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.where.aspx | MSDN}
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function where<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>
      {
        TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.where");
        TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.where");
        TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.selectMany");
        TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.selectMany");


        let generatorFunction = function* ()
        {
          for (let item of enumerator)
          {
            if (predicate(item))
            {
              yield item;
            }
          }
        }

        return new TS.Linq.Enumerator<TSource>(generatorFunction);
      }


      /**
      * @description Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/dd267698(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TFirst>} firstEnum
      * @param {Iterable<TSecond>} secondEnum
      * @param {(firt: TFirst, second: TSecond) => TResult} func
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      export function zip<TFirst, TSecond, TResult>(firstEnum: Iterable<TFirst>, secondEnum: Iterable<TSecond>, func: (firt: TFirst, second: TSecond) => TResult): TS.Linq.Enumerator<TResult>
      {
        TS.Utils.checkParameter("firstEnum", firstEnum, "TS.Linq.Extensions.zip");
        TS.Utils.checkIterableParameter("firstEnum", firstEnum, "TS.Linq.Extensions.zip");
        TS.Utils.checkParameter("secondEnum", secondEnum, "TS.Linq.Extensions.zip");
        TS.Utils.checkIterableParameter("secondEnum", secondEnum, "TS.Linq.Extensions.zip");
        TS.Utils.checkParameter("func", func, "TS.Linq.Extensions.zip");
        TS.Utils.checkFunctionParameter("func", func, "TS.Linq.Extensions.zip");

        let generatorFunction = function* ()
        {
          let maxIndex: number;
          let index: number = 0;
          let firstArray: Array<TFirst> = TS.Linq.Extensions.toArray(firstEnum);
          let secondArray: Array<TSecond> = TS.Linq.Extensions.toArray(secondEnum);
          maxIndex = TS.Linq.Extensions.min([firstArray.length, secondArray.length]);

          while (index < maxIndex)
          {
            yield func(firstArray[index], secondArray[index]);
            index++;
          }
        }

        return new TS.Linq.Enumerator<TResult>(generatorFunction);
      }
    }//END module

  }
}

