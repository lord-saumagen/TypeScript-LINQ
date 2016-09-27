namespace TS
{
  "use strict";

  /**
  * @class Exception
  *
  * @description The base class of all exceptions defined in this framework. The Exception class has a public read only property called 'type' which
  *  returns the fully qualified type name of the exception class. This way you are able to create a finer granular error handling based on the
  *  exception type. Your are not longer forced to parse the error message string to infer the nature of the excpetion. Each subclass of the
  *  Exception class has to override the 'type' property to reflect the own type. The exception class has also a read only 'innerException'
  *  property which allows to create an exception stack which links back to the root exception.
  *
  * @implements {Error}
  */
  export class Exception implements Error
  {
    /**
    * @private
    */
    private internalMessage: string;

    /**
    * @private
    */
    private internalInnerException: TS.Exception;

    /**
    * @description Returns the inner exception if available or null.
    *
    * @public
    *
    * @get {TS.Exception | null} innerException
    */
    public get innerException(): TS.Exception
    {
      return this.internalInnerException;
    }

    /**
    * @description The error message.
    *
    * @implements {Error}
    *
    * @get {string} message
    */
    public get message(): string
    {
      return this.internalMessage;
    }

    /**
    * @description The error name. It's the same as the type.
    *
    * @implements {Error}
    *
    * @get {string} name
    */
    public get name(): string
    {
      return this.type;
    }

    /**
    * @description This property returns the fully qualified type name of the exception.
    *
    * @public
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.Exception";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: TS.Exception)
    {
      this.internalMessage = (message) ? message : "";
      this.internalInnerException = (innerException) ? innerException : null;
    }

    /**
    * @description Returns a combination of the 'type' and 'message' of the exception as string.
    *
    * @override {Object}
    *
    * @returns {string}
    */
    public toString(): string
    {
      return this.type + ((this.message.length > 0) ? " :: " + this.message : "");
    }

    /**
    * @description Returns a string which is the concatenation of the 'toString' call results of the current exception and the inner exceptions.
    *
    * @param {TS.Exception} exception
    * @param {bookean} isInner, Defaults to false
    * @param {string} offset, Default to 2 spaces. A string which is used to indent inner exception messages.
    *
    * @returns {string}
    */
    public stackTrace(exception: TS.Exception = this, isInner: boolean = false, offset: string = "  "): string
    {
      let returnString: string;

      returnString = "";

      returnString += exception.toString();

      if (exception.innerException != null)
      {
        returnString += "\r\n" + offset + this.stackTrace(exception.innerException, true, offset + "  ");
      }//END if

      return returnString;
    }

  }//END class


  //********************************************************************************
  // AmbiguousResult exception
  //********************************************************************************


  /**
  * @class AmbiguousResultException
  *
  * @description This exception signals a an error where an operation which is specified to deliver a single result fails because
  *  there are multiple possible results available.
  *
  * @extends {TS.Exception}
  */
  export class AmbiguousResultException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.AmbiguousResultException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {any} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
      this.internalArgumentValue = argumentValue;
    }

  }//END class


  //********************************************************************************
  // Argument exception
  //********************************************************************************


  /**
  * @class ArgumentException
  *
  * @description This exceptions signals a general error caused by an invalid argument.
  *
  * @extends {TS.Exception}
  */
  export class ArgumentException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {any} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
      this.internalArgumentValue = argumentValue;
    }

  }//END class


  /**
  * @class ArgumentNullException
  *
  * @description This execptions signals an error caused by an unexpecte null value in an argument.
  *
  * @extends {TS.Exception}
  */
  export class ArgumentNullException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
    }

  }//END class


  /**
  * @class ArgumentNullOrUndefinedException
  *
  * @description This exceptions signals an error caused by an unexpecte undefined or null value in an argument.
  *
  * @extends {TS.Exception}
  */
  export class ArgumentNullOrUndefinedException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullOrUndefinedException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
    }
  }//END class


  /**
  * @class ArgumentNullUndefOrEmptyException
  *
  * @description This excptions signals an error caused by an unexpecte undefined or null value in an argument or
  *  an unexpected emptyness for an argument like an empty string or array.
  *
  * @extends {TS.Exception}
  */
  export class ArgumentNullUndefOrEmptyException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrEmptyException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
    }
  }//END class


  /**
  * @class ArgumentNullUndefOrWhiteSpaceException
  *
  * @description This exceptions signals an unexpected emptynes of a string.
  *
  * @extends {TS.Exception}
  */
  export class ArgumentNullUndefOrWhiteSpaceException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrWhiteSpaceException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
    }
  }//END class


  /**
  * @class ArgumentOutOfRangeException
  *
  * @description This exceptions signals that an argument exceeded the range of allowed values.
  *
  * @extends {TS.ArgumentException}
  */
  export class ArgumentOutOfRangeException extends TS.ArgumentException
  {
    /**
    * @override {TS.ArgumentException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentOutOfRangeException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(argumentName, argumentValue, message, innerException);
    }

  }//END class


  /**
  * @class ArgumentUndefinedException
  *
  * @description This exceptions signals an error caused by an unexpecte undefined value in an argument.
  *
  * @extends {TS.ArgumentException}
  */
  export class ArgumentUndefinedException extends TS.ArgumentException
  {
    /**
    * @override {TS.ArgumentException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentUndefinedException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(argumentName, undefined, message, innerException);
    }

  }//END class


  //********************************************************************************
  // Index exceptions
  //********************************************************************************


  /**
  * @class IndexOutOfRangeException
  *
  * @description This exceptions signals that an index value exceeded the range of indexable elements.
  *
  * @extends {TS.Exception}
  */
  export class IndexOutOfRangeException extends TS.Exception
  {
    /**
    * @get {string} type
    * @public
    * @override {TS.Exception}
    */
    public get type(): string
    {
      return "TS.IndexOutOfRangeException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid invocation exceptions
  //********************************************************************************


  /**
  * @class InvalidInvocationException
  *
  * @description This exceptions signals that a function was invoked in an unexpected or invalid way.
  *
  * @extends {TS.Exception}
  */
  export class InvalidInvocationException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidInvocationException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid operation exceptions
  //********************************************************************************


  /**
  * @class InvalidOperationException
  *
  * @description This exceptions signals an attempt to start an operation which was not allowd to start in the current situation.
  *
  * @extends {TS.Exception}
  */
  export class InvalidOperationException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidOperationException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class




  //********************************************************************************
  // Invalid cast exception
  //********************************************************************************


  /**
  * @class InvalidCastException
  *
  * @description This exceptions signals that a casting operation failed.

  * @extends {TS.Exception}
  */
  export class InvalidCastException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidCastException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid format exception
  //********************************************************************************


  /**
  * @class InvalidFormatException
  *
  * @description This exceptions signals that an operation failed because of an invalid format of some data.
  *
  * @extends {TS.Exception}
  */
  export class InvalidFormatException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidFormatException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: any = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid type exception
  //********************************************************************************


  /**
  * @class InvalidTypeException
  *
  * @description This exceptions signals that an argument has an invalid type.
  *
  * @extends {TS.Exception}
  */
  export class InvalidTypeException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidTypeException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: any = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // ArithmeticException
  //********************************************************************************


  /**
  * @class ArithmeticException
  *
  * @description This exception signals an errors in an arithmetic, casting, or conversion operation.
  *  ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, and OverflowException.
  *  Use one of the derived classes of ArithmeticException if appropriate to the exact nature of the error.
  *  Throw an ArithmeticException if there is no appropriate subclass to descripte the nature of the error.
  *
  * @extends {TS.Exception}
  */
  export class ArithmeticException extends TS.Exception
  {

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArithmeticException";
    }


    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class OverflowException
  *
  * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
  *
  * @extends {TS.ArithmeticException}
  */
  export class OverflowException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.OverflowException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class DividedByZeroException
  *
  * @description This exception signals an attempt to divide a number value by zero.
  *
  * @extends {TS.ArithmeticException}
  */
  export class DividedByZeroException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DividedByZeroException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class NotFiniteNumberException
  *
  * @description This exception signals an attempt to execute an arithmetic operation with a number value which is either infinite or Not-a-Number (NaN).
  *
  * @extends {TS.ArithmeticException}
  */
  export class NotFiniteNumberException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.NotFiniteNumberException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  //********************************************************************************
  // Infrastructure Exceptions
  //********************************************************************************


  /**
  * @class NotImplementedException
  *
  * @description This exception signals that a function or class is not or not fully implemented and can't be used.
  *
  * @extends {TS.Exception}
  */
  export class NotImplementedException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.NotImplementedException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  /**
  * @class DeprecatedException
  *
  * @description This exception signals that a function or class should not longer be used.
  *
  * @extends {TS.Exception}
  */
  export class DeprecatedException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DeprecatedException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  //********************************************************************************
  // File and directory exceptions
  //********************************************************************************


  /**
  * @class DirectoryNotFoundException
  *
  * @description This exception signals if the filesystem is not able to locate the requested directory.
  *
  * @extends {TS.Exception}
  */
  export class DirectoryNotFoundException extends TS.Exception
  {

    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DirectoryNotFoundException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception. Typically the name of a directory variable.
    * @param {any} argumentValue, The value of the argument which caused the exception. Typically the value of a directory variable.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: string = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


}//END namespace