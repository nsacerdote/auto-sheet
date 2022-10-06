import { createContext, ReactNode, useContext, useState } from "react";

interface ITransformAreaContext {
  files: Record<string, File>;
  script: string;
  run: () => void;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  updateScript: (script: string) => void;
}
const TransformAreaContext = createContext<ITransformAreaContext>({
  files: {},
  script: "",
  run: () => {},
  addFile: () => {},
  removeFile: () => {},
  updateScript: () => {},
});
const useTransformAreaContext = () => useContext(TransformAreaContext);

type ProviderState = Pick<ITransformAreaContext, "files" | "script">;

function TransformAreaProvider({ children }: { children: ReactNode }) {
  const [transformArea, setTransformArea] = useState<ProviderState>({
    files: {},
    script: "",
  });

  return (
    <TransformAreaContext.Provider
      value={{
        ...transformArea,
        run,
        addFile,
        removeFile,
        updateScript,
      }}
    >
      {children}
    </TransformAreaContext.Provider>
  );

  function run() {
    console.log(
      "transform context run",
      transformArea.files,
      transformArea.script
    );
  }

  function addFile(file: File) {
    setTransformArea(old => ({
      ...old,
      files: { ...old.files, [file.name]: file },
    }));
  }

  function removeFile(file: File) {
    setTransformArea(old => {
      const newFiles = { ...old.files };
      delete newFiles[file.name];
      return { ...old, files: newFiles };
    });
  }

  function updateScript(script: string) {
    setTransformArea(old => ({ ...old, script }));
  }
}

export { TransformAreaProvider, useTransformAreaContext };
