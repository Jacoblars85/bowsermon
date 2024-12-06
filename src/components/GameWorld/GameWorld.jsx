import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./gameWorld.css";
import MarioMap from "./img/bowsermon-map-v1.png";
import PlayerDown from "./img/playerDown.png";
const bowsermonMapJson = require("./data/bowsermonMap");
const collisionsArray = require("./data/collisions");

function GameWorld() {
  // console.log('bowsermonMapJson', bowsermonMapJson);
  // console.log('collisionsArray', collisionsArray);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");

      // console.log('c', c);

      const collisionsMap = [];

      for (let i = 0; i < collisionsArray.length; i += 235) {
        collisionsMap.push(collisionsArray.slice(i, 235 + i));
      }
      // console.log(collisionsMap);

      class Boundary {
        static width = 48;
        static height = 48;
        constructor({ position }) {
          this.position = position;
          this.width = 48;
          this.height = 48;
        }

        draw() {
          c.fillStyle = "red";
          c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
      }

      const boundaries = [];

      const offset = {
        x: -4767.5,
        y: -5980,
      };

      collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
          if (symbol === 1025) {
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width + offset.x,
                  y: i * Boundary.height + offset.y,
                },
              })
            );
          }
        });
      });

      const image = new Image();
      image.src = MarioMap;
      // console.log(image);

      const playerImage = new Image();
      playerImage.src = PlayerDown;

      class Sprite {
        constructor({ position, velocity, image, frames = { max: 1 } }) {
          this.position = position;
          this.image = image;
          this.frames = frames,
          this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
          }
        }

        draw() {
        //   c.drawImage(this.image, this.position.x, this.position.y);
          c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
          );
        }
      }

    const player = new Sprite({
        position: {
            x: canvas.width / 2 - 192 / 4 / 2,
            y: canvas.height / 2 - 68 / 2
          },
          image: playerImage,
          frames: {
            max: 4
          }
    })

      const background = new Sprite({
        position: {
          x: offset.x,
          y: offset.y,
        },
        image: image,
      });

      const keys = {
        w: {
          pressed: false,
        },
        a: {
          pressed: false,
        },
        s: {
          pressed: false,
        },
        d: {
          pressed: false,
        },
      };

      const testBoundary = new Boundary({
        position: {
            x: 0,
            y: 0
        }
      })

      const movables = [background, testBoundary]

      function animate() {
        window.requestAnimationFrame(animate);
        background.draw();
        // boundaries.forEach((boundary) => {
        //   boundary.draw();
        // });
        testBoundary.draw()
        player.draw()
 
        if (player.position.x + player.width >= testBoundary.position.x && 
            player.position.x <= testBoundary.position.x + testBoundary.width && 
            player.position.y + player.height >= testBoundary.position.y && 
            player.position.y <= testBoundary.position.y + testBoundary.height) {
                
            console.log('colliding');
            
        }

        if (keys.w.pressed && lastKey === "w") movables.forEach((movable) => {
            movable.position.y += 3
        }) 
        else if (keys.a.pressed && lastKey === "a") movables.forEach((movable) => {
            movable.position.x += 3
        }) 
        else if (keys.s.pressed && lastKey === "s") movables.forEach((movable) => {
            movable.position.y -= 3
        }) 
        else if (keys.d.pressed && lastKey === "d") movables.forEach((movable) => {
            movable.position.x -= 3
        }) 
      }
      animate();

      let lastKey = "";

      window.addEventListener("keydown", (e) => {
        if (e.key === "w") {
          keys.w.pressed = true;
          lastKey = "w";
        } else if (e.key === "a") {
          keys.a.pressed = true;
          lastKey = "a";
        } else if (e.key === "s") {
          keys.s.pressed = true;
          lastKey = "s";
        } else if (e.key === "d") {
          keys.d.pressed = true;
          lastKey = "d";
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.key === "w") {
          keys.w.pressed = false;
        } else if (e.key === "a") {
          keys.a.pressed = false;
        } else if (e.key === "s") {
          keys.s.pressed = false;
        } else if (e.key === "d") {
          keys.d.pressed = false;
        }
      });

      // console.log(keys);






    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height={576}
      width={1024}
      id="canvasForGameWorld"
      className="canvasForGame"
    ></canvas>
  );
}

export default GameWorld;
