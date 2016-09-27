/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";

  export namespace Collections
  {

    /**
    * @interface ICollection<T>
    *
    * @description Defines methods to manipulate generic collections.
    *
    * @see {@link https://msdn.microsoft.com/en-us/library/92t2ye13(v=vs.110).aspx | MSDN}
    */
    export interface ICollection<T>
    {
      /**
      * @description Adds items to the ICollection<T>.
      *  Differs from the C# counterpart in that way, that you are allowed to add multiple items at once.
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
      * @description Copies the elements of the ICollection<T> to an Array, starting at 
      *  the specified array index or at positions 0 if no array index is specified.
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


      //
      //getEnumerator - Not Implemented
      //

      //
      //IsReadOnly - Not Implemented
      //


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
      * @description Converts the ICollection<T> into an array of type T.
      *  There is no equivalent function defined in the C# counterpart of the ICollection<T> interface.
      *
      * @returns {Array<T>}
      */
      toArray(): Array<T>;

    }//END interface

  }//END namespace
}//END namespace