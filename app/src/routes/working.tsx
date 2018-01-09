import * as React from "react";

export default function Working(/* props: any */) {
  return (
    <div className="center min-h-100 flex flex-column justify-center pb5">
      <p className="tc f4 b">Organizing…</p>
      <div className="Spinner center green dib w4 h4 bw1 ba br-100" />
    </div>
  );
}
