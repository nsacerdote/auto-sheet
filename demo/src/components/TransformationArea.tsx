import RunButton from "./RunButton";
import ScriptEditor from "./ScriptEditor";
import FileUpload from "./FileUpload";
import "./TransformationArea.scss";

function TransformationArea() {
  return (
    <div className="transformation-area">
      <FileUpload />
      <ScriptEditor />
      <RunButton />
    </div>
  );
}

export default TransformationArea;
