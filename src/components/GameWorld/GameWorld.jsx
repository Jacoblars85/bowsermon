import React, { useState, useEffect, useRef  } from 'react';
import {useSelector} from 'react-redux';
import "./gameWorld.css";
import MarioMap from './img/bowsermon-map-v1.png'
import PlayerDown from './img/playerDown.png'

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

        const playerImage = new Image()
        playerImage.src = PlayerDown
        
        image.onload = () => {
            c.drawImage(image, -4767.5, -5980)
            c.drawImage(playerImage, 
                0,
                0,
                playerImage.width / 4,
                playerImage.height,
                canvas.width / 2 - playerImage.width / 4 / 2, 
                canvas.height / 2 - playerImage.height / 2, 
                playerImage.width / 4,
                playerImage.height
            )
        }
      }
    }, []);

  return (
    <canvas ref={canvasRef} height={576} width={1024} id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;