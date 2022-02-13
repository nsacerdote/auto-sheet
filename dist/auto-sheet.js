/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("XLSX"), require("csv-stringify/sync"), require("file-saver"));
	else if(typeof define === 'function' && define.amd)
		define(["fs", "XLSX", "csv-stringify/sync", "file-saver"], factory);
	else if(typeof exports === 'object')
		exports["AutoSheet"] = factory(require("fs"), require("XLSX"), require("csv-stringify/sync"), require("file-saver"));
	else
		root["AutoSheet"] = factory(root["fs"], root["XLSX"], root["csv_stringify_sync"], root["saveAs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_fs__, __WEBPACK_EXTERNAL_MODULE_xlsx__, __WEBPACK_EXTERNAL_MODULE_csv_stringify_sync__, __WEBPACK_EXTERNAL_MODULE_file_saver__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apply-script.js":
/*!*****************************!*\
  !*** ./src/apply-script.js ***!
  \*****************************/
/***/ ((module) => {

eval("module.exports.applyScript = applyScript;\n\nfunction applyScript(script, transformations) {\n  script = script.trim();\n  if (!script) {\n    return;\n  }\n  const commands = script.split(/\\s*\\r?\\n\\s*/);\n  commands.forEach(command => _applyCommand(command, transformations));\n}\n\nfunction _applyCommand(command, transformations) {\n  const elements = command.split(/\\s/);\n\n  if (_isDeleteRows(elements)) {\n    transformations.deleteRows(..._parseParams(elements));\n  } else if (_isDeleteColumns(elements)) {\n    transformations.deleteColumns(..._parseParams(elements));\n  } else if (_isRenameCell(elements)) {\n    transformations.renameCell(..._parseParams(elements));\n  } else {\n    console.warn(`Skipped command (not recognized): \"${command}\"`);\n  }\n}\n\nfunction _isDeleteRows(elements) {\n  return _detectCommand(elements, [[\"DELETE\"], [\"ROW\", \"ROWS\"]]);\n}\n\nfunction _isDeleteColumns(elements) {\n  return _detectCommand(elements, [[\"DELETE\"], [\"COLUMN\", \"COLUMNS\"]]);\n}\n\nfunction _isRenameCell(elements) {\n  return _detectCommand(elements, [[\"RENAME\"], [\"CELL\"]]);\n}\n\nfunction _detectCommand(elements, validCommands) {\n  const commands = _forCommandDetection(elements);\n  return commands\n    .slice(0, validCommands.length)\n    .every((c, index) => validCommands[index].includes(c));\n}\n\nfunction _parseParams(elements) {\n  const rebuiltParams = _getParamElements(elements).join(\" \");\n  let inQuotes = false;\n  let escape = false;\n  const result = [];\n  const param = [];\n\n  [...rebuiltParams].forEach(c => {\n    if (c === '\"') {\n      _handleQuotes();\n    } else if (c === \" \") {\n      _handleSpace();\n    } else if (c !== \"\\\\\") {\n      param.push(c);\n    }\n    escape = c === \"\\\\\";\n  });\n  _addParamToResult();\n\n  return result;\n\n  function _handleQuotes() {\n    if (escape) {\n      param.push('\"');\n    } else if (inQuotes) {\n      inQuotes = false;\n      _addParamToResult();\n    } else {\n      inQuotes = true;\n    }\n  }\n\n  function _handleSpace() {\n    if (inQuotes) {\n      param.push(\" \");\n    } else {\n      _addParamToResult();\n    }\n  }\n\n  function _addParamToResult() {\n    if (param.length > 0) {\n      result.push(param.join(\"\"));\n    }\n    param.length = 0;\n  }\n}\n\nfunction _forCommandDetection(elements) {\n  return elements.filter(e => e).map(e => e.toUpperCase());\n}\n\nfunction _getParamElements(elements) {\n  let wordsFound = 0;\n  return elements.reduce((acc, element) => {\n    if (element) {\n      wordsFound++;\n    }\n    if (wordsFound > 2) {\n      acc.push(element);\n    }\n    return acc;\n  }, []);\n}\n\n\n//# sourceURL=webpack://AutoSheet/./src/apply-script.js?");

/***/ }),

/***/ "./src/export.js":
/*!***********************!*\
  !*** ./src/export.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\nconst FileSaver = __webpack_require__(/*! file-saver */ \"file-saver\");\nconst { stringify } = __webpack_require__(/*! csv-stringify/sync */ \"csv-stringify/sync\");\n\nmodule.exports.writeCsvFile = writeCsvFile;\nmodule.exports.downloadCsvFile = downloadCsvFile;\n\nfunction writeCsvFile({ filename, data }) {\n  fs.writeFileSync(filename, toCsv(data));\n}\nfunction downloadCsvFile({ filename, data }) {\n  const blob = new Blob([toCsv(data)], { type: \"text/plain;charset=utf-8\" });\n  FileSaver.saveAs(blob, filename);\n}\n\nfunction toCsv(data) {\n  return stringify(data, { delimiter: \";\" });\n}\n\n\n//# sourceURL=webpack://AutoSheet/./src/export.js?");

/***/ }),

/***/ "./src/import.js":
/*!***********************!*\
  !*** ./src/import.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const XLSX = __webpack_require__(/*! xlsx */ \"xlsx\");\r\n\r\nmodule.exports.readXls = readXls;\r\nmodule.exports.readXlsFile = readXlsFile;\r\n\r\nfunction readXlsFile({ filename, sheet }) {\r\n  const workbook = XLSX.readFile(filename);\r\n  return _toArrayOfArrays(workbook, sheet);\r\n}\r\n\r\nfunction readXls({ fileData, sheet }) {\r\n  const workbook = XLSX.read(fileData);\r\n  return _toArrayOfArrays(workbook, sheet);\r\n}\r\n\r\nfunction _toArrayOfArrays(workbook, sheet) {\r\n  const workbookSheet = workbook.Sheets[workbook.SheetNames[sheet | 0]];\r\n  return XLSX.utils.sheet_to_json(workbookSheet, { raw: false, header: 1 });\r\n}\r\n\n\n//# sourceURL=webpack://AutoSheet/./src/import.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const transformations = __webpack_require__(/*! ./transformations */ \"./src/transformations.js\");\nconst { applyScript } = __webpack_require__(/*! ./apply-script */ \"./src/apply-script.js\");\nconst { isBrowser } = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst { readXlsFile, readXls } = __webpack_require__(/*! ./import */ \"./src/import.js\");\nconst { writeCsvFile, downloadCsvFile } = __webpack_require__(/*! ./export */ \"./src/export.js\");\n\nmodule.exports = {\n  run: ({\n    transformFn,\n    transformScript,\n    fromFile,\n    from,\n    sheetNumber,\n    toFile,\n  }) => {\n    const data = getData({ fromFile, from, sheetNumber });\n    const transformations = bindTransformations(data);\n    if (transformFn) {\n      transformFn(transformations);\n    } else if (transformScript || transformScript === \"\") {\n      applyScript(transformScript, transformations);\n    }\n    exportData({ toFile, data });\n  },\n};\n\nfunction getData({ fromFile, from, sheetNumber }) {\n  return fromFile\n    ? readXlsFile({ filename: fromFile, sheet: sheetNumber })\n    : readXls({ fileData: from, sheet: sheetNumber });\n}\n\nfunction exportData({ toFile, data }) {\n  if (isBrowser()) {\n    downloadCsvFile({ filename: toFile, data });\n  } else {\n    writeCsvFile({ filename: toFile, data });\n  }\n}\n\nfunction bindTransformations(data) {\n  return Object.keys(transformations).reduce((bound, key) => {\n    bound[key] = transformations[key].bind(transformations, data);\n    return bound;\n  }, {});\n}\n\n\n//# sourceURL=webpack://AutoSheet/./src/index.js?");

/***/ }),

/***/ "./src/transformations.js":
/*!********************************!*\
  !*** ./src/transformations.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { fromStringToNumberArray, fromLettersToNumber } = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nmodule.exports.deleteRows = deleteRows;\nmodule.exports.deleteColumns = deleteColumns;\nmodule.exports.renameCell = renameCell;\n\nfunction deleteRows(data, rows) {\n  return applyTransformation(data, rows, _deleteRow);\n\n  function _deleteRow(data, row) {\n    data.splice(row - 1, 1);\n  }\n}\n\nfunction deleteColumns(data, columns) {\n  return applyTransformation(data, columns, _deleteColumn);\n\n  function _deleteColumn(data, column) {\n    data.forEach(row => row.splice(column - 1, 1));\n  }\n}\n\nfunction renameCell(data, coords, newName) {\n  if (Array.isArray(coords)) {\n    const [row, column] = coords;\n    _rename(row, column);\n  } else {\n    const [column, row] = [...coords];\n    const columnNumber = fromLettersToNumber(column);\n    _rename(row, columnNumber);\n  }\n\n  function _rename(row, column) {\n    row = row - 1;\n    column = column - 1;\n    if (_inRange(row, column)) {\n      data[row][column] = newName;\n    }\n  }\n\n  function _inRange(rowIndex, columnIndex) {\n    if (rowIndex > data.length - 1) {\n      return false;\n    } else if (columnIndex > data[rowIndex].length - 1) {\n      return false;\n    }\n    return true;\n  }\n}\n\nfunction applyTransformation(data, indexes, transformFn) {\n  const indexesNumbers = fromStringToNumberArray(indexes);\n  return _applyTransformation(indexesNumbers);\n\n  function _applyTransformation(indexes) {\n    indexes = indexes.sort().reverse();\n    indexes.forEach(i => transformFn(data, i));\n  }\n}\n\n\n//# sourceURL=webpack://AutoSheet/./src/transformations.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("module.exports.fromLettersToNumber = fromLettersToNumber;\nmodule.exports.fromStringToNumberArray = fromStringToNumberArray;\nmodule.exports.isBrowser = isBrowser;\n\nconst alphabet = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\";\nfunction fromLettersToNumber(columnName) {\n  const reversedChars = [...columnName].reverse().map(c => c.toUpperCase());\n  return reversedChars.reduce((acc, char, index) => {\n    return (\n      acc + Math.pow(alphabet.length, index) * (alphabet.indexOf(char) + 1)\n    );\n  }, 0);\n}\n\nfunction fromStringToNumberArray(rowsString) {\n  const sections = rowsString.split(/\\s*,\\s*/).map(_toNumberArray);\n\n  return [...new Set([].concat(...sections))];\n\n  function _toNumberArray(rangeOrNumber) {\n    const [start, end] = rangeOrNumber.split(/\\s*-\\s*/).map(i => {\n      return isNaN(+i) ? fromLettersToNumber(i) : +i;\n    });\n    const result = [];\n    for (let i = start; i <= (end || start); i++) {\n      result.push(i);\n    }\n    return result;\n  }\n}\n\nfunction isBrowser() {\n  return typeof window === \"object\";\n}\n\nfunction _createTestArray() {\n  console.log(JSON.stringify([\"A\", \"B\", \"C\", \"D\"].map(char => _a(char, 4))));\n\n  function _a(char, size) {\n    return `${char}`\n      .repeat(size)\n      .split(\"\")\n      .map((str, i) => str + (i + 1));\n  }\n}\n\n\n//# sourceURL=webpack://AutoSheet/./src/utils.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_fs__;

/***/ }),

/***/ "xlsx":
/*!**********************************************************************************!*\
  !*** external {"commonjs":"XLSX","commonjs2":"XLSX","amd":"XLSX","root":"XLSX"} ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_xlsx__;

/***/ }),

/***/ "csv-stringify/sync":
/*!******************************************************************************************************************************************!*\
  !*** external {"commonjs":"csv-stringify/sync","commonjs2":"csv-stringify/sync","amd":"csv-stringify/sync","root":"csv_stringify_sync"} ***!
  \******************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_csv_stringify_sync__;

/***/ }),

/***/ "file-saver":
/*!******************************************************************************************************!*\
  !*** external {"commonjs":"file-saver","commonjs2":"file-saver","amd":"file-saver","root":"saveAs"} ***!
  \******************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_file_saver__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});