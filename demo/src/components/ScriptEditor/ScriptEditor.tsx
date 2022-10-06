import "./ScriptEditor.scss";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-nord_dark";
import { useTransformAreaContext } from "../../providers/TransformAreaProvider";

function ScriptEditor() {
  const { script, updateScript } = useTransformAreaContext();
  return (
    <AceEditor
      mode="text"
      theme="nord_dark"
      onChange={onChange}
      value={script}
      setOptions={{
        minLines: 12,
        maxLines: 20,
        fontSize: 16,
        showPrintMargin: false,
      }}
    />
  );

  function onChange(newValue: string) {
    updateScript(newValue);
  }
}

export default ScriptEditor;
