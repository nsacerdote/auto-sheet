const { run } = require("./index");

jest.mock("./import");
jest.mock("fs");

describe("run", () => {
  const mockedReadXlsFile = require("./import").readXlsFile;
  const mockedWriteFileSync = require("fs").writeFileSync;

  beforeEach(() => {
    mockedReadXlsFile.mockClear();
    mockedWriteFileSync.mockClear();
  });

  it("should work with empty file, with empty transformations function", () => {
    mockedReadXlsFile.mockReturnValue([]);

    run({
      transformFn: () => {},
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith("out.csv", "");
  });

  it("should work with empty file, with transformations function", () => {
    mockedReadXlsFile.mockReturnValue([]);

    run({
      transformFn: transformations => {
        transformations.deleteRows("1-8");
        transformations.deleteColumns("C,E-G");
        transformations.renameCell("A1", "DATE");
      },
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith("out.csv", "");
  });

  it("should work with transformations function", () => {
    mockedReadXlsFile.mockReturnValue([
      ["A1", "A2", "A3", "A4"],
      ["B1", "B2", "B3", "B4"],
      ["C1", "C2", "C3", "C4"],
      ["D1", "D2", "D3", "D4"],
    ]);

    run({
      transformFn: transformations => {
        transformations.deleteRows("2-3");
        transformations.deleteColumns("B,C");
        transformations.renameCell("A1", "DATE");
      },
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith(
      "out.csv",
      "DATE;A4\nD1;D4\n"
    );
  });

  it("should work with empty file, with empty transformations script", () => {
    mockedReadXlsFile.mockReturnValue([]);

    run({
      transformScript: "",
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith("out.csv", "");
  });

  it("should work with empty file, with transformations script", () => {
    mockedReadXlsFile.mockReturnValue([]);

    run({
      transformScript: `
        DELETE ROWS 1-8
        DELETE COLUMNS C,E-G
        RENAME CELL A1 DATE
      `,
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith("out.csv", "");
  });

  it("should work with transformations script", () => {
    mockedReadXlsFile.mockReturnValue([
      ["A1", "A2", "A3", "A4"],
      ["B1", "B2", "B3", "B4"],
      ["C1", "C2", "C3", "C4"],
      ["D1", "D2", "D3", "D4"],
    ]);

    run({
      transformScript: `
        DELETE ROWS 2-3
        DELETE COLUMNS B,C
        RENAME CELL A1 DATE
      `,
      fromFile: "in.xls",
      toFile: "out.csv",
    });

    expect(mockedWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockedWriteFileSync).toHaveBeenCalledWith(
      "out.csv",
      "DATE;A4\nD1;D4\n"
    );
  });
});
