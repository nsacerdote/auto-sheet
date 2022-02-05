# AutoSheet

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
```

### Browser

```html
<script src="https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js"></script>
<script src="https://unpkg.com/xlsx@0.18.0/dist/xlsx.js"></script>
<script src="https://unpkg.com/auto-sheet@1.0.0/dist/auto-sheet.js"></script>

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
  }

  function transform(transformations) {
    transformations.deleteRows("1,4-6,8");
    transformations.deleteColumns("C,E-G");
    transformations.renameCell("A1", "DATE");
  }
</script>
```

## Examples

See /examples folder
