import React, { useEffect, useRef } from "react";

function UseCanvas({ draw }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");

      let animationId;

      const renderer = () => {
        draw(c)
        animationId = window.requestAnimationFrame(renderer)
      }
      renderer()

      return () => window.requestAnimationFrame(animationId)
    }
  }, [draw]);

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

export default UseCanvas;
