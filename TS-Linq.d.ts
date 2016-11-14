/// <reference path="../TypeScript-Base/TS-Base.d.ts" />
declare namespace TS {
    namespace Linq {
        /**
        * @class TS.Linq.SelectorException
        *
        * @description This exceptions signals an error which occured in a selector function for specific value.
        *
        * @extends {TS.Exception}
        */
        class SelectorException extends TS.Exception {
            /**
            * @private
            */
            private internalSelector;
            /**
            * @private
            */
            private internalValue;
            /**
            * @override
            *
            * @get {string} type
            */
            type: string;
            /**
            * @description The selector which caused the exception.
            *
            * @get {(item: any) => Enumerator<any>} selector
            */
            selector: (item: any) => Enumerator<any>;
            /**
            * @description The value which caused the exception.
            *
            * @get {any} value
            */
            value: any;
            /**
            * @constructor
            *
            * @param {(item: any) => Enumerator<any>} selector
            * @param {any} value
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(selector: (item: any) => Enumerator<any>, value: any, message?: string, innerException?: TS.Exception);
            /**
            * @constructor
            *
            * @param { (item: any) => Array<any>} selector
            * @param {any} value
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(selector: (item: any) => Array<any>, value: any, message?: string, innerException?: TS.Exception);
            /**
            * @constructor
            *
            * @param { (item: any) =>any} selector
            * @param {any} value
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(selector: (item: any) => any, value: any, message?: string, innerException?: TS.Exception);
        }
        /**
        * @class TS.Linq.EmptyEnumeratorException
        *
        * @description This exceptions signals an error in a function which expects a none empty enumerator to operate on.
        *
        * @extends {TS.Exception}
        */
        class EmptyEnumeratorException extends TS.Exception {
            /**
            * @private
            */
            private internalEnumerator;
            /**
            * @override
            *
            * @get {string} type
            */
            type: string;
            /**
            * @description The enumerator which caused the exception.
            *
            * @get {Iterable<any>} enumerator
            */
            enumerator: Iterable<any>;
            /**
            * @constructor
            *
            * @param {Iterable<any>} enumerator
            * @param {string}  message?
            */
            constructor(enumerator: Iterable<any>, message?: string, innerException?: TS.Exception);
        }
        /**
        * @class TS.Linq.MoreThanOneElementException
        *
        * @description This exceptions signals an error in a function where only one element is allowed but multiple
        *  elements are available.
        *
        * @extends {TS.Exception}
        */
        class MoreThanOneElementException extends TS.Exception {
            /**
            * @private
            */
            private internalEnumerator;
            /**
            * @override
            *
            * @get {string} type
            */
            type: string;
            /**
            * @description The enumerator which caused the exception.
            *
            * @get {Iterable<any>} enumerator
            */
            enumerator: Iterable<any>;
            /**
            * @constructor
            *
            * @param {Iterable<any>} enumerator
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(enumerator: Iterable<any>, message?: string, innerException?: TS.Exception);
        }
    }
}
declare namespace TS {
    namespace Linq {
        /**
        * @class TS.Linq.BaseEnumerator<T>
        *
        * @description  The main purpose of this class is to implement the extension functions defined in
        *  'TS.Linq.Extensions' in order to make them available in subclasses.
        *
        * @abstract
        *
        * @implements Iterable<T>
        */
        abstract class BaseEnumerator<T> implements Iterable<T> {
            /**
            * @abstract
            *
            * @implements {Iterable<T>}
            */
            abstract [Symbol.iterator](): Iterator<T>;
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
            aggregate(accumulator: (first: T, second: T) => T): T;
            /**
            * @description Applies an accumulator function over a sequence. The specified seed value is used as the initial
            *  accumulator value.
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
            aggregate<TAccumulate>(accumulator: (first: TAccumulate, second: T) => TAccumulate, seed: TAccumulate): TAccumulate;
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
            all(predicate: (item: T) => boolean): boolean;
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
            any(): boolean;
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
            any(predicate: (item: T) => boolean): boolean;
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
            average(): number;
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
            concat(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>;
            /**
            * @description Determines whether a sequence contains a specified element by using the default equality comparer.
            *  Uses javascript strict comparsion operator 'strict equality (===)' to determine whether an elements in the
            *  enumeration matches with the specified search element. This function may produce results that differ from the
            *  C# counterpart, because the comparsion operators have different implementations in C# and javascript.
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
            contains(element: T): boolean;
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
            contains(element: T, equalityComparer: (first: T, second: T) => boolean): boolean;
            /**
            * @description Returns the number of elements in a sequence.
            * @description Extension function.
            * @description Immediate execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
            *
            * @returns {number}
            */
            count(): number;
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
            count(predicate: (item: T) => boolean): number;
            /**
            * @description This function retuns an endless number of elements from the underlying sequence by running over
            *  that sequence in cycles. The function enumerates the elements of the base sequence from the start to then end
            *  and starts over with the first element as soon as the last element is reached. This function will never run
            *  out of data. There is one exception of that rule. If the underlying sequence is an empty sequence, the cycle
            *  function will never give a result.
            *
            *  Attention:
            *  Use this function with a subsequent call to 'take' to limit the output or you will run out of memory.
            * @description Extension function.
            * @description Deferred execution.
            *
            * @returns {TS.Linq.Enumerator<T>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            cycle(): TS.Linq.Enumerator<T>;
            /**
            * @description Returns the elements of an enumerator, or a default valued singleton collection if the sequence is
            *  empty. That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue'
            *  in the signature. That argument is needed because javascript doesn't offer reflections or a type system which
            *  you can rely on at runtime. Hence there is no way to tell which constructor to use for the default when you
            *  are dealing with a complex type or which default value to use when you are dealing with a primitive type. The
            *  only way to make sure that you get the right type at runtime is to place the default constructor or value in
            *  the parameter list of that function.
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
            defaultIfEmpty(defaultConstructorOrValue: {
                new (): T;
            } | T): TS.Linq.Enumerator<T>;
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
            distinct(): TS.Linq.Enumerator<T>;
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
            distinct(equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>;
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
            elementAt(index: number): T;
            /**
            * @description Returns the element at a specified index in a sequence or a default value
            *  if the index is out of the range of the sequence.
            *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the
            *  signature. That argument is needed because javascript doesn't offer reflections or a type system which you
            *  can rely on at runtime. Hence there is no way to tell which constructor to use for the default when you are
            *  dealing with a complex type or which default value to use when you are dealing with a primitive type. The only
            *  way to make sure that you get the right type at runtime is to place the default constructor or value in the
            *  parameter list of that function.
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
            elementAtOrDefault(index: number, defaultConstructorOrValue: {
                new (): T;
            } | T): T;
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
            except(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>;
            /**
            * @description Produces the set difference of two sequences by using the specified equality comparer to compare
            *  values.
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
            except(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>;
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
            first(): T;
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
            first(predicate: (item: T) => boolean): T;
            /**
            * @description Returns the first element of a sequence, or a default value if the sequence contains no elements.
            *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the
            *  signature. That argument is needed because javascript doesn't offer reflections or a type system which you
            *  can rely on at runtime. Hence there is no way to tell which constructor to use for the default when you are
            *  dealing with a complex type or which default value to use when you are dealing with a primitive type. The only
            *  way to make sure that you get the right type at runtime is to place the default constructor or value in the
            *  parameter list of that function.
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
            firstOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T): T;
            /**
            * @description Returns the first element of the sequence that satisfies a condition or a default value if no
            *  element satisfied the condition. That function differs from the .NET counterpart in that way that is has a
            *  'defaultConstructorOrValue' in the signature. That argument is needed because javascript doesn't offer
            *  reflection or a type system which you can rely on at runtime. Hence there is no way to tell which constructor
            *  to use for the default when you are dealing with a complex type or which default value to use when you are
            *  dealing with a primitive type. The only way to make sure that you get the right type at runtime is to place
            *  the default constructor or value in the parameter list of that function.
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
            firstOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T, predicate: (item: T) => boolean): T;
            /**
            * @description Performs the specified action on each element of the underlying sequence. This function is not a
            *  Linq function. I implemented this extension for your convenience. Without that function you had to call
            *  'toArray' first before you could use the array method for each. Please read the article below from
            *  'Eric Lippert's' blog to make sure that you understand all the implications of this extension function.
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
            forEach(action: (item: T) => void): TS.Linq.Enumerator<T>;
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
            groupBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, T>>;
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
            groupBy<TKey>(keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, T>>;
            /**
            * @description Groups the elements of a sequence according to a specified key selector function and projects the
            *  elements for each group by using a specified selector function. The keys are compared by using the specified
            *  comparer in argument 'equalityComparer' if provided.
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
            groupBy<TKey, TElement>(keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector: (item: T) => TElement): TS.Linq.Enumerator<TS.Linq.Grouping<TKey, TElement>>;
            /**
            * @description Correlates the elements of two sequences based on equality of keys and groups the results. The
            *  default equality comparer is used to compare the keys.
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
            groupJoin<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: Iterable<TInner>) => TResult): TS.Linq.Enumerator<TResult>;
            /**
            * @description Correlates the elements of two sequences based on key equality and groups the results. A specified
            *  equalityComparer is used to compare the keys.
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
            groupJoin<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: Iterable<TInner>) => TResult, equalityComparer: <TKey>(outerKey: TKey, innerKey: TKey) => boolean): TS.Linq.Enumerator<TResult>;
            /**
            * @description Produces the set intersection of two sequences by using the default equality comparer (===) to
            *  compare values.
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
            intersect(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>;
            /**
            * @description Produces the set intersection of two sequences by using the specified equalityComparer to compare
            *  values.
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
            intersect(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>;
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
            join<TInner, TKey, TResult>(innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, innerItem: TInner) => TResult): TS.Linq.Enumerator<TResult>;
            /**
            * @description Returns the last element of a sequence. Returns the last element of a sequence that satisfies the
            *  predicate function if specified.
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
            last(predicate?: (item: T) => boolean): T;
            /**
            * @description Returns the last element of a sequence, or a default value if the sequence contains no elements.
            *  That function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the
            *  signature. That argument is needed because javascript doesn't offer reflection or a type system which you can
            *  rely on at runtime. Hence there is no way to tell which constructor to use for the default when you are
            *  dealing with a complex type or which default value to use when you are dealing with a primitive type. The only
            *  way to make sure that you get the right type at runtime is to place the default constructor or value in the
            *  parameter list of that function.
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
            lastOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T): T;
            /**
            * @description Returns the last element of a sequence that satisfies a specified condition, or a default value if
            *  no such element is found. That function differs from the .NET counterpart in that way that is has a
            *  'defaultConstructorOrValue' in the signature. That argument is needed because javascript doesn't offer
            *  reflection or a type system which you can rely on at runtime. Hence there is no way to tell which constructor
            *  to use for the default when you are dealing with a complex type or which default value to use when you are
            *  dealing with a primitive type. The only way to make sure that you get the right type at runtime is to place
            *  the default constructor or value in the parameter list of that function.
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
            lastOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T, predicate: (item: T) => boolean): T;
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
            max<Number>(): number;
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
            min<Number>(): number;
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
            orderBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>;
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
            orderBy<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>;
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
            orderByDescending<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>;
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
            orderByDescending<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>;
            /**
            * @description Retuns random elements from the base enumeration. This function is not a Linq function. The
            *  function uses a generator to select the current random element. For that reason the function will return as
            *  much elements as required, regardless how much elements the underlying sequence holds.
            *
            *  The function throws a 'TS.Linq.EmptyEnumeratorException' If the underlying sequence is empty.
            *
            *  Attention:
            *  Limit the number of returned elements by calling a 'take' operator or some other limiting operator. Otherwise
            *  you will run out fo memory.
            * @description Extension function.
            * @description Deferred execution.
            *
            * @returns {TS.Linq.Enumerator<TSource>}
            *
            * @throws {TS.Linq.EmptyEnumeratorException}
            */
            random(): TS.Linq.Enumerator<T>;
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
            reverse(): TS.Linq.Enumerator<T>;
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
            select<TResult>(selector: (item: T) => TResult): TS.Linq.Enumerator<TResult>;
            /**
            * @description Projects each element of a sequence to an Iterable<TSource> and flattens the resulting sequences
            *  into one sequence
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
            selectMany<TResult>(selector: (item: T) => Iterable<TResult>): TS.Linq.Enumerator<TResult>;
            /**
            * @description Determines whether two sequences are equal by comparing their elements using the default equality
            *  comparer (===).
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
            sequenceEqual(secondEnumerator: Iterable<T>): boolean;
            /**
            * @description Determines whether two sequences are equal by comparing their elements using a specified
            *  equalityComparer.
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
            sequenceEqual(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): boolean;
            /**
            * @description Creates and returns a new enumerator which holds exact the same elements as the input enumerator
            *  but in randomized order.
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
            shuffle(): TS.Linq.Enumerator<T>;
            /**
            * @description Returns the only element of a sequence, or throws an exception if there is not exactly one element
            *  in the sequence.
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
            single(): T;
            /**
            * @description Returns the only element of a sequence that satisfies a specified condition or throws an exception
            *  if more than one such elements exists.
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
            single(predicate: (item: T) => boolean): T;
            /**
            * @description Returns the only element of a sequence, or a default value if the sequence is empty. This method
            *  throws an exception if there is more than one element in the sequence. That function differs from the .NET
            *  counterpart in that way that is has a 'defaultConstructorOrValue' in the signature. That argument is needed
            *  because javascript doesn't offer reflection or a type system which you can rely on at runtime. Hence there is
            *  no way to tell which constructor to use for the default when you are dealing with a complex type or which
            *  default value to use when you are dealing with a primitive type. The only way to make sure that you get the
            *  right type at runtime is to place the default constructor or value in the parameter list of that function.
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
            singleOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T): T;
            /**
            * @description Returns the only element of a sequence that satisfies a specified condition or a default value if
            *  no such element exists, This method throws an exception if more than one element satisfie the condition. That
            *  function differs from the .NET counterpart in that way that is has a 'defaultConstructorOrValue' in the
            *  signature. That argument is needed because javascript doesn't offer reflection or a type system which you can
            *  rely on at runtime. Hence there is no way to tell which constructor to use for the default when you are
            *  dealing with a complex type or which default value to use when you are dealing with a primitive type. The only
            *  way to make sure that you get the right type at runtime is to place the default constructor or value in the
            *  parameter list of that function.
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
            singleOrDefault(defaultConstructorOrValue: {
                new (): T;
            } | T, predicate: (item: T) => boolean): T;
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
            skip(count: number): TS.Linq.Enumerator<T>;
            /**
            * @description Bypasses elements in a sequence as long as a specified condition is true and then returns the
            *  remaining elements.
            * @description Extension function.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.skipwhile.aspx | MSDN}
            *
            * @param {(item: T) => boolean} predicate
            *
            * @returns {TS.Linq.Enumerator<Te>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            skipWhile(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>;
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
            sum(): number;
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
            take(count: number): TS.Linq.Enumerator<T>;
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
            takeWhile(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>;
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
            toArray(): Array<T>;
            /**
            * @description Creates a Dictionary<TKey, TSource> from an Iterable<TSource> according to a specified key
            *  selector function.
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
            toDictionary<TKey>(keySelector: (item: T) => TKey): TS.Collections.Dictionary<TKey, T>;
            /**
            * @description Creates a List<TSource> from an Iterable<TSource>. The list will have the 'allowNull' flag set to
            *  true.
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
            toList(): TS.Collections.List<T>;
            /**
            * @description Produces the set union of two sequences by using the strict comparsion operator (===). This
            *  function may produce results that differ from the C# counterpart, because the comparsion operators have
            *  different implementations in C# and javascript.
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
            union(secondEnumerator: Iterable<T>): TS.Linq.Enumerator<T>;
            /**
            * @description Produces the set union of two sequences by using the comparsion operator provide in argument
            *  'equalityComparer'.
            * @description Extension function.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb358407.aspx | MSDN}
            *
            * @param {Iterable<T>} secondEnumerator
            * @param {(first: T, second: T) => boolean} equalityComparer?
            *
            * @returns {TS.Linq.Enumerator<T>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            union(secondEnumerator: Iterable<T>, equalityComparer: (first: T, second: T) => boolean): TS.Linq.Enumerator<T>;
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
            where(predicate: (item: T) => boolean): TS.Linq.Enumerator<T>;
            /**
            * @description Applies a specified function to the corresponding elements of two sequences, producing a sequence
            *  of the results.
            * @description Extension function.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/dd267698(v=vs.110).aspx | MSDN}
            *
            * @param {Iterable<TSecond>} secondEnum
            * @param {(firt: TFirst, second: TSecond) => TResult} func
            *
            * @retuns {TS.Linq.Enumerator<TResult>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            zip<TSecond, TResult>(secondEnum: Iterable<TSecond>, func: (first: T, second: TSecond) => TResult): TS.Linq.Enumerator<TResult>;
        }
    }
}
declare namespace TS {
    namespace Linq {
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
        class Enumerator<T> extends TS.Linq.BaseEnumerator<T> {
            /**
            * @private
            */
            private genFunc;
            /**
            * @description Property which returns an empty 'Enumerator'.
            *
            * @get {Enumerator<any>}
            */
            static Empty: Enumerator<any>;
            /**
            * @description This function returns the Iterator of the current Enumerator as soon as an iteration starts. E.g.
            *  when a 'for ( let x of enumerator)' is called.
            *
            * @implements {BaseEnumerator<T>}
            *
            * @returns {IterableIterator<T>}, An instance of the iterator type.
            */
            [Symbol.iterator](): Iterator<T>;
            /**
            * @constructor
            *
            * @description Creates a new 'TS.Linq.Enumerator<T>' object. Takes a  generator function as source. The
            *  generator creates the elements which get treated as the underlying collection of this enumerator. The
            *  constructor throws an expection if the generator is invalid.
            *
            * @param {() => IterableIterator<T>} generator
            *
            * @throws {TS.InvalidInvocationException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            */
            constructor(generator: () => IterableIterator<T>);
            /**
            * @constructor
            *
            * @description Creates a new 'TS.Linq.Enumerator<T>' object. Takes any iterable object or an array like
            *  object as source. The predicate function defines which element becomes an element of underlying collection of
            *  this enumerator. The constructor throws an expection if the source isn't iterable an array like object or if
            *  the predicate function is invalid.
            *
            * @param {Iterable<T>} source
            * @param {(item: T) => boolean} predicate
            *
            * @throws {TS.InvalidInvocationException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            */
            constructor(source: Iterable<T> | ArrayLike<T>, predicate?: (item: T) => boolean);
        }
    }
}
declare namespace TS {
    namespace Linq {
        namespace Extensions {
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
            function aggregate<TSource>(enumerator: Iterable<TSource>, accumulator: (first: TSource, second: TSource) => TSource): TSource;
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
            function aggregate<TSource, TAccumulate>(enumerator: Iterable<TSource>, accumulator: (first: TAccumulate, second: TSource) => TAccumulate, seed: TAccumulate): TAccumulate;
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
            function all<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): boolean;
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
            function any<TSource>(enumerator: Iterable<TSource>): boolean;
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
            function any<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): boolean;
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
            function average(enumerator: Iterable<number>): number;
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
            function concat<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function contains<TSource>(enumerator: Iterable<TSource>, element: TSource): boolean;
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
            function contains<TSource>(enumerator: Iterable<TSource>, element: TSource, equalityComparer: (first: TSource, second: TSource) => boolean): boolean;
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
            function count<TSource>(enumerator: Iterable<TSource>): number;
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
            function count<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): number;
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
            function cycle<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function defaultIfEmpty<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource): TS.Linq.Enumerator<TSource>;
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
            function distinct<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function distinct<TSource>(enumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function elementAt<TSource>(enumerator: Iterable<TSource>, index: number): TSource;
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
            function elementAtOrDefault<TSource>(enumerator: Iterable<TSource>, index: number, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource): TSource;
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
            function except<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function except<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function first<TSource>(enumerator: Iterable<TSource>): TSource;
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
            function first<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource;
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
            function firstOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource): TSource;
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
            function firstOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource, predicate: (item: TSource) => boolean): TSource;
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
            * @retuns {TS.Linq.Enumerator<TSource>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function forEach<TSource>(enumerator: Iterable<TSource>, action: (item: TSource) => void): TS.Linq.Enumerator<TSource>;
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
            function groupBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.Enumerator<Grouping<TKey, TSource>>;
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
            function groupBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<Grouping<TKey, TSource>>;
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
            function groupBy<TSource, TKey, TElement>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector: (item: TSource) => TElement): TS.Linq.Enumerator<Grouping<TKey, TElement>>;
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
            function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: Iterable<TInner>) => TResult): TS.Linq.Enumerator<TResult>;
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
            function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: Iterable<TInner>) => TResult, equalityComparer: <TKey>(first: TKey, second: TKey) => boolean): TS.Linq.Enumerator<TResult>;
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
            function intersect<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function intersect<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function join<TOuter, TInner, TKey, TResult>(outerEnumerator: Iterable<TOuter>, innerEnumerator: Iterable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, innerItem: TInner) => TResult): TS.Linq.Enumerator<TResult>;
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
            function last<TSource>(enumerator: Iterable<TSource> | OrderedEnumerator<TSource, any>): TSource;
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
            function last<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource;
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
            function lastOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource): TSource;
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
            function lastOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource, predicate: (item: TSource) => boolean): TSource;
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
            function max<Number>(enumerator: Iterable<Number>): number;
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
            function max<TSource, Number>(enumerator: Iterable<TSource>, selector: (item: TSource) => number): number;
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
            function min<Number>(enumerator: Iterable<Number>): number;
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
            function min<TSource, Number>(enumerator: Iterable<TSource>, selector: (item: TSource) => number): number;
            /**
            * @description Sorts the elements of a sequence in ascending order according to a key.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534966.aspx | MSDN}
            *
            * @param {Iterable<TSource>} enumerator
            * @param {(item: TSource) => TKey} keySelector
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function orderBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.OrderedEnumerator<TSource, TKey>;
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
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function orderBy<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<TSource, TKey>;
            /**
            * @description Sorts the elements of a sequence in descending order according to a key.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534855.aspx | MSDN}
            *
            * @param {Iterable<TSource>} enumerator
            * @param {(item: TSource) => TKey} keySelector
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function orderByDescending<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.OrderedEnumerator<TSource, TKey>;
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
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function orderByDescending<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<TSource, TKey>;
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
            function random<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function range(start: number, count: number): TS.Linq.Enumerator<Number>;
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
            function repeat<TSource>(element: TSource, count: number): TS.Linq.Enumerator<TSource>;
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
            function reverse<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function select<TSource, TResult>(enumerator: Iterable<TSource>, selector: (item: TSource) => TResult): TS.Linq.Enumerator<TResult>;
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
            function selectMany<TSource, TResult>(enumerator: Iterable<TSource>, selector: (item: TSource) => Iterable<TResult>): TS.Linq.Enumerator<TResult>;
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
            function sequenceEqual<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): boolean;
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
            function sequenceEqual<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): boolean;
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
            function shuffle<TSource>(enumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
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
            function single<TSource>(enumerator: Iterable<TSource>): TSource;
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
            function single<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TSource;
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
            function singleOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource): TSource;
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
            function singleOrDefault<TSource>(enumerator: Iterable<TSource>, defaultConstructorOrValue: {
                new (): TSource;
            } | TSource, predicate: (item: TSource) => boolean): TSource;
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
            function skip<TSource>(enumerator: Iterable<TSource>, count: number): TS.Linq.Enumerator<TSource>;
            /**
            * @description Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/system.linq.enumerable.skipwhile.aspx | MSDN}
            *
            * @param {Iterable<TSource>} enumerator
            * @param {(item: TSource) => boolean} predicate
            *
            * @returns {TS.Linq.Enumerator<TSource>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function skipWhile<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function sum(enumerator: Iterable<number>): number;
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
            function take<TSource>(enumerator: Iterable<TSource>, count: number): TS.Linq.Enumerator<TSource>;
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
            function takeWhile<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>;
            /**
            * @description Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
            *  This function uses a default comparer. The result may differ from the C# counterpart
            *  because of the different implementations of the default comparer.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534743.aspx | MSDN}
            *
            * @param {TS.Linq.IOrderedEnumerator<TSource>} enumerator
            * @param { (item: TSource) => TKey } keySelector
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function thenBy<TSource, TKey>(enumerator: TS.Linq.IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.OrderedEnumerator<TSource, TKey>;
            /**
            * @description Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534500.aspx | MSDN}
            *
            * @param {TS.Linq.IOrderedEnumerator<TSource>} enumerator
            * @param { (item: TSource) => TKey } keySelector
            * @param {(first: TKey, second: TKey) => number} comparer
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function thenBy<TSource, TKey>(enumerator: TS.Linq.IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<TSource, TKey>;
            /**
            * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to
            *  the specified key. This function uses a default comparer. The result may differ from the C# counterpart
            *  because of the different implementations of the default comparer.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534736.aspx | MSDN}
            *
            * @param {TS.Linq.IOrderedEnumerator<TSource>} enumerator
            * @param { (item: TSource) => TKey } keySelector
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function thenByDescending<TSource, TKey>(enumerator: TS.Linq.IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey): TS.Linq.OrderedEnumerator<TSource, TKey>;
            /**
            * @description Performs a subsequent ordering of the elements in a sequence in descending order, according to the specified key and comparer.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb534489.aspx | MSDN}
            *
            * @param {TS.Linq.IOrderedEnumerator<TSource>} enumerator
            * @param { (item: TSource) => TKey } keySelector
            * @param {(first: TKey, second: TKey) => number} comparer
            *
            * @returns {TS.Linq.OrderedEnumerator<TSource, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function thenByDescending<TSource, TKey>(enumerator: TS.Linq.IOrderedEnumerator<TSource>, keySelector: (item: TSource) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<TSource, TKey>;
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
            function toArray<TSource>(enumerator: Iterable<TSource>): Array<TSource>;
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
            function toDictionary<TSource, TKey>(enumerator: Iterable<TSource>, keySelector: (item: TSource) => TKey): TS.Collections.Dictionary<TKey, TSource>;
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
            function toList<TSource>(enumerator: Iterable<TSource>): TS.Collections.List<TSource>;
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
            function union<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>): TS.Linq.Enumerator<TSource>;
            /**
            * @description Produces the set union of two sequences by using the comparsion operator provide in argument 'equalityComparer'.
            * @description Deferred execution.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb358407.aspx | MSDN}
            *
            * @param {Iterable<TSource>} firstEnumerator
            * @param {Iterable<TSource>} secondEnumerator
            * @param {(first: TSource, second: TSource) => boolean} equalityComparer?
            *
            * @returns {TS.Linq.Enumerator<TSource>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function union<TSource>(firstEnumerator: Iterable<TSource>, secondEnumerator: Iterable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function where<TSource>(enumerator: Iterable<TSource>, predicate: (item: TSource) => boolean): TS.Linq.Enumerator<TSource>;
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
            function zip<TFirst, TSecond, TResult>(firstEnum: Iterable<TFirst>, secondEnum: Iterable<TSecond>, func: (first: TFirst, second: TSecond) => TResult): TS.Linq.Enumerator<TResult>;
        }
    }
}
declare namespace TS {
    namespace Linq {
        /**
        * interface TS.Linq.IOrderedEnumerator<T>
        */
        interface IOrderedEnumerator<T> {
            /**
            * @returns {Iterator<Iterator<T>}
            */
            partitionIterator(): Iterator<Iterator<T>>;
        }
    }
}
declare namespace TS {
    namespace Linq {
        /**
        * @class TS.Linq.OrderedEnumerator<T, TKey>
        *
        * @description The 'TS.Linq.OrderedEnumerator' class is used by the Linq sort functions where every subsequent call to a sort function operate on
        *  the partitions of the enumerator elements without changing the order of previous sortings.
        *
        * @implements {BaseEnumerator<T}
        * @implements {TS.Linq.IOrderedEnumerator<T>}
        */
        class OrderedEnumerator<T, TKey> extends BaseEnumerator<T> implements TS.Linq.IOrderedEnumerator<T> {
            /**
            * @private
            */
            private keySelector;
            /**
            * @private
            */
            private comparer;
            /**
            * @private
            */
            private orderedEnumerator;
            /**
            * @description Property which returns an empty 'OrderedEnumerator'.
            *
            * @get {TS.Liny.OrderedEnumerator<any, any>} Empty
            */
            static Empty: OrderedEnumerator<any, any>;
            /**
            * @implements {TS.Linq.BaseEnumerator<T>}
            *
            * @returns {Iterator<T>}, An instance of the iterator type.
            */
            [Symbol.iterator](): Iterator<T>;
            /**
            * @implements {TS.Linq.IOrderedEnumerator<T>}
            *
            * @returns {Iterator<Iterator<T>}, An instance of the partitioned iterator type.
            */
            partitionIterator(): Iterator<Iterator<T>>;
            /**
            * @private
            *
            * @param { Iterator<Iterator<T>>} partitionIterator
            *
            * @returns Array<T>
            */
            private flatPartitions(partitionIterator);
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
            constructor(enumerator: Iterable<T> | IOrderedEnumerator<T>, keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number);
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
            * @returns {TS.Linq.OrderedEnumerator<T, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            thenBy<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>;
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
            * @returns {TS.Linq.OrderedEnumerator<T, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            thenBy<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>;
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
            * @returns {TS.Linq.OrderedEnumerator<T, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            thenByDescending<TKey>(keySelector: (item: T) => TKey): TS.Linq.OrderedEnumerator<T, TKey>;
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
            * @returns {TS.Linq.OrderedEnumerator<T, TKey>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            thenByDescending<TKey>(keySelector: (item: T) => TKey, comparer: (first: TKey, second: TKey) => number): TS.Linq.OrderedEnumerator<T, TKey>;
        }
    }
}
declare namespace TS {
    namespace Linq {
        /**
        * @interface TS.Linq.IGrouping<TKey, T>
        */
        interface IGrouping<TKey, T> {
            /**
            * @readonly
            */
            key: TKey;
        }
        /**
        * @class TS.Linq.Grouping<TKey, T>
        *
        * @description This class is an extension of the TS.Linq.Enumerator<T> class and is the returned type of the
        *  TS.Linq.Extensions.groupBy function.
        *
        * @extends {TS.Linq.Enumerator<T>}
        *
        * @implements {TS.Linq.IGrouping<TKey, T>}
        */
        class Grouping<TKey, T> extends TS.Linq.Enumerator<T> implements TS.Linq.IGrouping<TKey, T> {
            private innerKey;
            /**
            * @implements {TS.Linq.IGrouping<TKey, T>}
            *
            * @get {TKey} key
            */
            key: TKey;
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
            constructor(key: TKey, enumerator: Iterable<T>, keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector?: (item: T) => any);
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @class TS.Collections.DuplicateKeyException
        *
        * @description This exception signals a duplicate key in a collection.
        *
        * @extends {TS.Exception}
        */
        class DuplicateKeyException extends TS.Exception {
            /**
            * @override {TS.Exception}
            *
            * @get {string} type
            */
            type: string;
            /**
            * @constructor
            *
            * @param {string} message.
            * @param {TS.Exception} innerException?, optional inner exception.
            */
            constructor(message?: string, innerException?: Exception);
        }
        /**
        * @class TS.Collections.InvalidKeyException
        *
        * @description This exception signals a general problem with a key of a collection.
        *
        * @extends {TS.Exception}
        */
        class InvalidKeyException extends TS.Exception {
            /**
            * @private
            */
            private internalKeyValue;
            /**
            * @override {TS.Exception}
            *
            * @get {string} type
            */
            type: string;
            /**
            * @get {any} keyValue
            */
            keyValue: any;
            /**
            * @constructor
            *
            * @param {any} keyValue
            * @param {string} message?, optional message.
            * @param {TS.Exception} innerException?, optional inner exception.
            */
            constructor(keyValue: any, message?: string, innerException?: Exception);
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @class TS.Collections.KeyValuePair<TKey, TValue>
        *
        * @description This is the implementation of the key value pair used by the dictionary class.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/5tbh8a42(v=vs.110).aspx | MSDN}
        */
        class KeyValuePair<TKey, TValue> {
            /**
            * @private
            */
            private internalKey;
            /**
            * @private
            */
            private internalValue;
            /**
            * @get {TKey} key
            */
            key: TKey;
            /**
            * @get {TValue} value
            */
            value: TValue;
            /**
            * @constructor
            *
            * @param {TKey} key.
            * @param {TValue} value
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            */
            constructor(key: TKey, value: TValue);
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @interface TS.Collections.IDictionary<TKey, TValue>
        *
        * @description Represents a generic collection of key/value pairs.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/s4ys34ea(v=vs.110).aspx | MSDN}
        *
        * @extends {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
        */
        interface IDictionary<TKey, TValue> extends TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>> {
            /**
            * @description Adds an item to the ICollection<T>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/63ywd54z(v=vs.110).aspx : MSDN }
            *
            * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            *
            * @returns {this}
            */
            add(item: KeyValuePair<TKey, TValue>): this;
            /**
            * @description Adds an element with the provided key and value to the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/cy7xta5e(v=vs.110).aspx : MSDN }
            *
            * @param {TKey} key
            * @param {TValue} value
            *
            * @returns {this}
            */
            add(key: TKey, value: TValue): this;
            /**
            * @description Determines whether the ICollection<TS.Collections.KeyValuePair<TKey, TValue>> contains a specific
            *  value.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/k5cf1d56(v=vs.110).aspx : MSDN }
            *
            * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @returns {boolean}
            */
            contains(item: TS.Collections.KeyValuePair<TKey, TValue>): boolean;
            /**
            * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified key.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/htszx2dy(v=vs.110).aspx : MSDN }
            *
            * @param {TKey} key
            *
            * @returns {boolean}
            */
            containsKey(key: TKey): boolean;
            /**
            * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified value.
            *  There is no equivalent function defined in the C# counterpart of the IDictionary interface.
            *
            * @param {TValue} value
            *
            * @returns {boolean}
            */
            containsValue(value: TValue): boolean;
            /**
            * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified value.
            *  Using the specified equalityComparer to compare the values.
            *  There is no equivalent function defined in the C# counterpart of the IDictionary interface.
            *
            * @param {TValue} value
            * @param {(first: TValue, second: TValue) => boolean} equalityComparer
            *
            * @returns {boolean}
            */
            containsValue(value: TValue, equalityComparer: (first: TValue, second: TValue) => boolean): boolean;
            /**
            * @description Copies the elements of the ICollection<T> to an Array, starting at the specified array index.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/0efx51xw(v=vs.110).aspx : MSDN }
            *
            * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @param {Array<KeyValuePair<TKey, TValue>>} targetArray
            * @param {number} destIndex, Default value is 0.
            *
            * @returns {TS.Collections.IDictionary<TKey, TValue>}
            */
            copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, destIndex?: number): this;
            /**
            * @description Returns the item with the specified key from the IDictionary<TKey, TValue>. Returns a undefined
            *  value if the dictionary doesn't contain an item with the specified key. This function is a substitute for the
            *  'item[key]' property defined in the .NET 'IDictionary<TKey, TValue> Interface'.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/s4ys34ea(v=vs.110).aspx | MSDN }
            *
            * @param {TKey} key
            *
            * @returns {TS.Collections.KeyValuePair<TKey, TValue> | undefined}
            */
            getItem(key: TKey): TS.Collections.KeyValuePair<TKey, TValue>;
            /**
            * @description Returns the value associated with the specified key or undefined if there is no match for the
            *  specified key. This function is a substitute for the 'item[key]' property defined in the .NET
            *  'IDictionary<TKey, TValue> Interface'.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/s4ys34ea(v=vs.110).aspx | MSDN }
            *
            * @param {TKey} key
            *
            * @returns {TValue | undefined}
            */
            getValue(key: TKey): TValue;
            /**
            * @description Returns a TS.Linq.Enumerable<TKey> containing the keys of the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/1ebzfbyx(v=vs.110).aspx : MSDN }
            *
            * @get {TS.Linq.Enumerator<TKey>} keys
            */
            keys: TS.Linq.Enumerator<TKey>;
            /**
            * @description Removes the occurrence of the specific item from the IDictionary<TKey, TValue>. The function fails
            *  silent if the dictionary doesn't contain that item.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bye7h94w(v=vs.110).aspx : MSDN }
            *
            * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            *
            * @returns {this}
            */
            remove(item: TS.Collections.KeyValuePair<TKey, TValue>): this;
            /**
            * @description Removes the element with the specified key from the IDictionary<TKey, TValue>. The function fails
            *  silent if the dictionary doesn't contain an item with specified key.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/k8s489f0(v=vs.110).aspx : MSDN }
            *
            * @param {TKey} key
            *
            * @returns {this}
            */
            remove(key: TKey): this;
            /**
            * @description Sets the value of argument 'newValue' to the item with the specified key in the dictionary. This
            *  function is a substitute for the 'item[key]' property defined in the .NET 'IDictionary<TKey, TValue>
            *  Interface'.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/zyxt2e2h(v=vs.110).aspx : MSDN }
            *
            * @param {TKey} key
            * @param {TValue} newValue
            *
            * @returns {TS.Collections.IDictionary<TKey, TValue>}
            */
            setItem(key: TKey, newValue: TValue): this;
            /**
            * @description Converts the ICollection<T> into an array of type T. (Inherited from ICollection<T>.) There is no
            *  equivalent function defined in the C# counterpart of the IDictionary interface.
            *
            * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @returns {Array<TS.Collections.KeyValuePair<TKey, TValue>>}
            */
            toArray(): Array<TS.Collections.KeyValuePair<TKey, TValue>>;
            /**
            * @description Returns a TS.Linq.Enumerable<TValue> containing the values in the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/0yxt5h4s(v=vs.110).aspx : MSDN }
            *
            * @get {TS.Linq.Enumerator<TValue>} values
            */
            values: TS.Linq.Enumerator<TValue>;
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @interface TS.Collections.ICollection<T>
        *
        * @description Defines methods to manipulate generic collections.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/92t2ye13(v=vs.110).aspx | MSDN}
        */
        interface ICollection<T> {
            /**
            * @description Adds items to the ICollection<T>. Differs from the C# counterpart in that way, that you are
            *  allowed to add multiple items at once.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/63ywd54z(v=vs.110).aspx | MSND }
            *
            * @param {Array<T>} ...item
            *
            * @returns {this}
            */
            add(...item: Array<T>): this;
            /**
            * @description Removes all items from the ICollection<T>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/5axy4fbh(v=vs.110).aspx | MSND }
            *
            * @returns {this}
            */
            clear(): this;
            /**
            * @description Determines whether the ICollection<T> contains a specific value.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/k5cf1d56(v=vs.110).aspx | MSND }
            *
            * @param {T} item
            *
            * @returns {boolean}
            */
            contains(item: T): boolean;
            /**
            * @description Copies the elements of the ICollection<T> to an Array, starting at the specified array index or at
            *  positions 0 if no array index is specified.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/0efx51xw(v=vs.110).aspx | MSND }
            *
            * @param {Array<T>} targetArray.
            * @param {number} destIndex?, Default value is 0.
            *
            * @returns {this}
            */
            copyTo(targetArray: Array<T>, destIndex?: number): this;
            /**
            * @description Gets the number of elements contained in the ICollection<T>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/5s3kzhec(v=vs.110).aspx | MSND }
            *
            * @returns {number}
            */
            count(): number;
            /**
            * @description Removes the first occurrence of the specific object from the ICollection<T>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bye7h94w(v=vs.110).aspx | MSND }
            *
            * @param {T} item
            *
            * @returns {this}
            */
            remove(item: T): this;
            /**
            * @description Converts the ICollection<T> into an array of type T. There is no equivalent function defined in
            *  the C# counterpart of the ICollection<T> interface.
            *
            * @returns {Array<T>}
            */
            toArray(): Array<T>;
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @interface TS.Collections.IList<T>
        *
        * @description Interface which must be implemented by all list classes.
        *
        * @extends {TS.Collections.ICollection<T>}
        *
        * @see {https://msdn.microsoft.com/en-us/library/5y536ey6(v=vs.110).aspx} MSDN
        */
        interface IList<T> extends TS.Collections.ICollection<T> {
            /**
            * @description Specified wheter null values are allowed in the IList<T> or not. This flag is set during
            *  construction and can't be changed during the lifetime of the instance.
            *
            * @readonly
            *
            * @member {boolean} allowNull.
            */
            allowNull: boolean;
            /**
            * @description Determines the index of a specific item in the IList<T>. If startIndex is set, the search for the
            *  item starts at the specified startIndex. Otherwise the search starts at the default position 0. If a comparer
            *  is specified, this comparer is used to decide whether a list element is a macht with the searche element or
            *  not. If the comparer isn't specified, the default equality comparer '===' is used. The function returns -1 if
            *   there is no match for the given item.
            *
            * @param {T} item.
            * @param {number} startIndex?, Default = 0.
            * @param {(first: T, second: T) => boolean} equalityComparer, Default = "===".
            *
            * @returns {number}
            */
            indexOf(item: T, startIndex?: number, equalityComparer?: (first: T, second: T) => boolean): number;
            /**
            * @descripton Inserts an item to the IList<T> at the specified index.
            *
            * @param {number} index.
            * @param {T} value.
            *
            * @returns {this}
            */
            insert(index: number, value: T): this;
            /**
            * @description Removes the item at the specified index from the IList<T>.
            *
            * @param {number} index.
            *
            * @returns {this}
            */
            removeAt(index: number): this;
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @class TS.Collections.List<T>
        *
        * @description This class  mimics the .NET counterpart of a List<T> as far as possible in TypeScript.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx | MSDN}
        *
        * @implements {TS.Collections.IList<T>}
        * @implements {Iterable<T>}
        * @implements {ArrayLike<T>}
        */
        class List<T> extends TS.Linq.BaseEnumerator<T> implements TS.Collections.IList<T>, ArrayLike<T> {
            /**
            * @private
            */
            private internalAllowNull;
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
            length: number;
            /**
            * @implements  {TS.Linq.BaseEnumerator<T>}
            *
            * @returns {Iterator<TSource>}
            */
            [Symbol.iterator](): Iterator<T>;
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
            add(...rest: Array<T>): this;
            /**
            * @description Signals whether the list accepts null values as elements or not.
            *
            * @implements {TS.Collections.IList<T>}
            *
            * @get {boolean} allowNull
            */
            allowNull: boolean;
            /**
            * @description Removes all items from the IList<T>.
            *
            * @implements {TS.Collections.IList<T>}
            *
            * @returns {this}
            */
            clear(): this;
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
            copyTo(targetArray: Array<T>, destIndex?: number): this;
            /**
            * @description Searches for the specified object and returns the zero - based index of the first occurrence
            *  within the entire List<T>. Returns -1 if there is no match for the given item.
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
            indexOf(item: T): number;
            /**
            * @description Searches for the specified object and returns the zero - based index of the first occurrence
            *  within the range of elements in the List<T> that extends from the specified index to the last element. Returns
            * -1 if there is no match for the given item.
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
            indexOf(item: T, startIndex: number): number;
            /**
            * @description Searches for the specified object and returns the zero - based index of the first occurrence
            *  within the range of elements in the List<T> that extends from the specified index to the last element. The
            *  equalityComparer is used to determine a match with the searched item in the List<T>. Returns -1 if there is no
            *  match for the given item.
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
            indexOf(item: T, startIndex: number, equalityComparer: (first: T, second: T) => boolean): number;
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
            insert(index: number, item: T): this;
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
            remove(item: T): this;
            /**
            * @description Removes the element at the specified index of the List<T>.
            *
            * @implements {TS.Collections.IList<T>}
            *
            * @param {number} index
            *
            * @returns {this}
            */
            removeAt(index: number): this;
            /**
            * @constructor
            *
            * @description Creates a new List<T>. Requires the allowNull flag to be set which determines whether the null
            *  values will be allowed as element or not. In C# you would declare a List<T> to allow null by choosing a
            *  nullable type as concrete type parameter. Since all types in JavaScript nullable per default, I had to
            *  introduce the 'allowNull' flag in the constructor signature.
            *  The optional generator function will be use to initially fill the list with elements if provided.
            *
            * @param {boolean}, allowNull = true
            * @param{() => IterableIterator<T>} generator?
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidInvocationException}
            */
            constructor(allowNull: boolean, generator?: () => IterableIterator<T>);
            /**
            * @constructor
            *
            * @description Creates a new List<T>. Requires the allowNull flag to be set which determines whether the null
            *  values will be allowed as element or not. In C# you would declare a List<T> to allow null by choosing a
            *  nullable type as concrete type parameter. Since all types in JavaScript nullable per default, I had to
            *  introduce the 'allowNull' flag in the constructor signature.
            *  The optional source will be use to initially fill the list with elements if provided.
            *  The optional predicate determines which elements of the source will become elements of the list.
            *
            * @param {boolean}, allowNull = true
            * @param{Iterable<T> | ArrayLike<T>} source?
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidInvocationException}
            */
            constructor(allowNull: boolean, source?: Iterable<T> | ArrayLike<T>, predicate?: (item: T) => boolean);
            /**
            * @private
            */
            private push(item);
            /**
            * @private
            */
            private pop();
        }
    }
}
declare namespace TS {
    namespace Collections {
        /**
        * @class TS.Collections.Dictionary<TKey, TValue>
        *
        * @description This class is an implementation of the IDictionary<TKey, TValue> interface and TypeScript
        *  counterpart of the .NET Dictionary<TKey, TValue> class. Some methods of this class behave different than the C#
        *  counterpart, some are new and some C# methods are not implemented. Those differences are mainly caused by the
        *  javascript limitations. Read the method descriptions to learn more about the variations.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/xfhwa508(v=vs.110).aspx | MSDN}
        *
        * @extends {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
        *
        * @implements {TS.Collections.IDictionary<TKey, TValue>}
        *
        */
        class Dictionary<TKey, TValue> extends TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>> implements TS.Collections.IDictionary<TKey, TValue> {
            /**
            * @private
            */
            private dictionaryMap;
            /**
            * @private
            */
            private keyEqualityComparer;
            /**
            * @private
            */
            private genFunc;
            /**
            * @implements {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
            *
            * @returns {Iterator<KeyValuePair<TKey, TValue>>}
            */
            [Symbol.iterator](): Iterator<KeyValuePair<TKey, TValue>>;
            /**
            * @description Adds an item to the ICollection<T>. There is no equivalent function in the C# dictionary
            *  implementation.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            *
            * @returns {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.ArgumentUndefinedException
            * @throws TS.ArgumentNullException;
            * @throws TS.InvalidTypeException
            * @throws TS.Collections.DuplicateKeyException
            */
            add(item: KeyValuePair<TKey, TValue>): this;
            /**
            * @description Adds an element with the provided key and value to the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb338565(v=vs.110).aspx | MSDN  }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key
            * @param {TValue} value
            *
            * @returns {this}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.ArgumentUndefinedException
            * @throws TS.ArgumentNullException;
            * @throws TS.Collections.DuplicateKeyException
            */
            add(key: TKey, value: TValue): this;
            /**
            * @description Removes all items from the dictionary.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/b5txwy7s(v=vs.110).aspx | MSDN }
            *
            * @returns {this}
            */
            clear(): this;
            /**
            * @description Determines whether the collection contains a specific KeyValuePair. Using the default comparer to
            *  compare the values.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            *
            * @returns {boolean}
            */
            contains(item: TS.Collections.KeyValuePair<TKey, TValue>): boolean;
            /**
            * @description Determines whether the collection contains a specific KeyValuePair. Using the specified
            *  equalityComparer to compare the values. There is no equivalent function in the C# dictionary implementation
            *  which allows to override the default equality comparer for value comaparsion.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            * @param {(first: TValue, second: TValue) => boolean} equalityComparer
            *
            * @returns {boolean}
            */
            contains(item: TS.Collections.KeyValuePair<TKey, TValue>, equalityComparer: (first: TValue, second: TValue) => boolean): boolean;
            /**
            * @description Determines whether the collection contains a specific key.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/kw5aaea4(v=vs.110).aspx  | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key
            *
            * @returns {boolean}
            */
            containsKey(key: TKey): boolean;
            /**
            * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified value.
            *  Using the default comparer to compare the values.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/a63811ah(v=vs.110).aspx  | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TValue} value
            *
            * @returns {boolean}
            */
            containsValue(value: TValue): boolean;
            /**
            * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified value.
            *  Using the specified equalityComparer to compare the values. There is no equivalent function in the C#
            *  dictionary implementation which allows to override the default equality comparer for value comaparsion.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/a63811ah(v=vs.110).aspx  | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TValue} value
            * @param {(first: TValue, second: TValue) => boolean} equalityComparer
            *
            * @returns {boolean}
            *
            * @throws {TS.InvalidTypeException}
            */
            containsValue(value: TValue, equalityComparer: (first: TValue, second: TValue) => boolean): boolean;
            /**
            * @description Copies the elements of the dictionary to an Array, starting at the specified array index.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/mt481485(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {Array<KeyValuePair<TKey, TValue>>} targetArray
            * @param {number} destIndex, Default value is 0.
            *
            * @returns {this}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, destIndex?: number): this;
            /**
            * @description Returns the number of key/value pairs contained in the Dictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/zhcy256f(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collection.ICollection<KeyValuePair<TKey, TValue>>}
            *
            * @override {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
            *
            * @returns {number}
            */
            count(): number;
            /**
            * @description Returns the item with the specified key from the Dictionary<TKey, TValue>. Returns an undefined
            *  value if the dictionary doesn't contain an item with the specified key. There is no equivalent method in the
            *  C# dictionary implementation.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key.
            *
            * @returns {TS.Collections.KeyValuePair<TKey, TValue> | undefined}
            */
            getItem(key: TKey): TS.Collections.KeyValuePair<TKey, TValue>;
            /**
            * @description Returns the value of the item with the specified key from the Dictionary<TKey, TValue>. Returns an
            *  undefined value if the dictionary doesn't contain an item with the specified key. This method is a substitute
            *  for the index access implemented in the C# dictionary. In TypeScript you can only crate indexers for strings
            *  or numbers. But a dictionary key can have any type. So there is no other way than creating a set and get
            *  function as a substitute.
            *
            * @see {TS.Collections.Dictionary.setItem}
            * @see {@link https://msdn.microsoft.com/en-us/library/zyxt2e2h(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key
            *
            * @returns {TValue | undefined}
            */
            getValue(key: TKey): TValue;
            /**
            * @description Gets a TS.Linq.Enumerator<TKey> containing the keys of the IDictionary<TKey, TValue>.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/yt2fy5zk(v=vs.110).aspx | MSDN }
            *
            * @get {TS.Linq.Enumerator<TKey>} keys
            */
            keys: TS.Linq.Enumerator<TKey>;
            /**
            * @description Removes a key and value from the dictionary.
            *  This method uses the equality comparer which was set in the constructor or the dictionary to determine
            *  equality for the key. This method uses either the default equality comparer to determine equality for the
            *  value or the one you can specify in the optional 'equalityComparer' argument. This function differs from the
            *  C# implementation in mutiple ways.
            *  1) This method returns a this reference and not a boolean value.
            *  2) You can specifie an equality comparer for value camparsion to overriede the default behavior.
            *  3) This method fails silent if the specified item can't be located in the dictionary.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/cc672341(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
            * @param {(value: TValue) => boolean} equalityComparer?
            *
            * @returns {this}
            *
            * @throws {ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            remove(item: TS.Collections.KeyValuePair<TKey, TValue>, equalityComparer?: (first: TValue, second: TValue) => boolean): this;
            /**
            * @description Removes the element with the specified key from the IDictionary<TKey, TValue>.
            *  1) This method returns a this reference and not a boolean value.
            *  2) This method fails silent if the specified key can't be located in the dictionary.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/bb356469(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key
            *
            * @returns {this}
            *
            * @throws {ArgumentNullOrUndefinedException}
            */
            remove(key: TKey): this;
            /**
            * @description Sets the value of argument 'newValue' to the item with the specified key in the dictionary. This
            *  method is a substitute for the index access implemented in the C# dictionary. In TypeScript you can only
            *  create indexers for strings or numbers. But a dictionary key can have any type. So there is no other way than
            *  creating a set and get function as a substitute.
            *
            * @see {TS.Collections.Dictionary.getValue}
            * @see {@link https://msdn.microsoft.com/en-us/library/zyxt2e2h(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @param {TKey} key
            * @param {TValue} newValue
            *
            * @returns {this}
            *
            * @throws {TS.Collections.InvalidKeyException}
            */
            setItem(key: TKey, newValue: TValue): this;
            /**
            * @description Converts the ICollection<T> into an array of type  Array<TS.Collections.KeyValuePair<TKey, TValue>>.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @override {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
            *
            * @returns {Array<TS.Collections.KeyValuePair<TKey, TValue>>}
            */
            toArray(): Array<TS.Collections.KeyValuePair<TKey, TValue>>;
            /**
            * @description Gets a TS.Linq.Enumerator<TValue> containing the values in the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/ekcfxy3x(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @get {TS.Linq.Enumerator<TValue>} values
            */
            values: TS.Linq.Enumerator<TValue>;
            /**
            * @constructor
            *
            * @description Creates a new instance of the  TS.Collections.Dictionary<TKey, TValue> class. Creates a shallow
            *  copy of the iterable 'KeyValuePair' source if provided. Uses the default equality comparer (===) for the key
            *  comparsion if there isn't a key equality comparer provided in argument 'keyEqualityComparer'.
            *
            * @param (Iterable<TS.Collections.KeyValuePair<TKey, TValue>>} source?
            * @param {(first: TKey, second: TKey) => boolean} keyEqualityComparer?
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidOperationException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(source?: Iterable<TS.Collections.KeyValuePair<TKey, TValue>>, keyEqualityComparer?: (first: TKey, second: TKey) => boolean);
        }
    }
}
