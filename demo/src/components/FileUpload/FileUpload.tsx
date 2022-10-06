import "./FileUpload.scss";
import {
  ChangeEvent,
  DragEvent,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useTransformAreaContext } from "../../providers/TransformAreaProvider";
import FileUploadContent from "./FileUploadContent";

const VALID_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(0);
  const { addFile } = useTransformAreaContext();

  return (
    <form className="form-file-upload">
      <input
        type="file"
        id="input-file-upload"
        accept={VALID_FILE_TYPES.join(",")}
        ref={inputRef}
        onChange={handleChange}
        multiple
      />
      <label
        htmlFor="input-file-upload"
        className={`label-file-upload ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FileUploadContent />
        <button
          className="upload-button"
          type="button"
          onClick={triggerFileInput}
        >
          Upload files
        </button>
      </label>
    </form>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    stopEvent(e);
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }

  function handleDrag(e: DragEvent) {
    stopEvent(e);
    if (e.type === "dragenter") {
      setDragActive(old => old + 1);
    } else if (e.type === "dragleave") {
      setDragActive(old => old - 1);
    }
  }

  function handleDrop(e: DragEvent) {
    stopEvent(e);
    setDragActive(0);
    handleFiles(e.dataTransfer.files);
  }

  function triggerFileInput() {
    inputRef.current?.click();
  }

  function handleFiles(files: FileList) {
    Array.from(files)
      .filter(f => VALID_FILE_TYPES.includes(f.type))
      .forEach(f => addFile(f));
  }

  function stopEvent(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export default FileUpload;
