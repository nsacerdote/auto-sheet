const AutoSheet = require("auto-sheet");

function processBankTwo(transformations) {
  transformations.deleteRows("1-2");
  transformations.deleteColumns("B,F");
  transformations.renameCell("A1", "DATE");
  transformations.renameCell("B1", "PAYEE");
  transformations.renameCell("C1", "MEMO");
  transformations.renameCell("D1", "AMOUNT");
}

function processBankOne(transformations) {
  transformations.deleteRows("1-8");
  transformations.deleteColumns("C,E-G");
  transformations.renameCell("A1", "DATE");
  transformations.renameCell("B1", "PAYEE");
  transformations.renameCell("C1", "AMOUNT");
}

AutoSheet.run({
  transformFn: processBankTwo,
  fromFile: "../test-files/bank-2.xls",
  toFile: "../test-files/out/bank-2.csv",
});
AutoSheet.run({
  transformFn: processBankOne,
  fromFile: "../test-files/bank-1.xls",
  toFile: "../test-files/out/bank-1.csv",
});
