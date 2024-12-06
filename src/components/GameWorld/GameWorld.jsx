import React, { useState, useEffect, useRef  } from 'react';
import {useSelector} from 'react-redux';
import "./gameWorld.css";
import MarioMap from './img/bowsermon-map-v1.png'
import PlayerDown from './img/playerDown.png'
const bowsermonMapJson = require('./data/bowsermonMap');
const collisionsArray = require('./data/collisions');


function GameWorld() {

    // console.log('bowsermonMapJson', bowsermonMapJson);
    // console.log('collisionsArray', collisionsArray);

    
    
    const canvasRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d'); 
  
        // console.log('c', c);

        const collisionsMap = []

        for (let i = 0; i < collisionsArray.length; i += 235) {
            collisionsMap.push(collisionsArray.slice(i, 235 + i))
            
        }
        // console.log(collisionsMap);

        class Boundary {
            static width = 48
            static height = 48
            constructor({ position }) {
                this.position = position
                this.width = 48
                this.height = 48
            }

            draw() {
                c.fillStyle = 'red'
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
            }
        }

        const boundaries = []

        const offset = {
            x: -4767.5,
            y: -5980
        }

        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025) {
                    boundaries.push(
                        new Boundary({position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }}))
                }
                // boundaries.push(
                //     new Boundary({position: {
                //     x: j * Boundary.width,
                //     y: i * Boundary.height
                // }}))
 
            })
        })
        

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
            x: offset.x,
            y: offset.y
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
            boundaries.forEach(boundary => {
                boundary.draw()
            })
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

            if (keys.w.pressed && lastKey === 'w') background.position.y += 3
            else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
            else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
            else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
            
        }
        animate()

        let lastKey = '';

        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') {
                keys.w.pressed = true
                lastKey = 'w'
            } else if (e.key === 'a') {
                keys.a.pressed = true
                lastKey = 'a'
            } else if (e.key === 's') {
                keys.s.pressed = true
                lastKey = 's'
            } else if (e.key === 'd') {
                keys.d.pressed = true
                lastKey = 'd'
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


// console.log(keys);



      }
    }, []);

    

  return (
    <canvas ref={canvasRef} height={576} width={1024} id='canvasForGameWorld' className='canvasForGame'>

    </canvas>
  );
}

export default GameWorld;