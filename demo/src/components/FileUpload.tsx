import "./FileUpload.scss";
import {
  ChangeEvent,
  DragEvent,
  SyntheticEvent,
  useRef,
  useState,
} from "react";

function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  return (
    <form className="form-file-upload">
      <input
        type="file"
        id="input-file-upload"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={inputRef}
        onChange={handleChange}
      />
      <label
        htmlFor="input-file-upload"
        className={`label-file-upload ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <p>Drop your files here!</p>
        <button
          className="upload-button"
          type="button"
          onClick={triggerFileInput}
        >
          Upload a file
        </button>
      </label>
    </form>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    stopEvent(e);
    handleFiles(e.target.files);
  }

  function handleDrag(e: DragEvent) {
    stopEvent(e);
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }

  function handleDrop(e: DragEvent) {
    stopEvent(e);
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  function triggerFileInput() {
    inputRef.current?.click();
  }

  function handleFiles(files: FileList | null) {
    console.log(files);
  }

  function stopEvent(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export default FileUpload;
