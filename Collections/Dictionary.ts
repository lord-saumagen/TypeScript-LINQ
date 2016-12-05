/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Collections
  {

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
    export class Dictionary<TKey, TValue> extends TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>> implements TS.Collections.IDictionary<TKey, TValue>
    {
      /**
      * @private
      */
      private dictionaryMap: Map<TKey, TValue>;
      /**
      * @private
      */
      private keyEqualityComparer: (first: TKey, second: TKey) => boolean;
      /**
      * @private
      */
      private genFunc: (() => IterableIterator<KeyValuePair<TKey, TValue>>) | null = null;


      //***********************************************************************
      // Implements: TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>
      //***********************************************************************

      /**
      * @implements {TS.Linq.BaseEnumerator<KeyValuePair<TKey, TValue>>}
      *
      * @returns {Iterator<KeyValuePair<TKey, TValue>>}
      */
      public [Symbol.iterator](): Iterator<KeyValuePair<TKey, TValue>>
      {
        return (this.genFunc as () => IterableIterator<KeyValuePair<TKey, TValue>>)();
      }



      //***********************************************************************
      // Implements: TS.Collections.IDictionary<TKey, TValue>
      //***********************************************************************

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
      public add(item: KeyValuePair<TKey, TValue>): this;
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
      public add(key: TKey, value: TValue): this;
      public add(): this
      {
        let pair: KeyValuePair<TKey, TValue> | null = null;

        if (arguments.length == 2)
        {
          if (TS.Utils.Assert.isNullOrUndefined(arguments[0]))
          {
            throw new TS.ArgumentNullOrUndefinedException("key", "The argument key must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
          }//END if

          if (TS.Utils.Assert.isUndefined(arguments[1]))
          {
            throw new TS.ArgumentUndefinedException("value", "The argument value must not be undefined in function 'TS.Collections.Dictionary.add'.");
          }//END if

          pair = new KeyValuePair(arguments[0], arguments[1]);
        }//END if

        if (arguments.length == 1)
        {
          if (TS.Utils.Assert.isUndefined(arguments[0]) || TS.Utils.Assert.isUndefined(arguments[0].key) || TS.Utils.Assert.isUndefined(arguments[0].value))
          {
            throw new TS.InvalidTypeException("item", arguments[0], "The value of parameter 'item' must be of type 'TS.Collections.KeyValuePair' in function 'TS.Collections.Dictionary.add'.");
          }//END if

          if (TS.Utils.Assert.isNull(arguments[0].key))
          {
            throw new TS.ArgumentNullException("item.key", "The argument item.key must not be null in function 'TS.Collections.Dictionary.add'.");
          }//END if

          pair = arguments[0];
        }//END if

        if (arguments.length == 0)
        {
          throw new TS.ArgumentNullOrUndefinedException("(key, value) or item", "The arguments must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
        }//END if

        if (this.containsKey((pair as KeyValuePair<TKey, TValue>).key))
        {
          throw new TS.Collections.DuplicateKeyException();
        }//END if

        this.dictionaryMap.set((pair as KeyValuePair<TKey, TValue>).key, (pair as KeyValuePair<TKey, TValue>).value);

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
      public clear(): this
      {
        this.dictionaryMap.clear();
        return this;
      }


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
      contains(item: TS.Collections.KeyValuePair<TKey, TValue>): boolean
      /**
      * @description Determines whether the collection contains a specific KeyValuePair. Using the specified
      *  equalityComparer to compare the values. There is no equivalent function in the C# dictionary implementation
      *  which allows to override the default equality comparer for value comparison.
      *
      * @implements {TS.Collections.IDictionary<TKey, TValue>}
      *
      * @param {TS.Collections.KeyValuePair<TKey, TValue>} item
      * @param {(first: TValue, second: TValue) => boolean} equalityComparer
      *
      * @returns {boolean}
      */
      contains(item: TS.Collections.KeyValuePair<TKey, TValue>, equalityComparer: (first: TValue, second: TValue) => boolean): boolean
      contains(item: TS.Collections.KeyValuePair<TKey, TValue>, equalityComparer?: (first: TValue, second: TValue) => boolean): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(item))
        {
          return false;
        }

        if ((TS.Utils.Assert.isNullOrUndefined(item.key) || TS.Utils.Assert.isUndefined(item.value)))
        {
          throw new TS.InvalidTypeException("item", item, "The value of argument 'item' must be of type 'TS.Collections.KeyValuePair<TKey, TValue>' in function 'TS.Collections.Dictionary.contains'.");
        }

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.contains");
        }
        else
        {
          equalityComparer = (first, second) => first === second;
        }

        if (!this.any(currItem => this.keyEqualityComparer(currItem.key, item.key)))
        {
          return false;
        }

        return (equalityComparer as (first: TValue, second: TValue) => boolean)(this.single(currItem => this.keyEqualityComparer(currItem.key, item.key)).value, item.value);
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
      public containsKey(key: TKey): boolean
      {
        if (TS.Utils.Assert.isNullOrUndefined(key))
        {
          return false;
        }//END if

        //this.dictionaryMap.has(key);
        return this.any(item => this.keyEqualityComparer(key, item.key));
      }


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
      public containsValue(value: TValue): boolean
      /**
      * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified value.
      *  Using the specified equalityComparer to compare the values. There is no equivalent function in the C#
      *  dictionary implementation which allows to override the default equality comparer for value comparison.
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
      public containsValue(value: TValue, equalityComparer: (first: TValue, second: TValue) => boolean): boolean
      public containsValue(value: TValue, equalityComparer?: (first: TValue, second: TValue) => boolean): boolean
      {

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.containsValue");
        }
        else
        {
          equalityComparer = (first, second) => first === second;
        }

        if (TS.Utils.Assert.isUndefined(value))
        {
          return false;
        }//END if

        return this.any(item => (equalityComparer as (first: TValue, second: TValue) => boolean)(item.value, value));
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
      public copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, destIndex: number = 0): this
      {

        if (this.count() == 0)
        {
          return this;
        }

        TS.Utils.checkParameter("targetArray", targetArray, "TS.Collections.Dictionary.copyTo");
        if (!TS.Utils.Assert.isArray(targetArray))
        {
          throw new TS.InvalidTypeException("targetArray", targetArray, "Argument 'targetArray' must be a valid array in function 'TS.Collections.Dictionary.copyTo'.");
        }//END if

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
      count(): number
      {
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
      public getItem(key: TKey): TS.Collections.KeyValuePair<TKey, TValue> | undefined
      {
        if (this.containsKey(key))
        {
          return this.where(item => this.keyEqualityComparer(key, item.key)).single();
        }//END if

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
      public getValue(key: TKey): TValue | undefined
      {
        if (this.containsKey(key))
        {
          return (this.getItem(key) as TS.Collections.KeyValuePair<TKey, TValue>).value;
        }//END if

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
      public get keys(): TS.Linq.Enumerator<TKey>
      {
        return new TS.Linq.Enumerator<TKey>(this.dictionaryMap.keys());
      }


      /**
      * @description Removes a key and value from the dictionary.
      *  This method uses the equality comparer which was set in the constructor or the dictionary to determine
      *  equality for the key. This method uses either the default equality comparer to determine equality for the
      *  value or the one you can specify in the optional 'equalityComparer' argument. This function differs from the
      *  C# implementation in multiple ways.
      *
      *  1) This method returns a this reference and not a boolean value.
      *
      *  2) You can specify an equality comparer for value comparison to override the default behavior.
      *
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
      public remove(item: TS.Collections.KeyValuePair<TKey, TValue>, equalityComparer?: (first: TValue, second: TValue) => boolean): this
      /**
      * @description Removes the element with the specified key from the IDictionary<TKey, TValue>.
      *  This function differs from the C# implementation in multiple ways.
      *
      *  1) This method returns a this reference and not a boolean value.
      *
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
      public remove(key: TKey): this
      public remove(ItemOrKey: TS.Collections.KeyValuePair<TKey, TValue> | TKey, equalityComparer?: (first: TValue, second : TValue) => boolean): this
      {
        let key: TKey | null = null;
        let item: TS.Collections.KeyValuePair<TKey, TValue> | null = null;

        if (this.count() == 0)
        {
          return this;
        }

        if (TS.Utils.Assert.isNullOrUndefined(ItemOrKey))
        {
          throw new TS.ArgumentNullOrUndefinedException("item or key", "Argument 'item or key' must not be null or undefined in function 'TS.Collections.Dictionary.remove'.");
        }//END if

        if (TS.Utils.Assert.isUndefined( (ItemOrKey as any).key))
        {
          TS.Utils.checkParameter("key", ItemOrKey, "TS.Collections.Dictionary.remove");
          key = (ItemOrKey as TKey);
        }//END if
        else
        {
          if(TS.Utils.Assert.isUndefined((ItemOrKey as any).value))
          {
            throw new TS.InvalidTypeException("item", item, "Argument 'item' must be of type 'TS.Collections.KeyValuePair<TKey, TValue>' in function 'TS.Collections.Dictionary.remove'.");
          }

          TS.Utils.checkParameter("item", ItemOrKey, "TS.Collections.Dictionary.remove");
          item = (ItemOrKey as TS.Collections.KeyValuePair<TKey, TValue>);
        }//END else

        if (!TS.Utils.Assert.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter("equalityComparer", equalityComparer, "TS.Collections.Dictionary.remove" );
        }
        else
        {
          equalityComparer = (first, second) => first == second;
        }

        if (key != null)
        {
          this.dictionaryMap.delete(key);
        }

        if (item != null)
        {
          if (this.containsKey(item.key))
          {
            if ((equalityComparer as (first: TValue, second: TValue) => boolean)((this.getItem(item.key) as TS.Collections.KeyValuePair<TKey, TValue>).value, item.value))
            {
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
      public setItem(key: TKey, newValue: TValue): this
      {
        TS.Utils.checkParameter("key", key, "TS.Collections.Dictionary.setItem");

        if (this.containsKey(key))
        {
          this.dictionaryMap.set(key, newValue);
          return this;
        }
        else
        {
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
      toArray(): Array<TS.Collections.KeyValuePair<TKey, TValue>>
      {
        let resultArray = new Array<TS.Collections.KeyValuePair<TKey, TValue>>();
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
      public get values(): TS.Linq.Enumerator<TValue>
      {
        return new TS.Linq.Enumerator<TValue>(this.dictionaryMap.values());
      }

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
      constructor(source?: Iterable<TS.Collections.KeyValuePair<TKey, TValue>>, keyEqualityComparer?: (first: TKey, second: TKey) => boolean)
      {
        super();

        if (!TS.Utils.Assert.isNullOrUndefined(keyEqualityComparer))
        {
          TS.Utils.checkFunctionParameter("keyEqualityComparer", keyEqualityComparer, "constructor of TS.Collections.Dictionary");
          this.keyEqualityComparer = keyEqualityComparer as (first: TKey, second: TKey) => boolean;
        }//END if
        else
        {
          this.keyEqualityComparer = (first, second) => first === second;
        }//END else

        this.dictionaryMap = new Map<TKey, TValue>();
        this.genFunc = function* ()
        {
          for (let [key, value] of this.dictionaryMap)
          {
            yield new KeyValuePair(key, value);
          }
        }

        if (!TS.Utils.Assert.isNullOrUndefined(source))
        {
          TS.Utils.checkIterableParameter("source", source, "TS.Collections.Dictionary.constructor");
          for (let KV of source as Iterable<TS.Collections.KeyValuePair<TKey, TValue>>)
          {
            if ((TS.Utils.Assert.isNullOrUndefined(KV.key) || TS.Utils.Assert.isUndefined(KV.value)))
            {
              throw new TS.InvalidTypeException("source", source, "The value of argument source must be an iterable of type 'TS.Collections.KeyValuePair<TKey, TValue>' in the constructor of 'TS.Collections.Dictionary'.");
            }
            this.add(KV.key, KV.value);
          }
        }
      }

    }//END class

  }//END namespace
}//END namespace
