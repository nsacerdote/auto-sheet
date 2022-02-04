const fs = require("fs");
const FileSaver = require("file-saver");

module.exports.writeCsvFile = writeCsvFile;
module.exports.downloadCsvFile = downloadCsvFile;

function writeCsvFile({ filename, data }) {
  fs.writeFileSync(filename, toCsv(data));
}
function downloadCsvFile({ filename, data }) {
  const blob = new Blob([toCsv(data)], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, filename);
}

function toCsv(data) {
  return data.map(row => row.join(";")).join("\r\n");
}
