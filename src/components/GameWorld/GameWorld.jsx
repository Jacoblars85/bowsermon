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
        

        class Sprite {
            constructor({ position, velocity, image}) {
                this.position = position
                this.image = image
            }

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        const background = new Sprite({ position: {
            x: -4767.5,
            y: -5980
        },
    image: image
    })

    const keys = {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        s: {
            pressed: false
        },
        d: {
            pressed: false
        },
    }

        function animate() {
            window.requestAnimationFrame(animate)
            background.draw()
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

            if (keys.w.pressed) background.position.y += 3
            else if (keys.a.pressed) background.position.x += 3
            else if (keys.s.pressed) background.position.y -= 3
            else if (keys.d.pressed) background.position.x -= 3
            
        }
        animate()

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') {
                keys.w.pressed = true
            } else if (e.key === 'a') {
                keys.a.pressed = true
            } else if (e.key === 's') {
                keys.s.pressed = true
            } else if (e.key === 'd') {
                keys.d.pressed = true
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key === 'w') {
                keys.w.pressed = false
            } else if (e.key === 'a') {
                keys.a.pressed = false
            } else if (e.key === 's') {
                keys.s.pressed = false
            } else if (e.key === 'd') {
                keys.d.pressed = false
            }
            
        })


console.log(keys);



      }
    }, []);

    

  return (
    <canvas ref={canvasRef} height={576} width={1024} id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;