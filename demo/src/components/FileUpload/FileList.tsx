import { useTransformAreaContext } from "../../providers/TransformAreaProvider";
import { MouseEvent } from "react";

function FileList() {
  const { files, removeFile } = useTransformAreaContext();
  return (
    <ul className="file-list">
      {Object.entries(files).map(([, file]) => (
        <li key={file.name}>
          <span className="file-name">{file.name}</span>
          <button
            className="delete-button"
            onClick={e => handleDelete(e, file)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  function handleDelete(e: MouseEvent, file: File) {
    e.preventDefault();
    e.stopPropagation();
    removeFile(file);
  }
}

export default FileList;
