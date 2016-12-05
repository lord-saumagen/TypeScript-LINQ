/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Collections
  {

    /**
    * @interface TS.Collections.IDictionary<TKey, TValue>
    *
    * @description Represents a generic collection of key/value pairs.
    *
    * @see {@link https://msdn.microsoft.com/en-us/library/s4ys34ea(v=vs.110).aspx | MSDN}
    *
    * @extends {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
    */
    export interface IDictionary<TKey, TValue> extends TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>
    {

      /**
      * @description Adds an item to the ICollection<T>.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/63ywd54z(v=vs.110).aspx | MSDN }
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
      * @see {@link https://msdn.microsoft.com/en-us/library/cy7xta5e(v=vs.110).aspx | MSDN }
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
      * @see {@link https://msdn.microsoft.com/en-us/library/k5cf1d56(v=vs.110).aspx | MSDN }
      *
      * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
      *
      * @returns {boolean}
      */
      contains(item: TS.Collections.KeyValuePair<TKey, TValue>): boolean;


      /**
      * @description Determines whether the IDictionary<TKey, TValue> contains an element with the specified key.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/htszx2dy(v=vs.110).aspx | MSDN }
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
      containsValue(value: TValue): boolean


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
      containsValue(value: TValue, equalityComparer: (first: TValue, second: TValue) => boolean): boolean


      /**
      * @description Copies the elements of the ICollection<T> to an Array, starting at the specified array index.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/0efx51xw(v=vs.110).aspx | MSDN }
      *
      * @implements {TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>}
      *
      * @param {Array<KeyValuePair<TKey, TValue>>} targetArray
      * @param {number} destIndex, Default value is 0.
      *
      * @returns {TS.Collections.IDictionary<TKey, TValue>}
      */
      copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, destIndex?: number): this;


      //
      //getEnumerator - Not Implemented
      //


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
      getItem(key: TKey): TS.Collections.KeyValuePair<TKey, TValue> | undefined;


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
      getValue(key: TKey): TValue | undefined;

      //
      //IsReadOnly - Not Implemented
      //

      //
      //item - Not Implemented, use getItem instead
      //

      /**
      * @description Returns a TS.Linq.Enumerable<TKey> containing the keys of the IDictionary<TKey, TValue>.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/1ebzfbyx(v=vs.110).aspx | MSDN }
      *
      * @get {TS.Linq.Enumerator<TKey>} keys
      */
      keys: TS.Linq.Enumerator<TKey>


      /**
      * @description Removes the occurrence of the specific item from the IDictionary<TKey, TValue>. The function fails
      *  silent if the dictionary doesn't contain that item.
      *
      * @see {@link https://msdn.microsoft.com/en-us/library/bye7h94w(v=vs.110).aspx | MSDN }
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
      * @see {@link https://msdn.microsoft.com/en-us/library/k8s489f0(v=vs.110).aspx | MSDN }
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
      * @see {@link https://msdn.microsoft.com/en-us/library/zyxt2e2h(v=vs.110).aspx | MSDN }
      *
      * @param {TKey} key
      * @param {TValue} newValue
      *
      * @returns {TS.Collections.IDictionary<TKey, TValue>}
      */
      setItem(key: TKey, newValue: TValue): this;

      //
      //TryGetValue - Not Implemented
      //

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
      * @see {@link https://msdn.microsoft.com/en-us/library/0yxt5h4s(v=vs.110).aspx | MSDN }
      *
      * @get {TS.Linq.Enumerator<TValue>} values
      */
      values: TS.Linq.Enumerator<TValue>;

    }//END interface

  }//END namespace
}//END namespace