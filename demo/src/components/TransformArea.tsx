import RunButton from "./RunButton";
import ScriptEditor from "./ScriptEditor";
import FileUpload from "./FileUpload";
import "./TransformArea.scss";
import { TransformAreaProvider } from "../providers/TransformAreaProvider";

function TransformArea() {
  return (
    <TransformAreaProvider>
      <div className="transform-area">
        <FileUpload />
        <ScriptEditor />
        <RunButton />
      </div>
    </TransformAreaProvider>
  );
}

export default TransformArea;
