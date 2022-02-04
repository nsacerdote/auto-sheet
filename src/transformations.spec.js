const { deleteColumns, deleteRows, renameCell } = require("./transformations");

describe("deleteRows", () => {
  let data;

  beforeEach(() => {
    data = [
      ["A", "A", "A"],
      ["B", "B", "B"],
      ["C", "C", "C"],
    ];
  });

  it("should delete a single row", () => {
    deleteRows(data, "1");
    expect(data).toStrictEqual([
      ["B", "B", "B"],
      ["C", "C", "C"],
    ]);
  });
  it("should delete a range of rows", () => {
    deleteRows(data, "2-3");
    expect(data).toStrictEqual([["A", "A", "A"]]);
  });
  it("should delete a list of rows", () => {
    deleteRows(data, "1,3");
    expect(data).toStrictEqual([["B", "B", "B"]]);
  });

  describe("works with letters to identify rows", () => {
    it("should delete a single row", () => {
      deleteRows(data, "A");
      expect(data).toStrictEqual([
        ["B", "B", "B"],
        ["C", "C", "C"],
      ]);
    });
    it("should delete a range of rows", () => {
      deleteRows(data, "B-C");
      expect(data).toStrictEqual([["A", "A", "A"]]);
    });
    it("should delete a list of rows", () => {
      deleteRows(data, "A,C");
      expect(data).toStrictEqual([["B", "B", "B"]]);
    });
  });
});

describe("deleteColumns", () => {
  let data;

  beforeEach(() => {
    data = [
      ["A", "B", "C"],
      ["A", "B", "C"],
      ["A", "B", "C"],
    ];
  });

  it("should delete a single column", () => {
    deleteColumns(data, "1");
    expect(data).toStrictEqual([
      ["B", "C"],
      ["B", "C"],
      ["B", "C"],
    ]);
  });
  it("should delete a range of columns", () => {
    deleteColumns(data, "2-3");
    expect(data).toStrictEqual([["A"], ["A"], ["A"]]);
  });
  it("should delete a list of columns", () => {
    deleteColumns(data, "1,3");
    expect(data).toStrictEqual([["B"], ["B"], ["B"]]);
  });

  describe("works with letters to identify columns", () => {
    it("should delete a single column", () => {
      deleteColumns(data, "A");
      expect(data).toStrictEqual([
        ["B", "C"],
        ["B", "C"],
        ["B", "C"],
      ]);
    });
    it("should delete a range of columns", () => {
      deleteColumns(data, "B-C");
      expect(data).toStrictEqual([["A"], ["A"], ["A"]]);
    });
    it("should delete a list of columns", () => {
      deleteColumns(data, "A,C");
      expect(data).toStrictEqual([["B"], ["B"], ["B"]]);
    });
  });
});

describe("renameCell", () => {
  let data;

  beforeEach(() => {
    data = [
      ["A", "A", "A"],
      ["B", "B", "B"],
      ["C", "C", "C"],
    ];
  });

  it("should rename a single cell", () => {
    renameCell(data, [2, 2], "TEST");
    expect(data).toStrictEqual([
      ["A", "A", "A"],
      ["B", "TEST", "B"],
      ["C", "C", "C"],
    ]);
  });

  it("should rename a single cell with text coords", () => {
    renameCell(data, "B2", "TEST");
    expect(data).toStrictEqual([
      ["A", "A", "A"],
      ["B", "TEST", "B"],
      ["C", "C", "C"],
    ]);
  });
});
