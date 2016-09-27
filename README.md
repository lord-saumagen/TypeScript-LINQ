#TypeScript - LINQ for ECMAScript 2015

This is an implementation of the standard LINQ operators defined by Microsoft, in TypeScript.

See: [Classification of Standard Query Operators by Manner of Execution (C#)](https://msdn.microsoft.com/en-us/library/mt693095.aspx)

This project is the successor of an earlier LINQ project in TypeScript. The earlier project used it's own implementation of the iterator pattern. This project uses the so called "iteration protocols" which are new in ECMAScript 2015. By the time of this writing, there is no Microsoft browser available which supports ECMAScript 2015. Therefore the project code is only tested with Chrome (Version 52.0.2741) and Firefox (Version 48.0.2).
The project itself is a Visual Studio solution completely written with "Visual Studio Community 2015" update 3 and TypeScript version 1.8.36.0.
Open the test suite an see for yourself which parts of this soluation are compatible with your current browser.

See: [Test suite](./Test/TestSuite.html)

All public classes and functions have a full set of doumentation comments. So there is full IntelliSense support available in the code editor. There is also a library documentation created with TypeDoc. You will find that documentation in the "Docs" directory in subdirectory "Documentation".
The code compiles with the TypeScript build settings "ECMAScript version" set to "ECMAScript 6". That is in fact an alias for "ECMAScript 2015". The code passes all tests in the lates Chrome or Firefox browser. 

There is an npm package for the Node.js runtime available. The package is called "typescript-linq" and the current version is 1.0.0. The npm package has it's own test project. That project is also available at github. 
I decided to create a separate procject for the Node.js test because I couldn't find a test framework which supports client and Node.js execution in an adequate way. 

Please be aware that this library is intentionally compiled into ECMAScript 2015. The library is neither tested nor designed to run on Javascript engines which doesn't support the ECMAScript 2015 standard. 

See: [typescript-linq V1.0.0](https://www.npmjs.com/package/typescript-linq) (npm package)   
See: [TypeScript-LINQ-Node-Test](https://github.com/lord-saumagen/TypeScript-LINQ-Node-Test) (Node.js test)   
See: [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)   
See: [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/)   
See: [Visual Studio](https://www.visualstudio.com)   
See: [TypeDoc](https://github.com/TypeStrong/typedoc)   

##Usage

If you intent to use this library in your own project you have to reference the following files: **TS.js** and **TS.d.ts**. There is a download link below which saves you the trouble to download the whole solution for just including the library in your own program. 

You will also find these files in the "TS" project directory which is the root directory of the solution.

The TS.js file is the combined javascript output of the complete solution. The TS.d.ts file comprises the corresponding type definitions. If you plan to use selected parts of this solution there are multiple options. 

* Remove the projects you don't need from the current solution and create your own combined Javascript output file.
* Copy the TypeScript files of interest into your own project.
* Set references to the TypeScript files in your own project.

You will find a complete solution description n the "Overfiew.html" file in the "Docs" directory.

See: [TS.js and TS.d.ts download.](./TS.zip) (Use right click -> Save link as...)   
See: [Overview](./Docs/Overview.html)

There is also a complete list of all extension functions implemented in this LINQ library.

See: [Extension functions](./Docs/ExtensionFunctions.html)

A short introduction on how to use this LINQ library on your own project is also available.

See: [LINQ HowTo](./Docs/LINQ_HowTo.html)


##License

This software is licensed under the "Microsoft Public License".

See: [MS-PL](https://opensource.org/licenses/MS-PL")

The full license text is also available in the "Docs" directory in file "Microsoft\_Public\_License\_(MS-PL).txt".

&copy; lord.saumagen@gmail.com, 2016 

