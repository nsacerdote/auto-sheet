import { createContext, ReactNode, useContext, useState } from "react";

interface ITransformAreaContext {
  files: File[];
  transformScript: string;
  run: () => void;
}
const TransformAreaContext = createContext<ITransformAreaContext>({
  files: [],
  transformScript: "",
  run: () => {},
});
const useTransformAreaContext = () => useContext(TransformAreaContext);

function TransformAreaProvider({ children }: { children: ReactNode }) {
  const [transformArea, setTransformArea] = useState({
    files: [],
    transformScript: "",
    run,
  });

  return (
    <TransformAreaContext.Provider value={transformArea}>
      {children}
    </TransformAreaContext.Provider>
  );

  function run() {
    console.log("transform context run");
  }
}

export { TransformAreaProvider, useTransformAreaContext };
