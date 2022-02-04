const { fromStringToNumberArray, fromLettersToNumber } = require("./utils");

module.exports.deleteRows = deleteRows;
module.exports.deleteColumns = deleteColumns;
module.exports.renameCell = renameCell;

function deleteRows(data, rows) {
  return applyTransformation(data, rows, _deleteRow);

  function _deleteRow(data, row) {
    data.splice(row - 1, 1);
  }
}

function deleteColumns(data, columns) {
  return applyTransformation(data, columns, _deleteColumn);

  function _deleteColumn(data, column) {
    data.forEach(row => row.splice(column - 1, 1));
  }
}

function renameCell(data, coords, newName) {
  if (Array.isArray(coords)) {
    const [row, column] = coords;
    data[row - 1][column - 1] = newName;
  } else {
    const [column, row] = [...coords];
    const columnNumber = fromLettersToNumber(column);
    data[row - 1][columnNumber - 1] = newName;
  }
}

function applyTransformation(data, indexes, transformFn) {
  const indexesNumbers = fromStringToNumberArray(indexes);
  return _applyTransformation(indexesNumbers);

  function _applyTransformation(indexes) {
    indexes = indexes.sort().reverse();
    indexes.forEach(i => transformFn(data, i));
  }
}
