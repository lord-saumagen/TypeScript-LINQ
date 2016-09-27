var TS;
(function (TS) {
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
    class Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            this.internalMessage = (message) ? message : "";
            this.internalInnerException = (innerException) ? innerException : null;
        }
        /**
        * @description Returns the inner exception if available or null.
        *
        * @public
        *
        * @get {TS.Exception | null} innerException
        */
        get innerException() {
            return this.internalInnerException;
        }
        /**
        * @description The error message.
        *
        * @implements {Error}
        *
        * @get {string} message
        */
        get message() {
            return this.internalMessage;
        }
        /**
        * @description The error name. It's the same as the type.
        *
        * @implements {Error}
        *
        * @get {string} name
        */
        get name() {
            return this.type;
        }
        /**
        * @description This property returns the fully qualified type name of the exception.
        *
        * @public
        *
        * @get {string} type
        */
        get type() {
            return "TS.Exception";
        }
        /**
        * @description Returns a combination of the 'type' and 'message' of the exception as string.
        *
        * @override {Object}
        *
        * @returns {string}
        */
        toString() {
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
        stackTrace(exception = this, isInner = false, offset = "  ") {
            let returnString;
            returnString = "";
            returnString += exception.toString();
            if (exception.innerException != null) {
                returnString += "\r\n" + offset + this.stackTrace(exception.innerException, true, offset + "  ");
            } //END if
            return returnString;
        }
    }
    TS.Exception = Exception; //END class
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
    class AmbiguousResultException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
            this.internalArgumentValue = argumentValue;
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.AmbiguousResultException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.AmbiguousResultException = AmbiguousResultException; //END class
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
    class ArgumentException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
            this.internalArgumentValue = argumentValue;
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.ArgumentException = ArgumentException; //END class
    /**
    * @class ArgumentNullException
    *
    * @description This execptions signals an error caused by an unexpecte null value in an argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
    }
    TS.ArgumentNullException = ArgumentNullException; //END class
    /**
    * @class ArgumentNullOrUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpecte undefined or null value in an argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullOrUndefinedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullOrUndefinedException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
    }
    TS.ArgumentNullOrUndefinedException = ArgumentNullOrUndefinedException; //END class
    /**
    * @class ArgumentNullUndefOrEmptyException
    *
    * @description This excptions signals an error caused by an unexpecte undefined or null value in an argument or
    *  an unexpected emptyness for an argument like an empty string or array.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullUndefOrEmptyException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullUndefOrEmptyException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
    }
    TS.ArgumentNullUndefOrEmptyException = ArgumentNullUndefOrEmptyException; //END class
    /**
    * @class ArgumentNullUndefOrWhiteSpaceException
    *
    * @description This exceptions signals an unexpected emptynes of a string.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullUndefOrWhiteSpaceException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullUndefOrWhiteSpaceException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
    }
    TS.ArgumentNullUndefOrWhiteSpaceException = ArgumentNullUndefOrWhiteSpaceException; //END class
    /**
    * @class ArgumentOutOfRangeException
    *
    * @description This exceptions signals that an argument exceeded the range of allowed values.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentOutOfRangeException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(argumentName, argumentValue, message, innerException);
        }
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentOutOfRangeException";
        }
    }
    TS.ArgumentOutOfRangeException = ArgumentOutOfRangeException; //END class
    /**
    * @class ArgumentUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpecte undefined value in an argument.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentUndefinedException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(argumentName, undefined, message, innerException);
        }
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentUndefinedException";
        }
    }
    TS.ArgumentUndefinedException = ArgumentUndefinedException; //END class
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
    class IndexOutOfRangeException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @get {string} type
        * @public
        * @override {TS.Exception}
        */
        get type() {
            return "TS.IndexOutOfRangeException";
        }
    }
    TS.IndexOutOfRangeException = IndexOutOfRangeException; //END class
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
    class InvalidInvocationException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidInvocationException";
        }
    }
    TS.InvalidInvocationException = InvalidInvocationException; //END class
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
    class InvalidOperationException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidOperationException";
        }
    }
    TS.InvalidOperationException = InvalidOperationException; //END class
    //********************************************************************************
    // Invalid cast exception
    //********************************************************************************
    /**
    * @class InvalidCastException
    *
    * @description This exceptions signals that a casting operation failed.
  
    * @extends {TS.Exception}
    */
    class InvalidCastException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidCastException";
        }
    }
    TS.InvalidCastException = InvalidCastException; //END class
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
    class InvalidFormatException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidFormatException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.InvalidFormatException = InvalidFormatException; //END class
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
    class InvalidTypeException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidTypeException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.InvalidTypeException = InvalidTypeException; //END class
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
    class ArithmeticException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArithmeticException";
        }
    }
    TS.ArithmeticException = ArithmeticException; //END class
    /**
    * @class OverflowException
    *
    * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
    *
    * @extends {TS.ArithmeticException}
    */
    class OverflowException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.OverflowException";
        }
    }
    TS.OverflowException = OverflowException; //END class
    /**
    * @class DividedByZeroException
    *
    * @description This exception signals an attempt to divide a number value by zero.
    *
    * @extends {TS.ArithmeticException}
    */
    class DividedByZeroException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DividedByZeroException";
        }
    }
    TS.DividedByZeroException = DividedByZeroException; //END class
    /**
    * @class NotFiniteNumberException
    *
    * @description This exception signals an attempt to execute an arithmetic operation with a number value which is either infinite or Not-a-Number (NaN).
    *
    * @extends {TS.ArithmeticException}
    */
    class NotFiniteNumberException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.NotFiniteNumberException";
        }
    }
    TS.NotFiniteNumberException = NotFiniteNumberException; //END class
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
    class NotImplementedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.NotImplementedException";
        }
    }
    TS.NotImplementedException = NotImplementedException;
    /**
    * @class DeprecatedException
    *
    * @description This exception signals that a function or class should not longer be used.
    *
    * @extends {TS.Exception}
    */
    class DeprecatedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DeprecatedException";
        }
    }
    TS.DeprecatedException = DeprecatedException;
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
    class DirectoryNotFoundException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception. Typically the name of a directory variable.
        * @param {any} argumentValue, The value of the argument which caused the exception. Typically the value of a directory variable.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DirectoryNotFoundException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.DirectoryNotFoundException = DirectoryNotFoundException;
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    /**
     * @description The module 'Utils' hosts a collection of funcitons which offer solutions for common
     *  problems or reoccuring tasks which are not class specific. Since they are not class specific, they
     *  are also not part of a class. They are simpley collected in this file and are part of the namespac.
     *  Alle of the functions are static.
     */
    var Utils;
    (function (Utils) {
        /**
         * @description An array of currencies as defined in ISO 4217
         *
         * @see {@link http://www.iso.org/iso/home/standards/currency_codes.htm | ISO}
         */
        Utils.currencyArray = new Array({ Name: "United Arab Emirates Dirham", Code: "AED", Symbol: "" }, { Name: "Afghanistan Afghani", Code: "AFN", Symbol: "؋" }, { Name: "Albania Lek", Code: "ALL", Symbol: "" }, { Name: "Armenia Dram", Code: "AMD", Symbol: "" }, { Name: "Netherlands Antilles Guilder", Code: "ANG", Symbol: "ƒ" }, { Name: "Angola Kwanza", Code: "AOA", Symbol: "" }, { Name: "Argentina Peso", Code: "ARS", Symbol: "$" }, { Name: "Australia Dollar", Code: "AUD", Symbol: "$" }, { Name: "Aruba Guilder", Code: "AWG", Symbol: "ƒ" }, { Name: "Azerbaijan New Manat", Code: "AZN", Symbol: "ман" }, { Name: "Bosnia and Herzegovina Convertible Marka", Code: "BAM", Symbol: "KM" }, { Name: "Barbados Dollar", Code: "BBD", Symbol: "$" }, { Name: "Bangladesh Taka", Code: "BDT", Symbol: "" }, { Name: "Bulgaria Lev", Code: "BGN", Symbol: "лв" }, { Name: "Bahrain Dinar", Code: "BHD", Symbol: "" }, { Name: "Burundi Franc", Code: "BIF", Symbol: "" }, { Name: "Bermuda Dollar", Code: "BMD", Symbol: "$" }, { Name: "Brunei Darussalam Dollar", Code: "BND", Symbol: "$" }, { Name: "Bolivia Bolíviano", Code: "BOB", Symbol: "$b" }, { Name: "Brazil Real", Code: "BRL", Symbol: "R$" }, { Name: "Bahamas Dollar", Code: "BSD", Symbol: "$" }, { Name: "Bhutan Ngultrum", Code: "BTN", Symbol: "" }, { Name: "Botswana Pula", Code: "BWP", Symbol: "P" }, { Name: "Belarus Ruble", Code: "BYR", Symbol: "p." }, { Name: "Belize Dollar", Code: "BZD", Symbol: "BZ$" }, { Name: "Canada Dollar", Code: "CAD", Symbol: "$" }, { Name: "Congo/Kinshasa Franc", Code: "CDF", Symbol: "" }, { Name: "Switzerland Franc", Code: "CHF", Symbol: "CHF" }, { Name: "Chile Peso", Code: "CLP", Symbol: "$" }, { Name: "China Yuan Renminbi", Code: "CNY", Symbol: "¥" }, { Name: "Colombia Peso", Code: "COP", Symbol: "" }, { Name: "Costa Rica Colon", Code: "CRC", Symbol: "₡" }, { Name: "Cuba Convertible Peso", Code: "CUC", Symbol: "" }, { Name: "Cuba Peso", Code: "CUP", Symbol: "₱" }, { Name: "Cape Verde Escudo", Code: "CVE", Symbol: "" }, { Name: "Czech Republic Koruna", Code: "CZK", Symbol: "Kč" }, { Name: "Djibouti Franc", Code: "DJF", Symbol: "" }, { Name: "Denmark Krone", Code: "DKK", Symbol: "kr" }, { Name: "Dominican Republic Peso", Code: "DOP", Symbol: "RD$" }, { Name: "Algeria Dinar", Code: "DZD", Symbol: "" }, { Name: "Egypt Pound", Code: "EGP", Symbol: "£" }, { Name: "Eritrea Nakfa", Code: "ERN", Symbol: "" }, { Name: "Ethiopia Birr", Code: "ETB", Symbol: "" }, { Name: "European Union Euro", Code: "EUR", Symbol: "€" }, { Name: "Fiji Dollar", Code: "FJD", Symbol: "$" }, { Name: "Falkland Islands (Malvinas) Pound", Code: "FKP", Symbol: "£" }, { Name: "United Kingdom Pound", Code: "GBP", Symbol: "£" }, { Name: "Georgia Lari", Code: "GEL", Symbol: "" }, { Name: "Guernsey Pound", Code: "GGP", Symbol: "£" }, { Name: "Ghana Cedi", Code: "GHS", Symbol: "¢" }, { Name: "Gibraltar Pound", Code: "GIP", Symbol: "£" }, { Name: "Gambia Dalasi", Code: "GMD", Symbol: "" }, { Name: "Guinea Franc", Code: "GNF", Symbol: "" }, { Name: "Guatemala Quetzal", Code: "GTQ", Symbol: "Q" }, { Name: "Guyana Dollar", Code: "GYD", Symbol: "$" }, { Name: "Hong Kong Dollar", Code: "HKD", Symbol: "$" }, { Name: "Honduras Lempira", Code: "HNL", Symbol: "L" }, { Name: "Croatia Kuna", Code: "HRK", Symbol: "kn" }, { Name: "Haiti Gourde", Code: "HTG", Symbol: "" }, { Name: "Hungary Forint", Code: "HUF", Symbol: "Ft" }, { Name: "Indonesia Rupiah", Code: "IDR", Symbol: "Rp" }, { Name: "Israel Shekel", Code: "ILS", Symbol: "₪" }, { Name: "Isle of Man Pound", Code: "IMP", Symbol: "£" }, { Name: "India Rupee", Code: "INR", Symbol: "" }, { Name: "Iraq Dinar", Code: "IQD", Symbol: "" }, { Name: "Iran Rial", Code: "IRR", Symbol: "﷼" }, { Name: "Iceland Krona", Code: "ISK", Symbol: "kr" }, { Name: "Jersey Pound", Code: "JEP", Symbol: "£" }, { Name: "Jamaica Dollar", Code: "JMD", Symbol: "J$" }, { Name: "Jordan Dinar", Code: "JOD", Symbol: "" }, { Name: "Japan Yen", Code: "JPY", Symbol: "¥" }, { Name: "Kenya Shilling", Code: "KES", Symbol: "" }, { Name: "Kyrgyzstan Som", Code: "KGS", Symbol: "лв" }, { Name: "Cambodia Riel", Code: "KHR", Symbol: "៛" }, { Name: "Comoros Franc", Code: "KMF", Symbol: "" }, { Name: "Korea (North) Won", Code: "KPW", Symbol: "₩" }, { Name: "Korea (South) Won", Code: "KRW", Symbol: "₩" }, { Name: "Kuwait Dinar", Code: "KWD", Symbol: "" }, { Name: "Cayman Islands Dollar", Code: "KYD", Symbol: "$" }, { Name: "Kazakhstan Tenge", Code: "KZT", Symbol: "лв" }, { Name: "Laos Kip", Code: "LAK", Symbol: "₭" }, { Name: "Lebanon Pound", Code: "LBP", Symbol: "£" }, { Name: "Sri Lanka Rupee", Code: "LKR", Symbol: "₨" }, { Name: "Liberia Dollar", Code: "LRD", Symbol: "$" }, { Name: "Lesotho Loti", Code: "LSL", Symbol: "" }, { Name: "Libya Dinar", Code: "LYD", Symbol: "" }, { Name: "Morocco Dirham", Code: "MAD", Symbol: "" }, { Name: "Moldova Leu", Code: "MDL", Symbol: "" }, { Name: "Madagascar Ariary", Code: "MGA", Symbol: "" }, { Name: "Macedonia Denar", Code: "MKD", Symbol: "ден" }, { Name: "Myanmar (Burma) Kyat", Code: "MMK", Symbol: "" }, { Name: "Mongolia Tughrik", Code: "MNT", Symbol: "₮" }, { Name: "Macau Pataca", Code: "MOP", Symbol: "" }, { Name: "Mauritania Ouguiya", Code: "MRO", Symbol: "" }, { Name: "Mauritius Rupee", Code: "MUR", Symbol: "₨" }, { Name: "Maldives (Maldive Islands) Rufiyaa", Code: "MVR", Symbol: "" }, { Name: "Malawi Kwacha", Code: "MWK", Symbol: "" }, { Name: "Mexico Peso", Code: "MXN", Symbol: "$" }, { Name: "Malaysia Ringgit", Code: "MYR", Symbol: "RM" }, { Name: "Mozambique Metical", Code: "MZN", Symbol: "MT" }, { Name: "Namibia Dollar", Code: "NAD", Symbol: "$" }, { Name: "Nigeria Naira", Code: "NGN", Symbol: "₦" }, { Name: "Nicaragua Cordoba", Code: "NIO", Symbol: "C$" }, { Name: "Norway Krone", Code: "NOK", Symbol: "kr" }, { Name: "Nepal Rupee", Code: "NPR", Symbol: "₨" }, { Name: "New Zealand Dollar", Code: "NZD", Symbol: "$" }, { Name: "Oman Rial", Code: "OMR", Symbol: "﷼" }, { Name: "Panama Balboa", Code: "PAB", Symbol: "B/." }, { Name: "Peru Sol", Code: "PEN", Symbol: "S/." }, { Name: "Papua New Guinea Kina", Code: "PGK", Symbol: "" }, { Name: "Philippines Peso", Code: "PHP", Symbol: "₱" }, { Name: "Pakistan Rupee", Code: "PKR", Symbol: "₨" }, { Name: "Poland Zloty", Code: "PLN", Symbol: "zł" }, { Name: "Paraguay Guarani", Code: "PYG", Symbol: "Gs" }, { Name: "Qatar Riyal", Code: "QAR", Symbol: "﷼" }, { Name: "Romania New Leu", Code: "RON", Symbol: "lei" }, { Name: "Serbia Dinar", Code: "RSD", Symbol: "Дин." }, { Name: "Russia Ruble", Code: "RUB", Symbol: "руб" }, { Name: "Rwanda Franc", Code: "RWF", Symbol: "" }, { Name: "Saudi Arabia Riyal", Code: "SAR", Symbol: "﷼" }, { Name: "Solomon Islands Dollar", Code: "SBD", Symbol: "$" }, { Name: "Seychelles Rupee", Code: "SCR", Symbol: "₨" }, { Name: "Sudan Pound", Code: "SDG", Symbol: "" }, { Name: "Sweden Krona", Code: "SEK", Symbol: "kr" }, { Name: "Singapore Dollar", Code: "SGD", Symbol: "$" }, { Name: "Saint Helena Pound", Code: "SHP", Symbol: "£" }, { Name: "Sierra Leone Leone", Code: "SLL", Symbol: "" }, { Name: "Somalia Shilling", Code: "SOS", Symbol: "S" }, { Name: "Suriname Dollar", Code: "SRD", Symbol: "$" }, { Name: "São Tomé and Príncipe Dobra", Code: "STD", Symbol: "" }, { Name: "El Salvador Colon", Code: "SVC", Symbol: "$" }, { Name: "Syria Pound", Code: "SYP", Symbol: "£" }, { Name: "Swaziland Lilangeni", Code: "SZL", Symbol: "" }, { Name: "Thailand Baht", Code: "THB", Symbol: "฿" }, { Name: "Tajikistan Somoni", Code: "TJS", Symbol: "" }, { Name: "Turkmenistan Manat", Code: "TMT", Symbol: "" }, { Name: "Tunisia Dinar", Code: "TND", Symbol: "" }, { Name: "Tonga Pa'anga", Code: "TOP", Symbol: "" }, { Name: "Turkey Lira", Code: "TRY", Symbol: "" }, { Name: "Trinidad and Tobago Dollar", Code: "TTD", Symbol: "TT$" }, { Name: "Tuvalu Dollar", Code: "TVD", Symbol: "$" }, { Name: "Taiwan New Dollar", Code: "TWD", Symbol: "NT$" }, { Name: "Tanzania Shilling", Code: "TZS", Symbol: "" }, { Name: "Ukraine Hryvnia", Code: "UAH", Symbol: "₴" }, { Name: "Uganda Shilling", Code: "UGX", Symbol: "" }, { Name: "United States Dollar", Code: "USD", Symbol: "$" }, { Name: "Uruguay Peso", Code: "UYU", Symbol: "$U" }, { Name: "Uzbekistan Som", Code: "UZS", Symbol: "лв" }, { Name: "Venezuela Bolivar", Code: "VEF", Symbol: "Bs" }, { Name: "Viet Nam Dong", Code: "VND", Symbol: "₫" }, { Name: "Vanuatu Vatu", Code: "VUV", Symbol: "" }, { Name: "Samoa Tala", Code: "WST", Symbol: "" }, { Name: "Communauté Financière Africaine (BEAC) CFA Franc BEAC", Code: "XAF", Symbol: "" }, { Name: "East Caribbean Dollar", Code: "XCD", Symbol: "$" }, { Name: "International Monetary Fund (IMF) Special Drawing Rights", Code: "XDR", Symbol: "" }, { Name: "Communauté Financière Africaine (BCEAO) Franc", Code: "XOF", Symbol: "" }, { Name: "Comptoirs Français du Pacifique (CFP) Franc", Code: "XPF", Symbol: "" }, { Name: "Yemen Rial", Code: "YER", Symbol: "﷼" }, { Name: "South Africa Rand", Code: "ZAR", Symbol: "R" }, { Name: "Zambia Kwacha", Code: "ZMW", Symbol: "" }, { Name: "Zimbabwe Dollar", Code: "ZWD", Symbol: "Z$" });
        /**
        * @description Searches for all occurrences of 'searchString' in 'sourceString' and returns an array of the indexes where the searchstring
        *  occurred in the sourceString.
        *
        * @param {string} sourceString
        * @param {string} searchString
        *
        * @returns {Array<number>}, An array of indexes where the searchString occurred in the sourceString.
        */
        function allIndexOf(sourceString, searchString) {
            let result;
            result = new Array();
            if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString)) {
                return result;
            } //END if
            if (sourceString.length < searchString.length) {
                return result;
            } //END if
            if (sourceString.indexOf(searchString) < 0) {
                return result;
            } //END if
            result.push(sourceString.indexOf(searchString));
            while (sourceString.indexOf(searchString, result[result.length - 1] + 1) > -1) {
                result.push(sourceString.indexOf(searchString, result[result.length - 1] + 1));
            } //END while
            return result;
        }
        Utils.allIndexOf = allIndexOf;
        /**
        * @description Converts a bit string into an array of byte values. If the string given in argument 'bitString' is null,
        *  undefined, empty of white space, the resulting byte array is an empty array. The function throws an exceptions if the
        *  string is not empty but also not a valid bit string.
        *
        * @parm {string} bitString, The bit string to convert.
        *
        * @returns {Array<number>}, The resulting byte value array which may be empty.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function bitStringToByteArray(bitString) {
            let resultArray;
            let byteStringArray;
            let index;
            resultArray = new Array();
            TS.Utils.checkNotEmptyParameter("bitString", bitString, "TS.Utils.bitStringToByteArray");
            TS.Utils.checkBitStringParameter("bitString", bitString, "TS.Utils.bitStringToByteArray");
            byteStringArray = new Array();
            while (bitString.length > 0) {
                byteStringArray.push(bitString.substr(0, 8));
                bitString = bitString.substr(8);
            } //END while
            for (index = 0; index < byteStringArray.length; index++) {
                //Handle the remaining in an appropriate way for the 
                //current block 
                resultArray.push(parseInt(byteStringArray[index], 2));
            } //END for
            return resultArray;
        }
        Utils.bitStringToByteArray = bitStringToByteArray;
        /**
        * @description Converts the values of the elements in argument 'byteArray' into a bit string representation.
        *
        * @param {Array<number>} byteArray, The array of byte values to convert.
        *
        * @returns {string}, The resulting bit string.
        Ü
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.InvalidTypeException }
        */
        function byteArrayToBitString(byteArray) {
            let resultString;
            TS.Utils.checkNotEmptyParameter("byteArray", byteArray, "TS.Utils.byteArrayToUInt");
            TS.Utils.checkUByteArrayParameter("byteArray", byteArray, "TS.Utils.byteArrayToUInt");
            resultString = "";
            byteArray.forEach((value, index, array) => resultString += byteToBitString(value));
            return resultString;
        }
        Utils.byteArrayToBitString = byteArrayToBitString;
        /**
        * @description Converts an array of unsigned byte values into an unsinged integer value. The function throws an exception if the value in
        *  argument 'unsignedByteArray' is not a valid byte array or empty. The function throws a 'TS.ArgumentOutOfRangeException' if the
        *  conversion exceeds the maximum number range. (Number.MAX_SAFE_INTEGER)
        *
        * @params {Array<number>} byteArray, An array of unsigned byte values.
        *
        * @returns {number}, The result value as unsingned integer.
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.InvalidTypeException }
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function byteArrayToUInt(unsignedByteArray) {
            let resultNumber;
            let factor;
            TS.Utils.checkNotEmptyParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");
            TS.Utils.checkUByteArrayParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");
            resultNumber = 0;
            factor = 0;
            while (unsignedByteArray.length > 0) {
                resultNumber += Math.pow(256, factor) * unsignedByteArray.pop();
                factor++;
                if (resultNumber > Number.MAX_SAFE_INTEGER) {
                    throw new TS.ArgumentOutOfRangeException("unsignedByteArray", unsignedByteArray, "Argument 'unsignedByteArray' exceedes the maximum number range during conversion to an unsigned number in function TS.Utils.byteArrayToUInt");
                } //END if
            }
            return resultNumber;
        }
        Utils.byteArrayToUInt = byteArrayToUInt;
        /**
        * @description Converts the value given in argument 'value' into an 8 character bit string. The result string will be padded
        *  with leading '0' characters if necessary until the length of 8 characters is reached.
        *
        * @param {number} value, Has to be a byte value.
        *
        * @returns {string}, The 8 character bit string representation of the value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function byteToBitString(value) {
            let resultString;
            TS.Utils.checkParameter("value", value, "TS.Utils.byteToBitString");
            TS.Utils.checkUByteParameter("value", value, "TS.Utils.byteToBitString");
            resultString = "";
            resultString += value.toString(2);
            resultString = padLeft(resultString, "0", 8);
            return resultString;
        }
        Utils.byteToBitString = byteToBitString;
        /**
        * @description Checks whether the value of argument 'parameter' is an ArrayLike type or not. Trows
        *  a 'TS.InvalidTypeException' if the value of argument 'parameter' is not an 'ArrayLike' type.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        */
        function checkArrayLikeParameter(paramName, parameter, functionName) {
            if (!TS.Utils.Assert.isArrayLike(parameter)) {
                throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an 'ArrayLike' parameter in function '" + functionName + "'.");
            }
        }
        Utils.checkArrayLikeParameter = checkArrayLikeParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined.
        *  Checks also whether the value of argument 'parameter' is an array. Throws a 'TS.InvalidTypeException' if the value is not an array..
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkArrayParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isArray(parameter)) {
                throw new TS.InvalidTypeException(parameter, "Argument '" + parameterName + "' if not a valid array in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkArrayParameter = checkArrayParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined. Checks whether the argument 'parameter' is a valid string. Throws a 'TS.InvalidTypeException' if not.
        *  Checks whether the argument 'parameter' is an empty string or whitespace only. Throws a 'TS.ArgumentNullUndefOrWhiteSpaceException' if so.
        *  Check whether the argument 'parameter' is a valid binary string. (A string which comprises the characters "[0,1]" only, with no white space.)
        *  Throws a 'TS.InvalidTypeException' if not. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {string} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function checkBitStringParameter(parameterName, parameter, functionName) {
            checkStringParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isBinaryString(parameter)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' is not a valid binary string in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkBitStringParameter = checkBitStringParameter;
        /**
        * @description Checks whether the value of argument 'parameter' is a boolean or not. Throws a 'TS.InvalidTypeException'
        *  if the value of argument 'parameter' is not a boolean. The exceptions message uses the 'paramName' and 'functionName'
        *  in its message to signal which parameter failed the check and  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        */
        function checkBooleanParameter(paramName, parameter, functionName) {
            if (!TS.Utils.Assert.isBoolean(parameter)) {
                throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a boolean parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkBooleanParameter = checkBooleanParameter;
        /**
        * @description Checks whether the 'thisContext' is a valid type for a constructor call or not. Throws a 'TS.InvalidOperationException' if the value
        *  of argument 'thisContext' is either null or undefined or not of the required type. Throws a 'TS.ArgumentNullOrUndefinedException'
        *  if argument 'requiredType' is not specified.
        *
        * @param {any} thisContext
        * @param {any} requiredType
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidOperationException}
        */
        function checkConstructorCall(thisContext, requiredType) {
            let functionName;
            if (TS.Utils.Assert.isNullOrUndefined(thisContext)) {
                if (TS.Utils.Assert.isNullOrUndefined(requiredType)) {
                    throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
                } //END if
                else {
                    functionName = (requiredType.name != undefined) ? requiredType.name : "anonymous";
                    //functionName = TS.Utils.getFunctionName(requiredType);
                    throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
                } //END else
            } //END if
            if (TS.Utils.Assert.isNullOrUndefined(requiredType)) {
                throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
            } //END if
            //Object.getPrototypeOf(thisContext) == requiredType.prototype
            if (!(thisContext instanceof requiredType)) {
                functionName = (requiredType.name != undefined) ? requiredType.name : "anonymous";
                //functionName = TS.Utils.getFunctionName(requiredType);
                throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
            } //END if
        }
        Utils.checkConstructorCall = checkConstructorCall;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if the argument is
        *  either null or undefined.
        *
        *  Checks also the type of the argument which must evaluate to 'function' and checks whether the function returns an object if it is called with the 'new'
        *  operator and an empty argument list.
        *
        *  The function throws a 'TS.InvalidTypeException' if the call with the 'new' operator fails for any reason or the returned value is not an object,
        *  an empty object, null or undefined.
        *
        *  Attention, even if the check succeeded, the function specified in the argument 'parameter' may not be supposed to be called as a constructor function.
        *  (To be called with the new operator.) Since JavaScript allows to call every function with the new operator there is no way to tell whether a function
        *  was supposed to be used as a constructor function or not. But at least that check can tell that a call to that function as constructor
        *  function won't fail and will return an object of any type when the function passed the check.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkConstructorParameter(paramName, parameter, functionName) {
            let object;
            let ownPropertyArray;
            let prototype;
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
            } //END if
            if (typeof (parameter) != "function") {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must not of type 'function' in function '" + functionName + "'.");
            } //END if
            try {
                object = new parameter();
            } //END try
            catch (Ex) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            }
            ;
            if (TS.Utils.Assert.isNullOrUndefined(object)) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isObject(object)) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            //
            //Assure that the object is at least one created by the constructor function in argument 'parameter'
            //and not an arbitrary object returned by a factory function.
            //
            if (!(object instanceof parameter)) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            if (!(parameter.prototype.isPrototypeOf(object))) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            //
            // Check whether the new created object is an empty object or not. If the object is an empty object (An object without any properties
            // or methods which are not default values.) treat it as erroneous. A constructor function shouldn't return an empty object because
            // that's meaningless.
            //
            ownPropertyArray = new Array();
            for (let key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    ownPropertyArray.push(key);
                } //END if
            } //END for
            //
            // Check whether the base class is 'Object' or not. If the  base class isn't object, check the own properties on 
            // the prototype. It may be that only the prototype got subclassed.
            //
            if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null) {
                prototype = Object.getPrototypeOf(object);
                for (let key in prototype) {
                    if (Object.prototype.hasOwnProperty.call(prototype, key)) {
                        ownPropertyArray.push(key);
                    } //END if
                } //END for
            } //END if
            //
            // It's an empty object. 
            //
            if (ownPropertyArray.length == 0) {
                throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkConstructorParameter = checkConstructorParameter;
        /**
        * @description This function checks whether the value of argument 'parameter' is a function or not. If not, a 'InvalidTypeException' is thrown.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        */
        function checkFunctionParameter(paramName, parameter, functionName) {
            if (!TS.Utils.Assert.isFunction(parameter)) {
                throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkFunctionParameter = checkFunctionParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined.
        *  Checks also whether the value of argument 'parameter' is an integer number in the range [Number.MIN_SAFE_INTEGER...Number.MAX_SAFE_INTEGER] and throws a
        *  'TS.InvalidTypeException' if the value is either not an integer, out of range or not a number at all. The exceptions message uses the 'paramName' and 'functionName'
        *  in its message to signal which parameter failed the check and  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {number} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkIntNumberParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isIntegerNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid integer number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkIntNumberParameter = checkIntNumberParameter;
        /**
        * @description Checks whether the value of argument 'parameter' is iterable or not. Throws a 'TS.InvalidTypeException' if the value of argument
        *  'parameter' is not iterable. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        */
        function checkIterableParameter(paramName, parameter, functionName) {
            if (!TS.Utils.Assert.isIterable(parameter)) {
                throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an iterable parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkIterableParameter = checkIterableParameter;
        /**
        * @description Checks whether the value of argument  'parameter' is an array of unsigned byte values. Throws a 'TS.InvalidTypeException' if not.
        *  Checks whether the value of argument 'parameter' is an array with 16, 24 or 32 elements. Throws a 'TS.ArgumentOutOfRangeException' if not.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and which function
        *  received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function checkKeyByteArray(paramName, parameter, functionName) {
            if (!TS.Utils.Assert.isUnsignedByteArray(parameter)) {
                throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an unsigned byte value array in function '" + functionName + "'.");
            } //eND if
            if ([16, 24, 32].filter((value) => value == parameter.length).length == 0) {
                throw new TS.ArgumentOutOfRangeException(paramName, parameter, "Argument '" + paramName + "' must be an array of unsigned byte values with [16 | 24 | 32] elements in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkKeyByteArray = checkKeyByteArray;
        /**
        * @description This function checks the argument 'parameter' against null, undefined, an empty string and an empty array and throws a
        *  'TS.ArgumentNullUndefOrEmptyException' if the argument is either of this. The exceptions message uses the 'paramName' and 'functionName'
        *  in its message to signal which parameter failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        */
        function checkNotEmptyParameter(paramName, parameter, functionName) {
            if (TS.Utils.Assert.isNullUndefOrEmpty(parameter)) {
                throw new TS.ArgumentNullUndefOrEmptyException(parameter, "Argument '" + paramName + "' must not be null, undefined, an empty array or an empty string in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkNotEmptyParameter = checkNotEmptyParameter;
        /**
        * @description Checks the value of argument 'parameter' against undefined and throws a 'TS.ArgumentUndefinedException' if
        *  the argument is undefined. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which
        *  parameter failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentUndefinedException}
        */
        function checkNotUndefinedParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isUndefined(parameter)) {
                throw new TS.ArgumentUndefinedException(parameterName, "Argument '" + parameterName + "' must not be undefined in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkNotUndefinedParameter = checkNotUndefinedParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined. Checks also whether the value of argument 'parameter' is a number. Throws a 'TS.InvalidTypeException'
        *  if the value is either not an number. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkNumberParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkNumberParameter = checkNumberParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        */
        function checkParameter(paramName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkParameter = checkParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined. Checks whether the argument 'parameter' is a valid string. Throws a 'TS.InvalidTypeException' if not.
        *  Checks whether the argument 'parameter' is an empty string or whitespace only.Throws a 'TS.ArgumentNullUndefOrWhiteSpaceException' if so.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function checkStringParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isString(parameter)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be string variable in function '" + functionName + "'.");
            } //END if
            if (TS.Utils.Assert.isNullUndefOrWhiteSpace(parameter)) {
                throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkStringParameter = checkStringParameter;
        /**
        * @description Checks whether the value of argument 'parameter' is a valid array of unsigned bytes and throws a 'TS.InvalidTypeException' if not.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.InvalidTypeException}
        */
        function checkUByteArrayParameter(parameterName, parameter, functionName) {
            if (!TS.Utils.Assert.isUnsignedByteArray(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte array in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkUByteArrayParameter = checkUByteArrayParameter;
        /**
        * @description Checks whether the value of argument 'parameter' is a valid unsigned byte value and throws a 'TS.InvalidTypeException' if not.
        *  The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUByteParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isUnsignedByteValue(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte value in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkUByteParameter = checkUByteParameter;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
        *  the argument is either null or undefined. Checks also whether the value of argument 'parameter' is a integer number in the range
        *  [0..Number.MAX_SAFE_INTEGER] or not and throws a 'TS.InvalidTypeException' if the value is either not an integer, out of range or not
        *  a number at all. The exceptions message uses the 'paramName' and 'functionName' in its message to signal which parameter failed the check and
        *  which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUIntNumberParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isUnsignedIntegerNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid positive integer number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkUIntNumberParameter = checkUIntNumberParameter;
        /**
        * @description Takes a sparse array and returns a new created dense array. That is an array where all elements with an 'undefined' value are removed.
        *  If 'allowNull' is set to false, the elements with a 'null' value gets also removed. That is also the default behavior.
        *  Returns an empty array if it is called with an invalid argument.
        *
        * @param {Array<any>}, sparseArray
        * @param {boolean} allowNull,  Default = false
        *
        * @returns {Array<any>}
        */
        function compactArray(sparseArray, allowNull = false) {
            let result;
            if (!TS.Utils.Assert.isArray(sparseArray)) {
                return [];
            } //END if
            if (sparseArray.length == 0) {
                return [];
            } //END if
            result = new Array();
            sparseArray.forEach((value, index, array) => {
                if (allowNull) {
                    if (value !== undefined) {
                        result.push(value);
                    } //END if
                } //END if
                else {
                    if (value !== undefined && value !== null) {
                        result.push(value);
                    } //ENd if
                } //END else
            });
            return result;
        }
        Utils.compactArray = compactArray;
        /**
        * @description Creates a version 4 random GUID which is returned as string in a canonical representation.
        *
        * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
        * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
        *
        * @returns {string}, The new created GUID as string.
        */
        function createGUID() {
            let index;
            let charSetArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            let charSetVariantArray = ["8", "9", "A", "B"];
            let returnString;
            returnString = "";
            for (index = 0; index < 8; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-";
            for (index = 0; index < 4; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-4";
            for (index = 0; index < 3; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-";
            returnString += charSetVariantArray[Math.floor(Math.random() * 4)];
            for (index = 0; index < 4; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 15)];
            } //END for
            returnString += "-";
            for (index = 0; index < 12; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            return returnString;
        }
        Utils.createGUID = createGUID;
        /**
        * @description Finds all currency element which matches with the search pattern given in argument 'currency' and returns them in an array.
        *  The function returns an empty result array if there is no match for the provided search pattern.
        *
        * @param {string} currency, the search pattern used to identify a currency.
        *
        * @returns {Array<ICurrency>}, all matching currencies.
        */
        function findAllCurrencies(currency) {
            let resultArray = new Array();
            if (Utils.Assert.isNullUndefOrWhiteSpace(currency)) {
                return resultArray;
            }
            currency = currency.trim();
            let upperCurrency = currency.toUpperCase();
            resultArray = Utils.currencyArray.filter((value, index, array) => {
                if (currency.length > 3) {
                    if (value.Name.toUpperCase().indexOf(upperCurrency) > -1) {
                        return true;
                    }
                }
                if ((currency.length == 3) && (value.Code == upperCurrency)) {
                    return true;
                }
                if (value.Symbol == currency) {
                    return true;
                }
                return false;
            });
            return resultArray;
        }
        Utils.findAllCurrencies = findAllCurrencies;
        /**
        * @description Finds the currency element which matches with the search pattern given in argument 'currency'
        *  and returns that currency element. If the search pattern leads to multiple results, a 'TS.AmbiguousResultException'
        *  exceptions gets thrown. The function returns null if there is no match for the provided search pattern.
        *
        * @param {string} currency, the search pattern used to identify a currency.
        * @returns {ICurrency} | null, the identified currency, or null.
        * @throws {TS.AmbiguousResultException}
        */
        function findSingleCurrency(currency) {
            if (Utils.Assert.isNullUndefOrWhiteSpace(currency)) {
                return null;
            }
            currency = currency.trim();
            let upperCurrency = currency.toUpperCase();
            let found = Utils.currencyArray.filter((value, index, array) => {
                return (value.Name.toUpperCase() == upperCurrency || value.Code == upperCurrency || value.Symbol == currency);
            });
            if (found.length > 1) {
                throw new TS.AmbiguousResultException("currency", currency, "Found multiple possible currency results for the given search string.");
            }
            if (found.length == 0) {
                return null;
            }
            return found[0];
        }
        Utils.findSingleCurrency = findSingleCurrency;
        /**
        * @description Searches for the next occurrence of 'searchString' in 'sourceString' beginning at positon 'startIndex' and returns the
        *  position in the string as number. If argument 'startIndex' isn't provided, search begins at the last position in 'sourceString'.
        *  The search direction is in reverse order. That means the search starts at the provided startIndes and goes down two lower indexes during
        *  search. Returns -1 if the 'searchString' doesn't exist in the 'sourceString'.
        *
        * @param {string} sourceString
        * @param {number} startIndex,
        * @param {string} searchString
        *
        * @returns {number}, The position where the searchString was found or -1.
        */
        function nextIndexOfReverse(sourceString, searchString, startIndex) {
            let index;
            if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString)) {
                return -1;
            } //END if
            if (!TS.Utils.Assert.isNullOrUndefined(startIndex)) {
                if (!TS.Utils.Assert.isUnsignedIntegerNumber(startIndex)) {
                    return -1;
                } //END if
                else {
                    index = startIndex;
                } //END else
            } //END if
            else {
                index = sourceString.length;
            } //END else
            if (startIndex - searchString.length < 0) {
                return -1;
            } //END if
            if (sourceString.length < searchString.length) {
                return -1;
            } //END if
            if (searchString.length == 0) {
                return -1;
            } //END if
            while (index > 0) {
                if (sourceString.substr(index, searchString.length) == searchString) {
                    return index;
                } //END if
                index--;
            } //END while
            return -1;
        }
        Utils.nextIndexOfReverse = nextIndexOfReverse;
        /**
        * @description Takes the string from argument 'path' and returns a new string which is normalized by the following rules:
        * 1)  Replace all "\" by "/"
        * 2)  Replace all "/./ by "/"
        * 3)  Replace all "//" by "/";
        * 4)  Navigate up one hierarchy level for all '/../' except for those at the root level.
        * 5)  Remove trailing "/";
        *
        * @param {string} path
        *
        * @returns {string}
        */
        function normalizePath(path) {
            let returnPath;
            if (TS.Utils.Assert.isNullOrUndefined(path)) {
                return "";
            } //END if
            if (!TS.Utils.Assert.isString(path)) {
                return "";
            } //END if
            if (path.trim().length == 0) {
                return "";
            } //END if
            returnPath = new String(path);
            while (returnPath.indexOf("\\") > -1) {
                returnPath = returnPath.replace("\\", "/");
            } //END while
            while (returnPath.indexOf("/./") > -1) {
                returnPath = returnPath.replace("/./", "/");
            } //END while
            while (returnPath.indexOf("//") > -1) {
                returnPath = returnPath.replace("//", "/");
            } //END while
            while (returnPath.indexOf("/../") > -1) {
                if (returnPath.indexOf("/../") == 0) {
                    /* Something like '/../more/path/elements'. Up navigation at the root or the path isn't possible. Simple substitution with a single slash. */
                    returnPath = returnPath.substr(3);
                }
                else if ((returnPath.indexOf("/../") == 2) && (returnPath.indexOf(":") == 1)) {
                    /* Something like 'A:/../'. Up navigation at the drive letter isn't possible. Simple substitution with a single slash. */
                    returnPath = returnPath.substring(0, 2) + returnPath.substr(5);
                }
                else {
                    let leadSegment;
                    let tailSegment;
                    let pathSegmentsArray;
                    returnPath = returnPath.replace("/../", "##");
                    pathSegmentsArray = returnPath.split("##");
                    leadSegment = pathSegmentsArray[0];
                    if (pathSegmentsArray.length > 1) {
                        tailSegment = pathSegmentsArray[1];
                    }
                    else {
                        tailSegment = "";
                    }
                    pathSegmentsArray = leadSegment.split("/");
                    pathSegmentsArray.pop();
                    leadSegment = pathSegmentsArray.join("/");
                    returnPath = leadSegment + "/" + tailSegment;
                }
            }
            if ((returnPath.length > 2) && returnPath.endsWith("/")) {
                returnPath = returnPath.substr(0, returnPath.length - 1);
            } //END if
            return returnPath.toString();
        }
        Utils.normalizePath = normalizePath;
        /**
        * @description Returns a string which is padded with leading characters as specified in argument 'fillChar' until the length provided
        *  in argument 'length'is reached. The function returns a copy of the source string if the values of the arguments 'fillChar' or
        *  'length' are invalid. A copy of the 'source' string is also returned if the length of the source is greater or equal
        *  the value of the 'length' parameter. The function doesn't truncate the string. The function returns a string consisting of
        *  a concatenation of 'fillChar' up to the length given in argument 'length' if the argument value of argument 'source' is invalid, null or empty.
        *
        * @param {string} source
        * @param {string} fillChar
        * @param {number} length
        *
        * @returns {string}
        */
        function padLeft(source, fillChar, length) {
            let fillString;
            let resultString;
            if (TS.Utils.Assert.isNullUndefOrEmpty(fillChar)) {
                return new String(source).toString();
            } //END if
            if (!TS.Utils.Assert.isUnsignedIntegerNumber(length)) {
                return new String(source).toString();
            } //END if
            fillString = fillChar;
            while (fillString.length < length) {
                fillString += fillString;
            } //END while
            fillString = fillString.substr(0, length);
            if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                return fillString;
            } //END if
            else {
                fillString = fillString.substr(0, length - source.length);
                fillString += source;
                return fillString;
            } //END else
        }
        Utils.padLeft = padLeft;
        /**
        * @description Removes the BOM from an UTF-8 encoded file.
        *
        * @param {string} text
        *
        * @returns {string}
        */
        function removeUTF8BOM(text) {
            return text.replace("ï»¿", "");
        }
        Utils.removeUTF8BOM = removeUTF8BOM;
        /**
        * @description Retuns a string representation in hexadecimal notation of the unsigned 8 bit value provided in argument 'value'.
        *  The returned string has a fixed lenght of 2 characters. Number values below 16 are padded with a leading '0' character.
        *
        * @param {number}, value
        *
        * @returns {string}, A 2 characters string representing the UByte value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UByteToHexString(value) {
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UByteToHexString");
            if (value > 0xFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsingend 8 bit integer in function 'TS.Utils.UByteToHexString'.");
            } //END if
            return ((value < 16) ? "0" + value.toString(16) : value.toString(16));
        }
        Utils.UByteToHexString = UByteToHexString;
        /**
        * @description Converts the unsigned 32 bit integer number in argument 'value' into an array of 4 byte values and returns that array.
        *  The array will be padded with leading 0 byte values for lower numbers until the length of 4 byte values is reached.
        *
        * @param {number} value
        *
        * @returns {Array<number>}, An array of 4 byte values.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt32To4ByteArray(value) {
            let resultArray;
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32To4ByteArray");
            if (value > 0xFFFFFFFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsinged 16 bit integer in function 'TS.Utils.UInt32To4ByteArray'.");
            } //END if
            resultArray = UIntToByteArray(value);
            while (resultArray.length < 4) {
                resultArray.unshift(0);
            } //END while
            return resultArray;
        }
        Utils.UInt32To4ByteArray = UInt32To4ByteArray;
        /**
        * @description Retuns a string representation in hexadecimal notation of the unsingned 32 bit integer value provided in arguemnt 'value'.
        *  The returned string has a fixed lenght of 8 characters. The returned string will be padded with as much leading '0' as necessary to
        *  reach the length of 8 characters.
        *
        * @param {number}, value
        *
        * @returns {string}, A string of 8 characters representing the UInt32 value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt32ToHexString(value) {
            let resultString;
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32ToHexString");
            if (value > 0xFFFFFFFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsigned 32 bit integer in function 'TS.Utils.UInt32ToHexString'.");
            } //END if
            resultString = value.toString(16);
            return TS.Utils.padLeft(resultString, "0", 8);
        }
        Utils.UInt32ToHexString = UInt32ToHexString;
        /*
        * @description Converts the unsigned integer number in argument 'value' into an array of byte values and returns that array. The array
        *  has as much elements as necessary to represent the value given in argument 'value'.
        *
        * @param {number} value, Has to be an unsigned integer.
        *
        * @returns {Array<number>}, An array of byte values.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function UIntToByteArray(value) {
            let resultArray;
            let byte;
            TS.Utils.checkParameter("value", value, "TS.Utils.UIntToByteArray");
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UIntToByteArray");
            resultArray = new Array();
            while (value > 0) {
                byte = value & 0xff;
                resultArray.unshift(byte);
                value = (value - byte) / 256;
            } //END while
            return resultArray;
        }
        Utils.UIntToByteArray = UIntToByteArray;
    })(Utils = TS.Utils || (TS.Utils = {}));
})(TS || (TS = {}));
var TS;
(function (TS) {
    "use strict";
    var Utils;
    (function (Utils) {
        /**
        * @description A collection of assertion functions. Those are functions which take on argument and return a boolean value.
        *  The boolean value describes whether the argument satisfies a specific condition or not.
        */
        var Assert;
        (function (Assert) {
            /**
            * @description Returns true if the type of the argument 'source' is an arguments type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArguments(source) {
                if (TS.Utils.Assert.isObject(source)) {
                    return source.toString().toLowerCase().indexOf("arguments") > -1;
                } //END if
                return false;
            }
            Assert.isArguments = isArguments;
            /**
            * @description  Returns true if the type of the argument 'source' is an array type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArray(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Array.isArray(source);
            }
            Assert.isArray = isArray;
            /**
            * @description  Returns true if the type of the argument 'source' is an array like type, otherwise false.
            *  Array like types are collections like the arguments or collection or DOM collections. They have a
            *  length property but they are actually not arrays because they have no indexer.
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArrayLike(source) {
                //if (TS.Utils.Assert.isIterable(source))
                //{
                //  return false;
                //}
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                }
                if (TS.Utils.Assert.isNullOrUndefined(source.length)) {
                    return false;
                }
                if (!TS.Utils.Assert.isUnsignedIntegerNumber(source.length)) {
                    return false;
                }
                return true;
            }
            Assert.isArrayLike = isArrayLike;
            /**
            * @description  Returns true if the type of the argument 'source' is a dense array type. That means
            *  the array contains no element which is undefined. Returns false otherwise.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDenseArray(source) {
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return !source.some((value, index, array) => value === undefined);
            }
            Assert.isDenseArray = isDenseArray;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty binary string. If the string
            *  contains other characters than '0' and '1', even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBinaryString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[01]+$/gmi).test(source);
            }
            Assert.isBinaryString = isBinaryString;
            /**
            * @description Returns true if the type of the argument 'source' is a boolean type, otherwise false.
            *
            * @see TS.Utils.Assert.isBooleanValue
            * @see TS.Utils.Assert.isBooleanObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBoolean(source) {
                return TS.Utils.Assert.isBooleanObject(source) || TS.Utils.Assert.isBooleanValue(source);
            }
            Assert.isBoolean = isBoolean;
            /**
            * @description  Returns true if the type of the argument 'source' is a boolean object type created with
            *  'new Boolean()', otherwise false.
            *
            * @see TS.Utils.Assert.isBooleanValue
            * @see TS.Utils.Assert.isBoolean
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBooleanObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "boolean";
            }
            Assert.isBooleanObject = isBooleanObject;
            /**
            * @description Returns true if the type of the argument 'source' is a boolean value type (true or false),
            *  otherwise false.
            *
            * @see TS.Utils.Assert.isBoolean
            * @see TS.Utils.Assert.isBooleanObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBooleanValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source) == "boolean";
            }
            Assert.isBooleanValue = isBooleanValue;
            /**
            * @description Returns true if the type of the argument 'source' is considered a valid constructor functions which
            *  creates a none empty object, otherwise false.
            *  An empty object is one which can be created using an object literal like '{}' or calling the Object constructor
            *  with a null argument 'new Object(null)'. If the constructor function returns such an object the constructor will
            *  fail the test.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isConstructor(source) {
                let object;
                let ownPropertyArray;
                let prototype;
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (typeof (source) != "function") {
                    return false;
                } //END if
                try {
                    object = new source();
                } //END try
                catch (Ex) {
                    return false;
                }
                ;
                if (TS.Utils.Assert.isNullOrUndefined(object)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isObject(object)) {
                    return false;
                } //END if
                //
                //Assure that the object is at least one created by the constructor function in argument 'source'
                //and not an arbitrary object returned by a factory function.
                //
                if (!(object instanceof source)) {
                    return false;
                } //END if
                if (!(source.prototype.isPrototypeOf(object))) {
                    return false;
                } //END if
                //
                // Check whether the new created object is an empty object or not. If the object is an empty object (an object without any properties
                // or methods which are not default values.) treat it as erroneous. A constructor function shouldn't return an empty object because
                // that's meaningless.
                //
                //
                // Collect the ownPoperties of the current instance.
                //
                ownPropertyArray = new Array();
                for (let key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        ownPropertyArray.push(key);
                    } //END if
                } //END for
                //
                // Check whether the base class is 'Object' or not. If the base class isn't object, check the own properties on 
                // the prototype. It may be that only the prototype got subclassed.
                //
                if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null) {
                    prototype = Object.getPrototypeOf(object);
                    for (let key in prototype) {
                        if (Object.prototype.hasOwnProperty.call(prototype, key)) {
                            ownPropertyArray.push(key);
                        } //END if
                    } //END for
                } //END if
                //
                // If the 'ownPropertyArray' is still empt consider the object an empty object.
                //
                if (ownPropertyArray.length == 0) {
                    return false;
                } //END if
                return true;
            }
            Assert.isConstructor = isConstructor;
            /**
            * @description Returns true if the type of the argument 'source' is a date object type created with
            *  'new Date()', otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDate(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Object.prototype.toString.call(source).indexOf("Date") > 0;
            }
            Assert.isDate = isDate;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty decimal string.If the string
            *  contains other characters than [0-9], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDecimalString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[0-9]+$/gmi).test(source);
            }
            Assert.isDecimalString = isDecimalString;
            /**
            * @description Returns true if the type of the argument 'source' is an enum type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isEnum(source) {
                let indexArray;
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                indexArray = new Array();
                for (let value in source) {
                    indexArray.push(value);
                } //END for
                if ((indexArray.length % 2) != 0) {
                    return false;
                } //END if
                indexArray = indexArray.slice(0, indexArray.length / 2);
                for (let index = 0; index < indexArray.length; index++) {
                    let value = source[indexArray[index]];
                    if (TS.Utils.Assert.isNullOrUndefined(value)) {
                        return false;
                    } //END if
                    if (source[value] != indexArray[index]) {
                        return false;
                    } //END if
                } //END for
                return true;
            }
            Assert.isEnum = isEnum;
            /**
            * @description Returns true if the type of the argument 'source' is a function type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isFunction(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "function";
            }
            Assert.isFunction = isFunction;
            /**
            * @description Returns true if the type of the argument 'source' is a generator object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isGenerator(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isObject(source)) {
                    let genFunc = Object.getPrototypeOf(function* () { }).constructor;
                    if (source instanceof genFunc) {
                        return true;
                    }
                }
                return source.toString() == "[object Generator]";
            }
            Assert.isGenerator = isGenerator;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty hexadecimal string. If the string
            *  contains other characters than [0-9, A-F, a-f], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isHexString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[0-9A-Fa-f]+$/gmi).test(source);
            }
            Assert.isHexString = isHexString;
            /**
            * @description Returns true if the type of the argument 'source' is a infinite number value type, otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
            }
            Assert.isInfiniteNumber = isInfiniteNumber;
            /**
            * @description Returns true if the value of the argument 'source' is an integer number in the
            *   range of [Number.MIN_SAFE_INTEGER..Number.MAX_SAFE_INTEGER],
            *              otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isPositiveIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIntegerNumber(source) {
                return Number.isSafeInteger(source);
            }
            Assert.isIntegerNumber = isIntegerNumber;
            /**
            * @description Returns true if the value of the argument 'source' is an iterable value, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIterable(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(source[Symbol.iterator])) {
                    return false;
                } //END if
                return true;
            }
            Assert.isIterable = isIterable;
            /**
            * @description This function is just a wrapper around the 'Number.isNaN' function. It's only purpose is to make
            *  the assertion functions available in on place.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNaN(source) {
                return Number.isNaN(source);
            }
            Assert.isNaN = isNaN;
            /**
            * @description Returns true if the type of the argument 'source' is a negative
            *              infinite number value type, otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNegativInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
            }
            Assert.isNegativInfiniteNumber = isNegativInfiniteNumber;
            /**
            * @description Returns true if the value of the argument 'source' is null, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNull(source) {
                return source === null;
            }
            Assert.isNull = isNull;
            /**
            * @description Returns true if the value of the argument 'source' is null or undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNullOrUndefined(source) {
                if (TS.Utils.Assert.isUndefined(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNull(source)) {
                    return true;
                } //END if
                return false;
            }
            Assert.isNullOrUndefined = isNullOrUndefined;
            function isNullUndefOrEmpty(source) {
                if (TS.Utils.Assert.isUndefined(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNull(source)) {
                    return true;
                } //END if
                if (Array.isArray(source)) {
                    return source.length == 0;
                } //END if
                if (TS.Utils.Assert.isString(source)) {
                    return String(source).length == 0;
                } //END if
                return false;
            }
            Assert.isNullUndefOrEmpty = isNullUndefOrEmpty;
            /**
            * @description Returns true if the argument value is either null or undefined or is a string wich is either
            *  empty or contains only white space characters.
            *
            * @param {string} source
            *
            * @returns {boolean}
            */
            function isNullUndefOrWhiteSpace(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return true;
                } //END if
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                if (source.trim().length == 0) {
                    return true;
                } //END if
                return false;
            }
            Assert.isNullUndefOrWhiteSpace = isNullUndefOrWhiteSpace;
            /**
            * @description  Returns true if the type of the argument 'source' is a number type, otherwise false.
            *
            * @see TS.Utils.Assert.isIntegerNumber
            * @see TS.Utils.Assert.isNumberObject
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isPositiveIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNumber(source) {
                return TS.Utils.Assert.isNumberObject(source) || TS.Utils.Assert.isNumberValue(source);
            }
            Assert.isNumber = isNumber;
            /**
            * @description Returns true if the type of the argument 'source' is a number object type created with 'new Number()', otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            *
            * @param {any} source
            * @returns {boolean}
            */
            function isNumberObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "number";
            }
            Assert.isNumberObject = isNumberObject;
            /**
            * @description Returns true if the type of the argument 'source' is a number value type, otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNumberValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                if (typeof (source) == "number") {
                    if (Number.isNaN(source)) {
                        return false;
                    } //END if
                    return true;
                } //END if
                return false;
            }
            Assert.isNumberValue = isNumberValue;
            /**
            * @description Returns true if the type of the argument 'source' is a positive infinite number value type, otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
            }
            Assert.isUnsignedInfiniteNumber = isUnsignedInfiniteNumber;
            /**
            * @description Returns true if the type of argument 'source' is either a boolean value, a number value or
            *  a string value. Otherwise the result value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isPrimitiveType(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isBooleanValue(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNumberValue(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isStringValue(source)) {
                    return true;
                } //END if
                return false;
            }
            Assert.isPrimitiveType = isPrimitiveType;
            /**
            * @description Returns true if the type of the argument 'source' is an object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isObject(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "object";
            }
            Assert.isObject = isObject;
            /**
            * @description Returns true if the value of the argument 'source' is a valid integer number in the range of [0..Number.MAX_SAFE_INTEGER], otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedIntegerNumber(source) {
                if (TS.Utils.Assert.isIntegerNumber(source)) {
                    return source > -1;
                } //END if
                return false;
            }
            Assert.isUnsignedIntegerNumber = isUnsignedIntegerNumber;
            /**
            * @description Returns true if the type of the argument 'source' is an array of byte values, otherwise false.
            *
            * @see TS.Utils.Assert.isByteValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isByteArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isByteValue(value);
                    } //END else
                });
            }
            Assert.isByteArray = isByteArray;
            /**
            * @description Returns true if the type of the argument 'source' is an array of string values, otherwise false.
            *
            * @see TS.Utils.Assert.isStringValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isStringArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isStringValue(value);
                    } //END else
                });
            }
            Assert.isStringArray = isStringArray;
            /**
            * @description Returns true if the type of the argument 'source' is an array of unsinged byte values, otherwise false.
            *
            * @see TS.Utils.Assert.isUnsignedByteValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedByteArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value, index, array) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isUnsignedByteArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isUnsignedByteValue(value);
                    } //END else
                });
            }
            Assert.isUnsignedByteArray = isUnsignedByteArray;
            /**
            * @description  Returns true if the type of the argument 'source' is a regular expression type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRegEx(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Object.prototype.toString.call(source).indexOf("RegExp") > 0;
            }
            Assert.isRegEx = isRegEx;
            /**
            * @description Returns true if the type of the argument 'source' is a string, type, otherwise false.
            *
            * @see TS.Utils.Assert.isStringLiteral
            * @see TS.Utils.Assert.isStringObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isString(source) {
                return TS.Utils.Assert.isStringObject(source) || TS.Utils.Assert.isStringValue(source);
            }
            Assert.isString = isString;
            /**
            * @description Returns true if the type of the argument 'source' is a string object type created with 'new String()',
            *  otherwise false.
            *
            * @see TS.Utils.Assert.isString
            * @see TS.Utils.Assert.isStringLiteral
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "string";
            }
            Assert.isStringObject = isStringObject;
            /**
            * @description Returns true if the type of the argument 'source' is a string value type, otherwise false.
            *
            * @see TS.Utils.Assert.isString
            * @see TS.Utils.Assert.isStringObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source) == "string";
            }
            Assert.isStringValue = isStringValue;
            /**
            * @description Returns true if the type of the argument 'source' is a symbol type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isSymbol(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "symbol";
            }
            Assert.isSymbol = isSymbol;
            /**
            * @description Returns true if the value of the argument 'source' is undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUndefined(source) {
                return source === undefined;
            }
            Assert.isUndefined = isUndefined;
            /**
            * @description Returns true if the type of the argument 'source' is in the  ranche of signed byte values [-127 .. 127], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isIntegerNumber(source)) {
                    return false;
                } //END if
                return ((source >= -127) && (source <= 127));
            }
            Assert.isByteValue = isByteValue;
            /**
            * @description Returns true if the type of the argument 'source' is in the ranche of unsigned byte values [0 .. 255], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedByteValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isIntegerNumber(source)) {
                    return false;
                } //END if
                return ((0 <= source) && (source < 256));
            }
            Assert.isUnsignedByteValue = isUnsignedByteValue;
            /**
            * @description Returns true if the value of the argument 'source' is a valid element of the enumeration in argument 'enumObj'.
            *
            * @param {number | string} source
            * @param {Object} enumObj
            *
            * @returns {boolean}
            */
            function isValueOfEnum(source, enumObj) {
                let elementArray;
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isNumberValue(source) && !TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(enumObj)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isEnum(enumObj)) {
                    return false;
                } //END if
                elementArray = new Array();
                for (let item in enumObj) {
                    elementArray.push(item);
                }
                return (elementArray.find((value) => value == source) != undefined);
            }
            Assert.isValueOfEnum = isValueOfEnum;
        })(Assert = Utils.Assert || (Utils.Assert = {})); //END class
    })(Utils = TS.Utils || (TS.Utils = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
        /**
         * @class
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
            * @override {TS.Exception}
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
         * @class
         *
         * @description This exceptions signals an error in a function which expects a none empty enumerator to operate on.
         *
         * @extends {TS.Exception}
         */
        class EmptyEnumeratorException extends TS.Exception {
            /**
            *  @constructor
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
            * @override {TS.Exception}
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
        class MoreThanOneElementException extends TS.Exception {
            /**
            * @constructor
            * @param {Iterable<any>} enumerator
            * @param {string} message?
            * @param {TS.Exception} innerException)
            */
            constructor(enumerator, message, innerException) {
                super(message, innerException);
                this.internalEnumerator = null;
                this.internalEnumerator = enumerator;
            }
            /**
            * @overwrite
            */
            get type() {
                return "TS.Linq.MoreThanOneElementException";
            }
            get enumerator() {
                return this.internalEnumerator;
            }
        }
        Linq.MoreThanOneElementException = MoreThanOneElementException; //END class
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
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
            cycle() {
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
            selectMany(selector) {
                return TS.Linq.Extensions.selectMany(this, selector);
            }
            sequenceEqual(secondEnumerator, equalityComparer) {
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
            toArray() {
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
            toDictionary(keySelector) {
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
            zip(secondEnum, func) {
                return TS.Linq.Extensions.zip(this, secondEnum, func);
            }
        }
        Linq.BaseEnumerator = BaseEnumerator;
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
        /**
        * @class
    
        * @descripton  The 'TS.Linq.Enumerator' class is used by the Linq extension functions. The Enumerator class is the TypeScript equivalent to
        *  the ES6 Iteration protocols.
        *
        * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | MDN}
        */
        class Enumerator extends Linq.BaseEnumerator {
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
             * @description This function returns the Iterator of the current Enumerator as soon
             *   as an iteration starts. E.g. when a 'for ( let x of enumerator)' is called.
             *
             * @implements {BaseEnumerator<T>}
             *
             * @returns {IterableIterator<T>}, an instance of the iterator type.
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
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
        var Extensions;
        (function (Extensions) {
            function aggregate(enumerator, accumulator, seed) {
                let resultValue;
                let isEmpty = true;
                let isFirst = true;
                let useSeed = false;
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.aggregate");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.aggregate");
                TS.Utils.checkParameter("accumulator", accumulator, "TS.Linq.Extensions.aggregate");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.all");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.all");
                TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.all");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.any");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.average");
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
                TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.concat");
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.concat");
                TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.concat");
                TS.Utils.checkIterableParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.concat");
                var _arr;
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.contains");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.count");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.cycle");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.defaultIfEmpty");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.distinct");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAt");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.elementAtOrDefault");
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
                TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.except");
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.except");
                TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.except");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.first");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.firstOrDefault");
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
            * @retuns {Iterable<TSource>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function forEach(enumerator, action) {
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.forEach");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.forEach");
                TS.Utils.checkParameter("action", action, "TS.Linq.Extensions.foreach");
                TS.Utils.checkFunctionParameter("action", action, "TS.Linq.Extensions.forEach");
                for (let item of enumerator) {
                    action(item);
                }
                return new TS.Linq.Enumerator(enumerator);
            }
            Extensions.forEach = forEach;
            function groupBy(enumerator, keySelector, equalityComparer, elementSelector) {
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.groupBy");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.groupBy");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.groupBy");
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
                TS.Utils.checkParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.groupJoin");
                TS.Utils.checkParameter("resultSelector", resultSelector, "TS.Linq.Extensions.groupJoin");
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
                TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.intersect");
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.intersect");
                TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.intersect");
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
                TS.Utils.checkParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkIterableParameter("outerEnumerator", outerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkIterableParameter("innerEnumerator", innerEnumerator, "TS.Linq.Extensions.join");
                TS.Utils.checkParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkFunctionParameter("outerKeySelector", outerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkFunctionParameter("innerKeySelector", innerKeySelector, "TS.Linq.Extensions.join");
                TS.Utils.checkParameter("resultSelector", resultSelector, "TS.Linq.Extensions.join");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.last");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.lastOrDefault");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.max");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.min");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderByDescending");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderByDescending");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderByDescending");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.random");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.reverse");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.select");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.select");
                TS.Utils.checkParameter("selector", selector, "TS.Linq.Extensions.select");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.selectMany");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.selectMany");
                TS.Utils.checkParameter("selector", selector, "TS.Linq.Extensions.selectMany");
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
                TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.sequenceEqual");
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.sequenceEqual");
                TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.sequenceEqual");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.shuffle");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.single");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.singleOrDefault");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.skip");
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
            * @parem {(item: TSource) => boolean} predicate
            *
            * @returns {TS.Linq.Enumerator<TSource>}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            function skipWhile(enumerator, predicate) {
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.skipWhile");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.skipWhile");
                TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.skipWhile");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.sum");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.take");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.takeWhile");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.takeWhile");
                TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.takeWhile");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.orderBy");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.orderBy");
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
                return new Linq.OrderedEnumerator(enumerator, keySelector, comparer);
            }
            Extensions.thenBy = thenBy;
            function thenByDescending(enumerator, keySelector, comparer) {
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.thenByDescending");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.thenByDescending");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.thenByDescending");
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
                return new Linq.OrderedEnumerator(enumerator, keySelector, reverseComparer);
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toArray");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toDictionary");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toDictionary");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.toDictionary");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.toList");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.toList");
                return new TS.Collections.List(true, enumerator);
            }
            Extensions.toList = toList;
            function union(firstEnumerator, secondEnumerator, equalityComparer) {
                TS.Utils.checkParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.union");
                TS.Utils.checkIterableParameter("firstEnumerator", firstEnumerator, "TS.Linq.Extensions.union");
                TS.Utils.checkParameter("secondEnumerator", secondEnumerator, "TS.Linq.Extensions.union");
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.where");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.where");
                TS.Utils.checkParameter("predicate", predicate, "TS.Linq.Extensions.selectMany");
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
                TS.Utils.checkParameter("firstEnum", firstEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkIterableParameter("firstEnum", firstEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkParameter("secondEnum", secondEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkIterableParameter("secondEnum", secondEnum, "TS.Linq.Extensions.zip");
                TS.Utils.checkParameter("func", func, "TS.Linq.Extensions.zip");
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
        })(Extensions = Linq.Extensions || (Linq.Extensions = {})); //END module
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
var TS;
(function (TS) {
    "use strict";
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
        /**
        * @class OrderedEnumerator<T, TKey>
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.OrderedEnumerator constructor");
                TS.Utils.checkParameter("comparer", comparer, "TS.Linq.OrderedEnumerator constructor");
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
            * @get {TS.Liny.OrderedEnumerator<any, any>}
            */
            static get Empty() {
                return new OrderedEnumerator(Linq.Enumerator.Empty, (item) => item, (first, second) => 0);
            }
            /**
             * @implements {TS.Linq.BaseEnumerator<T>}
             *
             * @returns {Iterator<T>}, an instance of the iterator type.
             */
            [Symbol.iterator]() {
                let flatArray = this.flatPartitions(this.partitionIterator());
                return new ArrayIterator(flatArray);
            }
            /**
             * @implements {TS.Linq.IOrderedEnumerator<T>}
             *
             * @returns {Iterator<Iterator<T>}, an instance of the partitioned iterator type.
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
        /* Inner class: BaseOrderedEnumerator<T>                           */
        /*************************************************************************/
        /**
        * @class BaseOrderedEnumerator<T>
        *
        * @internal
        */
        class BaseOrderedEnumerator {
            constructor(enumerator) {
                this.enumerator = enumerator;
                this.done = false;
            }
            partitionIterator() {
                return new ArrayIterator([this.enumerator[Symbol.iterator]()]);
            }
        }
        /*************************************************************************/
        /* Inner class: PartitionIterator                                       */
        /*************************************************************************/
        /**
         * @class PartitionIterator<T, TKey>
         * The 'PartitionIterator<T>' class is returned by the 'OrderedEnumerator' class and all
         * derived classes in order to iterate over the class elements. During iteration the 'next' function
         * of this class is called. If the iteration passed the end of the result set, every subsequent
         * call to next will return a 'IteratorResult<T>' object which has the 'done' flag set.
         *
         * @implements {Iterator<Iterator<T>>}
         *
         * @internal
         */
        class PartitionIterator {
            /**
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
            init() {
                this.resultArray = this.createPartions(this.orderedEnumerator, this.keySelector, this.comparer);
                this.initalized = true;
            }
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
         //END class TPartitionIterator
        ///*************************************************************************/
        ///* Inner class: ArrayIterator                                            */
        ///*************************************************************************/
        /**
         * @class ArrayIterator<T>
         * @internal
         */
        class ArrayIterator {
            /**
             *
             * @param source, the source object or collection used in this iterator.
             * @param selector, a selector function which determines the result set.
             * @throws {TS.ArgumentNullOrUndefinedException}
             */
            constructor(source) {
                this.initalized = false;
                this.index = -1;
                TS.Utils.checkArrayParameter("source", source, "TS.Linq.OrderedEnumerator.TArrayIterator.constructor");
                this.innerArray = TS.Utils.compactArray(source);
            }
            next() {
                if (this.innerArray.length > 0) {
                    return { done: false, value: this.innerArray.shift() };
                }
                return { done: true, value: null };
            }
        }
         //END class
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Linq;
    (function (Linq) {
        /**
         * @class Grouping<TKey, T>
         *
         * @description This class is an extension of the TS.Linq.Enumerator<T> class and is the returned type of the TS.Linq.Extensions.groupBy function.
         *
         * @extends {TS.Linq.Enumerator<T>}
         *
         * @implements {IGrouping<TKey, T>}
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
                TS.Utils.checkParameter("enumerator", enumerator, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkIterableParameter("enumerator", enumerator, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkParameter("keySelector", keySelector, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkFunctionParameter("keySelector", keySelector, "TS.Linq.Extensions.Grouping constructor");
                TS.Utils.checkParameter("equalityComparer", equalityComparer, "TS.Linq.Extensions.Grouping constructor");
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
    })(Linq = TS.Linq || (TS.Linq = {}));
})(TS || (TS = {}));
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Collections;
    (function (Collections) {
        //********************************************************************************
        // Duplicate key exception
        //********************************************************************************
        /**
        * @class DuplicateKeyException
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
            * @overwrite {TS.Exception}
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
         *  @class InvalidKeyException
         *
         *  @description This exception signals a general problem with a key of a collection.
         *
         *  @extends {TS.Exception}
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
            * @overwrite {TS.Exception}
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
    "use strict";
    var Collections;
    (function (Collections) {
        /**
        * @class KeyValuePair<TKey, TValue>
        *
        * @description This is the implementation of the key value pair used by the dictionary class.
        *
        * @see {@link https://msdn.microsoft.com/en-us/library/5tbh8a42(v=vs.110).aspx | MSDN}
        */
        class KeyValuePair {
            ///**
            //* @set {TValue} value
            //*/
            //public set value(newValue: TValue)
            //{
            //  if (this.internalValue != newValue)
            //  {
            //    this.internalValue = newValue;
            //  }
            //}
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
var TS;
(function (TS) {
    "use strict";
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    "use strict";
    var Collections;
    (function (Collections) {
        /**
        * @class List<T>
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
            constructor(allowNull = true, sourceOrGenerator, predicate) {
                super();
                this.length = 0;
                this.internalAllowNull = allowNull;
                TS.Utils.checkBooleanParameter("allowNull", allowNull, "constructor of TS.Collections.List");
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
    "use strict";
    var Collections;
    (function (Collections) {
        /**
        * @class Dictionary<TKey, TValue>
        *
        * @description This class is an implementation of the IDictionary<TKey, TValue> interface and
        *  TypeScript counterpart of the .NET Dictionary<TKey, TValue> class. Some methods of this class
        *  behave different than the C# counterpart, some are new and some C# methods are not implemented.
        *  Those differences are mainly caused by the javascript limitations. Read the method descriptions
        *  to learn more about the variations.
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
            * @description Create a new instance of the  TS.Collections.Dictionary<TKey, TValue> class.
            *  Creates a shallow copy of the iterable 'KeyValuePair' source if provided.
            *  Uses the default equality comparer (===) for the key comparsion if there isn't a key equality comparer
            *  provided in argument 'keyEqualityComparer'.
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
                //
                //Javascript arrays don't have a fixed length. There is no need to check the array range.
                //
                //if (targetArray.length < destIndex)
                //{
                //  throw new TS.ArgumentOutOfRangeException("targetArray.length", targetArray.length, "The value of 'destIndex' exceeded the range of the target array in function 'TS.Collections.Dictionary.copyTo'.");
                //}//END if
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
            * @description Returns the item with the specified key from the Dictionary<TKey, TValue>.
            *  Returns an undefined value if the dictionary doesn't contain an item with the specified key.
            *  There is no equivalent method in the C# dictionary implementation.
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
            * @description Returns the value of the item with the specified key from the Dictionary<TKey, TValue>.
            *  Returns an undefined value if the dictionary doesn't contain an item with the specified key.
            *  This method is a substitute for the index access implemented in the C# dictionary.
            *  In TypeScript you can only crate indexers for strings or numbers. But a dictionary key can
            *  have any type. So there is no other way than creating a set and get function as a substitute.
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
            * @description Sets the value of argument 'newValue' to the item with the specified key in the dictionary.
            *  This method is a substitute for the index access implemented in the C# dictionary.
            *  In TypeScript you can only crate indexers for strings or numbers. But a dictionary key can
            *  have any type. So there is no other way than creating a set and get function as a substitute.
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
                TS.Utils.checkParameter("key", key, "TS.TypeCode.setItem");
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
/// <reference path="./Exception/Exception.ts" />
/// <reference path="./Utils/Utils.ts" />
/// <reference path="./Utils/Assert.ts" />
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
/// <reference path="./Collections/Ilist.ts" />
/// <reference path="./Collections/List.ts" />
/// <reference path="./Collections/Dictionary.ts" />
