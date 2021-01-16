import React from 'react'
import Header from "./Header.js"
import WorkoutSelector from "./pages/workoutSelector.js"
import "./app.css";

function App() {

  return (
    <div className="page">
      <Header></Header>
      <WorkoutSelector></WorkoutSelector>
    </div>
  );

}

export default App;
