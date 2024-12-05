import React, { useState, useEffect, useRef  } from 'react';
import {useSelector} from 'react-redux';
import "./gameWorld.css";

function GameWorld() {
    
    const canvasRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d'); 
  
        console.log('c', c);
      }
    }, []);

  return (
    <canvas ref={canvasRef} id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;