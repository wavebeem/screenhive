import * as React from "react";

import * as Package from "../../package.json";
import Button from "../button";
import Link from "../link";

const homePage = "https://screenhive.net";
const myPage = "https://mockbrian.com";
const githubPage = "https://github.com/wavebeem/screenhive";

export default function About(props: any) {
  const { setRoute } = props;

  const goBack = () => {
    setRoute("start");
  };

  return (
    <div className="min-h-100 flex flex-column">
      <Button type="subtle" onClick={goBack}>
        Back
      </Button>
      <p className="mb0 f3 b lh-title mt2 mb0">
        {Package.productName} {Package.version}
      </p>
      <div className="flex-auto lh-copy f6">
        <p>
          Download the latest version or read documentation on the{" "}
          <Link url={homePage}>Screenhive homepage</Link>.
        </p>
        <p>
          The source code is available on GitHub at{" "}
          <Link url={githubPage}>wavebeem/screenhive</Link>.
        </p>
      </div>
      <p className="tc mb1 f6 mid-gray">
        Copyright © 2018 <Link url={myPage}>Brian Mock</Link>
      </p>
    </div>
  );
}
