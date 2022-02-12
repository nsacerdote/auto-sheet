module.exports.applyScript = applyScript;

function applyScript(script, transformations) {
  script = script.trim();
  if (!script) {
    return;
  }
  const commands = script.split(/\s*\r?\n\s*/);
  commands.forEach(command => _applyCommand(command, transformations));
}

function _applyCommand(command, transformations) {
  const elements = command.split(/\s/);

  if (_isDeleteRows(elements)) {
    transformations.deleteRows(..._parseParams(elements));
  } else if (_isDeleteColumns(elements)) {
    transformations.deleteColumns(..._parseParams(elements));
  } else if (_isRenameCell(elements)) {
    transformations.renameCell(..._parseParams(elements));
  } else {
    console.warn(`Skipped command (not recognized): "${command}"`);
  }
}

function _isDeleteRows(elements) {
  return _detectCommand(elements, [["DELETE"], ["ROW", "ROWS"]]);
}

function _isDeleteColumns(elements) {
  return _detectCommand(elements, [["DELETE"], ["COLUMN", "COLUMNS"]]);
}

function _isRenameCell(elements) {
  return _detectCommand(elements, [["RENAME"], ["CELL"]]);
}

function _detectCommand(elements, validCommands) {
  const commands = _forCommandDetection(elements);
  return commands
    .slice(0, validCommands.length)
    .every((c, index) => validCommands[index].includes(c));
}

function _parseParams(elements) {
  const rebuiltParams = _getParamElements(elements).join(" ");
  let inQuotes = false;
  let escape = false;
  const result = [];
  const param = [];

  [...rebuiltParams].forEach(c => {
    if (c === '"') {
      _handleQuotes();
    } else if (c === " ") {
      _handleSpace();
    } else if (c !== "\\") {
      param.push(c);
    }
    escape = c === "\\";
  });
  _addParamToResult();

  return result;

  function _handleQuotes() {
    if (escape) {
      param.push('"');
    } else if (inQuotes) {
      inQuotes = false;
      _addParamToResult();
    } else {
      inQuotes = true;
    }
  }

  function _handleSpace() {
    if (inQuotes) {
      param.push(" ");
    } else {
      _addParamToResult();
    }
  }

  function _addParamToResult() {
    if (param.length > 0) {
      result.push(param.join(""));
    }
    param.length = 0;
  }
}

function _forCommandDetection(elements) {
  return elements.filter(e => e).map(e => e.toUpperCase());
}

function _getParamElements(elements) {
  let wordsFound = 0;
  return elements.reduce((acc, element) => {
    if (element) {
      wordsFound++;
    }
    if (wordsFound > 2) {
      acc.push(element);
    }
    return acc;
  }, []);
}
