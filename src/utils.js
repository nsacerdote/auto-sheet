module.exports.fromLettersToNumber = fromLettersToNumber;
module.exports.fromStringToNumberArray = fromStringToNumberArray;
module.exports.isBrowser = isBrowser;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function fromLettersToNumber(columnName) {
  const reversedChars = [...columnName].reverse().map(c => c.toUpperCase());
  return reversedChars.reduce((acc, char, index) => {
    return (
      acc + Math.pow(alphabet.length, index) * (alphabet.indexOf(char) + 1)
    );
  }, 0);
}

function fromStringToNumberArray(rowsString) {
  const sections = rowsString.split(",").map(_toNumberArray);

  return [...new Set([].concat(...sections))];

  function _toNumberArray(rangeOrNumber) {
    const [start, end] = rangeOrNumber.split("-").map(i => {
      return isNaN(+i) ? fromLettersToNumber(i) : +i;
    });
    const result = [];
    for (let i = start; i <= (end || start); i++) {
      result.push(i);
    }
    return result;
  }
}

function isBrowser() {
  return typeof window === "object";
}

function _createTestArray() {
  console.log(JSON.stringify(["A", "B", "C", "D"].map(char => _a(char, 4))));

  function _a(char, size) {
    return `${char}`
      .repeat(size)
      .split("")
      .map((str, i) => str + (i + 1));
  }
}
