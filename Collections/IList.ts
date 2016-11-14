/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Collections
  {

    /**
    * @interface TS.Collections.IList<T>
    *
    * @description Interface which must be implemented by all list classes.
    *
    * @extends {TS.Collections.ICollection<T>}
    *
    * @see {https://msdn.microsoft.com/en-us/library/5y536ey6(v=vs.110).aspx} MSDN
    */
    export interface IList<T> extends TS.Collections.ICollection<T>
    {

      /**
      * @description Specified wheter null values are allowed in the IList<T> or not. This flag is set during
      *  construction and can't be changed during the lifetime of the instance.
      *
      * @readonly
      *
      * @member {boolean} allowNull.
      */
      allowNull: boolean;


      //
      //getEnumerator - Not Implemented
      //


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
      indexOf(item: T, startIndex?: number, equalityComparer?: (first: T, second: T) => boolean) : number;


      /**
      * @descripton Inserts an item to the IList<T> at the specified index.
      *
      * @param {number} index.
      * @param {T} value.
      *
      * @returns {this}
      */
      insert(index: number, value: T) : this


      //
      //IsReadOnly - Not Implemented
      //


      /**
      * @description Removes the item at the specified index from the IList<T>.
      *
      * @param {number} index.
      *
      * @returns {this}
      */
      removeAt(index: number): this

    }//END interface

  }//END namespace
}//END namespace