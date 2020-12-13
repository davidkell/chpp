import React from "react";
import ReactDOM from "react-dom";
import Ownership from "./Ownership";

const Main = () => {
  return (
    <div className={"my-extension"}>
      <div className="p-3 border-solid border-0 border-t">
        <p className="text-4xl font-bold">Ownership structure</p>
        <Ownership companyNumber={window.location.pathname.split("/")[2]} />
      </div>
    </div>
  );
};

const app = document.createElement("div");
app.id = "chpp-root";
document.getElementsByClassName("company-header")[0].appendChild(app);
ReactDOM.render(<Main />, app);
