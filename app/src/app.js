const React = require("react");

const Start = require("./routes/start");
const Working = require("./routes/working");
const Done = require("./routes/done");
const About = require("./routes/about");

const $ = React.createElement;

const routeMap = {
  start: Start,
  working: Working,
  done: Done,
  about: About
};

function App(props) {
  // const { route } = props.state;
  const route = "working";
  if (routeMap.hasOwnProperty(route)) {
    return $(routeMap[route], props);
  }
  return $("div", null, `Invalid route "${route}"`);
}

module.exports = App;
