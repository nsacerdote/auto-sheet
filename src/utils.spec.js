const {
  fromStringToNumberArray,
  fromLettersToNumber,
} = require("./utils");

describe("fromStringToNumberArray", () => {
  it("should transform a single number", () => {
    expect(fromStringToNumberArray("6")).toStrictEqual([6]);
    expect(fromStringToNumberArray("136")).toStrictEqual([136]);
    expect(fromStringToNumberArray("0")).toStrictEqual([0]);
  });

  it("should transform a range of numbers", () => {
    expect(fromStringToNumberArray("1-6")).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(fromStringToNumberArray("9-10")).toStrictEqual([9, 10]);
    expect(fromStringToNumberArray("0-0")).toStrictEqual([0]);
  });

  it("should transform a list of numbers", () => {
    expect(fromStringToNumberArray("1,2,4,6")).toStrictEqual([1, 2, 4, 6]);
  });

  it("should transform a list of numbers and ranges", () => {
    expect(fromStringToNumberArray("1,2,4-6")).toStrictEqual([1, 2, 4, 5, 6]);
  });

  it("should not return duplicates", () => {
    expect(fromStringToNumberArray("1,1,1-3")).toStrictEqual([1, 2, 3]);
  });
});

describe("fromLettersToNumber", () => {
  it("should transform a single column letter", () => {
    expect(fromLettersToNumber("A")).toBe(1);
    expect(fromLettersToNumber("Z")).toBe(26);
  });
  it("should transform two column letters", () => {
    expect(fromLettersToNumber("AA")).toBe(27);
    expect(fromLettersToNumber("FO")).toBe(171);
    expect(fromLettersToNumber("ZZ")).toBe(702);
  });
  it("should transform a three column letters", () => {
    expect(fromLettersToNumber("AAA")).toBe(703);
    expect(fromLettersToNumber("ABF")).toBe(734);
  });
});
