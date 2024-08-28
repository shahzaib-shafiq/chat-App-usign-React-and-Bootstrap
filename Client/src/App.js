import React from "react";
import Home from "./Components/Home"; // Import your Home component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css"; // Import custom CSS if needed

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center min-vh-100">
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
