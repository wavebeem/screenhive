const reducer = require("./reducer")
const Screenhive = require("./screenhive")
const Conf = require("./conf")
const React = require("react")
const ReactDOM = require("react-dom")
const ReactRedux = require("react-redux")
const Redux = require("redux")
const $ = React.createElement

const initialState = {
  screen: "start",
  progress: 0,
  folder: Conf.read().folder
}

const store = Redux.createStore(reducer, initialState)
const component = $(Screenhive, {})
const container = $(ReactRedux.Provider, {store}, component)
const reactRoot = document.getElementById("ReactRoot")
ReactDOM.render(container, reactRoot)
