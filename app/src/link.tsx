import * as React from "react";
import * as C from "classnames";

import * as H from "./helpers";

export interface ILinkProps {
  url: string;
  children: any;
}

export default function Link(props: ILinkProps) {
  const { url, children } = props;
  const onClick = (event: any) => {
    event.preventDefault();
    H.openUrl(url);
  };
  const className = C(
    "pointer link b",
    "blue hover-dark-blue",
    "b--black-30 bb"
  );
  return (
    <a className={className} onClick={onClick} href={url}>
      {children}
    </a>
  );
}
