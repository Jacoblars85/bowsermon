import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  forwardRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./Battle.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import lakeBackground from "./img/backgroundImg/LakeBackground.png";
import forestBackground from "./img/backgroundImg/RockForest.webp";
import battleBackground from "./img/backgroundImg/battleBackground.png";

import fireballSpriteImage from "./img/fx/SmokeSpriteSheet.png";
import iceSpriteImage from "./img/fx/SmokeSpriteSheet.png";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";
import Box from "@mui/material/Box";
import battleMusic from "../../audio/battleMusic.mp3";
import { height } from "@mui/system";

const DeadTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Battle() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
    dispatch({ type: "SAGA_FETCH_LEVEL_ENEMY", payload: id });
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
      url: `/api/characters/enemy/${id}`,
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

  // console.log('characters', characters);
  // console.log('starter', starter);
  // console.log('levelEnemy', levelEnemy);

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

  // console.log('starterOneAttackStats', starterOneAttackStats);

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

  // text box
  const [textBox, setTextBox] = useState("");

  // disables all buttons when user clicks button
  const [isDisabled, setIsDisabled] = useState(false);

  // All of the Dead switch dialog function
  const [deadOpen, setDeadOpen] = useState(false);

  const handleDeadOpen = () => {
    setDeadOpen(true);
  };

  const handleDeadClose = () => {
    setDeadOpen(false);
  };

  const deadSwitch = (switchType) => {
    if (switchType === "starterOne") {
      setCurrentId(starterOne.id);
      setCurrentSpeed(starterOne.speed);
      setMaxHp(starterOne.hp);
      setMaxStamina(starterOne.stamina);
      setStarterPicture(starterOne.profile_pic);
      setDeadOpen(false);
    } else if (switchType === "starterTwo") {
      setCurrentId(starterTwo.id);
      setCurrentSpeed(starterTwo.speed);
      setMaxHp(starterTwo.hp);
      setMaxStamina(starterTwo.stamina);
      setStarterPicture(starterTwo.profile_pic);
      setDeadOpen(false);
    }
  };

  // state values to open dialog if you win or lose
  const [openWinner, setWinnerOpen] = useState(false);
  const [openLoser, setLoserOpen] = useState(false);

  // gives money to user and sends you to the campaign page
  const handleWinnerClose = () => {
    if (id == 10 && user.credit_video_completed === false) {
      history.push(`/credits`);

      if (Math.floor(Number(user.xp_level) + 1) <= Number(user.xp_level) + 1) {
        if (Math.floor(Number(user.xp_level) + 1) % 4 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 1, rewardId: 4 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 3 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 1, rewardId: 3 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 2 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 1, rewardId: 2 },
          });
        } else {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 1, rewardId: 1 },
          });
        }
      } else {
        dispatch({
          type: "SAGA_USER_WON_THE_BATTLE",
          payload: { levelId: enemyOne.level_id, xp: 1 },
        });
      }
    } else if (
      (id == 1 && user.level_1_completed === false) ||
      (id == 2 && user.level_2_completed === false) ||
      (id == 3 && user.level_3_completed === false) ||
      (id == 4 && user.level_4_completed === false) ||
      (id == 5 && user.level_5_completed === false) ||
      (id == 6 && user.level_6_completed === false) ||
      (id == 7 && user.level_7_completed === false) ||
      (id == 8 && user.level_8_completed === false) ||
      (id == 9 && user.level_9_completed === false) ||
      (id == 11 && user.level_11_completed === false) ||
      (id == 12 && user.level_12_completed === false)
    ) {
      history.push(`/campaign`);

      if (
        Math.floor(Number(user.xp_level) + 1) <=
        Number(user.xp_level) + 0.5
      ) {
        if (Math.floor(Number(user.xp_level) + 1) % 4 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.5, rewardId: 4 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 3 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.5, rewardId: 3 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 2 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.5, rewardId: 2 },
          });
        } else {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.5, rewardId: 1 },
          });
        }
      } else {
        dispatch({
          type: "SAGA_USER_WON_THE_BATTLE",
          payload: { levelId: enemyOne.level_id, xp: 0.5 },
        });
      }
    } else {
      history.push(`/campaign`);

      if (
        Math.floor(Number(user.xp_level) + 1) <=
        Number(user.xp_level) + 0.2
      ) {
        if (Math.floor(Number(user.xp_level) + 1) % 4 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.2, rewardId: 4 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 3 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.2, rewardId: 3 },
          });
        } else if (Math.floor(Number(user.xp_level) + 1) % 2 === 0) {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.2, rewardId: 2 },
          });
        } else {
          dispatch({
            type: "SAGA_WON_AND_LEVELED_UP",
            payload: { levelId: enemyOne.level_id, xp: 0.2, rewardId: 1 },
          });
        }
      } else {
        dispatch({
          type: "SAGA_USER_WON_THE_BATTLE",
          payload: { levelId: enemyOne.level_id, xp: 0.2 },
        });
      }
    }
  };

  // sends you to the campaign page when you lose
  const handleLoserClose = () => {
    history.push(`/campaign`);
  };

  // after doing an action, this will disable buttons for 4.5 sec
  const disableAllButtons = () => {
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);

      // setRoundOver(true);
    }, 4500);
  };

  // this is for the users attacks or actions
  const attack = (attackType, basicAttacks, starterOne, enemyAttackTimeOut) => {
    if (starter.length === 1) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setEnemyHp(enemyHp - starterOne.attack_damage);
          setStarterOneStamina(starterOneStamina - starterOne.attack_stamina);

          if (enemyHp - starterOne.attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].attack_damage);
          setStarterOneStamina(
            starterOneStamina - basicAttacks[0].attack_stamina
          );

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterOneStamina(
            starterOneStamina - basicAttacks[1].attack_stamina
          );

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.item_hp);
          setStarterOneStamina(starterOneStamina + attackType.item_stamina);
          setCurrentSpeed(starterOne.speed + attackType.item_speed);

          if (starterOneHp + attackType.item_hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (
            starterOneStamina + attackType.item_stamina >
            starterOne.stamina
          ) {
            setStarterOneStamina(starterOne.stamina);
          }

          // setInventoryOpen(false);

          dispatch({
            type: "SAGA_USE_ITEM",
            payload: {
              itemId: attackType.id,
            },
          });
        }
      }
    } else if (starter.length === 2) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setEnemyHp(enemyHp - starterOne.attack_damage);
          setStarterOneStamina(starterOneStamina - starterOne.attack_stamina);

          if (enemyHp - starterOne.attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].attack_damage);
          setStarterOneStamina(
            starterOneStamina - basicAttacks[0].attack_stamina
          );

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterOneStamina(
            starterOneStamina - basicAttacks[1].attack_stamina
          );

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.item_hp);
          setStarterOneStamina(starterOneStamina + attackType.item_stamina);
          setCurrentSpeed(starterOne.speed + attackType.item_speed);

          if (starterOneHp + attackType.item_hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (
            starterOneStamina + attackType.item_stamina >
            starterOne.stamina
          ) {
            setStarterOneStamina(starterOne.stamina);
          }

          // setInventoryOpen(false);

          dispatch({
            type: "SAGA_USE_ITEM",
            payload: {
              itemId: attackType.id,
            },
          });
        } else if (attackType === "starterTwo") {
          setCurrentId(starterTwo.id);
          setCurrentSpeed(starterTwo.speed);
          setMaxHp(starterTwo.hp);
          setMaxStamina(starterTwo.stamina);
          setStarterPicture(starterTwo.battle_pic);
          // setSwitchOpen(false);
        }
      } else if (currentId === starterTwo.id) {
        if (attackType === "unique") {
          setEnemyHp(enemyHp - starterTwo.attack_damage);
          setStarterTwoStamina(starterTwoStamina - starterTwo.attack_stamina);

          if (enemyHp - starterTwo.attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            return setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].attack_damage);
          setStarterTwoStamina(
            starterTwoStamina - basicAttacks[0].attack_stamina
          );

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterTwoStamina(
            starterTwoStamina - basicAttacks[1].attack_stamina
          );

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterTwoHp(starterTwoHp + attackType.item_hp);
          setStarterTwoStamina(starterTwoStamina + attackType.item_stamina);
          setCurrentSpeed(starterTwo.speed + attackType.item_speed);

          if (starterTwoHp + attackType.item_hp > starterTwo.hp) {
            setStarterTwoHp(starterTwo.hp);
          }
          if (
            starterTwoStamina + attackType.item_stamina >
            starterTwo.stamina
          ) {
            setStarterTwoStamina(starterTwo.stamina);
          }

          // setInventoryOpen(false);

          dispatch({
            type: "SAGA_USE_ITEM",
            payload: {
              itemId: attackType.id,
            },
          });
        } else if (attackType === "starterOne") {
          setCurrentId(starterOne.id);
          setCurrentSpeed(starterOne.speed);
          setMaxHp(starterOne.hp);
          setMaxStamina(starterOne.stamina);
          setStarterPicture(starterOne.battle_pic);
          // setSwitchOpen(false);
        }
      }
    }

    return enemyHp;
  };

  // after an action it reads it and puts it on the screen
  const characterTextBox = (attackType, basicAttacks, starterOne) => {
    if (starter.length === 1) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${starterOne.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${basicAttacks[0].attack_name}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${basicAttacks[1].attack_name}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterTwo") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } switched out into ${starterTwo.character_name}.`
          );
        }
      }
    } else if (starter.length === 2) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${starterOne.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${basicAttacks[0].attack_name}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used ${basicAttacks[1].attack_name}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterTwo") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.character_name
                : starterOne.nickname
            } switched out into ${starterTwo.character_name}.`
          );
        }
      } else if (currentId === starterTwo.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.character_name
                : starterTwo.nickname
            } used ${starterTwo.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.character_name
                : starterTwo.nickname
            } used ${basicAttacks[0].attack_name}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.character_name
                : starterTwo.nickname
            } used ${basicAttacks[1].attack_name}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.character_name
                : starterTwo.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterOne") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.character_name
                : starterTwo.nickname
            } switched out into ${starterOne.character_name}.`
          );
        }
      }
    }
  };

  // after 3.5 seconds after user attacks, this will do all of the enemys attacks
  const enemyAttack = (
    attackType,
    enemyOne,
    basicAttacks,
    characterAttackTimeOut
  ) => {
    setTimeout(() => {
      if (starter.length === 1) {
        if (currentId === starterOne.id) {
          if (enemyStamina >= enemyOne.attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - enemyOne.attack_damage);
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.item_hp - enemyOne.attack_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              }

              if (
                starterOneHp + attackType.item_hp - enemyOne.attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (starterTwoHp - enemyOne.attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (starterOneHp - enemyOne.attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }
          } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[0].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp +
                    attackType.item_hp -
                    basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[0].attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (starterTwoHp - basicAttacks[0].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (starterOneHp - basicAttacks[0].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }
          } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[1].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp +
                    attackType.item_hp -
                    basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[1].attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (starterTwoHp - basicAttacks[1].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (starterOneHp - basicAttacks[1].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }
          }
        }
      } else if (starter.length === 2) {
        if (currentId === starterOne.id) {
          if (enemyStamina >= enemyOne.attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - enemyOne.attack_damage);
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.item_hp - enemyOne.attack_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              }

              if (
                starterOneHp + attackType.item_hp - enemyOne.attack_damage <=
                  0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.item_hp - enemyOne.attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (
                starterTwoHp - enemyOne.attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - enemyOne.attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (
                starterOneHp - enemyOne.attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - enemyOne.attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[0].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp +
                    attackType.item_hp -
                    basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[0].attack_damage <=
                  0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[0].attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (
                starterTwoHp - basicAttacks[0].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[0].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (
                starterOneHp - basicAttacks[0].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[0].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterOneHp + attackType.item_hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[1].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp +
                    attackType.item_hp -
                    basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[1].attack_damage <=
                  0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp +
                  attackType.item_hp -
                  basicAttacks[1].attack_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (
                starterTwoHp - basicAttacks[1].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[1].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (
                starterOneHp - basicAttacks[1].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[1].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          }
        } else if (currentId === starterTwo.id) {
          if (enemyStamina >= enemyOne.attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterTwoHp + attackType.item_hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - enemyOne.attack_damage);
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp + attackType.item_hp - enemyOne.attack_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.attack_stamina);
              }

              if (
                starterTwoHp + attackType.item_hp - enemyOne.attack_damage <=
                  0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.item_hp - enemyOne.attack_damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (
                starterOneHp - enemyOne.attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - enemyOne.attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - enemyOne.attack_damage);
              setEnemyStamina(enemyStamina - enemyOne.attack_stamina);

              if (
                starterTwoHp - enemyOne.attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - enemyOne.attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterTwoHp + attackType.item_hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - basicAttacks[0].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp +
                    attackType.item_hp -
                    basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (
                starterTwoHp +
                  attackType.item_hp -
                  basicAttacks[0].attack_damage <=
                  0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp +
                  attackType.item_hp -
                  basicAttacks[0].attack_damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (
                starterOneHp - basicAttacks[0].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[0].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);

              if (
                starterTwoHp - basicAttacks[0].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[0].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
            if (attackType.item_type == "consumable") {
              if (starterTwoHp + attackType.item_hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - basicAttacks[1].attack_damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp +
                    attackType.item_hp -
                    basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (
                starterTwoHp +
                  attackType.item_hp -
                  basicAttacks[1].attack_damage <=
                  0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp +
                  attackType.item_hp -
                  basicAttacks[1].attack_damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (
                starterOneHp - basicAttacks[1].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[1].attack_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].attack_damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);

              if (
                starterTwoHp - basicAttacks[1].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[1].attack_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
          }
        }
      }
    }, 200);

    return starterOneHp;
  };

  // after 3.5 seconds this will run and put whatever enemy did on the screen
  const enemyTextBox = () => {
    if (enemyStamina >= enemyOne.attack_stamina) {
      setTextBox(`${enemyOne.character_name} used ${enemyOne.attack_name}`);
    } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
      setTextBox(
        `${enemyOne.character_name} used ${basicAttacks[0].attack_name}`
      );
    } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
      setTextBox(
        `${enemyOne.character_name} used ${basicAttacks[1].attack_name}`
      );
    } else if (enemyStamina === 0) {
      setTextBox(
        `${enemyOne.character_name} tried to attack but it failed. They have no more stamina and could not move.`
      );
    }
  };

  // holds every battle funtions inside and in order
  const battle = (attackType) => {
    disableAllButtons();

    if (
      currentSpeed >= enemyOne.speed ||
      attackType === "starterOne" ||
      attackType === "starterTwo" ||
      attackType.item_type == "consumable"
    ) {
      const enemyAttackTimeOut = setTimeout(() => {
        enemyAttack(attackType, enemyOne, basicAttacks);
        enemyTextBox();
      }, 3000);

      attack(attackType, basicAttacks, starterOne, enemyAttackTimeOut);
      characterTextBox(attackType, basicAttacks, starterOne);
    } else {
      const characterAttackTimeOut = setTimeout(() => {
        attack(attackType, basicAttacks, starterOne);
        characterTextBox(attackType, basicAttacks, starterOne);
      }, 3000);

      enemyAttack(attackType, enemyOne, basicAttacks, characterAttackTimeOut);
      enemyTextBox();
    }
  };

  // Displays the canvas buttons
  const [displayButtons, setDisplayButtons] = useState("attack");

  const toggleAllButtons = () => {
    if (displayButtons === "attack") {
      return (
        <>
          <button
            onClick={() => battle("unique")}
            id="attackButton"
            // className="projectile"
            className={
              starter.length === 1
                ? starterOne.attack_type
                : currentId === starterOne.id
                ? starterOne.attack_type
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
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < starterOne.attack_stamina
                  ? true
                  : isDisabled
                : starterTwoStamina < starterTwo.attack_stamina
                ? true
                : isDisabled
            }
          >
            {starter.length === 1
              ? starterOne.attack_name
              : currentId === starterOne.id
              ? starterOne.attack_name
              : starterTwo.attack_name}
          </button>

          <button
            onClick={() => battle("punch")}
            id="attackButton"
            className={kickAttackType}
            // className="summon"
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
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < kickStamina
                  ? true
                  : isDisabled
                : starterTwoStamina < kickStamina
                ? true
                : isDisabled
            }
          >
            {kickAttack}
          </button>

          <button
            onClick={() => battle("poke")}
            id="attackButton"
            className={pokeAttackType}
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
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < pokeStamina
                  ? true
                  : isDisabled
                : starterTwoStamina < pokeStamina
                ? true
                : isDisabled
            }
          >
            {pokeAttack}
          </button>
        </>
      );
    } else if (displayButtons === "inventory") {
      return (
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
                      sx={{
                        color: "black",
                        fontSize: 9,
                        fontFamily: "New Super Mario Font U",
                        borderColor: "black",
                        height: "35px",
                        width: "60px",
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
      );
    } else if (displayButtons === "switch") {
      return (
        <>
          {starter.length === 1 ? (
            <List>
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
                  sx={{
                    color: "black",
                    fontSize: 10,
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
            <List>
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
                  sx={{
                    color: "black",
                    fontSize: 10,
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
                  sx={{
                    color: "black",
                    fontSize: 10,
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
        </>
      );
    }
  };

  // the canvas function
  const battleCanvasRef = useRef(null);
  useEffect(() => {
    if (battleCanvasRef.current) {
      const canvas = battleCanvasRef.current;
      const c = canvas.getContext("2d");

      const backgroundImage = new Image();
      backgroundImage.src = battleBackground;

      const enemyImage = new Image();
      enemyImage.src = enemyPicture;
      // console.log('enemySpriteImage', enemySpriteImage);

      const starterImage = new Image();
      starterImage.src = starterPicture;
      // console.log('starterSpriteImage', starterSpriteImage);

      const starterTwoImage = new Image();
      starterTwoImage.src = starterTwoPicture;

      class Sprite {
        constructor({
          position,
          image,
          frames = { max: 1, hold: 10, alignment: 0, attackFx: false },
          sprites,
          animate = false,
          isEnemy = false,
          rotation = 0,
          name = "no name",
          health,
          maxHealth,
          stamina,
          maxStamina,
          speed,
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
          this.isEnemy = isEnemy;
          this.rotation = rotation;
          this.name = name;
          this.health = health;
          this.maxHealth = maxHealth;
          this.stamina = stamina;
          this.maxStamina = maxStamina;
          this.speed = speed;
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

        attack({ attack, recipient, renderedSprites }) {
          if (this.isEnemy) {
            if (this.stamina >= enemyAttackStats.attack_stamina) {
              attack = enemyAttackStats;
            } else if (this.stamina >= kickStamina) {
              attack = kickAttackStats;
            } else if (this.stamina >= pokeStamina) {
              attack = pokeAttackStats;
            } else if (this.stamina === 0) {
              attack = {
                attack_type: "tired",
                attack_name: "tired",
                attack_damage: 0,
                attack_stamina: 0,
              };
            }
          }

          this.health -= attack.attack_damage;
          this.stamina -= attack.attack_stamina;

          console.log(this.health);
          console.log(this.stamina);
          console.log(this.name);

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
                    width: (this.health / this.maxHealth) * 100 + "%",
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
                  width: (this.health / this.maxHealth) * 100 + "%",
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
                  width: (this.health / this.maxHealth) * 100 + "%",
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

          setTimeout(() => {
            document.getElementById("dialogueBox").style.display = "none";
          }, 4500);
        }
      }

      const background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: backgroundImage,
      });

      const enemy = new Sprite({
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

      const starter = new Sprite({
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

      const starter2 = new Sprite({
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

      const renderedSprites = [enemy, starter, starter2];

      function animateBattle() {
        window.requestAnimationFrame(animateBattle);
        background.draw();

        renderedSprites.forEach((sprite) => {
          sprite.draw();
        });
      }
      animateBattle();

      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
          // console.log("e", e.target.innerHTML);
          if (e.target.id === "attackButton") {
            // console.log('in attack button', button);
            const characterSelectedAttack = e.target.innerHTML;
            let selectedAttack = {};

            // console.log('characterSelectedAttack', characterSelectedAttack);

            if (characterSelectedAttack === starterOneAttackStats.attack_name) {
              selectedAttack = starterOneAttackStats;
            } else if (
              characterSelectedAttack === kickAttackStats.attack_name
            ) {
              selectedAttack = kickAttackStats;
            } else if (
              characterSelectedAttack === pokeAttackStats.attack_name
            ) {
              selectedAttack = pokeAttackStats;
            }

            // console.log("selectedAttack", selectedAttack);

            if (starterOneSpeed >= enemySpeed) {
              starter.attack({
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites,
              });

              setTimeout(() => {
                enemy.attack({
                  attack: selectedAttack,
                  recipient: starter,
                  renderedSprites,
                });
              }, 2700);
            } else if (starterOneSpeed < enemySpeed) {
              enemy.attack({
                attack: selectedAttack,
                recipient: starter,
                renderedSprites,
              });

              setTimeout(() => {
                starter.attack({
                  attack: selectedAttack,
                  recipient: enemy,
                  renderedSprites,
                });
              }, 2700);
            }
          } else if (
              button.id === "starterOne" ||
              button.id === "starterTwo" ||
              button.id == "consumable"
            ) {
              console.log("in switch");

              if (button.id === "starterOne") {
                console.log('switching starter 1');
                
                // this.image = starterOne.battle_pic;
              } else if (button.id === "starterTwo") {
                console.log('switching starter 2');

                // this.image = starterTwo.battle_pic;
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
    }
  }, [usersConsumableItems]);

  return (
    <div className="battle">
      {/* plays battle music */}
      <audio src={battleMusic} autoPlay />

      {/* the area of the whole canvas */}
      <div style={{ display: "inline-block", position: "relative" }}>
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
        <canvas
          ref={battleCanvasRef}
          height={576}
          width={1024}
          className="canvasForBattle"
        ></canvas>

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
                onClick={() => battle("unique")}
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
                      : isDisabled
                    : currentId === starterOne.id
                    ? starterOneStamina < starterOne.attack_stamina
                      ? true
                      : isDisabled
                    : starterTwoStamina < starterTwo.attack_stamina
                    ? true
                    : isDisabled
                }
              >
                {starter.length === 1
                  ? starterOne.attack_name
                  : currentId === starterOne.id
                  ? starterOne.attack_name
                  : starterTwo.attack_name}
              </button>

              <button
                onClick={() => battle("punch")}
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
                      : isDisabled
                    : currentId === starterOne.id
                    ? starterOneStamina < kickStamina
                      ? true
                      : isDisabled
                    : starterTwoStamina < kickStamina
                    ? true
                    : isDisabled
                }
              >
                {kickAttack}
              </button>

              <button
                onClick={() => battle("poke")}
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
                      : isDisabled
                    : currentId === starterOne.id
                    ? starterOneStamina < pokeStamina
                      ? true
                      : isDisabled
                    : starterTwoStamina < pokeStamina
                    ? true
                    : isDisabled
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
                            disabled={
                              usersConsumables.number <= 0 ? true : false
                            }
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
                disabled={isDisabled}
              >
                Inventory
              </button>

              {/* the switch button */}
              <button
                onClick={() => setDisplayButtons("switch")}
                className="switch"
                disabled={isDisabled}
              >
                Switch
              </button>

              {/* run button */}
              <button
                onClick={() => history.push("/home")}
                className="runButton"
                disabled={isDisabled}
              >
                Run
              </button>

              {/* shows all the attack buttons */}
              <button
                onClick={() => setDisplayButtons("attack")}
                className="attackToggleButton"
                disabled={isDisabled}
              >
                Attack
              </button>
            </>
          </div>
        </div>
      </div>

      {/* for the winner  */}
      <Fragment>
        <Dialog
          open={openWinner}
          onClose={handleWinnerClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ opacity: 0.9 }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              opacity: 1,
            }}
          >
            {"Congrats, you win!!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                opacity: 1,
              }}
            >
              You've unlocked the next level! Click the close button to go back
              home and collect your 10 coins!
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
                fontSize: 16,
                borderColor: "black",
                opacity: 1,
              }}
              variant="outlined"
              onClick={handleWinnerClose}
              autoFocus
            >
              {" "}
              Close{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      {/* for the loser */}
      <Fragment>
        <Dialog
          open={openLoser}
          onClose={handleLoserClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ opacity: 0.9 }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              opacity: 1,
            }}
          >
            {"You Lost, better luck next time pal."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                opacity: 1,
              }}
            >
              You Suck, click the close button to go home and try again!
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              opacity: 1,
            }}
          >
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
                fontSize: 16,
                borderColor: "black",
                opacity: 1,
              }}
              variant="outlined"
              onClick={handleLoserClose}
              autoFocus
            >
              {" "}
              Close{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      {/* Dead switching character dialog */}
      <Fragment>
        <Dialog
          fullScreen
          open={deadOpen}
          onClose={handleDeadClose}
          TransitionComponent={DeadTransition}
        >
          <AppBar
            sx={{
              position: "relative",
              backgroundColor: "black",
              fontFamily: "New Super Mario Font U",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDeadClose}
                aria-label="close"
              ></IconButton>
              <Typography
                sx={{ ml: 65.5, flex: 1, fontFamily: "New Super Mario Font U" }}
                variant="h4"
                component="div"
              >
                Choose A Character
              </Typography>
            </Toolbar>
          </AppBar>

          {starter.length === 1 ? (
            <List>
              <ListItem>
                <img height={200} width={200} src={starterOne.profile_pic} />
                <ListItemText
                  sx={{ ml: 55 }}
                  primary={`starter 1: ${starterOne.character_name}`}
                  secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                />
                <Button
                  sx={{
                    color: "black",
                    fontSize: 20,
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
                  onClick={() => deadSwitch("starterOne")}
                >
                  Change Starter
                </Button>
              </ListItem>
              <Divider />
            </List>
          ) : (
            <List>
              <ListItem>
                <img height={200} width={200} src={starterOne.profile_pic} />
                <ListItemText
                  sx={{ ml: 55 }}
                  primary={`starter 1: ${starterOne.character_name}`}
                  secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                />
                <Button
                  sx={{
                    color: "black",
                    fontSize: 20,
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
                  onClick={() => deadSwitch("starterOne")}
                >
                  Change Starter
                </Button>
              </ListItem>

              <Divider />

              <ListItem>
                <img height={200} width={200} src={starterTwo.profile_pic} />
                <ListItemText
                  sx={{ ml: 55 }}
                  primary={`starter 2: ${starterTwo.name}`}
                  secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.stamina} stamina | ${starterTwo.speed} speed`}
                />
                <Button
                  sx={{
                    color: "black",
                    fontSize: 20,
                    fontFamily: "New Super Mario Font U",
                    borderColor: "black",
                  }}
                  variant="outlined"
                  disabled={
                    currentId === starterTwo.id
                      ? true
                      : starterTwoHp <= 0
                      ? true
                      : false
                  }
                  onClick={() => deadSwitch("starterTwo")}
                >
                  Change Starter
                </Button>
              </ListItem>

              <Divider />
            </List>
          )}
        </Dialog>
      </Fragment>
    </div>
  );
}

export default Battle;
