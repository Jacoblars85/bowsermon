import React, { useEffect, useRef } from "react";

function Canvas({ draw }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");


    }
  }, []);

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
