namespace TS
{
  "use strict";
  export namespace Linq
  {
    /**
    * interface IOrderedEnumerator<T>
    */
    export interface IOrderedEnumerator<T>
    {
      /**
      * @returns {Iterator<Iterator<T>} 
      */
      partitionIterator(): Iterator<Iterator<T>>;
    }
  }
}