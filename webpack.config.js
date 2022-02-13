const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "auto-sheet.js",
    globalObject: "this",
    library: {
      name: "AutoSheet",
      type: "umd",
    },
  },
  externals: {
    xlsx: {
      commonjs: "XLSX",
      commonjs2: "XLSX",
      amd: "XLSX",
      root: "XLSX",
    },
    ["file-saver"]: {
      commonjs: "file-saver",
      commonjs2: "file-saver",
      amd: "file-saver",
      root: "saveAs",
    },
    ["csv-stringify/sync"]: {
      commonjs: "csv-stringify/sync",
      commonjs2: "csv-stringify/sync",
      amd: "csv-stringify/sync",
      root: "csv_stringify_sync",
    },
    fs: "fs",
  },
};
