import * as React from "react";

export default function Working(/* props: any */) {
  return (
    <div className="center min-h-100 flex flex-column justify-center pb5">
      <p className="tc ff3 b">Processing…</p>
      <div className="Spinner green dib" />
    </div>
  );
}
