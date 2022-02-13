const transformations = require("./transformations");
const { applyScript } = require("./apply-script");
const { isBrowser } = require("./utils");
const { readXlsFile, readXls } = require("./import");
const { writeCsvFile, downloadCsvFile } = require("./export");

module.exports = {
  run: ({
    transformFn,
    transformScript,
    fromFile,
    from,
    sheetNumber,
    toFile,
  }) => {
    const data = getData({ fromFile, from, sheetNumber });
    const transformations = bindTransformations(data);
    if (transformFn) {
      transformFn(transformations);
    } else if (transformScript || transformScript === "") {
      applyScript(transformScript, transformations);
    }
    exportData({ toFile, data });
  },
};

function getData({ fromFile, from, sheetNumber }) {
  return fromFile
    ? readXlsFile({ filename: fromFile, sheet: sheetNumber })
    : readXls({ fileData: from, sheet: sheetNumber });
}

function exportData({ toFile, data }) {
  if (isBrowser()) {
    downloadCsvFile({ filename: toFile, data });
  } else {
    writeCsvFile({ filename: toFile, data });
  }
}

function bindTransformations(data) {
  return Object.keys(transformations).reduce((bound, key) => {
    bound[key] = transformations[key].bind(transformations, data);
    return bound;
  }, {});
}
