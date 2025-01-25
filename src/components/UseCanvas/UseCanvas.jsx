import React, { useEffect, useRef } from "react";

const UseCanvas = (draw) => {
  const ref = useRef();

  useEffect(() => {
    // if (canvasRef.current) {
    const canvas = ref.current;
    const c = canvas.getContext("2d");

    let animationId;

    const renderer = () => {
      draw(canvas, c);
      animationId = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationId);
    // }
  }, [draw]);

  return ref;
};

export default UseCanvas;
