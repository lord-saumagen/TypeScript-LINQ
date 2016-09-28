/// <reference path="../_references.ts" />
namespace TS
{
  "use strict";


  /**
   * @description The module 'Utils' hosts a collection of funcitons which offer solutions for common
   *  problems or reoccuring tasks which are not class specific. Since they are not class specific, they
   *  are also not part of a class. They are simpley collected in this file and are part of the namespac.
   *  Alle of the functions are static. 
   */
  export namespace Utils
  {

    /**
    * @interface ICurrency
    */
    export interface ICurrency
    {
      Name: string,
      Code: string,
      Symbol: string
    }


    /**
     * @description An array of currencies as defined in ISO 4217
     *
     * @see {@link http://www.iso.org/iso/home/standards/currency_codes.htm | ISO}
     */
    export const currencyArray: Array<ICurrency> = new Array<ICurrency>(
      { Name: "United Arab Emirates Dirham", Code: "AED", Symbol: "" },
      { Name: "Afghanistan Afghani", Code: "AFN", Symbol: "؋" },
      { Name: "Albania Lek", Code: "ALL", Symbol: "" },
      { Name: "Armenia Dram", Code: "AMD", Symbol: "" },
      { Name: "Netherlands Antilles Guilder", Code: "ANG", Symbol: "ƒ" },
      { Name: "Angola Kwanza", Code: "AOA", Symbol: "" },
      { Name: "Argentina Peso", Code: "ARS", Symbol: "$" },
      { Name: "Australia Dollar", Code: "AUD", Symbol: "$" },
      { Name: "Aruba Guilder", Code: "AWG", Symbol: "ƒ" },
      { Name: "Azerbaijan New Manat", Code: "AZN", Symbol: "ман" },
      { Name: "Bosnia and Herzegovina Convertible Marka", Code: "BAM", Symbol: "KM" },
      { Name: "Barbados Dollar", Code: "BBD", Symbol: "$" },
      { Name: "Bangladesh Taka", Code: "BDT", Symbol: "" },
      { Name: "Bulgaria Lev", Code: "BGN", Symbol: "лв" },
      { Name: "Bahrain Dinar", Code: "BHD", Symbol: "" },
      { Name: "Burundi Franc", Code: "BIF", Symbol: "" },
      { Name: "Bermuda Dollar", Code: "BMD", Symbol: "$" },
      { Name: "Brunei Darussalam Dollar", Code: "BND", Symbol: "$" },
      { Name: "Bolivia Bolíviano", Code: "BOB", Symbol: "$b" },
      { Name: "Brazil Real", Code: "BRL", Symbol: "R$" },
      { Name: "Bahamas Dollar", Code: "BSD", Symbol: "$" },
      { Name: "Bhutan Ngultrum", Code: "BTN", Symbol: "" },
      { Name: "Botswana Pula", Code: "BWP", Symbol: "P" },
      { Name: "Belarus Ruble", Code: "BYR", Symbol: "p." },
      { Name: "Belize Dollar", Code: "BZD", Symbol: "BZ$" },
      { Name: "Canada Dollar", Code: "CAD", Symbol: "$" },
      { Name: "Congo/Kinshasa Franc", Code: "CDF", Symbol: "" },
      { Name: "Switzerland Franc", Code: "CHF", Symbol: "CHF" },
      { Name: "Chile Peso", Code: "CLP", Symbol: "$" },
      { Name: "China Yuan Renminbi", Code: "CNY", Symbol: "¥" },
      { Name: "Colombia Peso", Code: "COP", Symbol: "" },
      { Name: "Costa Rica Colon", Code: "CRC", Symbol: "₡" },
      { Name: "Cuba Convertible Peso", Code: "CUC", Symbol: "" },
      { Name: "Cuba Peso", Code: "CUP", Symbol: "₱" },
      { Name: "Cape Verde Escudo", Code: "CVE", Symbol: "" },
      { Name: "Czech Republic Koruna", Code: "CZK", Symbol: "Kč" },
      { Name: "Djibouti Franc", Code: "DJF", Symbol: "" },
      { Name: "Denmark Krone", Code: "DKK", Symbol: "kr" },
      { Name: "Dominican Republic Peso", Code: "DOP", Symbol: "RD$" },
      { Name: "Algeria Dinar", Code: "DZD", Symbol: "" },
      { Name: "Egypt Pound", Code: "EGP", Symbol: "£" },
      { Name: "Eritrea Nakfa", Code: "ERN", Symbol: "" },
      { Name: "Ethiopia Birr", Code: "ETB", Symbol: "" },
      { Name: "European Union Euro", Code: "EUR", Symbol: "€" },
      { Name: "Fiji Dollar", Code: "FJD", Symbol: "$" },
      { Name: "Falkland Islands (Malvinas) Pound", Code: "FKP", Symbol: "£" },
      { Name: "United Kingdom Pound", Code: "GBP", Symbol: "£" },
      { Name: "Georgia Lari", Code: "GEL", Symbol: "" },
      { Name: "Guernsey Pound", Code: "GGP", Symbol: "£" },
      { Name: "Ghana Cedi", Code: "GHS", Symbol: "¢" },
      { Name: "Gibraltar Pound", Code: "GIP", Symbol: "£" },
      { Name: "Gambia Dalasi", Code: "GMD", Symbol: "" },
      { Name: "Guinea Franc", Code: "GNF", Symbol: "" },
      { Name: "Guatemala Quetzal", Code: "GTQ", Symbol: "Q" },
      { Name: "Guyana Dollar", Code: "GYD", Symbol: "$" },
      { Name: "Hong Kong Dollar", Code: "HKD", Symbol: "$" },
      { Name: "Honduras Lempira", Code: "HNL", Symbol: "L" },
      { Name: "Croatia Kuna", Code: "HRK", Symbol: "kn" },
      { Name: "Haiti Gourde", Code: "HTG", Symbol: "" },
      { Name: "Hungary Forint", Code: "HUF", Symbol: "Ft" },
      { Name: "Indonesia Rupiah", Code: "IDR", Symbol: "Rp" },
      { Name: "Israel Shekel", Code: "ILS", Symbol: "₪" },
      { Name: "Isle of Man Pound", Code: "IMP", Symbol: "£" },
      { Name: "India Rupee", Code: "INR", Symbol: "" },
      { Name: "Iraq Dinar", Code: "IQD", Symbol: "" },
      { Name: "Iran Rial", Code: "IRR", Symbol: "﷼" },
      { Name: "Iceland Krona", Code: "ISK", Symbol: "kr" },
      { Name: "Jersey Pound", Code: "JEP", Symbol: "£" },
      { Name: "Jamaica Dollar", Code: "JMD", Symbol: "J$" },
      { Name: "Jordan Dinar", Code: "JOD", Symbol: "" },
      { Name: "Japan Yen", Code: "JPY", Symbol: "¥" },
      { Name: "Kenya Shilling", Code: "KES", Symbol: "" },
      { Name: "Kyrgyzstan Som", Code: "KGS", Symbol: "лв" },
      { Name: "Cambodia Riel", Code: "KHR", Symbol: "៛" },
      { Name: "Comoros Franc", Code: "KMF", Symbol: "" },
      { Name: "Korea (North) Won", Code: "KPW", Symbol: "₩" },
      { Name: "Korea (South) Won", Code: "KRW", Symbol: "₩" },
      { Name: "Kuwait Dinar", Code: "KWD", Symbol: "" },
      { Name: "Cayman Islands Dollar", Code: "KYD", Symbol: "$" },
      { Name: "Kazakhstan Tenge", Code: "KZT", Symbol: "лв" },
      { Name: "Laos Kip", Code: "LAK", Symbol: "₭" },
      { Name: "Lebanon Pound", Code: "LBP", Symbol: "£" },
      { Name: "Sri Lanka Rupee", Code: "LKR", Symbol: "₨" },
      { Name: "Liberia Dollar", Code: "LRD", Symbol: "$" },
      { Name: "Lesotho Loti", Code: "LSL", Symbol: "" },
      { Name: "Libya Dinar", Code: "LYD", Symbol: "" },
      { Name: "Morocco Dirham", Code: "MAD", Symbol: "" },
      { Name: "Moldova Leu", Code: "MDL", Symbol: "" },
      { Name: "Madagascar Ariary", Code: "MGA", Symbol: "" },
      { Name: "Macedonia Denar", Code: "MKD", Symbol: "ден" },
      { Name: "Myanmar (Burma) Kyat", Code: "MMK", Symbol: "" },
      { Name: "Mongolia Tughrik", Code: "MNT", Symbol: "₮" },
      { Name: "Macau Pataca", Code: "MOP", Symbol: "" },
      { Name: "Mauritania Ouguiya", Code: "MRO", Symbol: "" },
      { Name: "Mauritius Rupee", Code: "MUR", Symbol: "₨" },
      { Name: "Maldives (Maldive Islands) Rufiyaa", Code: "MVR", Symbol: "" },
      { Name: "Malawi Kwacha", Code: "MWK", Symbol: "" },
      { Name: "Mexico Peso", Code: "MXN", Symbol: "$" },
      { Name: "Malaysia Ringgit", Code: "MYR", Symbol: "RM" },
      { Name: "Mozambique Metical", Code: "MZN", Symbol: "MT" },
      { Name: "Namibia Dollar", Code: "NAD", Symbol: "$" },
      { Name: "Nigeria Naira", Code: "NGN", Symbol: "₦" },
      { Name: "Nicaragua Cordoba", Code: "NIO", Symbol: "C$" },
      { Name: "Norway Krone", Code: "NOK", Symbol: "kr" },
      { Name: "Nepal Rupee", Code: "NPR", Symbol: "₨" },
      { Name: "New Zealand Dollar", Code: "NZD", Symbol: "$" },
      { Name: "Oman Rial", Code: "OMR", Symbol: "﷼" },
      { Name: "Panama Balboa", Code: "PAB", Symbol: "B/." },
      { Name: "Peru Sol", Code: "PEN", Symbol: "S/." },
      { Name: "Papua New Guinea Kina", Code: "PGK", Symbol: "" },
      { Name: "Philippines Peso", Code: "PHP", Symbol: "₱" },
      { Name: "Pakistan Rupee", Code: "PKR", Symbol: "₨" },
      { Name: "Poland Zloty", Code: "PLN", Symbol: "zł" },
      { Name: "Paraguay Guarani", Code: "PYG", Symbol: "Gs" },
      { Name: "Qatar Riyal", Code: "QAR", Symbol: "﷼" },
      { Name: "Romania New Leu", Code: "RON", Symbol: "lei" },
      { Name: "Serbia Dinar", Code: "RSD", Symbol: "Дин." },
      { Name: "Russia Ruble", Code: "RUB", Symbol: "руб" },
      { Name: "Rwanda Franc", Code: "RWF", Symbol: "" },
      { Name: "Saudi Arabia Riyal", Code: "SAR", Symbol: "﷼" },
      { Name: "Solomon Islands Dollar", Code: "SBD", Symbol: "$" },
      { Name: "Seychelles Rupee", Code: "SCR", Symbol: "₨" },
      { Name: "Sudan Pound", Code: "SDG", Symbol: "" },
      { Name: "Sweden Krona", Code: "SEK", Symbol: "kr" },
      { Name: "Singapore Dollar", Code: "SGD", Symbol: "$" },
      { Name: "Saint Helena Pound", Code: "SHP", Symbol: "£" },
      { Name: "Sierra Leone Leone", Code: "SLL", Symbol: "" },
      { Name: "Somalia Shilling", Code: "SOS", Symbol: "S" },
      { Name: "Suriname Dollar", Code: "SRD", Symbol: "$" },
      { Name: "São Tomé and Príncipe Dobra", Code: "STD", Symbol: "" },
      { Name: "El Salvador Colon", Code: "SVC", Symbol: "$" },
      { Name: "Syria Pound", Code: "SYP", Symbol: "£" },
      { Name: "Swaziland Lilangeni", Code: "SZL", Symbol: "" },
      { Name: "Thailand Baht", Code: "THB", Symbol: "฿" },
      { Name: "Tajikistan Somoni", Code: "TJS", Symbol: "" },
      { Name: "Turkmenistan Manat", Code: "TMT", Symbol: "" },
      { Name: "Tunisia Dinar", Code: "TND", Symbol: "" },
      { Name: "Tonga Pa'anga", Code: "TOP", Symbol: "" },
      { Name: "Turkey Lira", Code: "TRY", Symbol: "" },
      { Name: "Trinidad and Tobago Dollar", Code: "TTD", Symbol: "TT$" },
      { Name: "Tuvalu Dollar", Code: "TVD", Symbol: "$" },
      { Name: "Taiwan New Dollar", Code: "TWD", Symbol: "NT$" },
      { Name: "Tanzania Shilling", Code: "TZS", Symbol: "" },
      { Name: "Ukraine Hryvnia", Code: "UAH", Symbol: "₴" },
      { Name: "Uganda Shilling", Code: "UGX", Symbol: "" },
      { Name: "United States Dollar", Code: "USD", Symbol: "$" },
      { Name: "Uruguay Peso", Code: "UYU", Symbol: "$U" },
      { Name: "Uzbekistan Som", Code: "UZS", Symbol: "лв" },
      { Name: "Venezuela Bolivar", Code: "VEF", Symbol: "Bs" },
      { Name: "Viet Nam Dong", Code: "VND", Symbol: "₫" },
      { Name: "Vanuatu Vatu", Code: "VUV", Symbol: "" },
      { Name: "Samoa Tala", Code: "WST", Symbol: "" },
      { Name: "Communauté Financière Africaine (BEAC) CFA Franc BEAC", Code: "XAF", Symbol: "" },
      { Name: "East Caribbean Dollar", Code: "XCD", Symbol: "$" },
      { Name: "International Monetary Fund (IMF) Special Drawing Rights", Code: "XDR", Symbol: "" },
      { Name: "Communauté Financière Africaine (BCEAO) Franc", Code: "XOF", Symbol: "" },
      { Name: "Comptoirs Français du Pacifique (CFP) Franc", Code: "XPF", Symbol: "" },
      { Name: "Yemen Rial", Code: "YER", Symbol: "﷼" },
      { Name: "South Africa Rand", Code: "ZAR", Symbol: "R" },
      { Name: "Zambia Kwacha", Code: "ZMW", Symbol: "" },
      { Name: "Zimbabwe Dollar", Code: "ZWD", Symbol: "Z$" }
    );


    /**
    * @description Searches for all occurrences of 'searchString' in 'sourceString' and returns an array of the indexes where the searchstring
    *  occurred in the sourceString.
    *
    * @param {string} sourceString
    * @param {string} searchString
    *
    * @returns {Array<number>}, An array of indexes where the searchString occurred in the sourceString.
    */
    export function allIndexOf(sourceString: string, searchString: string): Array<number>
    {
      let result: Array<number>;

      result = new Array<number>();

      if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString))
      {
        return result;
      }//END if

      if (sourceString.length < searchString.length)
      {
        return result;
      }//END if

      if (sourceString.indexOf(searchString) < 0)
      {
        return result;
      }//END if

      result.push(sourceString.indexOf(searchString));

      while (sourceString.indexOf(searchString, result[result.length - 1] + 1) > -1)
      {
        result.push(sourceString.indexOf(searchString, result[result.length - 1] + 1));
      }//END while

      return result;
    }


    /**
    * @description Converts a bit string into an array of byte values. The function throws an exceptions if the
    *  value of argument 'bitString' is not a valid bit string.
    *
    * @param {string} bitString, The bit string to convert.
    *
    * @returns {Array<number>}, The resulting byte value array which may be empty.
    *
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.ArgumentNullUndefOrEmptyException}
    * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
    * @throws {TS.InvalidTypeException}
    */
    export function bitStringToByteArray(bitString: string): Array<number>
    {
      let resultArray: Array<number>;
      let byteStringArray: Array<string>;
      let index: number;

      resultArray = new Array<number>();

      TS.Utils.checkNotEmptyParameter("bitString", bitString, "TS.Utils.bitStringToByteArray");
      TS.Utils.checkBitStringParameter("bitString", bitString, "TS.Utils.bitStringToByteArray");


      byteStringArray = new Array<string>();

      while (bitString.length > 0)
      {
        byteStringArray.push(bitString.substr(0, 8));
        bitString = bitString.substr(8);
      }//END while

      for (index = 0; index < byteStringArray.length; index++)
      {
        //Handle the remaining in an appropriate way for the 
        //current block 
        resultArray.push(parseInt(byteStringArray[index], 2));
      }//END for

      return resultArray;
    }


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
    export function byteArrayToBitString(byteArray: Array<number>): string
    {
      let resultString: string;

      TS.Utils.checkNotEmptyParameter("byteArray", byteArray, "TS.Utils.byteArrayToUInt");
      TS.Utils.checkUByteArrayParameter("byteArray", byteArray, "TS.Utils.byteArrayToUInt");

      resultString = "";

      byteArray.forEach((value, index, array) => resultString += byteToBitString(value));

      return resultString;
    }


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
    export function byteArrayToUInt(unsignedByteArray: Array<number>): number
    {
      let resultNumber: number;
      let factor: number;

      TS.Utils.checkNotEmptyParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");
      TS.Utils.checkUByteArrayParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");

      resultNumber = 0;
      factor = 0;

      while (unsignedByteArray.length > 0)
      {
        resultNumber += Math.pow(256, factor) * unsignedByteArray.pop();
        factor++;

        if (resultNumber > Number.MAX_SAFE_INTEGER)
        {
          throw new TS.ArgumentOutOfRangeException("unsignedByteArray", unsignedByteArray, "Argument 'unsignedByteArray' exceedes the maximum number range during conversion to an unsigned number in function TS.Utils.byteArrayToUInt");
        }//END if
      }

      return resultNumber;
    }


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
    export function byteToBitString(value: number): string
    {
      let resultString: string;

      TS.Utils.checkParameter("value", value, "TS.Utils.byteToBitString");
      TS.Utils.checkUByteParameter("value", value, "TS.Utils.byteToBitString");

      resultString = "";
      resultString += value.toString(2);
      resultString = padLeft(resultString, "0", 8);
      return resultString;
    }


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
    export function checkArrayLikeParameter(paramName: string, parameter: any, functionName: string): void
    {
      if (!TS.Utils.Assert.isArrayLike(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an 'ArrayLike' parameter in function '" + functionName + "'.");
      }
    }


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
    export function checkArrayParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isArray(parameter))
      {
        throw new TS.InvalidTypeException(parameter, "Argument '" + parameterName + "' if not a valid array in function '" + functionName + "'.");
      }//END if

    }


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
    export function checkBitStringParameter(parameterName: string, parameter: string, functionName: string)
    {

      checkStringParameter(parameterName, parameter, functionName);

      if (!TS.Utils.Assert.isBinaryString(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' is not a valid binary string in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkBooleanParameter(paramName: string, parameter: any, functionName: string): void
    {
      if (!TS.Utils.Assert.isBoolean(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a boolean parameter in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkConstructorCall(thisContext: any, requiredType: any)
    {
      let functionName: string;

      if (TS.Utils.Assert.isNullOrUndefined(thisContext))
      {
        if (TS.Utils.Assert.isNullOrUndefined(requiredType))
        {
          throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
        } //END if
        else
        {
          functionName = ((requiredType as Function).name != undefined) ? (requiredType as Function).name : "anonymous";
          //functionName = TS.Utils.getFunctionName(requiredType);
          throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
        }//END else
      } //END if


      if (TS.Utils.Assert.isNullOrUndefined(requiredType))
      {
        throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
      } //END if

      //Object.getPrototypeOf(thisContext) == requiredType.prototype
      if (!(thisContext instanceof requiredType))
      {
        functionName = ((requiredType as Function).name != undefined) ? (requiredType as Function).name : "anonymous";
        //functionName = TS.Utils.getFunctionName(requiredType);
        throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
      }//END if
    }


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
    export function checkConstructorParameter(paramName: string, parameter: any, functionName: string)
    {
      let object: any;
      let ownPropertyArray: Array<any>;
      let prototype: any;

      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if

      if (typeof (parameter) != "function")
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must not of type 'function' in function '" + functionName + "'.");
      }//END if

      try
      {
        object = new parameter();
      }//END try
      catch (Ex)
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      };

      if (TS.Utils.Assert.isNullOrUndefined(object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isObject(object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      //
      //Assure that the object is at least one created by the constructor function in argument 'parameter'
      //and not an arbitrary object returned by a factory function.
      //
      if (!(object instanceof parameter))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      if (!(parameter.prototype.isPrototypeOf(object)))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      //
      // Check whether the new created object is an empty object or not. If the object is an empty object (An object without any properties
      // or methods which are not default values.) treat it as erroneous. A constructor function shouldn't return an empty object because
      // that's meaningless.
      //
      ownPropertyArray = new Array<any>();
      for (let key in object)
      {
        if (Object.prototype.hasOwnProperty.call(object, key))
        {
          ownPropertyArray.push(key);
        }//END if
      }//END for

      //
      // Check whether the base class is 'Object' or not. If the  base class isn't object, check the own properties on 
      // the prototype. It may be that only the prototype got subclassed.
      //
      if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null)
      {
        prototype = Object.getPrototypeOf(object);
        for (let key in prototype)
        {
          if (Object.prototype.hasOwnProperty.call(prototype, key))
          {
            ownPropertyArray.push(key);
          }//END if
        }//END for
      }//END if

      //
      // It's an empty object. 
      //
      if (ownPropertyArray.length == 0)
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

    }


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
    export function checkFunctionParameter(paramName: string, parameter: any, functionName: string)
    {
      if (!TS.Utils.Assert.isFunction(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkIntNumberParameter(parameterName: string, parameter: number, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid integer number in function'" + functionName + "'.");
      }//END if
    }


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
    export function checkIterableParameter(paramName: string, parameter: any, functionName: string)
    {
      if (!TS.Utils.Assert.isIterable(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an iterable parameter in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkKeyByteArray(paramName: string, parameter: any, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteArray(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an unsigned byte value array in function '" + functionName + "'.");
      }//eND if

      if ([16, 24, 32].filter((value) => value == parameter.length).length == 0)
      {
        throw new TS.ArgumentOutOfRangeException(paramName, parameter, "Argument '" + paramName + "' must be an array of unsigned byte values with [16 | 24 | 32] elements in function '" + functionName + "'.");
      }//END if
    }



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
    export function checkNotEmptyParameter(paramName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullUndefOrEmpty(parameter))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(parameter, "Argument '" + paramName + "' must not be null, undefined, an empty array or an empty string in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkNotUndefinedParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isUndefined(parameter))
      {
        throw new TS.ArgumentUndefinedException(parameterName, "Argument '" + parameterName + "' must not be undefined in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkNumberParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid number in function'" + functionName + "'.");
      }//END if
    }


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
    export function checkParameter(paramName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkStringParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isString(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be string variable in function '" + functionName + "'.");
      }//END if

      if (TS.Utils.Assert.isNullUndefOrWhiteSpace(parameter))
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkUByteArrayParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteArray(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte array in function '" + functionName + "'.");
      }//END if
    }



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
    export function checkUByteParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isUnsignedByteValue(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte value in function '" + functionName + "'.");
      }//END if
    }


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
    export function checkUIntNumberParameter(parameterName: string, parameter: any, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isUnsignedIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid positive integer number in function'" + functionName + "'.");
      }//END if
    }


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
    export function compactArray(sparseArray: Array<any>, allowNull: boolean = false): Array<any>
    {
      let result: Array<any>;

      if (!TS.Utils.Assert.isArray(sparseArray))
      {
        return [];
      }//END if

      if (sparseArray.length == 0)
      {
        return [];
      }//END if

      result = new Array<any>();

      sparseArray.forEach((value, index, array) =>
      {
        if (allowNull)
        {
          if (value !== undefined)
          {
            result.push(value);
          }//END if
        }//END if
        else
        {
          if (value !== undefined && value !== null)
          {
            result.push(value);
          }//ENd if
        }//END else
      });

      return result;
    }


    /**
    * @description Creates a version 4 random GUID which is returned as string in a canonical representation.
    *
    * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
    * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
    *
    * @returns {string}, The new created GUID as string.
    */
    export function createGUID(): string
    {
      let index: number;
      let charSetArray: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
      let charSetVariantArray: Array<string> = ["8", "9", "A", "B"];
      let returnString: string;


      returnString = "";
      for (index = 0; index < 8; index++)
      {
        returnString += charSetArray[Math.floor(Math.random() * 16)];
      }//END for
      returnString += "-";

      for (index = 0; index < 4; index++)
      {
        returnString += charSetArray[Math.floor(Math.random() * 16)];
      }//END for
      returnString += "-4";

      for (index = 0; index < 3; index++)
      {
        returnString += charSetArray[Math.floor(Math.random() * 16)];
      }//END for
      returnString += "-";

      returnString += charSetVariantArray[Math.floor(Math.random() * 4)];

      for (index = 0; index < 4; index++)
      {
        returnString += charSetArray[Math.floor(Math.random() * 15)];
      }//END for
      returnString += "-";

      for (index = 0; index < 12; index++)
      {
        returnString += charSetArray[Math.floor(Math.random() * 16)];
      }//END for

      return returnString;
    }


    /**
    * @description Finds all currency element which matches with the search pattern given in argument 'currency' and returns them in an array.
    *  The function returns an empty result array if there is no match for the provided search pattern.
    *
    * @param {string} currency, the search pattern used to identify a currency.
    *
    * @returns {Array<ICurrency>}, all matching currencies.
    */
    export function findAllCurrencies(currency: string): Array<ICurrency>
    {
      let resultArray: Array<ICurrency> = new Array<ICurrency>();

      if (Assert.isNullUndefOrWhiteSpace(currency))
      {
        return resultArray;
      }

      currency = currency.trim();
      let upperCurrency = currency.toUpperCase();
      resultArray = currencyArray.filter((value, index, array) => 
      {
        if (currency.length > 3)
        {
          if (value.Name.toUpperCase().indexOf(upperCurrency) > -1)
          {
            return true;
          }
        }

        if ((currency.length == 3) && (value.Code == upperCurrency))
        {
          return true;
        }

        if (value.Symbol == currency)
        {
          return true;
        }

        return false;
      })

      return resultArray;
    }


    /**
    * @description Finds the currency element which matches with the search pattern given in argument 'currency'
    *  and returns that currency element. If the search pattern leads to multiple results, a 'TS.AmbiguousResultException'
    *  exceptions gets thrown. The function returns null if there is no match for the provided search pattern.
    *
    * @param {string} currency, the search pattern used to identify a currency.
    * @returns {ICurrency} | null, the identified currency, or null.
    * @throws {TS.AmbiguousResultException}
    */
    export function findSingleCurrency(currency: string): ICurrency
    {
      if (Assert.isNullUndefOrWhiteSpace(currency))
      {
        return null;
      }

      currency = currency.trim();
      let upperCurrency = currency.toUpperCase();
      let found = currencyArray.filter((value, index, array) => 
      {
        return (value.Name.toUpperCase() == upperCurrency || value.Code == upperCurrency || value.Symbol == currency);
      })

      if (found.length > 1)
      {
        throw new TS.AmbiguousResultException("currency", currency, "Found multiple possible currency results for the given search string.");
      }

      if (found.length == 0)
      {
        return null;
      }

      return found[0];
    }


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
    export function nextIndexOfReverse(sourceString: string, searchString: string, startIndex?: number): number
    {
      let index: number;


      if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString))
      {
        return -1;
      }//END if

      if (!TS.Utils.Assert.isNullOrUndefined(startIndex))
      {
        if (!TS.Utils.Assert.isUnsignedIntegerNumber(startIndex))
        {
          return -1;
        }//END if
        else
        {
          index = startIndex;
        }//END else
      }//END if
      else
      {
        index = sourceString.length;
      }//END else

      if (startIndex - searchString.length < 0)
      {
        return -1;
      }//END if

      if (sourceString.length < searchString.length)
      {
        return -1;
      }//END if

      if (searchString.length == 0)
      {
        return -1;
      }//END if

      while (index > 0)
      {
        if (sourceString.substr(index, searchString.length) == searchString)
        {
          return index;
        }//END if
        index--;
      }//END while

      return -1;
    }


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
    export function normalizePath(path: string): string
    {
      let returnPath: String;

      if (TS.Utils.Assert.isNullOrUndefined(path))
      {
        return "";
      }//END if

      if (!TS.Utils.Assert.isString(path))
      {
        return "";
      }//END if

      if (path.trim().length == 0)
      {
        return "";
      }//END if

      returnPath = new String(path);

      while (returnPath.indexOf("\\") > -1)
      {
        returnPath = returnPath.replace("\\", "/");
      }//END while

      while (returnPath.indexOf("/./") > -1)
      {
        returnPath = returnPath.replace("/./", "/");
      }//END while

      while (returnPath.indexOf("//") > -1)
      {
        returnPath = returnPath.replace("//", "/");
      }//END while

      while (returnPath.indexOf("/../") > -1)
      {
        if (returnPath.indexOf("/../") == 0)
        {
          /* Something like '/../more/path/elements'. Up navigation at the root or the path isn't possible. Simple substitution with a single slash. */
          returnPath = returnPath.substr(3);
        }
        else if ((returnPath.indexOf("/../") == 2) && (returnPath.indexOf(":") == 1))
        {
          /* Something like 'A:/../'. Up navigation at the drive letter isn't possible. Simple substitution with a single slash. */
          returnPath = returnPath.substring(0, 2) + returnPath.substr(5);
        }
        else
        {
          let leadSegment: string;
          let tailSegment: string;
          let pathSegmentsArray: Array<string>;
          returnPath = returnPath.replace("/../", "##");
          pathSegmentsArray = returnPath.split("##");
          leadSegment = pathSegmentsArray[0];
          if (pathSegmentsArray.length > 1)
          {
            tailSegment = pathSegmentsArray[1];
          }
          else
          {
            tailSegment = "";
          }
          pathSegmentsArray = leadSegment.split("/");
          pathSegmentsArray.pop();
          leadSegment = pathSegmentsArray.join("/");
          returnPath = leadSegment + "/" + tailSegment;
        }
      }

      if ((returnPath.length > 2) && returnPath.endsWith("/"))
      {
        returnPath = returnPath.substr(0, returnPath.length - 1);
      }//END if
      return returnPath.toString();
    }


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
    export function padLeft(source: string, fillChar: string, length: number): string
    {
      let fillString: string;
      let resultString: string;

      if (TS.Utils.Assert.isNullUndefOrEmpty(fillChar))
      {
        return new String(source).toString();
      }//END if

      if (!TS.Utils.Assert.isUnsignedIntegerNumber(length))
      {
        return new String(source).toString();
      }//END if

      fillString = fillChar;
      while (fillString.length < length)
      {
        fillString += fillString;
      }//END while
      fillString = fillString.substr(0, length);

      if (TS.Utils.Assert.isNullUndefOrEmpty(source))
      {
        return fillString;
      }//END if
      else
      {
        fillString = fillString.substr(0, length - source.length);
        fillString += source;
        return fillString;
      }//END else
    }


    /**
    * @description Removes the BOM from an UTF-8 encoded file.
    *
    * @param {string} text
    *
    * @returns {string}
    */
    export function removeUTF8BOM(text: string): string
    {
      return text.replace("ï»¿", "");
    }


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
    export function UByteToHexString(value: number): string
    {
      TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UByteToHexString");

      if (value > 0xFF)
      {
        throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsingend 8 bit integer in function 'TS.Utils.UByteToHexString'.");
      }//END if

      return ((value < 16) ? "0" + value.toString(16) : value.toString(16));
    }


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
    export function UInt32To4ByteArray(value: number): Array<number>
    {
      let resultArray: Array<number>;

      TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32To4ByteArray");

      if (value > 0xFFFFFFFF)
      {
        throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsinged 16 bit integer in function 'TS.Utils.UInt32To4ByteArray'.");
      }//END if

      resultArray = UIntToByteArray(value);
      while (resultArray.length < 4)
      {
        resultArray.unshift(0);
      }//END while
      return resultArray;
    }


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
    export function UInt32ToHexString(value: number): string
    {
      let resultString: string;

      TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32ToHexString");

      if (value > 0xFFFFFFFF)
      {
        throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsigned 32 bit integer in function 'TS.Utils.UInt32ToHexString'.");
      }//END if

      resultString = value.toString(16);
      return TS.Utils.padLeft(resultString, "0", 8);
    }


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
    export function UIntToByteArray(value: number): Array<number>
    {
      let resultArray: Array<number>;
      let byte: number;

      TS.Utils.checkParameter("value", value, "TS.Utils.UIntToByteArray");
      TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UIntToByteArray");

      resultArray = new Array<number>();

      while (value > 0)
      {
        byte = value & 0xff;
        resultArray.unshift(byte);
        value = (value - byte) / 256;
      }//END while

      return resultArray;
    }

  }
}