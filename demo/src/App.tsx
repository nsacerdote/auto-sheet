import "./App.scss";
import TransformationArea from "./components/TransformationArea";

function App() {
  return (
    <>
      <header className="container">
        <h1>AutoSheet Demo</h1>
      </header>
      <div className="container">
        <TransformationArea />
      </div>
    </>
  );
}

export default App;
