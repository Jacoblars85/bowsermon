import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import "./gameWorld.css";

function GameWorld() {

    const canvas = document.getElementById('canvasForGameWorld');

    console.log('canvas', canvas);
    


  return (
    <canvas id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;