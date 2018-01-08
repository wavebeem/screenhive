import * as React from "react";

import * as Conf from "./conf";
import App from "./app";
import * as Steam from "./steam";

export interface IScreenhiveState {
  steamRoot: string;
  folder: string;
  route: string;
}

export interface IScreenhiveProps {}

export default class Screenhive extends React.Component<
  IScreenhiveProps,
  IScreenhiveState
> {
  constructor(props: IScreenhiveProps) {
    super(props);
    const { steamRoot = Steam.findRoot(), folder } = Conf.read();
    this.state = {
      steamRoot,
      folder,
      route: "start"
    };
  }

  setRoute = (route: string) => {
    this.setState({ route });
  };

  setFolder = (folder: string) => {
    this.setState({ folder }, this.saveConf);
  };

  setSteamRoot = (steamRoot: string) => {
    this.setState({ steamRoot }, this.saveConf);
  };

  saveConf = () => {
    const { folder, steamRoot } = this.state;
    Conf.write({ folder, steamRoot });
  };

  render() {
    return (
      <main className="flex flex-column fixed-full ph2 pv1 mw6 center">
        <App
          state={this.state}
          setRoute={this.setRoute}
          setSteamRoot={this.setSteamRoot}
          setFolder={this.setFolder}
        />
      </main>
    );
  }
}
