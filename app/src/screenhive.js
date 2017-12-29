const React = require("react");

const Link = require("./link");
const Conf = require("./conf");
const App = require("./app");
const Steam = require("./Steam");

const $ = React.createElement;

const homePage = "https://screenhive.net";
const myPage = "https://mockbrian.com";

class Screenhive extends React.Component {
  constructor(props) {
    super(props);
    const { steamRoot = Steam.findRoot(), folder } = Conf.read();
    this.state = {
      steamRoot,
      folder,
      route: "start"
    };
    this.setRoute = this.setRoute.bind(this);
    this.setFolder = this.setFolder.bind(this);
    this.setSteamRoot = this.setSteamRoot.bind(this);
    this.saveConf = this.saveConf.bind(this);
  }

  setRoute(route) {
    this.setState({ route });
  }

  setFolder(folder) {
    this.setState({ folder }, this.saveConf);
  }

  setSteamRoot(steamRoot) {
    this.setState({ steamRoot }, this.saveConf);
  }

  saveConf() {
    const { folder, steamRoot } = this.state;
    Conf.write({ folder, steamRoot });
  }

  render() {
    const props = {
      state: this.state,
      setRoute: this.setRoute,
      setSteamRoot: this.setSteamRoot,
      setFolder: this.setFolder
    };
    return $(
      "main",
      { className: "flex flex-column fixed-full ph3 mw6 center" },
      $(
        "p",
        { className: "flex-none" },
        "Follow the ",
        $(Link, { url: homePage }, "Steam setup instructions"),
        " to create a screenshot folder before using this app."
      ),
      $(App, props),
      $(
        "p",
        { className: "flex-none tc" },
        "Copyright © 2018 ",
        $(Link, { url: myPage }, "Brian Mock")
      )
    );
  }
}

module.exports = Screenhive;
