import { useState } from "react";
import "./App.css";
import Radio from "./Radio";

function App() {
  return (
    <>
      <h1 className="text-4xl text-orange-600 font-bold underline m-4 mb-10">
        Radio Stations
      </h1>

      <Radio />
    </>
  );
}

export default App;
