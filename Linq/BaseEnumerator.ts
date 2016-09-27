/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Linq
  {

    /**
    * @class  BaseEnumerator<T>
    *
    * @description  The main purpose of this class is to implement the extension functions defined in 'TS.Linq.Extensions'
    *  in order to make them available in subclasses.
    *
    * @abstract
    *
    * @implements Iterable<T>
    */
    export abstract class BaseEnumerator<T> implements Iterable<T>
    {

      /**
       * @implements {Iterable<T>}
       */
      public abstract [Symbol.iterator](): Iterator<T> 

      //***********************************************************************
      // Binding the extension functions from  TS.Linq.Extensions
      //***********************************************************************

      /**
      * @description Applies an accumulator function over a sequence.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548651.aspx | MSDN}
      *
      * @param {(first: T, second: T) => T} accumulator
      *
      * @returns {T}
      *
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @throws {TS.InvalidTypeException}
      */
      public aggregate(accumulator: (first: T, second: T) => T): T
      /**
      * @description Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549218.aspx | MSDN}
      *
      * @param {(first: TAccumulate, second: T) => TAccumulate} accumulator
      * @param {TAccumulate} seed
      *
      * @returns {TAccumulate}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public aggregate<TAccumulate>(accumulator: (first: TAccumulate, second: T) => TAccumulate, seed: TAccumulate): TAccumulate
      public aggregate<TAccumulate>(accumulator: (first: any, second: T) => any, seed?: TAccumulate): any
      {
        return TS.Linq.Extensions.aggregate<T, TAccumulate>(this, accumulator, seed);
      }


      /**
      * @description Determines whether all elements of a sequence satisfy a condition.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548541.aspx | MSDN}
      *
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public all(predicate: (item: T) => boolean): boolean
      {
        return TS.Linq.Extensions.all(this, predicate);
      }


      /**
      * @description Determines whether a sequence contains any elements.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb337697.aspx | MSDN}
      *
      * @param {Iterable<T>} enumerator
      *
      * @returns {boolean}
      */
      public any(): boolean
      /**
      * @description Determines whether any element of a sequence satisfies a condition.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534972.aspx | MSDN}
      *
      * @param {(item: T) => boolean} predicate
      *
      * @returns {boolean}
      *
      * @throws {TS.InvalidTypeException}
      */
      public any(predicate: (item: T) => boolean): boolean
      public any(predicate?: (item: T) => boolean): boolean
      {
        if (!TS.Utils.Assert.isNullOrUndefined(predicate))
        {
          TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Collections.CollectionBase.any");
        }//END if

        return TS.Linq.Extensions.any(this, predicate);
      }


      /**
      * @description Computes the average of a sequence of number values.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb354760.aspx | MSDN}
      *
      * @returns {number}
      *
      * @throws {TS.InvalidOperationException}
      */
      public average(): number
      {
        try
        {
          return TS.Linq.Extensions.average(((this as any) as Iterable<number>));
        }
        catch (ex)
        {
          throw new TS.InvalidOperationException("The operation 'average' failed on the current collection. See the inner exception for further details.", ex);
        }
      }


      /**
      * @description Concatenates two sequences.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb302894.aspx | MSDN}
      *
      * @param {Iterable<TSource>} secondEnumerator
      *
      * @returns { TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}.
      */
      public concat(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.concat(this, secondEnumerator);
      }


      /**
      * @description Determines whether a sequence contains a specified element by using the default equality comparer.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to determine whether an elements in
      *  the enumeration matches with the specified search element.
      *  This function may produce results that differ from the C# counterpart,
      *  because the comparsion operators have different implementations in C#
      *  and javascript.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb352880.aspx | MSDN}
      *
      * @param {T} element
      *
      * @returns {boolen}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      public contains(element: T): boolean
      /**
      * @description Determines whether a sequence contains a specified element by using a specified equality comparer.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb339118.aspx | MSDN}
      *
      * @param {T} element
      * @param {(first: TSource, second: TSource) => boolean}  equalityComparer
      *
      * @returns {boolen}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public contains(element: T, equalityComparer: (first: T, second: T) => boolean): boolean
      public contains(element: T, equalityComparer?: (first: T, second: T) => boolean): boolean
      {
        return TS.Linq.Extensions.contains(this, element, equalityComparer);
      }


      /**
      * @description Returns the number of elements in a sequence.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
      *
      * @returns {number}
      */
      public count(): number
      /**
      * @description Returns a number that represents how many elements in the specified sequence satisfy a condition.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535181.aspx | MSDN}
      *
      * @param {(item: T) => boolean} predicate
      *
      * @returns {number}
      *
      * @throws {TS.InvalidTypeException}
      */
      public count(predicate: (item: T) => boolean): number
      public count(predicate?: (item: T) => boolean): number
      {
        return TS.Linq.Extensions.count(this, predicate);
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
      *  Use this function with a subsequent call to 'take' to limit the output or you will run out 
      *  of memory.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @returns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public cycle(): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.cycle(this);
      }


      /**
      * @description Returns the elements of an enumerator, or a default valued singleton collection if the sequence is empty.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.defaultifempty.aspx | MSDN}
      *
      * @param  { new (): T; } | T) defaultConstructorOrValue
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      */
      public defaultIfEmpty(defaultConstructorOrValue: { new (): T; } | T): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.defaultIfEmpty(this, defaultConstructorOrValue);
      }


      /**
      * @description Returns distinct elements from a sequence by using the default equality comparer to compare values.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to achieve distinction.
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have
      *  different implementations in C# and javascript.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      * @retuns {TS.Linq.Enumerator<T>}
      */
      public distinct(): TS.Linq.Enumerator<T>
      /**
      * @description Returns distinct elements from a sequence by using a specified equality comparer to compare values.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      * @param {(first: T, second: T) => boolean} equalityComparer
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.InvalidTypeException}
      */
      public distinct(equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      public distinct(equalityComparer?: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.distinct(this, equalityComparer);
      }


      /**
      * @description Returns the element at a specified index in a sequence.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb299233(v=vs.110).aspx | MSDN}
      *
      * @param {number} index
      *
      * @retuns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.IndexOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      */
      public elementAt(index: number): T
      {
        return TS.Linq.Extensions.elementAt(this, index);
      }


      /**
      * @description Returns the element at a specified index in a sequence or a default value
      *  if the index is out of the range of the sequence.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb494386(v=vs.110).aspx | MSDN}
      *
      * @param {number} index
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      *
      * @retuns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public elementAtOrDefault(index: number, defaultConstructorOrValue: { new (): T; } | T): T
      {
        return TS.Linq.Extensions.elementAtOrDefault(this, index, defaultConstructorOrValue);
      }


      /**
      * @description Produces the set difference of two sequences.
      *  Uses javascript strict comparsion operator 'strict equality (===)' to achieve distinction.
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have
      *  different implementations in C# and javascript.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb300779.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public except(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>
      /**
      * @description Produces the set difference of two sequences by using the specified equality comparer to compare values.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb336390.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      * @param {(first: T, second: T) => boolean)} equalityComparer
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public except(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      public except(secondEnumerator: Iterable<T>, equalityComparer?: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.except(this, secondEnumerator, equalityComparer);
      }


      /**
      * @description Returns the first element of a sequence.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      * @returns {T}
      *
      * @throws {TS.InvalidOperationException}
      */
      public first(): T
      /**
      * @description Returns the first element in a sequence that satisfies a specified condition.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      * @param {(item: T) => boolean} predicate
      *
      * @returns {T}
      *
      * @throws {TS.InvalidOperationException}
      * @throws {TS.InvalidTypeException}
      */
      public first(predicate: (item: T) => boolean): T
      public first(predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.first(this, predicate);
      }


      /**
      * @description Returns the first element of a sequence, or a default value if the sequence contains no elements.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      *
      * @returns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public firstOrDefault(defaultConstructorOrValue: { new (): T; } | T): T
      /**
      * @description Returns the first element of the sequence that satisfies a condition or a default value if no element satisfied the condition.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public firstOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate: (item: T) => boolean): T
      public firstOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.firstOrDefault(this, defaultConstructorOrValue, predicate);
      }


      /**
      * @description Performs the specified action on each element of the underlying sequence.
      *  This function is not a Linq function.
      *  I implemented this extension for your convenience. Without that function
      *  you had to call 'toArray' first before you could use the array method
      *  for each. Please read the article below from 'Eric Lippert's' blog to
      *  make sure that you understand all the implications of this extension
      *  function.
      * @description Extension function.
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
      public forEach(action: (item: T) => void): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.forEach(this, action);
      }


      /**
      * @description Groups the elements of a sequence according to a specified key selector function.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      * 
      * @param {(item: T) => TKey} keySelector
      *
      * @returns {TS.Linq.Enumerator<Grouping<TKey, T>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public groupBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, T>>
      /**
      * @description Groups the elements of a sequence according to a specified key selector function.
      *  The keys are compared by using the specified comparer in argument 'equalityComparer'.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      * @param {(item: T) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      *
      * @returns {TS.Linq.Enumerator<TS.Linq.Grouping<TKey, T>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public groupBy<TKey>(keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, T>>
      /**
      * @description Groups the elements of a sequence according to a specified key selector function and projects the elements
      *  for each group by using a specified selector function. The keys are compared by using the specified comparer in argument
      *  'equalityComparer' if provided.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      * @param {(item: T) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      * @param {(item: TSource) => TElement} elementSelector?
      *
      * @returns {TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TElement>>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public groupBy<TKey, TElement>(keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector: (item: T) => TElement): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TElement>>
      public groupBy<TKey>(keySelector: (item: T) => TKey, equalityComparer?: (first: TKey, second: TKey) => boolean, elementSelector?: (item: T) => any): TS.Linq.Enumerator<any>
      {
        return TS.Linq.Extensions.groupBy(this, keySelector, equalityComparer, elementSelector);
      }


      /**
      * @description Correlates the elements of two sequences based on equality of keys and groups the results.
      *  The default equality comparer is used to compare the keys.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534297.aspx | MSDN}
      *
      * @param {Iterable<TInner>} innerEnumerator
      * @param {(outerItem: T) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: T, group: Iterable<TInner>) => TResult} resultSelector
      *
      * @returns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public groupJoin<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: Iterable<TInner>) => TResult): TS.Linq.Enumerator<TResult>
      /**
      * @description Correlates the elements of two sequences based on key equality and groups the results. 
      *  A specified equalityComparer is used to compare the keys.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535047.aspx | MSDN}
      *
      * @param {Iterable<TInner>} innerEnumerator
      * @param {(outerItem: T) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: T, group: Iterable<TInner>) => TResult} resultSelector
      * @param {(first: TKey, second: TKey) => boolean} equalityComparer
      *
      * @returns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public groupJoin<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: Iterable<TInner>) => TResult, equalityComparer: <TKey>(outerKey: TKey, innerKey: TKey) => boolean): TS.Linq.Enumerator<TResult>
      public groupJoin<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: Iterable<TInner>) => TResult, equalityComparer?: (outerKey: TKey, innerKey: TKey) => boolean): TS.Linq.Enumerator<TResult>
      {
        return TS.Linq.Extensions.groupJoin<T, TInner, TKey, TResult>(this, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector, equalityComparer);
      }


      /**
      * @description Produces the set intersection of two sequences by using the default equality comparer (===) to compare values.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb460136.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public intersect(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>
      /**
      * @description Produces the set intersection of two sequences by using the specified equalityComparer to compare values.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb355408.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      * @param {(first: T, second: T) => boolean} equalityComparer
      *
      * @retuns { TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public intersect(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      public intersect(secondEnumerator: Iterable<T>, equalityComparer?: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.intersect(this, secondEnumerator, equalityComparer);
      }


      /**
      * @description Correlates the elements of two sequences based on matching keys.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534675(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<T>} innerEnumerator
      * @param {(outerItem: T) => TKey} outerKeySelector
      * @param {(innerItem: TInner) => TKey} innerKeySelector
      * @param {(outerItem: T, innerItem: TInner) => TResult} resultSelector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public join<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, innerItem: TInner) => TResult): TS.Linq.Enumerator<TResult>
      {
        return TS.Linq.Extensions.join(this, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector);
      }


      /**
      * @description Returns the last element of a sequence.
      *  Returns the last element of a sequence that satisfies the predicate function if specified.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549138.aspx | MSDN}
      *
      * @param {(item: T) => boolean} predicate
      *
      * @retuns {T}
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      public last(predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.last(this, predicate);
      }


      /**
      * @description Returns the last element of a sequence, or a default value if the sequence contains no elements.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflection or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb301849.aspx | MSDN}
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      *
      * @retuns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public lastOrDefault(defaultConstructorOrValue: { new (): T; } | T): T
      /**
      * @description Returns the last element of a sequence that satisfies a specified condition, or a default value if no such element is found.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflection or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548915.aspx | MSDN}
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      * @param {(item: T) => boolean } predicate
      *
      * @retuns {T}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public lastOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate: (item: T) => boolean): T
      public lastOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.lastOrDefault(this, defaultConstructorOrValue, predicate);
      }


      /**
      * @description Returns the maximum value in a sequence of values.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.max.aspx | MSDN}
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumerableException}
      */
      public max<Number>(): number
      {
        return TS.Linq.Extensions.max((this as any));
      }


      /**
      * @description Returns the minimum value in a sequence of values.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.min.aspx | MSDN}
      *
      * @retuns {number}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumerableException}
      */
      public min<Number>(): number
      {
        return TS.Linq.Extensions.min((this as any));
      }


      /**
      * @description Sorts the elements of a sequence in ascending order according to a key.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534966.aspx | MSDN}
      * 
      * @param {(item: T) => TKey} keySelector
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public orderBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      /**
      * @description Sorts the elements of a sequence in ascending order by using a specified comparer and key.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549422.aspx | MSDN}
      *
      * @param {(item: T) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public orderBy<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      public orderBy<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      {
        return TS.Linq.Extensions.orderBy(this, keySelector, comparer);
      }


      /**
      * @description Sorts the elements of a sequence in descending order according to a key.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534855.aspx | MSDN}
      *
      * @param {(item: T) => TKey} keySelector
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public orderByDescending<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      /**
      * @description Sorts the elements of a sequence in descending order by using a specified comparer.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb548916.aspx | MSDN}
      * 
      * @param {(item: T) => TKey} keySelector
      * @param {(first: TKey, second: TKey) => number} comparer
      *
      * @returns {OrderedEnumerator<T, TKey>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public orderByDescending<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      public orderByDescending<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      {
        return TS.Linq.Extensions.orderByDescending(this, keySelector, comparer);
      }


      /**
      * @description Retuns random elements from the base enumeration. 
      *  This function is not a Linq function.
      *  The function uses a generator to select the current random element. For that reason the 
      *  function will return as much elements as required, regardless how much elements the underlying 
      *  sequence holds.
      *
      *  The function throws a 'TS.Linq.EmptyEnumeratorException' If the underlying sequence is empty.
      *
      *  Attention:
      *  Limit the number of returned elements by calling a 'take' operator or some other limiting operator.
      *  Otherwise you will run out fo memory.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @returns {TS.Linq.Enumerator<TSource>}
      *
      * @throws {TS.Linq.EmptyEnumeratorException}
      */
      public random(): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.random(this);
      }

      //Not implemented
      //pubic range(start: number, count: number): TS.Linq.Enumerator<Number>

      //Not implemented
      //public repeat(element: TSource, count: number)


      /**
      * @description Inverts the order of the elements in a sequence.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358497(v=vs.110).aspx | MSDN}
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      */
      public reverse(): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.reverse(this);
      }


      /**
      * @description Projects each element of a sequence into a new form.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.select(v=vs.110).aspx | MSDN}
      * 
      * @param {(item: T) => TResult} selector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.SelectorException}
      */
      public select<TResult>(selector: (item: T) => TResult): TS.Linq.Enumerator<TResult>
      {
        return TS.Linq.Extensions.select(this, selector);
      }


      /**
      * @description Projects each element of a sequence to an Iterable<TSource> and flattens the resulting sequences into one sequence
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.selectmany(v=vs.110).aspx | MSDN}
      *
      * @param {(item: T) => TResult} selector
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.SelectorException}
      */
      public selectMany<TResult>(selector: (item: T) => Iterable<TResult>): TS.Linq.Enumerator<TResult>
      {
        return TS.Linq.Extensions.selectMany(this, selector);
      }


      /**
      * @description Determines whether two sequences are equal by comparing their elements using the default equality comparer (===).
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb348567.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      *
      * @retuns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public sequenceEqual(secondEnumerator: Iterable<T>): boolean
      /**
      * @description Determines whether two sequences are equal by comparing their elements using a specified equalityComparer.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342073(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      * @param {(first: T, second: T) => boolean} equalityComparer
      *
      * @retuns {boolean}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public sequenceEqual(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): boolean
      public sequenceEqual(secondEnumerator: Iterable<T>, equalityComparer?: (first: T, second: T) => boolean): boolean
      {
        return TS.Linq.Extensions.sequenceEqual(this, secondEnumerator, equalityComparer);
      }


      /**
      * @description Creates and returns a new enumerator which holds exact the same elements as the input enumerator but in randomized order.
      *
      *  This function is not a Linq function.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://www.dotnetperls.com/fisher-yates-shuffle}
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TS.Linq.Enumerator<TSource>}
      */
      public shuffle(): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.shuffle(this);
      }


      /**
      * @description Returns the only element of a sequence, or throws an exception if there is not exactly one element in the sequence.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb155325.aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      *
      * @retuns {TSource}
      *
      * @throws {TS.InvalidOperationException}
      * @throws {TS.Linq.MoreThanOneElementException}
      */
      public single(): T
      /**
      * @description Returns the only element of a sequence that satisfies a specified condition or throws an exception if more than one such elements exists.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb535118.aspx | MSDN }
      *
      * @param {Iterable<TSource>} enumerator
      * @param {(item: TSource) => boolean} predicate
      *
      * @returns {TSource}
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      * @throws {TS.InvalidOperationException}
      */
      public single(predicate: (item: T) => boolean): T
      public single(predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.single(this, predicate);
      }


      /**
      * @description Returns the only element of a sequence, or a default value if the sequence is empty. This method throws an 
      *  exception if there is more than one element in the sequence.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342451.aspx | MSDN }
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.Linq.MoreThanOneElementException}
      */
      public singleOrDefault(defaultConstructorOrValue: { new (): T; } | T): T
      /**
      * @description Returns the only element of a sequence that satisfies a specified condition or a default value 
      *  if no such element exists, This method throws an exception if more than one element satisfie the condition.
      *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the singnature.
      *  That argument is needed because javascript doesn't offer reflections or a type system which you can rely on
      *  at runtime. Hence there is no way to tell which constructor to use for the default when you are dealing with a complex
      *  type or which default value to use when you are dealing with a primitive type. The only way to make sure that you
      *  get the right type at runtime is to place the default constructor or value in the parameter list of that function.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb549274.aspx : MSDN }
      *
      * @param {{ new (): T; } | T} defaultConstructorOrValue
      * @param {item: TSource) => boolean} predicate
      *
      * @retuns {TSource}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.MoreThanOneElementException}
      */
      public singleOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate: (item: T) => boolean): T
      public singleOrDefault(defaultConstructorOrValue: { new (): T; } | T, predicate?: (item: T) => boolean): T
      {
        return TS.Linq.Extensions.singleOrDefault(this, defaultConstructorOrValue, predicate);
      }


      /**
      * @description Bypasses a specified number of elements in a sequence and returns the remaining elements.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358985.aspx | MSDN}
      *
      * @paream {number} count
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public skip(count: number): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.skip(this, count);
      }


      /**
      * @description Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.skipwhile.aspx | MSDN}
      *
      * @parem {(item: T) => boolean} predicate
      *
      * @returns {TS.Linq.Enumerator<Te>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public skipWhile(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.skipWhile(this, predicate);
      }


      /**
      * @description Computes the sum of a sequence of numeric values.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.sum.aspx | MSDN}
      *
      * @retuns {number}
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.Linq.EmptyEnumeratorException}
      * @throws {TS.OverflowException}
      */
      public sum(): number
      {
        return TS.Linq.Extensions.sum(this as any);
      }


      /**
      * @description Returns a specified number of contiguous elements from the start of a sequence.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link http://msdn.microsoft.com/en-us/library/bb503062.aspx | MSDN}
      *
      * @returns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public take(count: number): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.take(this, count);
      }


      /**
      * @description Returns elements from a sequence as long as a specified condition is true. 
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb534804.aspx | MSDN}
      *
      * @param { (item: T) => boolean} predicate
      *
      * @returns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public takeWhile(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.takeWhile(this, predicate);
      }


      //***********************************************************************
      // Function 'thenBy' and 'thenByDescending' are only available on
      // 'TS.Linq.OrderedEnumerator' objects for obvious reasons.
      //***********************************************************************


      ///**
      //* @description Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
      //*  This function uses a default comparer. The result may differ from the C# counterpart
      //*  because of the different implementations of the default comparer.
      //* @description Extension function.
      //* @description Deferred execution.
      //*
      //* @see {@link https://msdn.microsoft.com/en-us/library/bb534743.aspx | MSDN}
      //*
      //* @param { (item: T) => TKey } keySelector
      //*
      //* @returns {OrderedEnumerator<T, TKey>}
      //*
      //* @throws {TS.ArgumentNullOrUndefinedException}
      //* @throws {TS.InvalidTypeException}
      //*/
      //public thenBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      ///**
      //* @description Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
      //* @description Extension function.
      //* @description Deferred execution.
      //*
      //* @see {@link https://msdn.microsoft.com/en-us/library/bb534500.aspx | MSDN}
      //*
      //* @param { (item: T) => TKey } keySelector
      //* @param {(first: TKey, second: TKey) => number} comparer
      //*
      //* @returns {OrderedEnumerator<T, TKey>}
      //*
      //* @throws {TS.ArgumentNullOrUndefinedException}
      //* @throws {TS.InvalidTypeException}
      //*/
      //public thenBy<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      //public thenBy<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      //{
      //  return TS.Linq.Extensions.thenBy(this, keySelector, comparer);
      //}


      ///**
      //* @description Performs a subsequent ordering of the elements in a sequence in descending order, according to
      //*  the specified key. This function uses a default comparer. The result may differ from the C# counterpart
      //*  because of the different implementations of the default comparer.
      //* @description Extension function.
      //* @description Deferred execution.
      //*
      //* @see {@link https://msdn.microsoft.com/en-us/library/bb534736.aspx | MSDN}
      //*
      //* @param { (item: T) => TKey } keySelector
      //*
      //* @returns {OrderedEnumerator<T, TKey>}
      //*
      //* @throws {TS.ArgumentNullOrUndefinedException}
      //* @throws {TS.InvalidTypeException}
      //*/
      //public thenByDescending<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>
      ///**
      //* @description Performs a subsequent ordering of the elements in a sequence in descending order, according to the specified key and comparer.
      //* @description Extension function.
      //* @description Deferred execution.
      //*
      //* @see {@link https://msdn.microsoft.com/en-us/library/bb534489.aspx | MSDN}
      //*
      //* @param { (item: T) => TKey } keySelector
      //* @param {(first: TKey, second: TKey) => number} comparer
      //*
      //* @returns {OrderedEnumerator<T, TKey>}
      //*
      //* @throws {TS.ArgumentNullOrUndefinedException}
      //* @throws {TS.InvalidTypeException}
      //*/
      //public thenByDescending<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      //public thenByDescending<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>
      //{
      //  return TS.Linq.Extensions.thenByDescending(this, keySelector, comparer);
      //}


      /**
      * @description Creates an Array<T> from the list.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb298736 | MSDN}
      *
      * @returns {Array<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public toArray(): Array<T>
      {
        return TS.Linq.Extensions.toArray(this);
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
      public toDictionary<TKey>(keySelector: (item: T) => TKey): TS.Collections.Dictionary<TKey, T>
      {
        return TS.Linq.Extensions.toDictionary(this, keySelector);
      }


      /**
      * @description Creates a List<TSource> from an Iterable<TSource>. The list will have the 'allowNull' flag set to true.
      * @description Extension function.
      * @description Immediate execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb342261(v=vs.110).aspx | MSDN}
      *
      * @returns {TS.Collections.List<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      toList(): TS.Collections.List<T>
      {
        return TS.Linq.Extensions.toList(this);
      }


      /**
      * @description Produces the set union of two sequences by using the strict comparsion operator (===).
      *  This function may produce results that differ from the C# counterpart, because the comparsion operators have different
      *  implementations in C# and javascript.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb341731.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      *
      * @returns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public union(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>
      /**
      * @description Produces the set union of two sequences by using the comparsion operator provide in argument 'equalityComparer'.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bb358407.aspx | MSDN}
      *
      * @param {Iterable<T>} secondEnumerator
      * @parem {(first: T, second: T) => boolean} equalityComparer?
      *
      * @returns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public union(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      public union(secondEnumerator: Iterable<T>, equalityComparer?: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.union(this, secondEnumerator, equalityComparer);
      }


      /**
      * @description Filters a sequence of values based on a predicate.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.where.aspx | MSDN}
      *
      * @param {(item: T) => boolean} predicate
      *
      * @retuns {TS.Linq.Enumerator<T>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public where(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>
      {
        return TS.Linq.Extensions.where(this, predicate);
      }

      /**
      * @description Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
      * @description Extension function.
      * @description Deferred execution.
      *
      * @see {@linkhttps://msdn.microsoft.com/en-us/library/dd267698(v=vs.110).aspx | MSDN}
      *
      * @param {Iterable<TSecond>} secondEnum
      * @param {(firt: TFirst, second: TSecond) => TResult} func
      *
      * @retuns {TS.Linq.Enumerator<TResult>}
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      public zip<TSecond, TResult>(secondEnum: Iterable<TSecond>, func: (first: T, second: TSecond) => TResult): TS.Linq.Enumerator<TResult>
      {
        return TS.Linq.Extensions.zip(this, secondEnum, func);
      }

      //***********************************************************************
      // END OF extension function binding
      //***********************************************************************


    }
  }
}