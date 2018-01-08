import * as React from "react";
import { render } from "react-dom";

import Screenhive from "./screenhive";

const container = <Screenhive />;
const root = document.getElementById("ReactRoot");
render(container, root);
