#TypeScript - LINQ for ECMAScript 2015

This is an implementation of the standard LINQ operators defined by Microsoft, in TypeScript.

See: [Classification of Standard Query Operators by Manner of Execution (C#)](https://msdn.microsoft.com/en-us/library/mt693095.aspx)

This project is the successor of an earlier LINQ project in TypeScript. The earlier project used it's own implementation of the iterator pattern. This project uses the so called "iteration protocols" which are new in ECMAScript 2015. By the time of this writing, there is no Microsoft browser available which supports ECMAScript 2015. Therefore the project code is only tested with Chrome (Version 52.0.2741) and Firefox (Version 48.0.2).
The project itself is a Visual Studio solution completely written with "Visual Studio Community 2015" update 3 and TypeScript version 1.8.36.0.
Open the test suite and see for yourself which parts of this solution are compatible with your current browser.

All public classes and functions have a full set of documentation comments. So there is full IntelliSense support available in the code editor. 
The code compiles with the TypeScript build settings "ECMAScript version" set to "ECMAScript 6". That is in fact an alias for "ECMAScript 2015". The code passes all tests in the latest Chrome or Firefox browser. 

There is an npm package for the Node.js runtime available. The package is called "typescript-linq" and the current version is 1.0.0. The npm package has it's own test project. That project is also available at github. 
I decided to create a separate project for the Node.js test because I couldn't find a test framework which supports client and Node.js execution in an adequate way. 

Please be aware that this library is intentionally compiled into ECMAScript 2015. The library is neither tested nor designed to run on Javascript engines which doesn't support the ECMAScript 2015 standard. 

See: [typescript-linq V1.0.X](https://www.npmjs.com/package/typescript-linq) (npm package)   
See: [TypeScript-LINQ-Node-Test](https://github.com/lord-saumagen/TypeScript-LINQ-Node-Test) (Node.js test)
See: [TypeScript-LINQ-Test](https://github.com/lord-saumagen/TypeScript-LINQ-Test) (qunit test for this project)
See: [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)   
See: [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/)   
See: [Visual Studio](https://www.visualstudio.com)   
 

##Release 2016-11-14

The codebase of this project grew so big that I felt the urgent need to split the solution. Now there are three solutions which comprise different independant parts of the framework. The are only minor changes in the LINQ library. Some error corrections regarding the documenation comments and some corrections in a couple of exception messages. The most important change is the fact, that from now on this library has a reference to the 'TypeScript-Base' solution.    
The 'TypeScript-Base' solution it the one which provides some basic functions and classes which I use in all of my solutions. You can read about the 'TypeScript-Base' solution in it's own description.   
The LINQ library itself didn't change in functionality. This version should be compatible to the last version. At least I'm not aware of any breaking changes.

See: [TypeScript-Base solution](https://github.com/lord-saumagen/TypeScript-Base)

##Usage

If you intend to use this library in your own project you have to reference the following files: **TS-Base.js** and **TS-Base.d.ts** as well as **TS-Linq.js** and **TS-Linq.d.ts**. There is a download link below to a TS.zip file, which contains the latter described files. That saves you the trouble to download the whole solution for just including the library in your own project. 

You will also find the files "TS-Linq.js" and "TS-Linq.d.ts" in the project directory, which is the root directory of the solution. The "TS-Base.js" and "TS-Base.d.ts" files can be found in the project directory of the "TypeScript-Base" solution accordingly.

The "TS-Linq.js" file and the "TS-Base.js" file is each the combined javascript output of their corresponding solution. The corresponding "*.d.ts" files comprises the type definitions.


See: [TS-Linq and TS-Base download](http://lord-saumagen.000webhostapp.com/TS.zip) (Use right click -> Save link as...)   
See: [Overview](http://lord-saumagen.000webhostapp.com/TypeScript-Linq/)

There is also a complete list of all extension functions implemented in this LINQ library.

See: [Extension functions](https://lord-saumagen.000webhostapp.com/TypeScript-Linq/ExtensionFunctions.html)

A short introduction on how to use this LINQ library on your own project is also available.

See: [LINQ HowTo](http://lord-saumagen.000webhostapp.com/TypeScript-Linq/LINQ_HowTo.html)


##License

This software is licensed under the "Microsoft Public License".

See: [MS-PL](https://opensource.org/licenses/MS-PL")

The full license text is also available in the "Docs" directory in file "Microsoft\_Public\_License\_(MS-PL).txt".

&copy; lord.saumagen@gmail.com, 2016 

