import "./App.scss";
import TransformArea from "./components/TransformArea";

function App() {
  return (
    <>
      <header className="container">
        <h1>AutoSheet Demo</h1>
      </header>
      <div className="container">
        <TransformArea />
      </div>
    </>
  );
}

export default App;
