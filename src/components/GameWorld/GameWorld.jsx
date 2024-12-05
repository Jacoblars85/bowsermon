import React, { useState, useEffect, useRef  } from 'react';
import {useSelector} from 'react-redux';
import "./gameWorld.css";
import MarioMap from './bowsermon-map-v1.png'

function GameWorld() {
    
    const canvasRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d'); 
  
        // console.log('c', c);

        c.fillRect(0,0, canvas.width, canvas.height);
        c.fillStyle = 'white';

        const image = new Image()
        image.src = MarioMap
        // console.log(image);
        
        image.onload = () => {
            c.drawImage(image, -4750, -5900)
        }
      }
    }, []);

  return (
    <canvas ref={canvasRef} height={576} width={1024} id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;