const React = require("react");
const { render } = require("react-dom");

const Screenhive = require("./screenhive");

const $ = React.createElement;

const container = $(Screenhive, {});
const root = document.getElementById("ReactRoot");
render(container, root);
