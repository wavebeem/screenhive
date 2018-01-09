import * as React from "react";

import * as Steam from "../steam";
import Button from "../button";
import * as H from "../helpers";

export default function Start(props: any) {
  const { setFolder, setRoute, setSteamRoot } = props;
  const { folder, steamRoot } = props.state;

  const pickDir = () => {
    H.pickDir().then(setFolder);
  };

  const pickSteamRoot = () => {
    H.pickDir().then(setSteamRoot);
  };

  const openFolder = () => {
    H.openFile(folder);
  };

  const openSteamRoot = () => {
    H.openFile(steamRoot);
  };

  const start = () => {
    setRoute("working");
    Steam.organize(steamRoot, folder)
      .then(() => setRoute("done"))
      .catch(fail);
  };

  const fail = (err: any) => {
    setRoute("start");
    process.stdout.write(err.stack + "\n");
    H.showMessageBox(
      {
        type: "error",
        title: "Screenhive: Error",
        message: err.stack,
        buttons: ["OK"]
      },
      () => {}
    );
  };

  return (
    <div className="min-h-100 flex flex-column justify-between">
      <Button type="subtle" onClick={() => setRoute("about")}>
        About
      </Button>
      <div>
        <Button type="secondary" onClick={pickSteamRoot}>
          Choose Steam folder
        </Button>
        <Button type="outline" disabled={!steamRoot} onClick={openSteamRoot}>
          {steamRoot || "No folder selected"}
        </Button>
        <p className="bt pt2 b--black-10 mb1 lh-copy near-black f6">
          Your screenshots will be organized in folders by game title, so you
          can find them easily later.
        </p>
        <Button type="secondary" onClick={pickDir}>
          Choose screenshot destination
        </Button>
        <Button type="outline" disabled={!folder} onClick={openFolder}>
          {folder || "No folder selected"}
        </Button>
      </div>
      <Button type="primary" disabled={!folder} onClick={start}>
        Organize screenshots
      </Button>
    </div>
  );
}
