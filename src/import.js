const XLSX = require("xlsx");

module.exports.readXls = readXls;
module.exports.readXlsFile = readXlsFile;

function readXlsFile({ filename, sheet }) {
  const workbook = XLSX.readFile(filename);
  return _toArrayOfArrays(workbook, sheet);
}

function readXls({ fileData, sheet }) {
  const workbook = XLSX.read(fileData);
  return _toArrayOfArrays(workbook, sheet);
}

function _toArrayOfArrays(workbook, sheet) {
  const workbookSheet = workbook.Sheets[workbook.SheetNames[sheet | 0]];
  return XLSX.utils.sheet_to_json(workbookSheet, { raw: false, header: 1 });
}
