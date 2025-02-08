import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  forwardRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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

// import "./Battle.css";
import lakeBackground from "./img/backgroundImg/LakeBackground.png";
import forestBackground from "./img/backgroundImg/RockForest.webp";
import battleBackgroundImage from "./img/backgroundImg/battleBackground.png";

import fireballSpriteImage from "./img/fx/SmokeSpriteSheet.png";
import iceSpriteImage from "./img/fx/SmokeSpriteSheet.png";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
// import Slide from "@mui/material/Slide";
import axios from "axios";
import Box from "@mui/material/Box";
import battleMusic from "../../audio/battleMusic.mp3";

function GameWorld() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const history = useHistory();
  const canvasRef = useRef(null);

  // console.log('bowsermonMapJson', bowsermonMapJson);
  // console.log('collisionsArray', collisionsArray);
  //   console.log('battleZonesArray', battleZonesArray);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
    dispatch({ type: "SAGA_FETCH_LEVEL_ENEMY", payload: 8 });
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
    getStarters();
    getEnemy();
    getBasicAttacks();
  }, []);

  // axios functions
  const getStarters = () => {
    axios({
      method: "GET",
      url: "/api/characters/starter",
    })
      .then((response) => {
        if (response.data.length === 1) {
          setStarterOneHp(response.data[0].hp);
          setStarterOneStamina(response.data[0].stamina);
          setCurrentId(response.data[0].id);
          setCurrentName(response.data[0].character_name);
          setStarterOneName(response.data[0].character_name);
          setCurrentSpeed(response.data[0].speed);
          setStarterOneSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          setStarterPicture(response.data[0].battle_pic);
          setStarterFxImg(response.data[0].fx_img);

          setStarterOneAttackStats({
            attack_name: response.data[0].attack_name,
            attack_damage: response.data[0].attack_damage,
            attack_stamina: response.data[0].attack_stamina,
            attack_type: response.data[0].attack_type,
          });
        } else if (response.data.length === 2) {
          setStarterOneHp(response.data[0].hp);
          setStarterOneStamina(response.data[0].stamina);
          setCurrentId(response.data[0].id);
          setCurrentName(response.data[0].character_name);
          setStarterOneName(response.data[0].character_name);
          setCurrentSpeed(response.data[0].speed);
          setStarterOneSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          setStarterPicture(response.data[0].battle_pic);
          setStarterFxImg(response.data[0].fx_img);

          setStarterOneAttackStats({
            attack_name: response.data[0].attack_name,
            attack_damage: response.data[0].attack_damage,
            attack_stamina: response.data[0].attack_stamina,
            attack_type: response.data[0].attack_type,
          });

          setStarterTwoHp(response.data[1].hp);
          setStarterTwoStamina(response.data[1].stamina);
          setStarterTwoSpeed(response.data[1].speed);
          setStarterTwoPicture(response.data[1].battle_pic);
          setStarterTwoFxImg(response.data[1].fx_img);
          setStarterTwoName(response.data[1].character_name);
          setStarterTwoAttackStats({
            attack_name: response.data[1].attack_name,
            attack_damage: response.data[1].attack_damage,
            attack_stamina: response.data[1].attack_stamina,
            attack_type: response.data[1].attack_type,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEnemy = () => {
    axios({
      method: "GET",
      url: `/api/characters/enemy/${Math.floor(Math.random() * 8 + 1)}`,
    })
      .then((response) => {
        setEnemyHp(response.data[0].hp);
        setEnemyStamina(response.data[0].stamina);
        setEnemySpeed(response.data[0].speed);
        setEnemyPicture(response.data[0].battle_pic);
        setEnemyFxImg(response.data[0].fx_img);
        setEnemyName(response.data[0].character_name);

        setEnemyAttackStats({
          attack_name: response.data[0].attack_name,
          attack_damage: response.data[0].attack_damage,
          attack_stamina: response.data[0].attack_stamina,
          attack_type: response.data[0].attack_type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBasicAttacks = () => {
    axios({
      method: "GET",
      url: `/api/characters/basic`,
    })
      .then((response) => {
        setKickAttack(response.data[0].attack_name);
        setKickStamina(response.data[0].attack_stamina);
        setKickAttackType(response.data[0].attack_type);

        setKickAttackStats({
          attack_name: response.data[0].attack_name,
          attack_damage: response.data[0].attack_damage,
          attack_stamina: response.data[0].attack_stamina,
          attack_type: response.data[0].attack_type,
        });

        setPokeAttack(response.data[1].attack_name);
        setPokeStamina(response.data[1].attack_stamina);
        setPokeAttackType(response.data[1].attack_type);

        setPokeAttackStats({
          attack_name: response.data[1].attack_name,
          attack_damage: response.data[1].attack_damage,
          attack_stamina: response.data[1].attack_stamina,
          attack_type: response.data[1].attack_type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const basicAttacks = useSelector((store) => store.character.basicAttacks);
  const characters = useSelector((store) => store.character.userCharacters);
  const starter = useSelector((store) => store.character.starter);
  const levelEnemy = useSelector((store) => store.character.levelEnemy);
  const user = useSelector((store) => store.user.userReducer);
  const inventory = useSelector((store) => store.inventory.inventory);
  const usersConsumableItems = useSelector(
    (store) => store.inventory.usersConsumableItems
  );

  // setting each starter/enemy to a varriable
  let enemyOne = levelEnemy[0];
  let starterOne = starter[0];
  let starterTwo = starter[1];

  // starter stats/info
  const [starterOneHp, setStarterOneHp] = useState(0);
  const [starterOneStamina, setStarterOneStamina] = useState(0);
  const [starterPicture, setStarterPicture] = useState("");
  const [starterFxImg, setStarterFxImg] = useState("");
  const [starterOneName, setStarterOneName] = useState("");
  const [starterOneSpeed, setStarterOneSpeed] = useState(0);
  const [starterOneAttackStats, setStarterOneAttackStats] = useState({});

  // starter stats/info
  const [starterTwoHp, setStarterTwoHp] = useState(0);
  const [starterTwoStamina, setStarterTwoStamina] = useState(0);
  const [starterTwoPicture, setStarterTwoPicture] = useState("");
  const [starterTwoFxImg, setStarterTwoFxImg] = useState("");
  const [starterTwoName, setStarterTwoName] = useState("");
  const [starterTwoSpeed, setStarterTwoSpeed] = useState(0);
  const [starterTwoAttackStats, setStarterTwoAttackStats] = useState({});

  // All current varibles for battle
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentHp, setCurrentHp] = useState(0);
  const [currentStamina, setCurrentStamina] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentDamage, setDamage] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [maxStamina, setMaxStamina] = useState(0);

  // enemy stats/info
  const [enemyId, setEnemyId] = useState(0);
  const [enemyPicture, setEnemyPicture] = useState("");
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyStamina, setEnemyStamina] = useState(0);
  const [enemyFxImg, setEnemyFxImg] = useState("");
  const [enemyName, setEnemyName] = useState("");
  const [enemySpeed, setEnemySpeed] = useState(0);
  const [enemyAttackStats, setEnemyAttackStats] = useState({});

  // kick attack name and stamina
  const [kickAttackStats, setKickAttackStats] = useState({});
  const [kickAttack, setKickAttack] = useState("");
  const [kickStamina, setKickStamina] = useState(0);
  const [kickAttackType, setKickAttackType] = useState("");

  // poke attack name and stamina
  const [pokeAttackStats, setPokeAttackStats] = useState({});
  const [pokeAttack, setPokeAttack] = useState("");
  const [pokeStamina, setPokeStamina] = useState(0);
  const [pokeAttackType, setPokeAttackType] = useState("");

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
          c.fillStyle = "rgba(255, 0, 0, 0.0)";
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

      const battleZones = [];

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

      // class Sprite {
      //   constructor({
      //     position,
      //     image,
      //     frames = { max: 1, hold: 10 },
      //     sprites,
      //     animate = false,
      //   }) {
      //     this.position = position;
      //     this.image = image;
      //     (this.frames = { ...frames, val: 0, elapsed: 0 }),
      //       (this.image.onload = () => {
      //         this.width = this.image.width / this.frames.max;
      //         this.height = this.image.height;
      //       });
      //     this.animate = animate;
      //     this.sprites = sprites;
      //   }

      //   draw() {
      //     c.drawImage(
      //       this.image,
      //       this.frames.val * this.width,
      //       0,
      //       this.image.width / this.frames.max,
      //       this.image.height,
      //       this.position.x,
      //       this.position.y,
      //       this.image.width / this.frames.max,
      //       this.image.height
      //     );
      //     if (!this.animate) return;
      //     if (this.frames.max > 1) {
      //       this.frames.elapsed++;
      //     }
      //     if (this.frames.elapsed % this.frames.hold === 0) {
      //       if (this.frames.val < this.frames.max - 1) this.frames.val++;
      //       else this.frames.val = 0;
      //     }
      //   }
      // }

      class Sprite {
        constructor({
          position,
          image,
          frames = { max: 1, hold: 10, alignment: 0, attackFx: false },
          sprites,
          animate = false,
          rotation = 0,
          opacity = 1,
        }) {
          this.position = position;
          this.image = image;
          (this.frames = { ...frames, val: 0, elapsed: 0 }),
            (this.image.onload = () => {
              this.width = this.image.width / this.frames.max;
              this.height = this.image.height;
            });
          this.animate = animate;
          this.sprites = sprites;
          this.opacity = opacity;
          this.rotation = rotation;
        }

        draw() {
          c.save();
          c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
          );
          c.rotate(this.rotation);
          c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
          );
          c.globalAlpha = this.opacity;

          if (this.frames.attackFx) {
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
          } else {
            c.drawImage(
              this.image,
              this.frames.alignment,
              this.frames.val * this.width,
              this.image.width / this.frames.max,
              this.image.height / this.frames.max,
              this.position.x,
              this.position.y,
              this.image.width / this.frames.max,
              this.image.height / this.frames.max
            );
          }

          // c.drawImage(
          //   this.image,
          //   this.frames.val * this.width,
          //   0,
          //   this.image.width / this.frames.max,
          //   this.image.height,
          //   this.position.x,
          //   this.position.y,
          //   this.image.width / this.frames.max,
          //   this.image.height
          // );

          // c.drawImage(
          //   this.image,
          //   this.frames.alignment,
          //   this.frames.val * this.width,
          //   this.image.width / this.frames.max,
          //   this.image.height / this.frames.max,
          //   this.position.x,
          //   this.position.y,
          //   this.image.width / this.frames.max,
          //   this.image.height / this.frames.max
          // );
          c.restore();

          if (!this.animate) return;
          if (this.frames.max > 1) {
            this.frames.elapsed++;
          }
          if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
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
          hold: 10,
          attackFx: true,
        },
        sprites: {
          up: playerUpImage,
          left: playerLeftImage,
          right: playerRightImage,
          down: playerDownImage,
        },
      });

      const foreground = new Sprite({
        position: {
          x: offset.x,
          y: offset.y,
        },
        image: foregroundImage,
      });

      const exploringBackground = new Sprite({
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

      const movables = [
        exploringBackground,
        ...boundaries,
        foreground,
        ...battleZones,
      ];

      function rectangularCollisions({ rectangle1, rectangle2 }) {
        return (
          rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
          rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
          rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
          rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        );
      }

      const battle = {
        initiated: false,
      };

      function animate() {
        const animationId = window.requestAnimationFrame(animate);
        exploringBackground.draw();
        boundaries.forEach((boundary) => {
          boundary.draw();
        });
        battleZones.forEach((battleZone) => {
          battleZone.draw();
        });
        player.draw();
        foreground.draw();

        let moving = true;
        player.animate = false;

        if (battle.initiated) return;

        // activate battle
        if (
          keys.w.pressed ||
          keys.a.pressed ||
          keys.s.pressed ||
          keys.d.pressed
        ) {
          for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea =
              (Math.min(
                player.position.x + player.width,
                battleZone.position.x + battleZone.width
              ) -
                Math.max(player.position.x, battleZone.position.x)) *
              (Math.min(
                player.position.y + player.height,
                battleZone.position.y + battleZone.height
              ) -
                Math.max(player.position.y, battleZone.position.y));

            if (
              rectangularCollisions({
                rectangle1: player,
                rectangle2: battleZone,
              }) &&
              overlappingArea > (player.width * player.height) / 2 &&
              Math.random() < 0.015
            ) {
              // console.log(battle.initiated, "battle.initiated ");

              // console.log("battle start");
              window.cancelAnimationFrame(animationId);
              battle.initiated = true;
              gsap.to("#fadeOutDiv", {
                opacity: 1,
                repeat: 3,
                yoyo: true,
                duration: 0.4,
                onComplete() {
                  gsap.to("#fadeOutDiv", {
                    opacity: 1,
                    duration: 0.4,
                    onComplete() {
                      // where you get sent to the battle
                      // added the fade out in the battle seq

                      // history.push(
                      //   `/battle/${Math.floor(Math.random() * 8 + 1)}`
                      // );

                      animateBattle();
                      // setEnemyId(Math.floor(Math.random() * 8 + 1))
                      // getEnemy()

                      gsap.to("#fadeOutDiv", {
                        opacity: 0,
                        duration: 0.4,
                      });
                    },
                  });
                },
              });
              break;
            }
          }
        }

        if (keys.w.pressed && lastKey === "w") {
          player.animate = true;
          player.image = player.sprites.up;
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
          player.animate = true;
          player.image = player.sprites.left;
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
          player.animate = true;
          player.image = player.sprites.down;
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
          player.animate = true;
          player.image = player.sprites.right;
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
      // animate();

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

      const backgroundImage = new Image();
      backgroundImage.src = battleBackgroundImage;

      const enemyImage = new Image();
      enemyImage.src = enemyPicture;
      // console.log('enemySpriteImage', enemySpriteImage);

      const starterImage = new Image();
      starterImage.src = starterPicture;
      // console.log('starterSpriteImage', starterSpriteImage);

      const starterTwoImage = new Image();
      starterTwoImage.src = starterTwoPicture;

      // class Sprite {
      //   constructor({
      //     position,
      //     image,
      //     frames = { max: 1, hold: 10, alignment: 0, attackFx: false },
      //     sprites,
      //     animate = false,
      //     rotation = 0,
      //     opacity = 1,
      //   }) {
      //     this.position = position;
      //     this.image = image;
      //     (this.frames = { ...frames, val: 0, elapsed: 0 }),
      //       (this.image.onload = () => {
      //         this.width = this.image.width / this.frames.max;
      //         this.height = this.image.height;
      //       });
      //     this.animate = animate;
      //     this.sprites = sprites;
      //     this.opacity = opacity;
      //     this.rotation = rotation;
      //   }

      //   draw() {
      //     c.save();
      //     c.translate(
      //       this.position.x + this.width / 2,
      //       this.position.y + this.height / 2
      //     );
      //     c.rotate(this.rotation);
      //     c.translate(
      //       -this.position.x - this.width / 2,
      //       -this.position.y - this.height / 2
      //     );
      //     c.globalAlpha = this.opacity;

      //     if (this.frames.attackFx) {
      //       c.drawImage(
      //         this.image,
      //         this.frames.val * this.width,
      //         0,
      //         this.image.width / this.frames.max,
      //         this.image.height,
      //         this.position.x,
      //         this.position.y,
      //         this.image.width / this.frames.max,
      //         this.image.height
      //       );
      //     } else {
      //       c.drawImage(
      //         this.image,
      //         this.frames.alignment,
      //         this.frames.val * this.width,
      //         this.image.width / this.frames.max,
      //         this.image.height / this.frames.max,
      //         this.position.x,
      //         this.position.y,
      //         this.image.width / this.frames.max,
      //         this.image.height / this.frames.max
      //       );
      //     }

      //     // c.drawImage(
      //     //   this.image,
      //     //   this.frames.val * this.width,
      //     //   0,
      //     //   this.image.width / this.frames.max,
      //     //   this.image.height,
      //     //   this.position.x,
      //     //   this.position.y,
      //     //   this.image.width / this.frames.max,
      //     //   this.image.height
      //     // );

      //     // c.drawImage(
      //     //   this.image,
      //     //   this.frames.alignment,
      //     //   this.frames.val * this.width,
      //     //   this.image.width / this.frames.max,
      //     //   this.image.height / this.frames.max,
      //     //   this.position.x,
      //     //   this.position.y,
      //     //   this.image.width / this.frames.max,
      //     //   this.image.height / this.frames.max
      //     // );
      //     c.restore();

      //     if (!this.animate) return;
      //     if (this.frames.max > 1) {
      //       this.frames.elapsed++;
      //     }
      //     if (this.frames.elapsed % this.frames.hold === 0) {
      //       if (this.frames.val < this.frames.max - 1) this.frames.val++;
      //       else this.frames.val = 0;
      //     }
      //   }
      // }

      class Character extends Sprite {
        constructor({
          position,
          image,
          frames = { max: 1, hold: 10, alignment: 0, attackFx: false },
          sprites,
          animate = false,
          rotation = 0,
          opacity = 1,
          isEnemy = false,
          name = "no name",
          health,
          maxHealth,
          stamina,
          maxStamina,
          speed,
        }) {
          super({
            position,
            image,
            frames,
            sprites,
            animate,
            rotation,
            opacity,
          });
          this.isEnemy = isEnemy;
          this.name = name;
          this.health = health;
          this.maxHealth = maxHealth;
          this.stamina = stamina;
          this.maxStamina = maxStamina;
          this.speed = speed;
        }

        faint() {
          document.getElementById("dialogueBox").innerHTML =
            this.name + " fainted!";

          gsap.to(this.position, {
            y: this.position.y + 20,
          });
          gsap.to(this, {
            opacity: 0,
          });
        }

        attack({ attack, recipient, renderedSprites }) {
          if (this.isEnemy) {
            if (this.stamina >= enemyAttackStats.attack_stamina)
              attack = enemyAttackStats;
            else if (this.stamina >= kickStamina) attack = kickAttackStats;
            else if (this.stamina >= pokeStamina) attack = pokeAttackStats;
            else if (this.stamina === 0) {
              attack = {
                attack_type: "tired",
                attack_name: "tired",
                attack_damage: 0,
                attack_stamina: 0,
              };
            }
          }

          recipient.health -= attack.attack_damage;
          this.stamina -= attack.attack_stamina;

          // console.log(recipient.health);
          // console.log(this.stamina);
          // console.log(this.name);

          // console.log((this.health / this.maxHealth) * 100 + "%");

          // console.log("attack", attack.attack_name);

          document.getElementById("dialogueBox").style.display = "block";
          document.getElementById("dialogueBox").innerHTML =
            this.name + " used " + attack.attack_name;

          let rotation = 1;
          if (this.isEnemy) rotation = -2.2;

          let healthBar = "#enemyHealthBar";
          if (this.isEnemy) healthBar = "#starterHealthBar";

          let staminaBar = "#starterStaminaBar";
          if (this.isEnemy) staminaBar = "#enemyStaminaBar";

          gsap.to(staminaBar, {
            width: (this.stamina / this.maxStamina) * 100 + "%",
          });

          if (attack.attack_type === "physical") {
            const tl = gsap.timeline();

            let movementDistance = 20;
            if (this.isEnemy) movementDistance = -20;

            tl.to(this.position, {
              x: this.position.x - movementDistance,
            })
              .to(this.position, {
                x: this.position.x + movementDistance * 2,
                duration: 0.1,
                onComplete: () => {
                  gsap.to(healthBar, {
                    width: (recipient.health / recipient.maxHealth) * 100 + "%",
                  });
                  gsap.to(recipient.position, {
                    x: recipient.position.x + 10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08,
                  });
                  gsap.to(recipient, {
                    opacity: 0,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.08,
                  });
                },
              })
              .to(this.position, {
                x: this.position.x,
              });
          } else if (attack.attack_type === "projectile") {
            const enemyProjectileAttackFxImage = new Image();
            enemyProjectileAttackFxImage.src = enemyFxImg;

            const starterProjectileAttackFxImage = new Image();
            starterProjectileAttackFxImage.src = starterFxImg;
            // console.log(fireballSpriteImage);

            const projectileAttackFx = new Sprite({
              position: {
                x: this.position.x,
                y: this.position.y,
              },
              image: this.isEnemy
                ? enemyProjectileAttackFxImage
                : starterProjectileAttackFxImage,
              frames: {
                max: this.isEnemy ? enemyOne.max_frames : starterOne.max_frames,
                hold: this.isEnemy ? enemyOne.hold_time : starterOne.hold_time,
                attackFx: true,
              },
              animate: true,
              rotation,
            });

            renderedSprites.splice(1, 0, projectileAttackFx);

            gsap.to(projectileAttackFx.position, {
              x: recipient.position.x,
              y: recipient.position.y,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: (recipient.health / recipient.maxHealth) * 100 + "%",
                });
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08,
                });
                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08,
                });

                renderedSprites.splice(1, 1);
              },
            });
          } else if (attack.attack_type === "summon") {
            const enemySummonAttackFxImage = new Image();
            enemySummonAttackFxImage.src = enemyFxImg;

            const starterSummonAttackFxImage = new Image();
            starterSummonAttackFxImage.src = starterFxImg;
            // console.log(iceSpriteImage);

            const summonAttackFx = new Sprite({
              position: {
                x: recipient.position.x + 10,
                y: recipient.position.y + 30,
              },
              image: this.isEnemy
                ? enemySummonAttackFxImage
                : starterSummonAttackFxImage,
              frames: {
                max: this.isEnemy ? enemyOne.max_frames : starterOne.max_frames,
                hold: this.isEnemy ? enemyOne.hold_time : starterOne.hold_time,
                attackFx: true,
              },
              animate: true,
            });

            renderedSprites.splice(2, 0, summonAttackFx);

            gsap.to(summonAttackFx.position, {
              x: recipient.position.x + 10,
              y: recipient.position.y + 30,
              duration: 1.3,
              onComplete: () => {
                gsap.to(healthBar, {
                  width: (recipient.health / recipient.maxHealth) * 100 + "%",
                });
                gsap.to(recipient.position, {
                  x: recipient.position.x + 10,
                  yoyo: true,
                  repeat: 5,
                  duration: 0.08,
                });
                gsap.to(recipient, {
                  opacity: 0,
                  repeat: 5,
                  yoyo: true,
                  duration: 0.08,
                });

                renderedSprites.splice(2, 1);
              },
            });
          } else if (attack.attack_type === "tired") {
            gsap.to(this.position, {
              x: this.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });
            gsap.to(this, {
              opacity: 0.5,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
          }
        }
      }

      const battleBackground = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: backgroundImage,
      });

      const enemy = new Character({
        position: {
          x: 800,
          y: 100,
        },
        image: enemyImage,
        frames: {
          max: 4,
          hold: 30,
          alignment: 0,
        },
        animate: true,
        isEnemy: true,
        name: enemyName,
        health: enemyHp,
        maxHealth: enemyHp,
        stamina: enemyStamina,
        maxStamina: enemyStamina,
        speed: enemySpeed,
      });

      const starter = new Character({
        position: {
          x: 280,
          y: 325,
        },
        image: starterImage,
        frames: {
          max: 4,
          hold: 30,
          alignment: 86,
        },
        animate: true,
        name: starterOneName,
        health: starterOneHp,
        maxHealth: starterOneHp,
        stamina: starterOneStamina,
        maxStamina: starterOneStamina,
        speed: starterOneSpeed,
      });

      const starter2 = new Character({
        position: {
          x: 280,
          y: 325,
        },
        image: starterTwoImage,
        frames: {
          max: 4,
          hold: 30,
          alignment: 86,
        },
        animate: true,
        opacity: 0,
        name: starterTwoName,
        health: starterTwoHp,
        maxHealth: starterTwoHp,
        stamina: starterTwoStamina,
        maxStamina: starterTwoStamina,
        speed: starterTwoSpeed,
      });

      let currentStarter = starter;

      const renderedSprites = [enemy, starter, starter2];


      let battleAnimationId;

      function animateBattle() {
        battleAnimationId =  window.requestAnimationFrame(animateBattle);
        battleBackground.draw();

        renderedSprites.forEach((sprite) => {
          sprite.draw();
        });
      }
      animateBattle();

      const queue = [];

      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
          // console.log("e", e.target.innerHTML);
          // console.log("currentStarter", currentStarter);
          if (e.target.id === "attackButton") {
            // console.log('in attack button', button);
            const characterSelectedAttack = e.target.innerHTML;
            let selectedAttack = {};

            if (characterSelectedAttack === starterOneAttackStats.attack_name)
              selectedAttack = starterOneAttackStats;
            else if (characterSelectedAttack === kickAttackStats.attack_name)
              selectedAttack = kickAttackStats;
            else if (characterSelectedAttack === pokeAttackStats.attack_name)
              selectedAttack = pokeAttackStats;

            // const endDialogPhase = setTimeout(() => {
            //   document.getElementById("dialogueBox").style.display = "none";
            // }, 4500);

            if (starterOneSpeed >= enemySpeed) {
              starter.attack({
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites,
              });

              if (enemy.health <= 0) {
                queue.push(() => {
                  enemy.faint();
                });

                queue.push(() => {
                  gsap.to("#fadeOutDiv", {
                    opacity: 1,
                    onComplete: () => {
                      cancelAnimationFrame(battleAnimationId)
                      animate()
                      document.getElementById('battleInterface').style.display = 'none'
                      gsap.to("#fadeOutDiv", {
                        opacity: 0,
                      })
                    }
                  });
                });
              }
              // enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]
              queue.push(() => {
                enemy.attack({
                  attack: selectedAttack,
                  recipient: starter,
                  renderedSprites,
                });
              });

              if (starter.health <= 0) {
                queue.push(() => {
                  starter.faint();
                });

                // queue.push(() => {
                //   // history.push("/exploring");
                // });
              }

              // if (enemy.health <= 0) {
              //   enemy.faint();
              //   return;
              // } else if (enemy.health > 0) {
              //   setTimeout(() => {
              //     enemy.attack({
              //       attack: selectedAttack,
              //       recipient: starter,
              //       renderedSprites,
              //     });

              //     if (starter.health <= 0) {
              //       starter.faint();
              //       return;
              //     }
              //   }, 2700);
              // }
            } else if (starterOneSpeed < enemySpeed) {
              enemy.attack({
                attack: selectedAttack,
                recipient: starter,
                renderedSprites,
              });

              queue.push(() => {
                if (starter.health <= 0) {
                  starter.faint();
                  return;
                } else if (starter.health > 0) {
                  starter.attack({
                    attack: selectedAttack,
                    recipient: enemy,
                    renderedSprites,
                  });

                  if (enemy.health <= 0) {
                    enemy.faint();
                    return;
                  }
                }
              });

              // if (starter.health <= 0) {
              //   starter.faint();
              //   return;
              // } else if (starter.health > 0) {
              //   setTimeout(() => {
              //     starter.attack({
              //       attack: selectedAttack,
              //       recipient: enemy,
              //       renderedSprites,
              //     });

              //     if (enemy.health <= 0) {
              //       enemy.faint();
              //       return;
              //     }
              //   }, 2700);
              // }
            }
          } else if (
            button.className === "starterOne" ||
            button.className === "starterTwo" ||
            button.id === "consumable"
          ) {
            console.log("in switch");

            if (button.className === "starterOne") {
              console.log("switching starter 1");

              currentStarter = starter;

              // this.image = starterOne.battle_pic;
            } else if (button.className === "starterTwo") {
              console.log("switching starter 2");

              currentStarter = starter2;

              // this.image = starterTwo.battle_pic;
            } else if (button.id === "consumable") {
              console.log("using consumable");
            }

            setTimeout(() => {
              enemy.attack({
                attack: selectedAttack,
                recipient: starter,
                renderedSprites,
              });
            }, 2700);
          } else if (e.target.innerHTML === "Attack") {
            console.log("in attack");
            document.getElementById("attackBox").style.display = "flex";
            document.getElementById("switchBox").style.display = "none";
            document.getElementById("inventoryBox").style.display = "none";
          } else if (e.target.innerHTML === "Switch") {
            console.log("currentStarter", currentStarter);

            console.log("in switch");
            document.getElementById("switchBox").style.display = "block";
            document.getElementById("attackBox").style.display = "none";
            document.getElementById("inventoryBox").style.display = "none";
          } else if (e.target.innerHTML === "Inventory") {
            console.log(" in inventory");
            document.getElementById("inventoryBox").style.display = "block";
            document.getElementById("attackBox").style.display = "none";
            document.getElementById("switchBox").style.display = "none";
          }
        });
      });

      document.querySelector("#dialogueBox").addEventListener("click", (e) => {
        if (queue.length > 0) {
          queue[0]();
          queue.shift();
        } else {
          e.currentTarget.style.display = "none";
        }
      });
    }
  }, [usersConsumableItems]);

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div
        id="fadeOutDiv"
        style={{
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      ></div>
      <canvas
        ref={canvasRef}
        height={576}
        width={1024}
        className="canvasForGame"
      ></canvas>

      <div id="battleInterface" style={{  }}>
      {/* enemy health box */}
      <div
        style={{
          backgroundColor: "white",
          width: `300px`,
          position: "absolute",
          top: "30px",
          left: "50px",
          border: "4px solid black",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <h1 style={{ margin: 0 }}>{enemyOne.character_name}</h1>

        {/* enemy health bar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: "8px",
              backgroundColor: "#ccc",
              marginTop: "10px",
            }}
          ></div>
          <div
            id="enemyHealthBar"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              backgroundColor: "red",
              marginTop: "10px",
            }}
          ></div>
        </div>

        {/* enemy stamina bar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: "5px",
              backgroundColor: "#ccc",
              marginTop: "10px",
            }}
          ></div>
          <div
            id="enemyStaminaBar"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              backgroundColor: "green",
              marginTop: "10px",
            }}
          ></div>
        </div>
      </div>

      {/* starter health box */}
      <div
        style={{
          backgroundColor: "white",
          width: `300px`,
          position: "absolute",
          top: "300px",
          right: "50px",
          border: "4px solid black",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <h1 style={{ margin: 0 }}>{currentName}</h1>

        {/* starter health bar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: "8px",
              backgroundColor: "#ccc",
              marginTop: "10px",
            }}
          ></div>
          <div
            id="starterHealthBar"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              backgroundColor: "red",
              marginTop: "10px",
            }}
          ></div>
        </div>

        {/* starter stamina bar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: "5px",
              backgroundColor: "#ccc",
              marginTop: "10px",
            }}
          ></div>
          <div
            id="starterStaminaBar"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              backgroundColor: "green",
              marginTop: "10px",
            }}
          ></div>
        </div>
      </div>

      {/* canvas */}
      {/* <canvas
          ref={battleCanvasRef}
          height={576}
          width={1024}
          className="canvasForBattle"
        ></canvas> */}

      {/* the attack box */}
      <div
        style={{
          backgroundColor: "white",
          height: `140px`,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "4px solid black",
          display: "flex",
        }}
      >
        {/* text box */}
        <div
          id="dialogueBox"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: "white",
            padding: "12px",
            display: "none",
            fontSize: "30px",
            zIndex: 1,
          }}
        >
          {/* {textBox} */}
        </div>

        {/* all of the togglable buttons */}
        <div
          id="togglableButtons"
          style={{
            width: "66.66%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* attack box */}
          <div
            id="attackBox"
            style={{
              // position: "absolute",
              // bottom: 0,
              // left: 0,
              // right: 0,
              // top: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              // display: "block",
              // fontSize: "30px",
              // zIndex: 1,
            }}
          >
            <button
              // onClick={() => battle("unique")}
              id="attackButton"
              className={
                starter.length === 1
                  ? starterOne.attack_name
                  : currentId === starterOne.id
                  ? starterOne.attack_name
                  : starterTwo.attack_type
              }
              style={{
                display: "flex",
                width: "33.33%",
                height: "100%",
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                fontFamily: "New Super Mario Font U",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "4px solid black",
                // backgroundColor: "white",
                boxShadow: "0 0 0 0",
              }}
              disabled={
                starter.length === 1
                  ? starterOneStamina < starterOne.attack_stamina
                    ? true
                    : false
                  : currentId === starterOne.id
                  ? starterOneStamina < starterOne.attack_stamina
                    ? true
                    : false
                  : starterTwoStamina < starterTwo.attack_stamina
                  ? true
                  : false
              }
            >
              {starter.length === 1
                ? starterOne.attack_name
                : currentId === starterOne.id
                ? starterOne.attack_name
                : starterTwo.attack_name}
            </button>

            <button
              // onClick={() => battle("punch")}
              id="attackButton"
              className={kickAttack}
              style={{
                display: "flex",
                width: "33.33%",
                height: "100%",
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                fontFamily: "New Super Mario Font U",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "4px solid black",
                borderLeft: "4px solid black",
                // backgroundColor: "white",
                boxShadow: "0 0 0 0",
              }}
              disabled={
                starter.length === 1
                  ? starterOneStamina < kickStamina
                    ? true
                    : false
                  : currentId === starterOne.id
                  ? starterOneStamina < kickStamina
                    ? true
                    : false
                  : starterTwoStamina < kickStamina
                  ? true
                  : false
              }
            >
              {kickAttack}
            </button>

            <button
              // onClick={() => battle("poke")}
              id="attackButton"
              className={pokeAttack}
              style={{
                display: "flex",
                width: "33.33%",
                height: "100%",
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                fontFamily: "New Super Mario Font U",
                justifyContent: "center",
                alignItems: "center",
                border: 0,
                borderLeft: "4px solid black",
                // backgroundColor: "white",
                boxShadow: "0 0 0 0",
              }}
              disabled={
                starter.length === 1
                  ? starterOneStamina < pokeStamina
                    ? true
                    : false
                  : currentId === starterOne.id
                  ? starterOneStamina < pokeStamina
                    ? true
                    : false
                  : starterTwoStamina < pokeStamina
                  ? true
                  : false
              }
            >
              {pokeAttack}
            </button>
          </div>

          {/* switch box */}
          <div
            id="switchBox"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              width: "66.4%",
              backgroundColor: "white",
              padding: "0px",
              display: "none",
              // fontSize: "30px",
              zIndex: 1,
            }}
          >
            {starter.length === 1 ? (
              <List sx={{ padding: 0 }}>
                <ListItem>
                  <img height={50} width={50} src={starterOne.profile_pic} />
                  <ListItemText
                    sx={{ ml: 25 }}
                    primary={`starter 1: ${starterOne.character_name}`}
                    secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                  />
                  <button
                    id="attackButton"
                    className="starterOne"
                    style={{
                      color: "black",
                      fontSize: 15,
                      fontFamily: "New Super Mario Font U",
                      borderColor: "black",
                    }}
                    variant="outlined"
                    disabled={
                      currentId === starterOne.id
                        ? true
                        : starterOneHp <= 0
                        ? true
                        : false
                    }
                    onClick={() => battle("starterOne")}
                  >
                    Change Starter
                  </button>
                </ListItem>
              </List>
            ) : (
              <List sx={{ padding: 0 }}>
                <ListItem>
                  <img height={50} width={50} src={starterOne.profile_pic} />
                  <ListItemText
                    sx={{ ml: 25 }}
                    primary={`starter 1: ${starterOne.character_name}`}
                    secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                  />
                  <button
                    id="attackButton"
                    className="starterOne"
                    style={{
                      color: "black",
                      fontSize: 15,
                      fontFamily: "New Super Mario Font U",
                      borderColor: "black",
                    }}
                    // variant="outlined"
                    disabled={
                      currentId === starterOne.id
                        ? true
                        : starterOneHp <= 0
                        ? true
                        : false
                    }
                    onClick={() => battle("starterOne")}
                  >
                    Change Starter
                  </button>
                </ListItem>

                <Divider />

                <ListItem>
                  <img height={50} width={50} src={starterTwo.profile_pic} />
                  <ListItemText
                    sx={{ ml: 25 }}
                    primary={`starter 2: ${starterTwo.character_name}`}
                    secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.stamina} stamina | ${starterTwo.speed} speed`}
                  />
                  <button
                    id="attackButton"
                    className="starterTwo"
                    style={{
                      color: "black",
                      fontSize: 15,
                      fontFamily: "New Super Mario Font U",
                      borderColor: "black",
                      ml: 2,
                    }}
                    // variant="outlined"
                    disabled={
                      currentId === starterTwo.id
                        ? true
                        : starterTwoHp <= 0
                        ? true
                        : false
                    }
                    onClick={() => battle("starterTwo")}
                  >
                    Change Starter
                  </button>
                </ListItem>
              </List>
            )}
          </div>

          {/* inventory box */}
          <div
            id="inventoryBox"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              width: "66.33%",
              backgroundColor: "white",
              display: "none",
              fontSize: "30px",
              zIndex: 1,
            }}
          >
            <Box height="140px" overflow={"scroll"}>
              {usersConsumableItems &&
                usersConsumableItems.map((usersConsumables) => {
                  return (
                    <div
                      key={usersConsumables.id}
                      style={{ height: "40px", padding: 10 }}
                    >
                      <ListItem>
                        <Box
                          display="flex"
                          flexDirection="row"
                          columnGap={5}
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <p
                            style={{
                              color: "black",
                              fontSize: "15px",
                            }}
                          >
                            {usersConsumables.number}X
                          </p>
                          <img
                            height={35}
                            width={35}
                            src={usersConsumables.item_pic}
                          />
                        </Box>

                        <ListItemText
                          sx={{
                            ml: 20,
                            fontFamily: "New Super Mario Font U",
                          }}
                          primary={usersConsumables.name}
                        />

                        <ListItemText
                          sx={{
                            ml: 5,
                            fontFamily: "New Super Mario Font U",
                            width: "70px",
                          }}
                          // primary={usersConsumables.name}
                          secondary={`${
                            usersConsumables.item_hp === 0
                              ? ""
                              : `+${usersConsumables.item_hp} hp`
                          } ${
                            usersConsumables.item_stamina === 0
                              ? ""
                              : usersConsumables.item_hp === 0
                              ? `+${usersConsumables.item_stamina} stamina`
                              : `| +${usersConsumables.item_stamina} stamina`
                          } ${
                            usersConsumables.item_speed === 0
                              ? ""
                              : `| +${usersConsumables.item_speed} speed`
                          }`}
                        />
                        <button
                          // id="consumable"
                          id="attackButton"
                          className="consumable"
                          style={{
                            color: "black",
                            fontSize: 15,
                            fontFamily: "New Super Mario Font U",
                            borderColor: "black",
                            // height: "35px",
                            // width: "60px",
                          }}
                          variant="outlined"
                          disabled={usersConsumables.number <= 0 ? true : false}
                          onClick={() => battle(usersConsumables)}
                        >
                          Use Consumable
                        </button>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </Box>
          </div>
        </div>

        {/* all of the basic buttons */}
        <div
          style={{
            width: "33.33%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            borderLeft: "4px solid black",
          }}
        >
          <>
            {/* the inventory button */}
            <button
              onClick={() => setDisplayButtons("inventory")}
              className="inventoryMove"
              // disabled={isDisabled}
            >
              Inventory
            </button>

            {/* the switch button */}
            <button
              onClick={() => setDisplayButtons("switch")}
              className="switch"
              // disabled={isDisabled}
            >
              Switch
            </button>

            {/* run button */}
            <button
              onClick={() => history.push("/home")}
              className="runButton"
              // disabled={isDisabled}
            >
              Run
            </button>

            {/* shows all the attack buttons */}
            <button
              onClick={() => setDisplayButtons("attack")}
              className="attackToggleButton"
              // disabled={isDisabled}
            >
              Attack
            </button>
          </>
        </div>
      </div>
      </div>
    </div>
  );
}

export default GameWorld;
