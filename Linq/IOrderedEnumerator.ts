namespace TS
{
  export namespace Linq
  {

    /**
    * interface TS.Linq.IOrderedEnumerator<T>
    */
    export interface IOrderedEnumerator<T>
    {
      /**
      * @returns {Iterator<Iterator<T>} 
      */
      partitionIterator(): Iterator<Iterator<T>>;
    }//END interface

  }//END namespace
}//END namespace