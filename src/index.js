import React from "react";
import ReactDOM from "react-dom";
import Editors from "./editor/index";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Editors />, document.getElementById("root"));
serviceWorker.unregister();
