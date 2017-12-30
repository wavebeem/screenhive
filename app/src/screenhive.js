const React = require("react");

const Conf = require("./conf");
const App = require("./app");
const Steam = require("./Steam");

const $ = React.createElement;

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
      { className: "flex flex-column fixed-full ph3 pv2 mw6 center" },
      $(App, props)
    );
  }
}

module.exports = Screenhive;
