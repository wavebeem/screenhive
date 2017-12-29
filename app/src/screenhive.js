const React = require("react");

const Conf = require("./conf");
const App = require("./app");
const H = require("./helpers");

const $ = React.createElement;

function $A(href, text) {
  function onClick(event) {
    event.preventDefault();
    H.openUrl(href);
  }
  const className = "pointer link white b--white-60 bb";
  return $("a", { className, onClick, href }, text);
}

const homePage = "https://screenhive.net";
const myPage = "http://mockbrian.com";

class Screenhive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "start",
      folder: Conf.read().folder
    };
    this.setRoute = this.setRoute.bind(this);
    this.setFolder = this.setFolder.bind(this);
  }

  setRoute(route) {
    this.setState({ route });
  }

  setFolder(folder) {
    this.setState({ folder });
    Conf.write({ folder });
  }

  render() {
    const props = {
      state: this.state,
      setRoute: this.setRoute,
      setFolder: this.setFolder
    };
    return $(
      "main",
      { className: "flex flex-column fixed-full ph3 mw6 center" },
      [
        $("p", { className: "flex-none" }, [
          `Follow the `,
          $A(homePage, `Steam setup instructions`),
          ` to create a screenshot folder before using this app.`
        ]),
        $("p", { className: "flex-none" }, [
          `Your screenshots will be organized into folders
        based on the title of the game in Steam.`
        ]),
        $(App, props),
        $("p", { className: "flex-none tc" }, [
          `Copyright © 2018 `,
          $A(myPage, `Brian Mock`)
        ])
      ]
    );
  }
}

module.exports = Screenhive;
