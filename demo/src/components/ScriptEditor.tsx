import "./ScriptEditor.scss";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-nord_dark";

function onChange(newValue: string) {
  console.log("change", newValue);
}

function ScriptEditor() {
  return (
    <AceEditor
      mode="text"
      theme="nord_dark"
      onChange={onChange}
      setOptions={{
        minLines: 12,
        maxLines: 20,
        fontSize: 16,
        showPrintMargin: false,
      }}
    />
  );
}

export default ScriptEditor;
