import React, { useEffect, useRef } from "react";
import UseCanvas from "../UseCanvas/UseCanvas";

function Canvas(props) {
  const { draw, ...rest } = props;

  //   console.log(rest);

  const ref = UseCanvas(draw);

  return <canvas ref={ref} {...rest} />;
}

export default Canvas;
