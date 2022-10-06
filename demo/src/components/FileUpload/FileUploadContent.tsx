import { useTransformAreaContext } from "../../providers/TransformAreaProvider";
import FileList from "./FileList";

function FileUploadContent() {
  const { files } = useTransformAreaContext();
  if (hasFiles()) {
    return <FileList />;
  } else {
    return <p className="empty-list-message">Drop your files here!</p>;
  }

  function hasFiles() {
    return Object.keys(files).length > 0;
  }
}

export default FileUploadContent;
