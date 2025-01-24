import React, { useEffect, useRef } from "react";
import UseCanvas from "../UseCanvas/UseCanvas";

function Canvas({ draw }) {

  const canvasRef = UseCanvas(draw);

  return (
    <div>

      <canvas
        ref={canvasRef}
        height={576}
        width={1024}
      ></canvas>
    </div>
  );
}

export default Canvas;
