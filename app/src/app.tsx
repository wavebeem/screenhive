import * as React from "react";

import * as Start from "./routes/start";
import Working from "./routes/working";
import Done from "./routes/done";
import About from "./routes/about";

const routeMap = {
  start: Start,
  working: Working,
  done: Done,
  about: About
};

export default function App(props: any) {
  const { route } = props.state;
  if (routeMap.hasOwnProperty(route)) {
    const Route = (routeMap as any)[route];
    return <Route {...props} />;
  }
  return <div>Invalid route "{route}"</div>;
}
