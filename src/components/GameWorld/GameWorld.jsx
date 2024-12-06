import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./gameWorld.css";
import MarioMap from "./img/bowsermon-map-v1.png";
import MarioMapForegroundImage from "./img/foregroundObjects.png";
import PlayerUp from "./img/playerUp.png";
import PlayerLeft from "./img/playerLeft.png";
import PlayerRight from "./img/playerRight.png";
import PlayerDown from "./img/playerDown.png";
const bowsermonMapJson = require("./data/bowsermonMap");
const collisionsArray = require("./data/collisions");
const battleZonesArray = require("./data/battleZones");


function GameWorld() {
  // console.log('bowsermonMapJson', bowsermonMapJson);
  // console.log('collisionsArray', collisionsArray);
//   console.log('battleZonesArray', battleZonesArray);
  

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");

      const collisionsMap = [];

      for (let i = 0; i < collisionsArray.length; i += 235) {
        collisionsMap.push(collisionsArray.slice(i, 235 + i));
      }
      // console.log(collisionsMap);

      const battleZonesMap = [];

      for (let i = 0; i < battleZonesArray.length; i += 235) {
        battleZonesMap.push(battleZonesArray.slice(i, 235 + i));
      }

    //   console.log(battleZonesMap);
      
      class Boundary {
        static width = 48;
        static height = 48;
        constructor({ position }) {
          this.position = position;
          this.width = 48;
          this.height = 48;
        }

        draw() {
          c.fillStyle = "rgba(255, 0, 0, 0.5)";
          c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
      }

      const offset = {
        x: -4767.5,
        y: -5990,
      };

      const boundaries = [];

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

      const battleZones = []

      battleZonesMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
          if (symbol === 1025) {
            battleZones.push(
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
      //   console.log(image);

      const foregroundImage = new Image();
      foregroundImage.src = MarioMapForegroundImage;

      const playerDownImage = new Image();
      playerDownImage.src = PlayerDown;

      const playerUpImage = new Image();
      playerUpImage.src = PlayerUp;

      const playerLeftImage = new Image();
      playerLeftImage.src = PlayerLeft;

      const playerRightImage = new Image();
      playerRightImage.src = PlayerRight;

      class Sprite {
        constructor({ position, velocity, image, frames = { max: 1 }, sprites = [] }) {
          this.position = position;
          this.image = image;
          this.frames = {...frames, val: 0, elapsed: 0 },
            this.image.onload = () => {
              this.width = this.image.width / this.frames.max;
              this.height = this.image.height;
            }
            this.moving = false
            this.sprites = sprites
        }

        draw() {
          c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
          );
          if (!this.moving) return
          if (this.frames.max > 1) {
            this.frames.elapsed++
          }
          if (this.frames.elapsed % 10 === 0) {
          if (this.frames.val < this.frames.max - 1) this.frames.val++
          else this.frames.val = 0
        }
        }
      }

      const player = new Sprite({
        position: {
          x: canvas.width / 2 - 192 / 4 / 2,
          y: canvas.height / 2 - 68 / 2,
        },
        image: playerDownImage,
        frames: {
          max: 4,
        },
        sprites: {
            up: playerUpImage,
            left: playerLeftImage,
            right: playerRightImage,
            down: playerDownImage
        }
      });

      const foreground = new Sprite({
        position: {
          x: offset.x,
          y: offset.y,
        },
        image: foregroundImage,
      });

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

      const movables = [background, ...boundaries, foreground, ...battleZones];

      function rectangularCollisions({ rectangle1, rectangle2 }) {
        return (
          rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
          rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
          rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
          rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        );
      }

      function animate() {
        window.requestAnimationFrame(animate);
        background.draw();
        boundaries.forEach((boundary) => {
          boundary.draw();
        });
        battleZones.forEach((battleZone) => {
            battleZone.draw();
          });
        player.draw();
        foreground.draw();

        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                if (
                  rectangularCollisions({
                    rectangle1: player,
                    rectangle2: battleZone
            })
                ) {
                  console.log('colliding');
                  
                  break;
                }
              }
        }

        let moving = true;
        player.moving = false

        if (keys.w.pressed && lastKey === "w") {
            player.moving = true
            player.image = player.sprites.up
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.y += 3;
            });
        } else if (keys.a.pressed && lastKey === "a") {
            player.moving = true
            player.image = player.sprites.left
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.x += 3;
            });
        } else if (keys.s.pressed && lastKey === "s") {
            player.moving = true
            player.image = player.sprites.down
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.y -= 3;
            });
        } else if (keys.d.pressed && lastKey === "d") {
            player.moving = true
            player.image = player.sprites.right
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: {
                  ...boundary,
                  position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y,
                  },
                },
              })
            ) {
              moving = false;
              break;
            }
          }
          if (moving)
            movables.forEach((movable) => {
              movable.position.x -= 3;
            });
        }
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
      className="canvasForGame"
    ></canvas>
  );
}

export default GameWorld;
