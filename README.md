# AutoSheet

[![GitHub license](https://img.shields.io/github/license/nsacerdote/auto-sheet)](https://github.com/nsacerdote/auto-sheet/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/auto-sheet)
![npm bundle size](https://img.shields.io/bundlephobia/min/auto-sheet)

Simple library that accepts `xls` files, applies the transformations you want to them and it returns a `csv` file with the result.

It works in the browser and node.

## Why

I was tired of repeating the same boring steps with the `xls` files my banks provide.
I only needed some columns, with different names and as `csv`. (I use [YNAB](https://www.youneedabudget.com/) to track my spending).

## Install

`npm install auto-sheet`

## Usage

### Node

```javascript
const AutoSheet = require("auto-sheet");

function transform(transformations) {
  transformations.deleteRows("1,4-6,8");
  transformations.deleteColumns("C,E-G");
  transformations.renameCell("A1", "DATE");
}

AutoSheet.run({
  transformFn: transform,
  fromFile: "./input.xls",
  toFile: "./output.csv",
});

// Using script
AutoSheet.run({
  transformScript: `
    DELETE ROWS 1,4-6,8
    DELETE COLUMNS C,E-G
    RENAME CELL A1 DATE
  `,
  fromFile: "./input.xls",
  toFile: "./output.csv",
});
```

### Browser

```html
<script src="https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js"></script>
<script src="https://unpkg.com/xlsx@0.18.0/dist/xlsx.js"></script>
<script src="https://unpkg.com/auto-sheet@1.1.0/dist/auto-sheet.js"></script>

<input id="xls_file" type="file" name="xls_file" />

<script>
  document
    .getElementById("xls_file")
    .addEventListener("change", handleFileAsync, false);

  async function handleFileAsync(e) {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    
    AutoSheet.run({
      transformFn: transform,
      from: data,
      toFile: "out.csv",
    });
    
    AutoSheet.run({
      transformScript: `
        DELETE ROWS 1,4-6,8
        DELETE COLUMNS C,E-G
        RENAME CELL A1 DATE
      `,
      from: data,
      toFile: "out-2.csv",
    });
  }

  function transform(transformations) {
    transformations.deleteRows("1,4-6,8");
    transformations.deleteColumns("C,E-G");
    transformations.renameCell("A1", "DATE");
  }
</script>
```

## Examples

See [/examples](https://github.com/nsacerdote/auto-sheet/tree/master/examples) folder
