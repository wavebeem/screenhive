import * as React from "react";

import Button from "../button";
import * as H from "../helpers";

export default function Done(props: any) {
  const { setRoute } = props;
  const { folder } = props.state;

  const viewScreenshots = () => {
    setRoute("start");
    H.openFile(folder);
  };

  return (
    <div className="min-h-100 flex flex-column justify-center pb5">
      <p className="tc f3 b">Mission Complete</p>
      <Button type="primary" onClick={viewScreenshots}>
        View screenshots
      </Button>
    </div>
  );
}
