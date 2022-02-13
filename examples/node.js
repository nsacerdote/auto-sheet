const AutoSheet = require("auto-sheet");

function processBankOne(transformations) {
  transformations.deleteRows("1-8");
  transformations.deleteColumns("C,E-G");
  transformations.renameCell("A1", "DATE");
  transformations.renameCell("B1", "PAYEE");
  transformations.renameCell("C1", "AMOUNT");
}

AutoSheet.run({
  transformScript: `
    DELETE ROWS 1-2
    DELETE COLUMNS B,F
    RENAME CELL A1 DATE
    RENAME CELL B1 PAYEE
    RENAME CELL C1 MEMO
    RENAME CELL D1 AMOUNT`,
  fromFile: "../test-files/bank-2.xls",
  toFile: "../test-files/out/bank-2.csv",
});

AutoSheet.run({
  transformFn: processBankOne,
  fromFile: "../test-files/bank-1.xls",
  toFile: "../test-files/out/bank-1.csv",
});
