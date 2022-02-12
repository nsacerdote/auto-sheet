const { applyScript } = require("./apply-script");

describe("applyScript", () => {
  const mockedTransformations = {
    deleteRows: jest.fn(),
    deleteColumns: jest.fn(),
    renameCell: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should do nothing if script is empty", () => {
    applyScript("", mockedTransformations);
    expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
    expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
    expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
  });

  it("should do nothing if script contains only blank spaces", () => {
    applyScript("  \t \r\n   \r\n", mockedTransformations);
    expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
    expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
    expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
  });

  describe("DELETE ROW(S)", () => {
    it("should delete a single row", () => {
      applyScript("DELETE ROW 1", mockedTransformations);
      expect(mockedTransformations.deleteRows).toHaveBeenCalledWith("1");
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });

    it("should delete multiple rows", () => {
      applyScript("DELETE ROWS 1,4-5,9,11-12", mockedTransformations);
      expect(mockedTransformations.deleteRows).toHaveBeenCalledWith(
        "1,4-5,9,11-12"
      );
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });

    it("should allow spaces in between command parts", () => {
      applyScript(
        'DELETE    ROWS  "2  ,  3  - 4  ,  7 , 10-  11"',
        mockedTransformations
      );
      expect(mockedTransformations.deleteRows).toHaveBeenCalledWith(
        "2  ,  3  - 4  ,  7 , 10-  11"
      );
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });
  });

  describe("DELETE COLUMN(S)", () => {
    it("should delete a single column", () => {
      applyScript("DELETE COLUMN A", mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).toHaveBeenCalledWith("A");
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });

    it("should delete multiple columns", () => {
      applyScript("DELETE COLUMNS A,D-E,I,K-L", mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).toHaveBeenCalledWith(
        "A,D-E,I,K-L"
      );
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });

    it("should allow spaces in between command parts", () => {
      applyScript(
        'DELETE    COLUMNS  "B  ,  C  - D  ,  G , J-  K"',
        mockedTransformations
      );
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).toHaveBeenCalledWith(
        "B  ,  C  - D  ,  G , J-  K"
      );
      expect(mockedTransformations.renameCell).not.toHaveBeenCalled();
    });
  });

  describe("RENAME CELL", () => {
    it("should rename a single cell", () => {
      applyScript("RENAME CELL B2 TEST", mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).toHaveBeenCalledWith(
        "B2",
        "TEST"
      );
    });

    it("should rename a single cell, to a name with spaces, by using quotes", () => {
      applyScript('RENAME CELL "B2" "TEST 2"', mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).toHaveBeenCalledWith(
        "B2",
        "TEST 2"
      );
    });

    it("should rename a single cell, to a name with escaped quotes", () => {
      applyScript('RENAME CELL "B2" TEST\\"2', mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).toHaveBeenCalledWith(
        "B2",
        'TEST"2'
      );
    });

    it("should rename a single cell, to a name with escaped quotes, by using quotes", () => {
      applyScript('RENAME CELL "B2" "TEST \\"2\\""', mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).toHaveBeenCalledWith(
        "B2",
        'TEST "2"'
      );
    });

    it("should allow spaces in between command parts", () => {
      applyScript("RENAME    CELL  B2   TEST", mockedTransformations);
      expect(mockedTransformations.deleteRows).not.toHaveBeenCalled();
      expect(mockedTransformations.deleteColumns).not.toHaveBeenCalled();
      expect(mockedTransformations.renameCell).toHaveBeenCalledWith(
        "B2",
        "TEST"
      );
    });
  });

  describe("MULTIPLE COMMANDS", () => {
    it("calls transformations respecting commands order", () => {
      applyScript(
        `
        RENAME CELL B2 TEST
        DELETE COLUMN A
        DELETE ROW 1
        `,
        mockedTransformations
      );
      const renameCellCallOrder = _callOrder(mockedTransformations.renameCell);
      const deleteColumnsCallOrder = _callOrder(
        mockedTransformations.deleteColumns
      );
      const deleteRowsCallOrder = _callOrder(mockedTransformations.deleteRows);
      expect(renameCellCallOrder).toBeLessThan(deleteColumnsCallOrder);
      expect(deleteColumnsCallOrder).toBeLessThan(deleteRowsCallOrder);
    });
  });
});

function _callOrder(mockFn) {
  return mockFn.mock.invocationCallOrder[0];
}
