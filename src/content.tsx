import React from "react";
import ReactDOM from "react-dom";
import Ownership from "./Ownership";

const Main = () => {
  return (
    <div className={"my-extension"}>
      <Ownership
        companyNumber={window.location.pathname.split("/")[2]}
        level={0}
      />
    </div>
  );
};

const app = document.createElement("div");
app.id = "chpp-root";
document.getElementsByClassName("company-header")[0].appendChild(app);
ReactDOM.render(<Main />, app);
