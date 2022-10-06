import "./RunButton.scss";
import { useTransformAreaContext } from "../../providers/TransformAreaProvider";

function RunButton() {
  const { run } = useTransformAreaContext();
  return (
    <button className="run-button" onClick={run}>
      Transform
    </button>
  );
}

export default RunButton;
