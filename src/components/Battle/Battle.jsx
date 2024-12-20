import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  forwardRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import BackButton from "../BackButton/BackButton";
import "./Battle.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import lakeBackground from "./img/LakeBackground.png";
import forestBackground from "./img/RockForest.webp";
import battleBackground from "./img/battleBackground.png";
import draggleSpriteImage from "./img/draggleSprite.png";
import embySpriteImage from "./img/embySprite.png";
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
// import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import Box from "@mui/material/Box";
// import ListItemButton from "@mui/material/ListItemButton";
import battleMusic from "../../audio/battleMusic.mp3";
import { duration } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SwitchTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeadTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Battle() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "SAGA_FETCH_LEVEL_ENEMY",
      payload: id,
    });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  useEffect(() => {
    getStarters();
    getEnemy();
    getBasicAttacks();
  }, []);

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

  // starter one hp and stamina
  const [starterOneHp, setStarterOneHp] = useState(0);
  const [starterOneStamina, setStarterOneStamina] = useState(0);
  // starter two hp and stamina
  const [starterTwoHp, setStarterTwoHp] = useState(0);
  const [starterTwoStamina, setStarterTwoStamina] = useState(0);

  // All current varibles for battle
  const [characterPicture, setCharacterPicture] = useState();
  const [currentId, setCurrentId] = useState(0);
  const [currentHp, setCurrentHp] = useState(0);
  const [currentStamina, setCurrentStamina] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentUniqueDamage, setUniqueDamage] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [maxStamina, setMaxStamina] = useState(0);

  // enemy hp and stamina
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyStamina, setEnemyStamina] = useState(0);

  // kick attack name and stamina
  const [kickAttack, setKickAttack] = useState("");
  const [kickStamina, setKickStamina] = useState(0);

  // poke attack name and stamina
  const [pokeAttack, setPokeAttack] = useState("");
  const [pokeStamina, setPokeStamina] = useState(0);

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
          setCurrentSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          setCharacterPicture(response.data[0].battle_pic);
        } else if (response.data.length === 2) {
          setStarterOneHp(response.data[0].hp);
          setStarterOneStamina(response.data[0].stamina);
          setCurrentId(response.data[0].id);
          setCurrentSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          setCharacterPicture(response.data[0].battle_pic);

          setStarterTwoHp(response.data[1].hp);
          setStarterTwoStamina(response.data[1].stamina);
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
        setKickAttack(response.data[0].attack);
        setKickStamina(response.data[0].stamina);
        setPokeAttack(response.data[1].attack);
        setPokeStamina(response.data[1].stamina);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // text box for actions
  const [textBox, setTextBox] = useState("");

  // features that get triggered as the battle goes on
  const [isDisabled, setIsDisabled] = useState(false);
  const [enemyClassName, setEnemyClassName] = useState("enemy");
  const [enemyPicAttack, setEnemyPicAttack] = useState("");
  const [characterPicAttack, setCharacterPicAttack] = useState("");

  // All the inventory dialog functions
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const handleInventoryOpen = () => {
    setInventoryOpen(true);
  };

  const handleInventoryClose = () => {
    setInventoryOpen(false);
  };

  // All of the Switch dialog functions
  const [switchOpen, setSwitchOpen] = useState(false);

  const handleSwitchOpen = () => {
    setSwitchOpen(true);
  };

  const handleSwitchClose = () => {
    setSwitchOpen(false);
  };

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
      setCharacterPicture(starterOne.profile_pic);
      setDeadOpen(false);
    } else if (switchType === "starterTwo") {
      setCurrentId(starterTwo.id);
      setCurrentSpeed(starterTwo.speed);
      setMaxHp(starterTwo.hp);
      setMaxStamina(starterTwo.stamina);
      setCharacterPicture(starterTwo.profile_pic);
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

  const [displayAttacks, setDisplayAttacks] = useState(false);

  // toggles attack buttons
  const toggleButtons = () => {
    if (displayAttacks) {
      return (
        <>
          <button
            onClick={() => battle("unique")}
            className="uniqueAttack"
            disabled={
              starter.length === 1
                ? starterOneStamina < starterOne.unique_stamina
                  ? true
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < starterOne.unique_stamina
                  ? true
                  : isDisabled
                : starterTwoStamina < starterTwo.unique_stamina
                ? true
                : isDisabled
            }
          >
            {starter.length === 1
              ? starterOne.unique_attack
              : currentId === starterOne.id
              ? starterOne.unique_attack
              : starterTwo.unique_attack}
          </button>

          <button
            onClick={() => battle("punch")}
            className="kickAttack"
            disabled={
              starter.length === 1
                ? starterOneStamina < kickStamina
                  ? true
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < basicAttacks[0].stamina
                  ? true
                  : isDisabled
                : starterTwoStamina < basicAttacks[0].stamina
                ? true
                : isDisabled
            }
          >
            {kickAttack}
          </button>

          <button
            onClick={() => setDisplayAttacks(false)}
            className="backButtonAttack"
            disabled={isDisabled}
          >
            Back
          </button>

          <button
            onClick={() => battle("poke")}
            className="pokeAttack"
            disabled={
              starter.length === 1
                ? starterOneStamina < basicAttacks[1].stamina
                  ? true
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < basicAttacks[1].stamina
                  ? true
                  : isDisabled
                : starterTwoStamina < basicAttacks[1].stamina
                ? true
                : isDisabled
            }
          >
            {basicAttacks[1].attack}
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={handleInventoryOpen}
            className="inventoryMove"
            disabled={isDisabled}
          >
            Inventory
          </button>

          <button
            onClick={handleSwitchOpen}
            className="switch"
            disabled={isDisabled}
          >
            Switch
          </button>

          <button
            onClick={() => history.push("/home")}
            className="runButton"
            disabled={isDisabled}
          >
            Run
          </button>

          <button
            onClick={() => setDisplayAttacks(true)}
            className="attackToggleButton"
            disabled={isDisabled}
          >
            Attack
          </button>
        </>
      );
    }
  };

  // this is for the users attacks or actions
  const attack = (attackType, basicAttacks, starterOne, enemyAttackTimeOut) => {
    setTimeout(() => {
      setCharacterPicAttack("");
    }, 150);

    if (starter.length === 1) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setEnemyHp(enemyHp - starterOne.unique_damage);
          setStarterOneStamina(starterOneStamina - starterOne.unique_stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - starterOne.unique_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[0].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[0].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[1].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[1].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.hp);
          setStarterOneStamina(starterOneStamina + attackType.stamina);
          setCurrentSpeed(starterOne.speed + attackType.speed);

          if (starterOneHp + attackType.hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (starterOneStamina + attackType.stamina > starterOne.stamina) {
            setStarterOneStamina(starterOne.stamina);
          }

          setInventoryOpen(false);

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
          setEnemyHp(enemyHp - starterOne.unique_damage);
          setStarterOneStamina(starterOneStamina - starterOne.unique_stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - starterOne.unique_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[0].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[0].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[1].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[1].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.hp);
          setStarterOneStamina(starterOneStamina + attackType.stamina);
          setCurrentSpeed(starterOne.speed + attackType.speed);

          if (starterOneHp + attackType.hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (starterOneStamina + attackType.stamina > starterOne.stamina) {
            setStarterOneStamina(starterOne.stamina);
          }

          setInventoryOpen(false);

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
          setCharacterPicture(starterTwo.battle_pic);
          setSwitchOpen(false);
        }
      } else if (currentId === starterTwo.id) {
        if (attackType === "unique") {
          setEnemyHp(enemyHp - starterTwo.unique_damage);
          setStarterTwoStamina(starterTwoStamina - starterTwo.unique_stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - starterTwo.unique_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            return setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].damage);
          setStarterTwoStamina(starterTwoStamina - basicAttacks[0].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[0].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].damage);
          setStarterTwoStamina(starterTwoStamina - basicAttacks[1].stamina);

          setCharacterPicAttack("chacracterPicAttack");

          if (enemyHp - basicAttacks[1].damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.type == "consumable") {
          setStarterTwoHp(starterTwoHp + attackType.hp);
          setStarterTwoStamina(starterTwoStamina + attackType.stamina);
          setCurrentSpeed(starterTwo.speed + attackType.speed);

          if (starterTwoHp + attackType.hp > starterTwo.hp) {
            setStarterTwoHp(starterTwo.hp);
          }
          if (starterTwoStamina + attackType.stamina > starterTwo.stamina) {
            setStarterTwoStamina(starterTwo.stamina);
          }

          setInventoryOpen(false);

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
          setCharacterPicture(starterOne.battle_pic);
          setSwitchOpen(false);
        }
      }
    }

    return enemyHp;
  };

  // after an action it reads it and puts it on the screen
  // const characterTextBox = (attackType, basicAttacks, starterOne) => {
  //   if (starter.length === 1) {
  //     if (currentId === starterOne.id) {
  //       if (attackType === "unique") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${starterOne.unique_attack}. It did ${
  //             starterOne.unique_damage
  //           } damage and took ${starterOne.unique_stamina} stamina.`
  //         );
  //       } else if (attackType === "punch") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${basicAttacks[0].attack}. It did ${
  //             basicAttacks[0].damage
  //           } damage and took ${basicAttacks[0].stamina} stamina.`
  //         );
  //       } else if (attackType === "poke") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${basicAttacks[1].attack}. It did ${
  //             basicAttacks[1].damage
  //           } damage and took ${basicAttacks[1].stamina} stamina.`
  //         );
  //       } else if (attackType.type == "consumable") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used a ${attackType.name} and it healed ${
  //             attackType.hp
  //           } hp and added ${attackType.stamina} stamina.`
  //         );
  //       } else if (attackType === "starterTwo") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } switched out into ${starterTwo.name}.`
  //         );
  //       }
  //     }
  //   } else if (starter.length === 2) {
  //     if (currentId === starterOne.id) {
  //       if (attackType === "unique") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${starterOne.unique_attack}. It did ${
  //             starterOne.unique_damage
  //           } damage and took ${starterOne.unique_stamina} stamina.`
  //         );
  //       } else if (attackType === "punch") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${basicAttacks[0].attack}. It did ${
  //             basicAttacks[0].damage
  //           } damage and took ${basicAttacks[0].stamina} stamina.`
  //         );
  //       } else if (attackType === "poke") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used ${basicAttacks[1].attack}. It did ${
  //             basicAttacks[1].damage
  //           } damage and took ${basicAttacks[1].stamina} stamina.`
  //         );
  //       } else if (attackType.type == "consumable") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } used a ${attackType.name} and it healed ${
  //             attackType.hp
  //           } hp and added ${attackType.stamina} stamina.`
  //         );
  //       } else if (attackType === "starterTwo") {
  //         setTextBox(
  //           `${
  //             starterOne.nickname === null
  //               ? starterOne.name
  //               : starterOne.nickname
  //           } switched out into ${starterTwo.name}.`
  //         );
  //       }
  //     } else if (currentId === starterTwo.id) {
  //       if (attackType === "unique") {
  //         setTextBox(
  //           `${
  //             starterTwo.nickname === null
  //               ? starterTwo.name
  //               : starterTwo.nickname
  //           } used ${starterTwo.unique_attack}. It did ${
  //             starterTwo.unique_damage
  //           } damage and took ${starterTwo.unique_stamina} stamina.`
  //         );
  //       } else if (attackType === "punch") {
  //         setTextBox(
  //           `${
  //             starterTwo.nickname === null
  //               ? starterTwo.name
  //               : starterTwo.nickname
  //           } used ${basicAttacks[0].attack}. It did ${
  //             basicAttacks[0].damage
  //           } damage and took ${basicAttacks[0].stamina} stamina.`
  //         );
  //       } else if (attackType === "poke") {
  //         setTextBox(
  //           `${
  //             starterTwo.nickname === null
  //               ? starterTwo.name
  //               : starterTwo.nickname
  //           } used ${basicAttacks[1].attack}. It did ${
  //             basicAttacks[1].damage
  //           } damage and took ${basicAttacks[1].stamina} stamina.`
  //         );
  //       } else if (attackType.type == "consumable") {
  //         setTextBox(
  //           `${
  //             starterTwo.nickname === null
  //               ? starterTwo.name
  //               : starterTwo.nickname
  //           } used a ${attackType.name} and it healed ${
  //             attackType.hp
  //           } hp and added ${attackType.stamina} stamina.`
  //         );
  //       } else if (attackType === "starterOne") {
  //         setTextBox(
  //           `${
  //             starterTwo.nickname === null
  //               ? starterTwo.name
  //               : starterTwo.nickname
  //           } switched out into ${starterOne.name}.`
  //         );
  //       }
  //     }
  //   }
  // };

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
          if (enemyStamina >= enemyOne.unique_stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - enemyOne.unique_damage);
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - enemyOne.unique_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              }

              if (starterOneHp + attackType.hp - enemyOne.unique_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (starterTwoHp - enemyOne.unique_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (starterOneHp - enemyOne.unique_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[0].stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[0].damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - basicAttacks[0].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              }

              if (starterOneHp + attackType.hp - basicAttacks[0].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (starterTwoHp - basicAttacks[0].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (starterOneHp - basicAttacks[0].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[1].stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[1].damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - basicAttacks[1].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              }

              if (starterOneHp + attackType.hp - basicAttacks[1].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (starterTwoHp - basicAttacks[1].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (starterOneHp - basicAttacks[1].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          }
        }
      } else if (starter.length === 2) {
        if (currentId === starterOne.id) {
          if (enemyStamina >= enemyOne.unique_stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - enemyOne.unique_damage);
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - enemyOne.unique_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              }

              if (
                starterOneHp + attackType.hp - enemyOne.unique_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.hp - enemyOne.unique_damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (
                starterTwoHp - enemyOne.unique_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - enemyOne.unique_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (
                starterOneHp - enemyOne.unique_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - enemyOne.unique_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[0].stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[0].damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - basicAttacks[0].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              }

              if (
                starterOneHp + attackType.hp - basicAttacks[0].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.hp - basicAttacks[0].damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (
                starterTwoHp - basicAttacks[0].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[0].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (
                starterOneHp - basicAttacks[0].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[0].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[1].stamina) {
            if (attackType.type == "consumable") {
              if (starterOneHp + attackType.hp > starterOne.hp) {
                setStarterOneHp(starterOne.hp - basicAttacks[1].damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              } else {
                setStarterOneHp(
                  starterOneHp + attackType.hp - basicAttacks[1].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              }

              if (
                starterOneHp + attackType.hp - basicAttacks[1].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.hp - basicAttacks[1].damage <=
                0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterTwo") {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (
                starterTwoHp - basicAttacks[1].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[1].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterOneHp(starterOneHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (
                starterOneHp - basicAttacks[1].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[1].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          }
        } else if (currentId === starterTwo.id) {
          if (enemyStamina >= enemyOne.unique_stamina) {
            if (attackType.type == "consumable") {
              if (starterTwoHp + attackType.hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - enemyOne.unique_damage);
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp + attackType.hp - enemyOne.unique_damage
                );
                setEnemyStamina(enemyStamina - enemyOne.unique_stamina);
              }

              if (
                starterTwoHp + attackType.hp - enemyOne.unique_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.hp - enemyOne.unique_damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (
                starterOneHp - enemyOne.unique_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - enemyOne.unique_damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - enemyOne.unique_damage);
              setEnemyStamina(enemyStamina - enemyOne.unique_stamina);

              if (
                starterTwoHp - enemyOne.unique_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - enemyOne.unique_damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[0].stamina) {
            if (attackType.type == "consumable") {
              if (starterTwoHp + attackType.hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - basicAttacks[0].damage);
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp + attackType.hp - basicAttacks[0].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].stamina);
              }

              if (
                starterTwoHp + attackType.hp - basicAttacks[0].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.hp - basicAttacks[0].damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (
                starterOneHp - basicAttacks[0].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[0].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - basicAttacks[0].damage);
              setEnemyStamina(enemyStamina - basicAttacks[0].stamina);

              if (
                starterTwoHp - basicAttacks[0].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[0].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }

            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          } else if (enemyStamina >= basicAttacks[1].stamina) {
            if (attackType.type == "consumable") {
              if (starterTwoHp + attackType.hp > starterTwo.hp) {
                setStarterTwoHp(starterTwo.hp - basicAttacks[1].damage);
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              } else {
                setStarterTwoHp(
                  starterTwoHp + attackType.hp - basicAttacks[1].damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].stamina);
              }

              if (
                starterTwoHp + attackType.hp - basicAttacks[1].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.hp - basicAttacks[1].damage <=
                0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else if (attackType === "starterOne") {
              setStarterOneHp(starterOneHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (
                starterOneHp - basicAttacks[1].damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterOneHp - basicAttacks[1].damage <= 0) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            } else {
              setStarterTwoHp(starterTwoHp - basicAttacks[1].damage);
              setEnemyStamina(enemyStamina - basicAttacks[1].stamina);

              if (
                starterTwoHp - basicAttacks[1].damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (starterTwoHp - basicAttacks[1].damage <= 0) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                handleDeadOpen();
              }
            }
            setEnemyPicAttack("enemyPicAttack");
            setEnemyClassName("shake");
          }
        }
      }
    }, 200);

    setTimeout(() => {
      setEnemyPicAttack("");
      setEnemyClassName("enemy");
    }, 350);

    return starterOneHp;
  };

  // after 3.5 seconds this will run and put whatever enemy did on the screen
  // const enemyTextBox = (enemyOne, basicAttacks) => {
  //   setTimeout(() => {
  //     if (enemyStamina >= enemyOne.unique_stamina) {
  //       setTextBox(
  //         `${enemyOne.name} used ${enemyOne.unique_attack}. It did ${enemyOne.unique_damage} damage and took ${enemyOne.unique_stamina} stamina.`
  //       );
  //     } else if (enemyStamina >= basicAttacks[0].stamina) {
  //       setTextBox(
  //         `${enemyOne.name} used ${basicAttacks[0].attack}. It did ${basicAttacks[0].damage} damage and took ${basicAttacks[0].stamina} stamina.`
  //       );
  //     } else if (enemyStamina >= basicAttacks[1].stamina) {
  //       setTextBox(
  //         `${enemyOne.name} used ${basicAttacks[1].attack}. It did ${basicAttacks[1].damage} damage and took ${basicAttacks[1].stamina} stamina.`
  //       );
  //     } else if (enemyStamina === 0) {
  //       setTextBox(
  //         `${enemyOne.name} tried to attack but it failed. They have no more stamina and could not move.`
  //       );
  //     }
  //   }, 300);
  // };

  // holds every battle funtions inside and in order
  const battle = (attackType) => {
    disableAllButtons();

    if (
      currentSpeed >= enemyOne.speed ||
      attackType === "starterOne" ||
      attackType === "starterTwo" ||
      attackType.type == "consumable"
    ) {
      const enemyAttackTimeOut = setTimeout(() => {
        enemyAttack(attackType, enemyOne, basicAttacks);
        // enemyTextBox(enemyOne, basicAttacks);
      }, 3000);

      attack(attackType, basicAttacks, starterOne, enemyAttackTimeOut);
      // characterTextBox(attackType, basicAttacks, starterOne);
    } else {
      const characterAttackTimeOut = setTimeout(() => {
        attack(attackType, basicAttacks, starterOne);
        // characterTextBox(attackType, basicAttacks, starterOne);
      }, 3000);

      enemyAttack(attackType, enemyOne, basicAttacks, characterAttackTimeOut);
      // enemyTextBox(enemyOne, basicAttacks);
    }
  };

  const [displayButtons, setDisplayButtons] = useState("attack");

  const toggleAllButtons = () => {
    if (displayButtons === "attack") {
      return (
        <>
          <Button
            onClick={() => battle("unique")}
            id="attackButton"
            // className="uniqueAttack"
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
                ? starterOneStamina < starterOne.unique_stamina
                  ? true
                  : isDisabled
                : currentId === starterOne.id
                ? starterOneStamina < starterOne.unique_stamina
                  ? true
                  : isDisabled
                : starterTwoStamina < starterTwo.unique_stamina
                ? true
                : isDisabled
            }
          >
            {starter.length === 1
              ? starterOne.unique_attack
              : currentId === starterOne.id
              ? starterOne.unique_attack
              : starterTwo.unique_attack}
          </Button>

          <Button
            onClick={() => battle("punch")}
            id="attackButton"
            // className="kickAttack"
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
          </Button>

          <Button
            onClick={() => battle("poke")}
            // className="pokeAttack"
            id="attackButton"
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
          </Button>
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
                      <img height={35} width={35} src={usersConsumables.pic} />
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
                        usersConsumables.hp === 0
                          ? ""
                          : `+${usersConsumables.hp} hp`
                      } ${
                        usersConsumables.stamina === 0
                          ? ""
                          : usersConsumables.hp === 0
                          ? `+${usersConsumables.stamina} stamina`
                          : `| +${usersConsumables.stamina} stamina`
                      } ${
                        usersConsumables.speed === 0
                          ? ""
                          : `| +${usersConsumables.speed} speed`
                      }`}
                    />
                    <Button
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
                    </Button>
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
                  primary={`starter 1: ${starterOne.name}`}
                  secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                />
                <Button
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
                </Button>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem>
                <img height={50} width={50} src={starterOne.profile_pic} />
                <ListItemText
                  sx={{ ml: 25 }}
                  primary={`starter 1: ${starterOne.name}`}
                  secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                />
                <Button
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
                </Button>
              </ListItem>

              <Divider />

              <ListItem>
                <img height={50} width={50} src={starterTwo.profile_pic} />
                <ListItemText
                  sx={{ ml: 25 }}
                  primary={`starter 2: ${starterTwo.name}`}
                  secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.stamina} stamina | ${starterTwo.speed} speed`}
                />
                <Button
                  sx={{
                    color: "black",
                    fontSize: 10,
                    fontFamily: "New Super Mario Font U",
                    borderColor: "black",
                    ml: 2,
                  }}
                  variant="outlined"
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
                </Button>
              </ListItem>
            </List>
          )}
        </>
      );
    }
  };

  const battleCanvasRef = useRef(null);

  useEffect(() => {
    if (battleCanvasRef.current) {
      const canvas = battleCanvasRef.current;
      const c = canvas.getContext("2d");

      const backgroundImage = new Image();
      backgroundImage.src = battleBackground;
      // console.log(backgroundImage);

      const draggleImage = new Image();
      draggleImage.src = draggleSpriteImage;

      const embyImage = new Image();
      embyImage.src = embySpriteImage;

      class Sprite {
        constructor({
          position,
          velocity,
          image,
          frames = { max: 1, hold: 10 },
          sprites,
          animate = false,
          isEnemy = false,
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
          this.opacity = 1;
          this.isEnemy = isEnemy;
        }

        draw() {
          c.save();
          c.globalAlpha = this.opacity;
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

        attack({ attack, recipient }) {
          const tl = gsap.timeline();

          let movementDistance = 20;

          if (this.isEnemy) {
            movementDistance = -20;
          }

          tl.to(this.position, {
            x: this.position.x - movementDistance,
          })
            .to(this.position, {
              x: this.position.x + movementDistance * 2,
              duration: 0.1,
              onComplete() {
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
        }
      }

      const background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        image: backgroundImage,
      });

      const draggle = new Sprite({
        position: {
          x: 800,
          y: 100,
        },
        image: draggleImage,
        frames: {
          max: 4,
          hold: 30,
        },
        animate: true,
        isEnemy: true,
      });

      const emby = new Sprite({
        position: {
          x: 280,
          y: 325,
        },
        image: embyImage,
        frames: {
          max: 4,
          hold: 30,
        },
        animate: true,
      });

      function animateBattle() {
        window.requestAnimationFrame(animateBattle);
        background.draw();
        draggle.draw();
        emby.draw();
      }
      animateBattle();

      document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
          if (button.id === "attackButton") {
            console.log(e.currentTarget.innerHTML);

            emby.attack({
              attack: {
                name: "tackle",
                damage: 10,
                type: "normal",
              },
              recipient: draggle,
            });

            setTimeout(() => {
              draggle.attack({
                attack: {
                  name: "tackle",
                  damage: 10,
                  type: "normal",
                },
                recipient: emby,
              });
            }, 2700);
          }
        });
      });
    }
  }, [pokeAttack])

  return (
    <div className="battle">
      <audio src={battleMusic} autoPlay />

      <div style={{ display: "inline-block", position: "relative" }}>
        {/* draggle health box */}
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
          <h1 style={{ margin: 0 }}>Draggle</h1>

          <progress
            className="hp-meter"
            value={enemyHp}
            max={enemyOne.hp}
          ></progress>
          <progress
            className="stamina-meter"
            value={enemyStamina}
            max={enemyOne.stamina}
          ></progress>
        </div>

        {/* emby health box */}
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
          <h1 style={{ margin: 0 }}>Emby</h1>

          <progress
            className="hp-meter"
            value={
              starter.length === 1
                ? starterOneHp
                : currentId === starterOne.id
                ? starterOneHp
                : starterTwoHp
            }
            max={maxHp}
          ></progress>
          <progress
            className="stamina-meter"
            value={
              starter.length === 1
                ? starterOneStamina
                : currentId === starterOne.id
                ? starterOneStamina
                : starterTwoStamina
            }
            max={maxStamina}
          ></progress>
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
          {/* all of the togglable buttons */}
          <div
            style={{
              width: "66.66%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {toggleAllButtons()}
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
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            {"Congrats, you win!!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
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
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            {"You Lost, better luck next time pal."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              You Suck, click the close button to go home and try again!
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

      {/* Switching character dialog */}
      <Fragment>
        <Dialog
          fullScreen
          open={switchOpen}
          onClose={handleSwitchClose}
          TransitionComponent={SwitchTransition}
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
                onClick={handleSwitchClose}
                aria-label="close"
                // aria-expanded
              >
                <CloseIcon />
              </IconButton>
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
                  primary={`starter 1: ${starterOne.name}`}
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
                  onClick={() => battle("starterOne")}
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
                  primary={`starter 1: ${starterOne.name}`}
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
                  onClick={() => battle("starterOne")}
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
                  onClick={() => battle("starterTwo")}
                >
                  Change Starter
                </Button>
              </ListItem>
              <Divider />
            </List>
          )}
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
                  primary={`starter 1: ${starterOne.name}`}
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
                  primary={`starter 1: ${starterOne.name}`}
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

      {/* Inventory dialog */}
      <Fragment>
        <Dialog
          fullScreen
          open={inventoryOpen}
          onClose={handleInventoryClose}
          TransitionComponent={Transition}
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
                onClick={handleInventoryClose}
                aria-label="close"
                aria-expanded
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{ ml: 73.5, flex: 1, fontFamily: "New Super Mario Font U" }}
                variant="h4"
                component="div"
              >
                Inventory
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <Box>
              {usersConsumableItems &&
                usersConsumableItems.map((usersConsumables) => {
                  return (
                    <div key={usersConsumables.id}>
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
                              fontSize: "25px",
                            }}
                          >
                            {usersConsumables.number}X
                          </p>
                          <img
                            height={125}
                            width={125}
                            src={usersConsumables.pic}
                          />
                        </Box>

                        <ListItemText
                          sx={{
                            ml: 55,
                            fontFamily: "New Super Mario Font U",
                          }}
                          primary={usersConsumables.name}
                          secondary={`${
                            usersConsumables.hp === 0
                              ? ""
                              : `+${usersConsumables.hp} hp`
                          } ${
                            usersConsumables.stamina === 0
                              ? ""
                              : usersConsumables.hp === 0
                              ? `+${usersConsumables.stamina} stamina`
                              : `| +${usersConsumables.stamina} stamina`
                          } ${
                            usersConsumables.speed === 0
                              ? ""
                              : `| +${usersConsumables.speed} speed`
                          }`}
                        />
                        <Button
                          sx={{
                            color: "black",
                            fontSize: 20,
                            fontFamily: "New Super Mario Font U",
                            borderColor: "black",
                          }}
                          variant="outlined"
                          disabled={usersConsumables.number <= 0 ? true : false}
                          onClick={() => battle(usersConsumables)}
                        >
                          Use Consumable
                        </Button>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </Box>
          </List>
        </Dialog>
      </Fragment>
    </div>
  );
}

export default Battle;
