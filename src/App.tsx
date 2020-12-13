import * as React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="icon128.png" className="App-logo" alt="logo" />
        <h2>Companies House ++</h2>
        <p>
          Hierarchical ownership view for any company. View{" "}
          <a
            href="https://find-and-update.company-information.service.gov.uk/company/09609115"
            className="App-link"
          >
            example
          </a>
          .
        </p>
      </header>
    </div>
  );
};

export default App;
