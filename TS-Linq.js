/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
        /**
        * @class TS.Linq.SelectorException
        *
        * @description This exceptions signals an error which occured in a selector function for specific value.
        *
        * @extends {TS.Exception}
        */
        class SelectorException extends TS.Exception {
            constructor(selector, value, message, innerException) {
                super(message, innerException);
                /**
                * @private
                */
                this.internalSelector = null;
                /**
                * @private
                */
                this.internalValue = null;
                this.internalSelector = selector;
                this.internalValue = value;
            }
            /**
            * @override
            *
            * @get {string} type
            */
            get type() {
                return "TS.Linq.SelectorException";
            }
            /**
            * @description The selector which caused the exception.
            *
            * @get {(item: any) => Enumerator<any>} selector
            */
            get selector() {
                return this.internalSelector;
            }
            /**
            * @description The value which caused the exception.
            *
            * @get {any} value
            */
            get value() {
                return this.internalValue;
            }
        }
        Linq.SelectorException = SelectorException; //END class
        /**
        * @class TS.Linq.EmptyEnumeratorException
        *
        * @description This exceptions signals an error in a function which expects a none empty enumerator to operate on.
        *
        * @extends {TS.Exception}
        */
        class EmptyEnumeratorException extends TS.Exception {
            /**
            * @constructor
            *
            * @param {Iterable<any>} enumerator
            * @param {string}  message?
            */
            constructor(enumerator, message, innerException) {
                super(message, innerException);
                /**
                * @private
                */
                this.internalEnumerator = null;
                this.internalEnumerator = enumerator;
            }
            /**
            * @override
            *
            * @get {string} type
            */
            get type() {
                return "TS.Linq.EmptyEnumeratorException";
            }
            /**
            * @description The enumerator which caused the exception.
            *
            * @get {Iterable<any>} enumerator
            */
            get enumerator() {
                return this.internalEnumerator;
            }
        }
        Linq.EmptyEnumeratorException = EmptyEnumeratorException; //END class
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
            * @constructor
            *
            * @param {Iterable<any>} enumerator
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(enumerator, message, innerException) {
                super(message, innerException);
                /**
                * @private
                */
                this.internalEnumerator = null;
                this.internalEnumerator = enumerator;
            }
            /**
            * @override
            *
            * @get {string} type
            */
            get type() {
                return "TS.Linq.MoreThanOneElementException";
            }
            /**
            * @description The enumerator which caused the exception.
            *
            * @get {Iterable<any>} enumerator
            */
            get enumerator() {
                return this.internalEnumerator;
            }
        }
        Linq.MoreThanOneElementException = MoreThanOneElementException; //END class
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
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
        class BaseEnumerator {
            aggregate(accumulator, seed) {
                return TS.Linq.Extensions.aggregate(this, accumulator, seed);
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
            all(predicate) {
                return TS.Linq.Extensions.all(this, predicate);
            }
            any(predicate) {
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Collections.CollectionBase.any");
                } //END if
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
            average() {
                try {
                    return TS.Linq.Extensions.average(this);
                }
                catch (ex) {
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
            concat(secondEnumerator) {
                return TS.Linq.Extensions.concat(this, secondEnumerator);
            }
            contains(element, equalityComparer) {
                return TS.Linq.Extensions.contains(this, element, equalityComparer);
            }
            count(predicate) {
                return TS.Linq.Extensions.count(this, predicate);
            }
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
            cycle() {
                return TS.Linq.Extensions.cycle(this);
            }
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
            defaultIfEmpty(defaultConstructorOrValue) {
                return TS.Linq.Extensions.defaultIfEmpty(this, defaultConstructorOrValue);
            }
            distinct(equalityComparer) {
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
            elementAt(index) {
                return TS.Linq.Extensions.elementAt(this, index);
            }
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
            elementAtOrDefault(index, defaultConstructorOrValue) {
                return TS.Linq.Extensions.elementAtOrDefault(this, index, defaultConstructorOrValue);
            }
            except(secondEnumerator, equalityComparer) {
                return TS.Linq.Extensions.except(this, secondEnumerator, equalityComparer);
            }
            first(predicate) {
                return TS.Linq.Extensions.first(this, predicate);
            }
            firstOrDefault(defaultConstructorOrValue, predicate) {
                return TS.Linq.Extensions.firstOrDefault(this, defaultConstructorOrValue, predicate);
            }
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
            forEach(action) {
                return TS.Linq.Extensions.forEach(this, action);
            }
            groupBy(keySelector, equalityComparer, elementSelector) {
                return TS.Linq.Extensions.groupBy(this, keySelector, equalityComparer, elementSelector);
            }
            groupJoin(innerEnumerator, outerKeySelector, innerKeySelector, resultSelector, equalityComparer) {
                return TS.Linq.Extensions.groupJoin(this, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector, equalityComparer);
            }
            intersect(secondEnumerator, equalityComparer) {
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
            join(innerEnumerator, outerKeySelector, innerKeySelector, resultSelector) {
                return TS.Linq.Extensions.join(this, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector);
            }
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
            last(predicate) {
                return TS.Linq.Extensions.last(this, predicate);
            }
            lastOrDefault(defaultConstructorOrValue, predicate) {
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
            max() {
                return TS.Linq.Extensions.max(this);
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
            min() {
                return TS.Linq.Extensions.min(this);
            }
            orderBy(keySelector, comparer) {
                return TS.Linq.Extensions.orderBy(this, keySelector, comparer);
            }
            orderByDescending(keySelector, comparer) {
                return TS.Linq.Extensions.orderByDescending(this, keySelector, comparer);
            }
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
            random() {
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
            reverse() {
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
            select(selector) {
                return TS.Linq.Extensions.select(this, selector);
            }
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
            selectMany(selector) {
                return TS.Linq.Extensions.selectMany(this, selector);
            }
            sequenceEqual(secondEnumerator, equalityComparer) {
                return TS.Linq.Extensions.sequenceEqual(this, secondEnumerator, equalityComparer);
            }
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
            shuffle() {
                return TS.Linq.Extensions.shuffle(this);
            }
            single(predicate) {
                return TS.Linq.Extensions.single(this, predicate);
            }
            singleOrDefault(defaultConstructorOrValue, predicate) {
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
            skip(count) {
                return TS.Linq.Extensions.skip(this, count);
            }
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
            skipWhile(predicate) {
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
            sum() {
                return TS.Linq.Extensions.sum(this);
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
            take(count) {
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
            takeWhile(predicate) {
                return TS.Linq.Extensions.takeWhile(this, predicate);
            }
            //***********************************************************************
            // Function 'thenBy' and 'thenByDescending' which would appear here are 
            // only available on 'TS.Linq.OrderedEnumerator' objects for obvious 
            // reasons.
            //***********************************************************************
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
            toArray() {
                return TS.Linq.Extensions.toArray(this);
            }
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
            toDictionary(keySelector) {
                return TS.Linq.Extensions.toDictionary(this, keySelector);
            }
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
            toList() {
                return TS.Linq.Extensions.toList(this);
            }
            union(secondEnumerator, equalityComparer) {
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
            where(predicate) {
                return TS.Linq.Extensions.where(this, predicate);
            }
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
            zip(secondEnum, func) {
                return TS.Linq.Extensions.zip(this, secondEnum, func);
            }
        }
        Linq.BaseEnumerator = BaseEnumerator; //END class
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
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
        class Enumerator extends TS.Linq.BaseEnumerator {
            constructor(sourceOrGenerator, predicate) {
                super();
                /**
                * @private
                */
                this.genFunc = null;
                this.genFunc = null;
                TS.Utils.checkParameter("source or generator", sourceOrGenerator, "TS.Linq.Enumerator constructor");
                if (TS.Utils.Assert.isFunction(sourceOrGenerator)) {
                    if (TS.Utils.Assert.isGenerator(sourceOrGenerator)) {
                        this.genFunc = sourceOrGenerator;
                    }
                    else {
                        throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid generator function.");
                    }
                }
                else if (TS.Utils.Assert.isIterable(sourceOrGenerator) || TS.Utils.Assert.isArrayLike(sourceOrGenerator)) {
                    if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                        if (!TS.Utils.Assert.isFunction(predicate)) {
                            throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid selctor argument.");
                        }
                    }
                    else {
                        predicate = (item) => true;
                    }
                    this.genFunc = function* () {
                        for (let item of sourceOrGenerator) {
                            if (predicate(item)) {
                                yield item;
                            }
                        }
                    };
                }
                else {
                    throw new TS.InvalidInvocationException("The constructor of 'TS.Linq.Enumerator' requires a valid generator function in argument 'generator' or an iterable or array like type in argument 'source'.");
                }
            }
            /**
            * @description Property which returns an empty 'Enumerator'.
            *
            * @get {Enumerator<any>}
            */
            static get Empty() {
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
            [Symbol.iterator]() {
                return new Generator(this.genFunc);
            }
        }
        Linq.Enumerator = Enumerator; //END class Enumerator
        //*************************************************************************
        // Private class: Generator
        //*************************************************************************
        /**
        * @class Generator<T>
        *
        * @internal
        */
        class Generator {
            /**
            * @constructor
            *
            * @param {genFunc: () => IterableIterator<T>} genFunc
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(genFunc) {
                this.genFunc = null;
                this.innerIterator = null;
                this.initalized = false;
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
            next() {
                if (!this.initalized) {
                    this.innerIterator = this.genFunc();
                    this.initalized = true;
                }
                return this.innerIterator.next();
            }
        }
         //END class
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
        var Extensions;
        (function (Extensions) {
            function aggregate(enumerator, accumulator, seed) {
                let resultValue;
                let isEmpty = true;
                let isFirst = true;
                let useSeed = false;
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.aggregate");
                TS.Utils.checkFunctionParameter("accumulator", accumulator, "TS.Linq.Extensions.aggregate");
                useSeed = !TS.Utils.Assert.isNullOrUndefined(seed);
                for (let current of enumerator) {
                    if (isFirst) {
                        if (useSeed) {
                            resultValue = accumulator(seed, current);
                        }
                        else {
                            resultValue = current;
                        }
                        isFirst = false;
                    }
                    else {
                        resultValue = accumulator(resultValue, current);
                    }
                }
                if (isFirst) {
                    if (useSeed) {
                        resultValue = seed;
                    }
                    else {
                        throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.aggregate'.");
                    }
                }
                return resultValue;
            }
            Extensions.aggregate = aggregate;
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
            function all(enumerator, predicate) {
                let resultValue = true;
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.all");
                TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.all");
                for (let item of enumerator) {
                    if (!predicate(item)) {
                        return false;
                    }
                }
                return true;
            }
            Extensions.all = all;
            function any(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.any");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.any");
                } //END if
                else {
                    predicate = item => true;
                } //END else
                for (let item of enumerator) {
                    if (predicate(item)) {
                        return true;
                    }
                }
                return false;
            }
            Extensions.any = any;
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
            function average(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.average");
                let sum = 0;
                let count = 0;
                for (let item of enumerator) {
                    if (!TS.Utils.Assert.isNumberValue(item)) {
                        throw new TS.InvalidTypeException("enumerator", enumerator, "Enumerator is not a valid number enumerator in function 'TS.Linq.Extensions.average'.");
                    }
                    sum += item;
                    count++;
                }
                if (!TS.Utils.Assert.isNumberValue(sum)) {
                    throw new TS.InvalidTypeException("enumerator", enumerator, "Enumerator is not a valid number enumerator in function 'TS.Linq.Extensions.average'.");
                }
                if (TS.Utils.Assert.isInfiniteNumber(sum)) {
                    throw new TS.OverflowException("An arrithmetic overflow occured during the execution of 'TS.Extensions.average'.");
                }
                if (count == 0) {
                    throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.average'.");
                }
                return sum / count;
            }
            Extensions.average = average;
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
            function concat(firstEnumerator, secondEnumerator) {
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.concat");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.concat");
                let arr;
                let resultEnumerator;
                let generatorFunc = function* () {
                    let firstIter = firstEnumerator[Symbol.iterator]();
                    let secondIter = secondEnumerator[Symbol.iterator]();
                    let result;
                    do {
                        result = firstIter.next();
                        if (!result.done) {
                            yield result.value;
                        }
                    } while (!result.done);
                    do {
                        result = secondIter.next();
                        if (!result.done) {
                            yield result.value;
                        }
                    } while (!result.done);
                };
                return new TS.Linq.Enumerator(generatorFunc);
            }
            Extensions.concat = concat;
            function contains(enumerator, element, equalityComparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.contains");
                TS.Utils.checkParameter("element", element, "TS.Linq.Extensions.contains");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.contains");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                for (let item of enumerator) {
                    if (equalityComparer(item, element)) {
                        return true;
                    }
                }
                return false;
            }
            Extensions.contains = contains;
            function count(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.count");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.count");
                } //END if
                else {
                    predicate = item => true;
                } //END else
                let count = 0;
                for (let item of enumerator) {
                    if (predicate(item)) {
                        count++;
                    }
                }
                return count;
            }
            Extensions.count = count;
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
            function cycle(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.cycle");
                let generatorFunction = function* () {
                    if (TS.Linq.Extensions.count(enumerator) == 0) {
                        return null;
                    }
                    while (true) {
                        for (let item of enumerator) {
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.cycle = cycle;
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
            function defaultIfEmpty(enumerator, defaultConstructorOrValue) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.defaultIfEmpty");
                TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.defaultIfEmpty");
                let generatorFunction = function* () {
                    let hasElements = false;
                    for (let item of enumerator) {
                        hasElements = true;
                        yield item;
                    }
                    if (!hasElements) {
                        if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue)) {
                            yield new defaultConstructorOrValue();
                        }
                        else {
                            yield defaultConstructorOrValue;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.defaultIfEmpty = defaultIfEmpty;
            function distinct(enumerator, equalityComparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.distinct");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.distinct");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                let generatorFunction = function* () {
                    let tempArray = new Array();
                    for (let item of enumerator) {
                        if (tempArray.find((value, index, arr) => { return equalityComparer(value, item); }) == undefined) {
                            tempArray.push(item);
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.distinct = distinct;
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
            function elementAt(enumerator, index) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAt");
                TS.Utils.checkUIntNumberParameter("index", index, "TS.Linq.Extensions.elementAt");
                let temArray = TS.Linq.Extensions.toArray(enumerator);
                if (index < temArray.length) {
                    return temArray[index];
                }
                throw new TS.IndexOutOfRangeException("The 'index' in function 'TS.Linq.Extensions.elementAt' is out of the range of the current enumerator.");
            }
            Extensions.elementAt = elementAt;
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
            function elementAtOrDefault(enumerator, index, defaultConstructorOrValue) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAtOrDefault");
                TS.Utils.checkUIntNumberParameter("index", index, "TS.Linq.Extensions.elementAtOrDefault");
                TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.elementAtOrDefault");
                let temArray = TS.Linq.Extensions.toArray(enumerator);
                if (index < temArray.length) {
                    return temArray[index];
                }
                if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue)) {
                    return new defaultConstructorOrValue();
                }
                else {
                    return defaultConstructorOrValue;
                }
            }
            Extensions.elementAtOrDefault = elementAtOrDefault;
            function except(firstEnumerator, secondEnumerator, equalityComparer) {
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.except");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.except");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.except");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                let generatorFunction = function* () {
                    for (let firstItem of firstEnumerator) {
                        let match = false;
                        for (let secondItem of secondEnumerator) {
                            if (equalityComparer(firstItem, secondItem)) {
                                match = true;
                            }
                        }
                        if (!match) {
                            yield firstItem;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.except = except;
            function first(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.first");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.first");
                } //END if
                else {
                    predicate = (item) => true;
                } //END else
                for (let item of enumerator) {
                    if (predicate(item)) {
                        return item;
                    }
                }
                throw new TS.InvalidOperationException("The'enumerator' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.first'.");
            }
            Extensions.first = first;
            function firstOrDefault(enumerator, defaultConstructorOrValue, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.firstOrDefault");
                TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.firstOrDefault");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.firstOrDefault");
                } //END if
                else {
                    predicate = (item) => true;
                } //END else
                for (let item of enumerator) {
                    if (predicate(item)) {
                        return item;
                    }
                }
                if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue)) {
                    return new defaultConstructorOrValue();
                }
                else {
                    return defaultConstructorOrValue;
                }
            }
            Extensions.firstOrDefault = firstOrDefault;
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
            function forEach(enumerator, action) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.forEach");
                TS.Utils.checkFunctionParameter("action", action, "TS.Linq.Extensions.forEach");
                for (let item of enumerator) {
                    action(item);
                }
                return new TS.Linq.Enumerator(enumerator);
            }
            Extensions.forEach = forEach;
            function groupBy(enumerator, keySelector, equalityComparer, elementSelector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.groupBy");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.groupBy");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.groupBy");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                if (!TS.Utils.Assert.isNullOrUndefined(elementSelector)) {
                    TS.Utils.checkFunctionParameter("elementSelector", elementSelector, "TS.Linq.Extensions.groupBy");
                } //END if
                else {
                    elementSelector = (item) => item;
                } //END else
                let generatorFunction = function* () {
                    let keys = distinct(select(enumerator, keySelector));
                    for (let key of keys) {
                        yield new Linq.Grouping(key, enumerator, keySelector, equalityComparer, elementSelector);
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.groupBy = groupBy;
            function groupJoin(outerEnumerator, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector, equalityComparer) {
                TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkFunctionParameter("resultSelector", resultSelector, "TS.Linq.Extensions.groupJoin");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.groupJoin");
                } //END if
                else {
                    equalityComparer = (outerKey, innerKey) => {
                        return outerKey === innerKey;
                    };
                } //END else
                let generatorFunction = function* () {
                    for (let outerItem of outerEnumerator) {
                        let outerKey = outerKeySelector(outerItem);
                        yield resultSelector(outerItem, new TS.Linq.Enumerator(function* () {
                            for (let innerItem of innerEnumerator) {
                                if (equalityComparer(outerKey, innerKeySelector(innerItem))) {
                                    yield innerItem;
                                }
                            }
                        }));
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.groupJoin = groupJoin;
            function intersect(firstEnumerator, secondEnumerator, equalityComparer) {
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.intersect");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.intersect");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("predicate", equalityComparer, "TS.Linq.Extensions.intersect");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                let generatorFunction = function* () {
                    for (let firstItem of firstEnumerator) {
                        for (let secondItem of secondEnumerator) {
                            if (equalityComparer(firstItem, secondItem)) {
                                yield firstItem;
                            }
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.intersect = intersect;
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
            function join(outerEnumerator, innerEnumerator, outerKeySelector, innerKeySelector, resultSelector) {
                TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkFunctionParameter("resultSelector", resultSelector, "TS.Linq.Extensions.join");
                let generatorFunction = function* () {
                    for (let outerItem of outerEnumerator) {
                        let outerKey = outerKeySelector(outerItem);
                        let joinEnumerator = where(innerEnumerator, item => outerKey == innerKeySelector(item));
                        for (let joinItem of joinEnumerator) {
                            yield resultSelector(outerItem, joinItem);
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.join = join;
            function last(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.last");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.last");
                } //END if
                else {
                    predicate = item => true;
                } //END else
                let resultItem;
                for (let item of enumerator) {
                    if (predicate(item)) {
                        resultItem = item;
                    }
                }
                if (resultItem == undefined) {
                    throw new TS.InvalidOperationException("The'enumerable' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.last'.");
                }
                return resultItem;
            }
            Extensions.last = last;
            function lastOrDefault(enumerator, defaultConstructorOrValue, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.lastOrDefault");
                TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.lastOrDefault");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.lastOrDefault");
                } //END if
                else {
                    predicate = item => true;
                } //END else
                let resultItem;
                for (let item of enumerator) {
                    if (predicate(item)) {
                        resultItem = item;
                    }
                }
                if (resultItem == undefined) {
                    if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue)) {
                        resultItem = new defaultConstructorOrValue();
                    }
                    else {
                        resultItem = defaultConstructorOrValue;
                    }
                }
                return resultItem;
            }
            Extensions.lastOrDefault = lastOrDefault;
            function max(enumerator, selector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.max");
                if (!TS.Utils.Assert.isNullOrUndefined(selector)) {
                    TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.max");
                }
                else {
                    selector = (item) => {
                        if (!TS.Utils.Assert.isNumber(item)) {
                            throw new TS.ArgumentException("item", item, "Argument item must be of type number in function 'TS.Linq.Extensions.max'.");
                        }
                        else {
                            return item;
                        }
                    };
                }
                if (count(enumerator) == 0) {
                    throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty in function 'TS.Linq.Extensions.max'.");
                } //END if
                let tempMax = Number.MIN_VALUE;
                for (let item of enumerator) {
                    let temp = selector(item);
                    if (!TS.Utils.Assert.isNumber(temp)) {
                        throw new TS.InvalidTypeException("temp", temp, "The selected value of the current enumerator has the wrong type. All values must be of type 'number' in function 'TS.Linq.Extensions.max'.");
                    }
                    if (temp > tempMax) {
                        tempMax = temp;
                    }
                }
                return tempMax;
            }
            Extensions.max = max;
            function min(enumerator, selector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.min");
                if (!TS.Utils.Assert.isNullOrUndefined(selector)) {
                    TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.min");
                }
                else {
                    selector = (item) => {
                        if (!TS.Utils.Assert.isNumber(item)) {
                            throw new TS.ArgumentException("item", item, "Argument item must be of type number in function 'TS.Linq.Extensions.min'.");
                        }
                        else {
                            return item;
                        }
                    };
                }
                if (count(enumerator) == 0) {
                    throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerable in function 'TS.Linq.Extensions.min'.");
                } //END if
                let tempMin = Number.MAX_VALUE;
                for (let item of enumerator) {
                    let temp = selector(item);
                    if (!TS.Utils.Assert.isNumber(temp)) {
                        throw new TS.InvalidTypeException("temp", temp, "The selected value of the current enumerator has the wrong type. All values must be of type 'number' in function 'TS.Linq.Extensions.min'.");
                    }
                    if (temp < tempMin) {
                        tempMin = temp;
                    }
                }
                return tempMin;
            }
            Extensions.min = min;
            function orderBy(enumerator, keySelector, comparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
                if (!TS.Utils.Assert.isNullOrUndefined(comparer)) {
                    TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderBy");
                } //END if
                else {
                    //
                    // Use the  default comparsion operator.
                    //
                    comparer = (first, second) => { if (first < second) {
                        return -1;
                    } ; if (first > second) {
                        return 1;
                    } ; return 0; };
                }
                return new Linq.OrderedEnumerator(enumerator, keySelector, comparer);
            }
            Extensions.orderBy = orderBy;
            function orderByDescending(enumerator, keySelector, comparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderByDescending");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderByDescending");
                if (!TS.Utils.Assert.isNullOrUndefined(comparer)) {
                    TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderByDescending");
                }
                else {
                    //
                    // Use the  default comparsion operator.
                    //
                    comparer = (first, second) => { if (first < second) {
                        return -1;
                    } ; if (first > second) {
                        return 1;
                    } ; return 0; };
                } //END if
                if (count(enumerator) == 0) {
                    return Linq.OrderedEnumerator.Empty;
                }
                function reverseComparer(first, second) {
                    return -1 * comparer(first, second);
                }
                return new Linq.OrderedEnumerator(enumerator, keySelector, reverseComparer);
            }
            Extensions.orderByDescending = orderByDescending;
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
            function random(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.random");
                let generatorFunction = function* () {
                    if (count(enumerator) == 0) {
                        throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty enumerator in function 'TS.Linq.Extensions.random'.");
                    }
                    let index;
                    let tempArray = toArray(enumerator);
                    while (true) {
                        do {
                            index = Math.floor(Math.random() * tempArray.length);
                        } while (index >= tempArray.length);
                        yield tempArray[index];
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.random = random;
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
            function range(start, count) {
                TS.Utils.checkIntNumberParameter("start", start, "TS.Linq.Extensions.range");
                TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.range");
                if ((start + count) > Number.MAX_SAFE_INTEGER) {
                    throw new TS.ArgumentOutOfRangeException("start + count", start + count, "The arguments 'start', 'count' exceed the Number.MAX_SAFE_INTEGER in function 'TS.Linq.Extensions.range'.");
                }
                let generatorFunction = function* () {
                    let index = 0;
                    while (index < count) {
                        index++;
                        yield start + index;
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.range = range;
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
            function repeat(element, count) {
                TS.Utils.checkNotUndefinedParameter("element", element, "TS.Linq.Extensions.repeat");
                TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.repeat");
                let generatorFunction = function* () {
                    let index = 0;
                    while (index < count) {
                        index++;
                        yield element;
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.repeat = repeat;
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
            function reverse(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.reverse");
                let generatorFunction = function* () {
                    let tempArray = toArray(enumerator);
                    tempArray = tempArray.reverse();
                    for (let item of tempArray) {
                        yield item;
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.reverse = reverse;
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
            function select(enumerator, selector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.select");
                TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.select");
                let generatorFunction = function* () {
                    for (let item of enumerator) {
                        let result = selector(item);
                        if (TS.Utils.Assert.isUndefined(result)) {
                            throw new TS.Linq.SelectorException(selector, result, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.select' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(item)) ? "null or undefined" : item.toString()) + "'.");
                        } //END if
                        yield result;
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.select = select;
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
            function selectMany(enumerator, selector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.selectMany");
                TS.Utils.checkFunctionParameter("selector", selector, "TS.Linq.Extensions.selectMany");
                let generatorFunction = function* () {
                    for (let outerItem of enumerator) {
                        let innerSequence = selector(outerItem);
                        if (TS.Utils.Assert.isNullOrUndefined(innerSequence)) {
                            throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'.");
                        }
                        if (!TS.Utils.Assert.isIterable(innerSequence)) {
                            throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'. The selector did not return an iterable collection.");
                        }
                        for (let innerItem of selector(outerItem)) {
                            if (TS.Utils.Assert.isUndefined(innerItem)) {
                                throw new TS.Linq.SelectorException(selector, outerItem, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + ((TS.Utils.Assert.isNullOrUndefined(outerItem)) ? "null or undefined" : outerItem.toString()) + "'. The selector returned a collection with undefined elements.");
                            }
                            yield innerItem;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.selectMany = selectMany;
            function sequenceEqual(firstEnumerator, secondEnumerator, equalityComparer) {
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.sequenceEqual");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.sequenceEqual");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.sequenceEqual");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                let firstItemArray = toArray(firstEnumerator);
                let secondItemArray = toArray(secondEnumerator);
                if (firstItemArray.length != secondItemArray.length) {
                    return false;
                }
                for (let index = 0; index < firstItemArray.length; index++) {
                    if (!equalityComparer(firstItemArray[index], secondItemArray[index])) {
                        return false;
                    }
                }
                return true;
            }
            Extensions.sequenceEqual = sequenceEqual;
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
            function shuffle(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.shuffle");
                let generatorFunction = function* () {
                    let sourceArray = toArray(enumerator);
                    let targetArray = new Array();
                    let index;
                    while (sourceArray.length > 0) {
                        do {
                            index = Math.floor(Math.random() * sourceArray.length);
                        } while (index >= sourceArray.length);
                        targetArray.push(...sourceArray.splice(index, 1));
                    } //END while
                    while (targetArray.length > 0) {
                        yield targetArray.pop();
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.shuffle = shuffle;
            function single(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.single");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.single");
                } //END if
                else {
                    predicate = (item) => true;
                } //END else
                let gotOne = false;
                let result;
                for (let item of enumerator) {
                    if (predicate(item)) {
                        if (!gotOne) {
                            gotOne = true;
                            result = item;
                        }
                        else {
                            throw new TS.Linq.MoreThanOneElementException(enumerator, "The 'enumerator' hase more than one result element in function 'TS.Linq.Extensions.single'.");
                        }
                    }
                }
                if (!gotOne) {
                    throw new TS.InvalidOperationException("The'enumerator' is either empty or has no matche using the given predicate in function 'TS.Linq.Extensions.single'.");
                } //END if
                return result;
            }
            Extensions.single = single;
            function singleOrDefault(enumerator, defaultConstructorOrValue, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.singleOrDefault");
                TS.Utils.checkParameter("defaultConstructorOrValue", defaultConstructorOrValue, "TS.Linq.Extensions.singleOrDefault");
                if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                    TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.singleOrDefault");
                } //END if
                else {
                    predicate = (item) => true;
                } //END else
                let gotOne = false;
                let result;
                for (let item of enumerator) {
                    if (predicate(item)) {
                        if (!gotOne) {
                            gotOne = true;
                            result = item;
                        }
                        else {
                            throw new TS.Linq.MoreThanOneElementException(enumerator, "The 'enumerator' hase more than one result element in function 'TS.Linq.Extensions.singleOrDefault'.");
                        }
                    }
                }
                if (!gotOne) {
                    if (TS.Utils.Assert.isConstructor(defaultConstructorOrValue)) {
                        return new defaultConstructorOrValue();
                    }
                    else {
                        return defaultConstructorOrValue;
                    }
                } //END if
                return result;
            }
            Extensions.singleOrDefault = singleOrDefault;
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
            function skip(enumerator, count) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.skip");
                TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.skip");
                let generatorFunction = function* () {
                    let index = -1;
                    for (let item of enumerator) {
                        index++;
                        if (index >= count) {
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.skip = skip;
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
            function skipWhile(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.skipWhile");
                TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.skipWhile");
                let generatorFunction = function* () {
                    for (let item of enumerator) {
                        if (!predicate(item)) {
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.skipWhile = skipWhile;
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
            function sum(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.sum");
                if (count(enumerator) == 0) {
                    throw new TS.Linq.EmptyEnumeratorException(enumerator, "The argument 'enumerator' must not be an empty in function 'TS.Linq.Extensions.sum'.");
                } //END if
                let result = 0;
                for (let item of enumerator) {
                    if (!TS.Utils.Assert.isNumber(item)) {
                        throw new TS.InvalidTypeException("enumerator", enumerator, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.sum'.");
                    }
                    result += item;
                    if (Math.abs(result) > Number.MAX_VALUE) {
                        throw new TS.OverflowException("The current value left the supported numerical range in function 'TS.Linq.Extensions.sum'.");
                    }
                }
                return result;
            }
            Extensions.sum = sum;
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
            function take(enumerator, count) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.take");
                TS.Utils.checkUIntNumberParameter("count", count, "TS.Linq.Extensions.take");
                let generatorFunction = function* () {
                    let resulCount = 0;
                    for (let item of enumerator) {
                        resulCount++;
                        if (resulCount <= count) {
                            yield item;
                        } //END if
                        else {
                            return undefined;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.take = take;
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
            function takeWhile(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.takeWhile");
                TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.takeWhile");
                let generatorFunction = function* () {
                    for (let item of enumerator) {
                        if (predicate(item)) {
                            yield item;
                        } //END if
                        else {
                            return undefined;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.takeWhile = takeWhile;
            function thenBy(enumerator, keySelector, comparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
                if (TS.Utils.Assert.isNullOrUndefined(enumerator.partitionIterator)) {
                    throw new TS.InvalidTypeException("enumerator", enumerator, "Argument enumerable must be of type 'IOrderedEnumerator' in function 'TS.Linq.Extensions.thenBy'.");
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(comparer)) {
                    //
                    // Use the  default comparsion operator.
                    //
                    comparer = (_first, _second) => { if (_first < _second) {
                        return -1;
                    } ; if (_first > _second) {
                        return 1;
                    } ; return 0; };
                } //END if
                else {
                    TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.orderBy");
                } //END else
                return new TS.Linq.OrderedEnumerator(enumerator, keySelector, comparer);
            }
            Extensions.thenBy = thenBy;
            function thenByDescending(enumerator, keySelector, comparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.thenByDescending");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.thenByDescending");
                if (TS.Utils.Assert.isNullOrUndefined(enumerator.partitionIterator)) {
                    throw new TS.InvalidTypeException("enumerator", enumerator, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenByDescending'.");
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(comparer)) {
                    //
                    // Use the  default comparsion operator.
                    //
                    comparer = (_first, _second) => { if (_first < _second) {
                        return -1;
                    } ; if (_first > _second) {
                        return 1;
                    } ; return 0; };
                } //END if
                else {
                    TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.Extensions.thenByDescending");
                } //END else
                function reverseComparer(first, second) {
                    return -1 * comparer(first, second);
                }
                return new TS.Linq.OrderedEnumerator(enumerator, keySelector, reverseComparer);
            }
            Extensions.thenByDescending = thenByDescending;
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
            function toArray(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toArray");
                return Array.from(enumerator);
            }
            Extensions.toArray = toArray;
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
            function toDictionary(enumerator, keySelector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toDictionary");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.toDictionary");
                let resultDictionary;
                resultDictionary = new TS.Collections.Dictionary();
                for (let item of enumerator) {
                    resultDictionary.add(keySelector(item), item);
                }
                return resultDictionary;
            }
            Extensions.toDictionary = toDictionary;
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
            function toList(enumerator) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toList");
                return new TS.Collections.List(true, enumerator);
            }
            Extensions.toList = toList;
            function union(firstEnumerator, secondEnumerator, equalityComparer) {
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.union");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.union");
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.union");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                let generatorFunction = function* () {
                    let tempArrayFirst = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(firstEnumerator, equalityComparer));
                    for (let item of tempArrayFirst) {
                        yield item;
                    }
                    let tempArraySecond = TS.Linq.Extensions.toArray(TS.Linq.Extensions.distinct(secondEnumerator, equalityComparer));
                    for (let item of tempArraySecond) {
                        if (!TS.Linq.Extensions.contains(tempArrayFirst, item, equalityComparer)) {
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.union = union;
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
            function where(enumerator, predicate) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.where");
                TS.Utils.checkFunctionParameter("predicate", predicate, "TS.Linq.Extensions.selectMany");
                let generatorFunction = function* () {
                    for (let item of enumerator) {
                        if (predicate(item)) {
                            yield item;
                        }
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.where = where;
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
            function zip(firstEnum, secondEnum, func) {
                TS.Utils.checkIterableParameter("firstEnum", firstEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkIterableParameter("secondEnum", secondEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkFunctionParameter("func", func, "TS.Linq.Extensions.zip");
                let generatorFunction = function* () {
                    let maxIndex;
                    let index = 0;
                    let firstArray = TS.Linq.Extensions.toArray(firstEnum);
                    let secondArray = TS.Linq.Extensions.toArray(secondEnum);
                    maxIndex = TS.Linq.Extensions.min([firstArray.length, secondArray.length]);
                    while (index < maxIndex) {
                        yield func(firstArray[index], secondArray[index]);
                        index++;
                    }
                };
                return new TS.Linq.Enumerator(generatorFunction);
            }
            Extensions.zip = zip;
        })(Extensions = Linq.Extensions || (Linq.Extensions = {})); //END namespace
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
        /**
        * @class TS.Linq.OrderedEnumerator<T, TKey>
        *
        * @description The 'TS.Linq.OrderedEnumerator' class is used by the Linq sort functions where every subsequent call to a sort function operate on
        *  the partitions of the enumerator elements without changing the order of previous sortings.
        *
        * @implements {BaseEnumerator<T}
        * @implements {TS.Linq.IOrderedEnumerator<T>}
        */
        class OrderedEnumerator extends Linq.BaseEnumerator {
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
            constructor(enumerator, keySelector, comparer) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkFunctionParameter("comparer", comparer, "TS.Linq.OrderedEnumerator constructor");
                super();
                if (enumerator.partitionIterator == undefined) {
                    this.orderedEnumerator = new BaseOrderedEnumerator(enumerator);
                }
                else {
                    this.orderedEnumerator = enumerator;
                }
                this.keySelector = keySelector;
                this.comparer = comparer;
            }
            /**
            * @description Property which returns an empty 'OrderedEnumerator'.
            *
            * @get {TS.Liny.OrderedEnumerator<any, any>} Empty
            */
            static get Empty() {
                return new OrderedEnumerator(Linq.Enumerator.Empty, (item) => item, (first, second) => 0);
            }
            /**
            * @implements {TS.Linq.BaseEnumerator<T>}
            *
            * @returns {Iterator<T>}, An instance of the iterator type.
            */
            [Symbol.iterator]() {
                let flatArray = this.flatPartitions(this.partitionIterator());
                return new ArrayIterator(flatArray);
            }
            /**
            * @implements {TS.Linq.IOrderedEnumerator<T>}
            *
            * @returns {Iterator<Iterator<T>}, An instance of the partitioned iterator type.
            */
            partitionIterator() {
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
            /**
            * @private
            *
            * @param { Iterator<Iterator<T>>} partitionIterator
            *
            * @returns Array<T>
            */
            flatPartitions(partitionIterator) {
                let resultArray;
                let outerIterator = partitionIterator;
                let sourceArray = new Array();
                let outerResult;
                let innerResult;
                resultArray = new Array();
                do {
                    outerResult = outerIterator.next();
                    if (!outerResult.done) {
                        do {
                            innerResult = outerResult.value.next();
                            if (!innerResult.done) {
                                resultArray.push(innerResult.value);
                            }
                        } while (!innerResult.done);
                    }
                } while (!outerResult.done);
                return resultArray;
            }
            thenBy(keySelector, comparer) {
                return TS.Linq.Extensions.thenBy(this, keySelector, comparer);
            }
            thenByDescending(keySelector, comparer) {
                return TS.Linq.Extensions.thenByDescending(this, keySelector, comparer);
            }
        }
        Linq.OrderedEnumerator = OrderedEnumerator; //END class  OrderedEnumerator
        /*************************************************************************/
        /* Inner class: BaseOrderedEnumerator<T>                                 */
        /*************************************************************************/
        /**
        * @class BaseOrderedEnumerator<T>
        *
        * @implements {TS.Linq.IOrderedEnumerator<T>}
        *
        * @internal
        */
        class BaseOrderedEnumerator {
            /**
            * @constructor
            *
            * @param {Iterable<T>} enumerator
            */
            constructor(enumerator) {
                this.enumerator = enumerator;
                this.done = false;
            }
            /**
            * @imploements {TS.Linq.IOrderedEnumerator<T>}
            *
            * @returns {Iterator<Iterator<T>>}
            */
            partitionIterator() {
                return new ArrayIterator([this.enumerator[Symbol.iterator]()]);
            }
        }
         //END class
        /*************************************************************************/
        /* Inner class: PartitionIterator<T, TKey>                               */
        /*************************************************************************/
        /**
        * @class PartitionIterator<T, TKey>
        *
        * @description The 'PartitionIterator<T>' class is returned by the 'OrderedEnumerator' class and all derived
        *  classes in order to iterate over the class elements. During iteration the 'next' function of this class is
        *  called. If the iteration passed the end of the result set, every subsequent call to next will return a
        *  'IteratorResult<T>' object which has the 'done' flag set.
        *
        * @implements {Iterator<Iterator<T>>}
        *
        * @internal
        */
        class PartitionIterator {
            /**
            * @constructor
            *
            * @param source, the source object or collection used in this iterator.
            * @param selector, a selector function which determines the result set.
            */
            constructor(orderedEnumerator, keySelector, comparer) {
                this.initalized = false;
                this.orderedEnumerator = orderedEnumerator;
                this.keySelector = keySelector;
                this.comparer = comparer;
                this.initalized = false;
            }
            /**
            * @private
            */
            init() {
                this.resultArray = this.createPartions(this.orderedEnumerator, this.keySelector, this.comparer);
                this.initalized = true;
            }
            /**
            * @private
            *
            * @param {TS.Linq.IOrderedEnumerator<T>} orderedEnumerator
            * @param {(item: T) => TKey} keySelector
            * @param {(first: TKey, second: TKey) => number} comparer
            *
            * @returns {Array<Array<T>>}
            */
            createPartions(orderedEnumerator, keySelector, comparer) {
                let partitionedArray;
                let orderedIterator;
                let orderedIteratorResult;
                partitionedArray = new Array();
                orderedIterator = orderedEnumerator.partitionIterator();
                do {
                    orderedIteratorResult = orderedIterator.next();
                    if (!orderedIteratorResult.done) {
                        partitionedArray = partitionedArray.concat(sort(orderedIteratorResult.value));
                    }
                } while (!orderedIteratorResult.done);
                return partitionedArray;
                function sort(iterator) {
                    let iteratorResult;
                    let sourceArray;
                    let partition;
                    let resultArray;
                    let lastElement = null;
                    sourceArray = new Array();
                    do {
                        iteratorResult = iterator.next();
                        if (!iteratorResult.done) {
                            sourceArray.push(iteratorResult.value);
                        }
                    } while (!iteratorResult.done);
                    sourceArray = sourceArray.sort((first, second) => { return comparer(keySelector(first), keySelector(second)); });
                    partition = new Array();
                    resultArray = new Array();
                    while (sourceArray.length > 0) {
                        //new partition
                        if ((lastElement != null) && (keySelector(lastElement) != keySelector(sourceArray[0]))) {
                            resultArray.push(partition);
                            partition = new Array();
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
            *
            * @returns {IteratorResult<Iterator<T>>}
            */
            next() {
                if (!this.initalized) {
                    this.init();
                }
                while (this.resultArray.length > 0) {
                    return { done: false, value: new ArrayIterator(this.resultArray.shift()) };
                }
                return { done: true, value: null };
            }
        }
         //END class
        ///*************************************************************************/
        ///* Inner class: ArrayIterator<T>                                         */
        ///*************************************************************************/
        /**
        * @class ArrayIterator<T>
        *
        * @implements {Iterator<T>}
        *
        * @internal
        */
        class ArrayIterator {
            /**
            * @constructor
            *
            * @param { Array<T>} source, The source object or collection used in this iterator.
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(source) {
                this.initalized = false;
                this.index = -1;
                TS.Utils.checkArrayParameter("source", source, "TS.Linq.OrderedEnumerator.TArrayIterator.constructor");
                this.innerArray = TS.Utils.compactArray(source);
            }
            /**
            * @implements {Iterator<T>}
            *
            * @returns {IteratorResult<T>}
            */
            next() {
                if (this.innerArray.length > 0) {
                    return { done: false, value: this.innerArray.shift() };
                }
                return { done: true, value: null };
            }
        }
         //END class
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Linq;
    (function (Linq) {
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
        class Grouping extends TS.Linq.Enumerator {
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
            constructor(key, enumerator, keySelector, equalityComparer, elementSelector) {
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.Grouping constructor");
                if (!TS.Utils.Assert.isNullOrUndefined(elementSelector)) {
                    TS.Utils.checkFunctionParameter("elementSelector", elementSelector, "TS.Linq.Extensions.Grouping constructor");
                }
                else {
                    //Default element selector
                    elementSelector = (item) => item;
                }
                let generatorFunction = function* () {
                    let result = TS.Linq.Extensions.select(TS.Linq.Extensions.where(enumerator, item => equalityComparer(keySelector(item), key)), item => elementSelector(item));
                    for (let item of result) {
                        yield item;
                    }
                };
                super(generatorFunction);
                this.innerKey = key;
            }
            /**
            * @implements {TS.Linq.IGrouping<TKey, T>}
            *
            * @get {TKey} key
            */
            get key() {
                return this.innerKey;
            }
        }
        Linq.Grouping = Grouping; //END class
    })(Linq = TS.Linq || (TS.Linq = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Collections;
    (function (Collections) {
        //********************************************************************************
        // Duplicate key exception
        //********************************************************************************
        /**
        * @class TS.Collections.DuplicateKeyException
        *
        * @description This exception signals a duplicate key in a collection.
        *
        * @extends {TS.Exception}
        */
        class DuplicateKeyException extends TS.Exception {
            /**
            * @constructor
            *
            * @param {string} message.
            * @param {TS.Exception} innerException?, optional inner exception.
            */
            constructor(message = "An item with the same key has already been added.", innerException) {
                super(message, innerException);
            }
            /**
            * @override {TS.Exception}
            *
            * @get {string} type
            */
            get type() {
                return "TS.Collections.DuplicateKeyException";
            }
        }
        Collections.DuplicateKeyException = DuplicateKeyException; //END class
        //********************************************************************************
        // Invalid key exception
        //********************************************************************************
        /**
        * @class TS.Collections.InvalidKeyException
        *
        * @description This exception signals a general problem with a key of a collection.
        *
        * @extends {TS.Exception}
        */
        class InvalidKeyException extends TS.Exception {
            /**
            * @constructor
            *
            * @param {any} keyValue
            * @param {string} message?, optional message.
            * @param {TS.Exception} innerException?, optional inner exception.
            */
            constructor(keyValue, message, innerException) {
                super(message, innerException);
                this.internalKeyValue = keyValue;
            }
            /**
            * @override {TS.Exception}
            *
            * @get {string} type
            */
            get type() {
                return "TS.Collections.InvalidKeyException";
            }
            /**
            * @get {any} keyValue
            */
            get keyValue() {
                return this.internalKeyValue;
            }
        }
        Collections.InvalidKeyException = InvalidKeyException; //END class
    })(Collections = TS.Collections || (TS.Collections = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Collections;
    (function (Collections) {
        /**
        * @class TS.Collections.KeyValuePair<TKey, TValue>
        *
        * @description This is the implementation of the key value pair used by the dictionary class.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/5tbh8a42(v=vs.110).aspx | MSDN}
        */
        class KeyValuePair {
            /**
            * @constructor
            *
            * @param {TKey} key.
            * @param {TValue} value
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            */
            constructor(key, value) {
                TS.Utils.checkParameter("key", key, "constructor of TS.Collections.KeyValuePair");
                this.internalKey = key;
                this.internalValue = value;
            }
            /**
            * @get {TKey} key
            */
            get key() {
                return this.internalKey;
            }
            /**
            * @get {TValue} value
            */
            get value() {
                return this.internalValue;
            }
        }
        Collections.KeyValuePair = KeyValuePair; //END class
    })(Collections = TS.Collections || (TS.Collections = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Collections;
    (function (Collections) {
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
        class List extends TS.Linq.BaseEnumerator {
            constructor(allowNull, sourceOrGenerator, predicate) {
                super();
                this.length = 0;
                this.internalAllowNull = allowNull;
                TS.Utils.checkBooleanParameter("allowNull", allowNull, "TS.Collections.List.constructor");
                if (!TS.Utils.Assert.isNullOrUndefined(sourceOrGenerator)) {
                    //
                    //It's a generator
                    //
                    if (TS.Utils.Assert.isFunction(sourceOrGenerator)) {
                        if (TS.Utils.Assert.isGenerator(sourceOrGenerator)) {
                            for (let item of sourceOrGenerator) {
                                if ((item == null) && (!this.internalAllowNull)) {
                                    throw new TS.InvalidTypeException("source or generator", sourceOrGenerator, "Argument 'source or generator' is not allowed to hold null values if flag 'allowNull' is set to false in the constructor of 'TS.Collections.List'.");
                                }
                                this.push(item);
                            }
                        }
                        else {
                            throw new TS.InvalidInvocationException("The constructor of ' TS.Collections.List' requires a valid generator function.");
                        }
                    }
                    else if (TS.Utils.Assert.isIterable(sourceOrGenerator) || TS.Utils.Assert.isArrayLike(sourceOrGenerator)) {
                        if (!TS.Utils.Assert.isNullOrUndefined(predicate)) {
                            if (!TS.Utils.Assert.isFunction(predicate)) {
                                throw new TS.InvalidInvocationException("The constructor of 'TS.Collections.List' requires a valid selctor argument.");
                            }
                        }
                        else {
                            predicate = (item) => true;
                        }
                        for (let item of sourceOrGenerator) {
                            if (predicate(item)) {
                                if ((item == null) && (!this.internalAllowNull)) {
                                    throw new TS.InvalidTypeException("source or generator", sourceOrGenerator, "Argument 'source or generator' is not allowed to hold null values if flag 'allowNull' is set to false in the constructor of 'TS.Collections.List'.");
                                }
                                this.push(item);
                            }
                        }
                    }
                }
            }
            //***********************************************************************
            // Implements   TS.Linq.BaseEnumerator<T>
            //***********************************************************************
            /**
            * @implements  {TS.Linq.BaseEnumerator<T>}
            *
            * @returns {Iterator<TSource>}
            */
            [Symbol.iterator]() {
                return new Generator(this);
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
            add(...rest) {
                for (let item of rest) {
                    if (this.allowNull) {
                        TS.Utils.checkNotUndefinedParameter("...rest", rest, "TS.Collections.List.add");
                    } //END if
                    else {
                        if (item === null) {
                            throw new TS.InvalidTypeException("...rest", rest, "TS.Collections.List.add");
                        }
                    } //END else
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
            get allowNull() {
                return this.internalAllowNull;
            }
            /**
            * @description Removes all items from the IList<T>.
            *
            * @implements {TS.Collections.IList<T>}
            *
            * @returns {this}
            */
            clear() {
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
            copyTo(targetArray, destIndex) {
                let index;
                TS.Utils.checkParameter("targetArray", targetArray, "TS.Collections.List.copyTo");
                TS.Utils.checkArrayParameter("targetArray", targetArray, "TS.Collections.List.copyTo");
                if (TS.Utils.Assert.isNullOrUndefined(destIndex)) {
                    destIndex = 0;
                }
                if (!TS.Utils.Assert.isUnsignedIntegerNumber(destIndex)) {
                    throw new TS.ArgumentOutOfRangeException("destIndex", destIndex, "The argument 'destIndex' must be a valid positive integer in function 'TS.Collections.List.copyTo'.");
                }
                if (destIndex > targetArray.length) {
                    throw new TS.ArgumentOutOfRangeException("destIndex", destIndex, "The argument 'destIndex' must be a valid positive integer in the range of [0..targetArray.length] in  function 'TS.Collections.List.copyTo'.");
                }
                for (index = 0; index < this.length; index++) {
                    targetArray[destIndex] = this[index];
                    destIndex++;
                }
                return this;
            }
            indexOf(item, startIndex, equalityComparer) {
                if (this.allowNull) {
                    TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.indexOf");
                } //END if
                else {
                    TS.Utils.checkParameter("item", item, "TS.Collections.List.indexOf");
                } //END else
                if (!TS.Utils.Assert.isNullOrUndefined(startIndex)) {
                    TS.Utils.checkUIntNumberParameter("index", startIndex, "TS.Collections.List.indexOf");
                }
                else {
                    startIndex = 0;
                }
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.last");
                } //END if
                else {
                    equalityComparer = (first, second) => first === second;
                } //END else
                for (let index = startIndex; index < this.length; index++) {
                    if (equalityComparer(this[index], item)) {
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
            insert(index, item) {
                let internalArray;
                if (this.allowNull) {
                    TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.insert");
                } //END if
                else {
                    TS.Utils.checkParameter("item", item, "TS.Collections.List.insert");
                } //END else
                TS.Utils.checkUIntNumberParameter("index", index, "TS.Collections.List.insert");
                if (index > this.length) {
                    throw new TS.ArgumentOutOfRangeException("index", index, "Index must be within the bounds of the List in function 'TS.Collections.List.insert'.");
                } //END if
                internalArray = new Array();
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
            remove(item) {
                let internalArray;
                TS.Utils.checkNotUndefinedParameter("item", item, "TS.Collections.List.remove");
                internalArray = new Array();
                this.copyTo(internalArray, 0);
                internalArray.some((value, index, array) => {
                    if (value == item) {
                        internalArray[index] = undefined;
                        return true;
                    }
                });
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
            removeAt(index) {
                let internalArray;
                if ((index < 0) || (index > this.length - 1)) {
                    return this;
                } //END if
                internalArray = new Array();
                this.copyTo(internalArray, 0);
                internalArray.splice(index, 1);
                this.clear();
                this.add(...internalArray);
                return this;
            }
            /**
            * @private
            */
            push(item) {
                this[this.length] = item;
                this.length++;
            }
            /**
            * @private
            */
            pop() {
                if (this.length == 0) {
                    return undefined;
                }
                let returnValue;
                returnValue = this[this.length];
                this.length--;
                return returnValue;
            }
        }
        Collections.List = List; //END class
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
        class Generator {
            /**
            * @constructor
            *
            * @param {genFunc: () => IterableIterator<TSource>} genFunc
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(collection) {
                this.innerIterator = null;
                this.initalized = false;
                this.genFunc = function* () {
                    for (let index = 0; index < this.innerCollection.length; index++) {
                        yield this.innerCollection[index];
                    }
                };
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
            next() {
                if (!this.initalized) {
                    this.innerIterator = this.genFunc();
                    this.initalized = true;
                }
                return this.innerIterator.next();
            }
        }
         //END class
    })(Collections = TS.Collections || (TS.Collections = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Collections;
    (function (Collections) {
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
        class Dictionary extends TS.Linq.BaseEnumerator {
            //***********************************************************************
            // End of: TS.Collections.IDictionary<TKey, TValue> implementation.
            //***********************************************************************
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
            constructor(source, keyEqualityComparer) {
                super();
                /**
                * @private
                */
                this.genFunc = null;
                if (!TS.Utils.Assert.isNullOrUndefined(keyEqualityComparer)) {
                    TS.Utils.checkFunctionParameter("keyEqualityComparer", keyEqualityComparer, "constructor of TS.Collections.Dictionary");
                    this.keyEqualityComparer = keyEqualityComparer;
                } //END if
                else {
                    this.keyEqualityComparer = (first, second) => first === second;
                } //END else
                this.dictionaryMap = new Map();
                this.genFunc = function* () {
                    for (let [key, value] of this.dictionaryMap) {
                        yield new Collections.KeyValuePair(key, value);
                    }
                };
                if (!TS.Utils.Assert.isNullOrUndefined(source)) {
                    TS.Utils.checkIterableParameter("source", source, "TS.Collections.Dictionary.constructor");
                    for (let KV of source) {
                        if ((TS.Utils.Assert.isNullOrUndefined(KV.key) || TS.Utils.Assert.isUndefined(KV.value))) {
                            throw new TS.InvalidTypeException("source", source, "The value of argument source must be an iterable of type 'TS.Collections.KeyValuePair<TKey, TValue>' in the constructor of 'TS.Collections.Dictionary'.");
                        }
                        this.add(KV.key, KV.value);
                    }
                }
            }
            //***********************************************************************
            // Implements: TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>
            //***********************************************************************
            /**
            * @implements {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
            *
            * @returns {Iterator<KeyValuePair<TKey, TValue>>}
            */
            [Symbol.iterator]() {
                return this.genFunc();
            }
            add() {
                let pair;
                if (arguments.length == 2) {
                    if (TS.Utils.Assert.isNullOrUndefined(arguments[0])) {
                        throw new TS.ArgumentNullOrUndefinedException("key", "The argument key must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
                    } //END if
                    if (TS.Utils.Assert.isUndefined(arguments[1])) {
                        throw new TS.ArgumentUndefinedException("value", "The argument value must not be undefined in function 'TS.Collections.Dictionary.add'.");
                    } //END if
                    pair = new Collections.KeyValuePair(arguments[0], arguments[1]);
                } //END if
                if (arguments.length == 1) {
                    if (TS.Utils.Assert.isUndefined(arguments[0]) || TS.Utils.Assert.isUndefined(arguments[0].key) || TS.Utils.Assert.isUndefined(arguments[0].value)) {
                        throw new TS.InvalidTypeException("item", arguments[0], "The value of parameter 'item' must be of type 'TS.Collections.KeyValuePair' in function 'TS.Collections.Dictionary.add'.");
                    } //END if
                    if (TS.Utils.Assert.isNull(arguments[0].key)) {
                        throw new TS.ArgumentNullException("item.key", "The argument item.key must not be null in function 'TS.Collections.Dictionary.add'.");
                    } //END if
                    pair = arguments[0];
                } //END if
                if (arguments.length == 0) {
                    throw new TS.ArgumentNullOrUndefinedException("(key, value) or item", "The arguments must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
                } //END if
                if (this.containsKey(pair.key)) {
                    throw new TS.Collections.DuplicateKeyException();
                } //END if
                this.dictionaryMap.set(pair.key, pair.value);
                return this;
            }
            /**
            * @description Removes all items from the dictionary.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/b5txwy7s(v=vs.110).aspx | MSDN }
            *
            * @returns {this}
            */
            clear() {
                this.dictionaryMap.clear();
                return this;
            }
            contains(item, equalityComparer) {
                if (TS.Utils.Assert.isNullOrUndefined(item)) {
                    return false;
                }
                if ((TS.Utils.Assert.isNullOrUndefined(item.key) || TS.Utils.Assert.isUndefined(item.value))) {
                    throw new TS.InvalidTypeException("item", item, "The value of argument 'item' must be of type 'TS.Collections.KeyValuePair<TKey, TValue>' in function 'TS.Collections.Dictionary.contains'.");
                }
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.contains");
                }
                else {
                    equalityComparer = (first, second) => first === second;
                }
                if (!this.any(currItem => this.keyEqualityComparer(currItem.key, item.key))) {
                    return false;
                }
                return equalityComparer(this.single(currItem => this.keyEqualityComparer(currItem.key, item.key)).value, item.value);
            }
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
            containsKey(key) {
                if (TS.Utils.Assert.isNullOrUndefined(key)) {
                    return false;
                } //END if
                //this.dictionaryMap.has(key);
                return this.any(item => this.keyEqualityComparer(key, item.key));
            }
            containsValue(value, equalityComparer) {
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.containsValue");
                }
                else {
                    equalityComparer = (first, second) => first === second;
                }
                if (TS.Utils.Assert.isUndefined(value)) {
                    return false;
                } //END if
                return this.any(item => equalityComparer(item.value, value));
            }
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
            copyTo(targetArray, destIndex = 0) {
                if (this.count() == 0) {
                    return this;
                }
                TS.Utils.checkParameter("targetArray", targetArray, "TS.Collections.Dictionary.copyTo");
                if (!TS.Utils.Assert.isArray(targetArray)) {
                    throw new TS.InvalidTypeException("targetArray", targetArray, "Argument 'targetArray' must be a valid array in function 'TS.Collections.Dictionary.copyTo'.");
                } //END if
                TS.Utils.checkUIntNumberParameter("destIndex", destIndex, "TS.Collections.Dictionary.copyTo");
                this.forEach((item) => { targetArray[destIndex] = item; destIndex++; });
                return this;
            }
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
            count() {
                return this.dictionaryMap.size;
            }
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
            getItem(key) {
                if (this.containsKey(key)) {
                    return this.where(item => this.keyEqualityComparer(key, item.key)).single();
                } //END if
                return undefined;
            }
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
            getValue(key) {
                if (this.containsKey(key)) {
                    return this.getItem(key).value;
                } //END if
                return undefined;
            }
            /**
            * @description Gets a TS.Linq.Enumerator<TKey> containing the keys of the IDictionary<TKey, TValue>.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/yt2fy5zk(v=vs.110).aspx | MSDN }
            *
            * @get {TS.Linq.Enumerator<TKey>} keys
            */
            get keys() {
                return new TS.Linq.Enumerator(this.dictionaryMap.keys());
            }
            remove(ItemOrKey, equalityComparer) {
                let key = null;
                let item = null;
                if (this.count() == 0) {
                    return this;
                }
                if (TS.Utils.Assert.isNullOrUndefined(ItemOrKey)) {
                    throw new TS.ArgumentNullOrUndefinedException("item or key", "Argument 'item or key' must not be null or undefined in function 'TS.Collections.Dictionary.remove'.");
                } //END if
                if (TS.Utils.Assert.isUndefined(ItemOrKey.key)) {
                    TS.Utils.checkParameter("key", ItemOrKey, "TS.Collections.Dictionary.remove");
                    key = ItemOrKey;
                } //END if
                else {
                    if (TS.Utils.Assert.isUndefined(ItemOrKey.value)) {
                        throw new TS.InvalidTypeException("item", item, "Argument 'item' must be of type 'TS.Collections.KeyValuePair<TKey, TValue>' in function 'TS.Collections.Dictionary.remove'.");
                    }
                    TS.Utils.checkParameter("item", ItemOrKey, "TS.Collections.Dictionary.remove");
                    item = ItemOrKey;
                } //END else
                if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer)) {
                    TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.remove");
                }
                else {
                    equalityComparer = (first, second) => first == second;
                }
                if (key != null) {
                    this.dictionaryMap.delete(key);
                }
                if (item != null) {
                    if (this.containsKey(item.key)) {
                        if (equalityComparer(this.getItem(item.key).value, item.value)) {
                            this.dictionaryMap.delete(item.key);
                        }
                    }
                }
                return this;
            }
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
            setItem(key, newValue) {
                TS.Utils.checkParameter("key", key, "TS.Collections.Dictionary.setItem");
                if (this.containsKey(key)) {
                    this.dictionaryMap.set(key, newValue);
                    return this;
                }
                else {
                    throw new TS.Collections.InvalidKeyException(key, "Execution failed because an item with the given key is not available in the current dictionary in function 'TS.Collections.Dictionary.setItem'.");
                }
            }
            /**
            * @description Converts the ICollection<T> into an array of type  Array<TS.Collections.KeyValuePair<TKey, TValue>>.
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @override {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
            *
            * @returns {Array<TS.Collections.KeyValuePair<TKey, TValue>>}
            */
            toArray() {
                let resultArray = new Array();
                this.forEach(item => resultArray.push(item));
                return resultArray;
            }
            /**
            * @description Gets a TS.Linq.Enumerator<TValue> containing the values in the IDictionary<TKey, TValue>.
            *
            * @see {@link https://msdn.microsoft.com/en-us/library/ekcfxy3x(v=vs.110).aspx | MSDN }
            *
            * @implements {TS.Collections.IDictionary<TKey, TValue>}
            *
            * @get {TS.Linq.Enumerator<TValue>} values
            */
            get values() {
                return new TS.Linq.Enumerator(this.dictionaryMap.values());
            }
        }
        Collections.Dictionary = Dictionary; //END class
    })(Collections = TS.Collections || (TS.Collections = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../TypeScript-Base/TS-Base.d.ts" />
/// <reference path="./Linq/Exception.ts" />
/// <reference path="./Linq/BaseEnumerator.ts" />
/// <reference path="./Linq/Enumerator.ts" />
/// <reference path="./Linq/Extensions.ts" />
/// <reference path="./Linq/IOrderedEnumerator.ts" />
/// <reference path="./Linq/OrderedEnumerator.ts" />
/// <reference path="./Linq/Grouping.ts" />
/// <reference path="./Collections/Exception.ts" />
/// <reference path="./Collections/KeyValuePair.ts" />
/// <reference path="./Collections/IDictionary.ts" />
/// <reference path="./Collections/ICollection.ts" />
/// <reference path="./Collections/IList.ts" />
/// <reference path="./Collections/List.ts" />
/// <reference path="./Collections/Dictionary.ts" />
