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
import lakeBackground from "./img/backgroundImg/LakeBackground.png";
import forestBackground from "./img/backgroundImg/RockForest.webp";
import battleBackground from "./img/backgroundImg/battleBackground.png";

import fireballSpriteImage from "./img/fx/PlantSpriteSheetFx.png";
import iceSpriteImage from "./img/fx/ThunderSpriteSheetFx.png";

import enemySpriteImage from "./img/sprites/Snake3/Snake3.png";
import starterSpriteImage from "./img/sprites/Snake4/Snake4.png";

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
import logger from "redux-logger";
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
          setCurrentName(response.data[0].name);
          setCurrentSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          // setCharacterPicture(response.data[0].battle_pic);
        } else if (response.data.length === 2) {
          setStarterOneHp(response.data[0].hp);
          setStarterOneStamina(response.data[0].stamina);
          setCurrentId(response.data[0].id);
          setCurrentName(response.data[0].name);
          setCurrentSpeed(response.data[0].speed);
          setMaxHp(response.data[0].hp);
          setMaxStamina(response.data[0].stamina);
          // setCharacterPicture(response.data[0].battle_pic);

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

        // setEnemyPicture(response.data[0].battle_pic)
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
  const [characterPicture, setCharacterPicture] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVgAAAFYCAYAAAAWbORAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTFjZDEyZjQxLCAyMDI0LzExLzA4LTE2OjA5OjIwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjYuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDktMjlUMjE6NTQ6MzgtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTEyLTI2VDE4OjEyOjU4LTA2OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTEyLTI2VDE4OjEyOjU4LTA2OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MzY0NDY1MS01ZGIxLTRhNGUtYjkwYi04ZTg2YjM2OTNhYzEiIHhtcE1NOkRvY3VtZW50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"
  );
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentHp, setCurrentHp] = useState(0);
  const [currentStamina, setCurrentStamina] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentUniqueDamage, setUniqueDamage] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [maxStamina, setMaxStamina] = useState(0);

  // enemy hp and stamina
  const [enemyPicture, setEnemyPicture] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVgAAAFYCAYAAAAWbORAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGoGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTFjZDEyZjQxLCAyMDI0LzExLzA4LTE2OjA5OjIwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjYuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDgtMzBUMTA6MzQ6MzgtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTEyLTI2VDIxOjExOjQzLTA2OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTEyLTI2VDIxOjExOjQzLTA2OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NDIzYzQ3Ny0wMGQ4LTRmYzYtYWJjZS00NzNiNzllNjJhNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3ZWRhNjIzZi02MDg0LWIyNDEtOWYyNC01NTIwMWIzYWY5OWUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZjI5OTQ0OS1mYzJiLTQ1NDctYTUzYi1kZDRkN2JiYTk4YzciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVmMjk5NDQ5LWZjMmItNDU0Ny1hNTNiLWRkNGQ3YmJhOThjNyIgc3RFdnQ6d2hlbj0iMjAyMy0wOC0zMFQxMDozNDozOC0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjIgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBjNWM3MjM3LTIxMjUtNDcxYS1iYWQzLTdiNzMyMDQ0ZGY3NyIgc3RFdnQ6d2hlbj0iMjAyNC0xMi0yNlQyMToxMTo0My0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0MjNjNDc3LTAwZDgtNGZjNi1hYmNlLTQ3M2I3OWU2MmE1YyIgc3RFdnQ6d2hlbj0iMjAyNC0xMi0yNlQyMToxMTo0My0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Uc+XygAAFJtJREFUeJzt3U+LHVd6B+C6JiYgZ2Ey0qobC2OYMEuTBjPS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"
  );
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyStamina, setEnemyStamina] = useState(0);

  // kick attack name and stamina
  const [kickAttack, setKickAttack] = useState("");
  const [kickStamina, setKickStamina] = useState(0);

  // poke attack name and stamina
  const [pokeAttack, setPokeAttack] = useState("");
  const [pokeStamina, setPokeStamina] = useState(0);

  // text box
  const [textBox, setTextBox] = useState("");

  // disables all buttons when user clicks button
  const [isDisabled, setIsDisabled] = useState(false);

  // All the inventory dialog functions
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const handleInventoryClose = () => {
    setInventoryOpen(false);
  };

  // All of the Switch dialog functions
  const [switchOpen, setSwitchOpen] = useState(false);

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
          setStarterOneStamina(starterOneStamina - basicAttacks[0].attack_stamina);

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[1].attack_stamina);

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.item_hp);
          setStarterOneStamina(starterOneStamina + attackType.item_stamina);
          setCurrentSpeed(starterOne.speed + attackType.speed);

          if (starterOneHp + attackType.item_hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (starterOneStamina + attackType.item_stamina > starterOne.stamina) {
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
          setEnemyHp(enemyHp - starterOne.attack_damage);
          setStarterOneStamina(starterOneStamina - starterOne.attack_stamina);

          if (enemyHp - starterOne.attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].attack_damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[0].attack_stamina);

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterOneStamina(starterOneStamina - basicAttacks[1].attack_stamina);

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterOneHp(starterOneHp + attackType.item_hp);
          setStarterOneStamina(starterOneStamina + attackType.item_stamina);
          setCurrentSpeed(starterOne.speed + attackType.speed);

          if (starterOneHp + attackType.item_hp > starterOne.hp) {
            setStarterOneHp(starterOne.hp);
          }
          if (starterOneStamina + attackType.item_stamina > starterOne.stamina) {
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
          setEnemyHp(enemyHp - starterTwo.attack_damage);
          setStarterTwoStamina(starterTwoStamina - starterTwo.attack_stamina);

          if (enemyHp - starterTwo.attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            return setWinnerOpen(true);
          }
        } else if (attackType === "punch") {
          setEnemyHp(enemyHp - basicAttacks[0].attack_damage);
          setStarterTwoStamina(starterTwoStamina - basicAttacks[0].attack_stamina);

          if (enemyHp - basicAttacks[0].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType === "poke") {
          setEnemyHp(enemyHp - basicAttacks[1].attack_damage);
          setStarterTwoStamina(starterTwoStamina - basicAttacks[1].attack_stamina);

          if (enemyHp - basicAttacks[1].attack_damage <= 0) {
            setEnemyHp(0);
            clearTimeout(enemyAttackTimeOut);
            setWinnerOpen(true);
          }
        } else if (attackType.item_type == "consumable") {
          setStarterTwoHp(starterTwoHp + attackType.item_hp);
          setStarterTwoStamina(starterTwoStamina + attackType.item_stamina);
          setCurrentSpeed(starterTwo.speed + attackType.speed);

          if (starterTwoHp + attackType.item_hp > starterTwo.hp) {
            setStarterTwoHp(starterTwo.hp);
          }
          if (starterTwoStamina + attackType.item_stamina > starterTwo.stamina) {
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
  const characterTextBox = (attackType, basicAttacks, starterOne) => {
    if (starter.length === 1) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${starterOne.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${basicAttacks[0].attack}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${basicAttacks[1].attack}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterTwo") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } switched out into ${starterTwo.name}.`
          );
        }
      }
    } else if (starter.length === 2) {
      if (currentId === starterOne.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${starterOne.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${basicAttacks[0].attack}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used ${basicAttacks[1].attack}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterTwo") {
          setTextBox(
            `${
              starterOne.nickname === null
                ? starterOne.name
                : starterOne.nickname
            } switched out into ${starterTwo.name}.`
          );
        }
      } else if (currentId === starterTwo.id) {
        if (attackType === "unique") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.name
                : starterTwo.nickname
            } used ${starterTwo.attack_name}`
          );
        } else if (attackType === "punch") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.name
                : starterTwo.nickname
            } used ${basicAttacks[0].attack}`
          );
        } else if (attackType === "poke") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.name
                : starterTwo.nickname
            } used ${basicAttacks[1].attack}`
          );
        } else if (attackType.item_type == "consumable") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.name
                : starterTwo.nickname
            } used a ${attackType.name}`
          );
        } else if (attackType === "starterOne") {
          setTextBox(
            `${
              starterTwo.nickname === null
                ? starterTwo.name
                : starterTwo.nickname
            } switched out into ${starterOne.name}.`
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

              if (starterOneHp + attackType.item_hp - enemyOne.attack_damage <= 0) {
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
                  starterOneHp + attackType.item_hp - basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (starterOneHp + attackType.item_hp - basicAttacks[0].attack_damage <= 0) {
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
                  starterOneHp + attackType.item_hp - basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (starterOneHp + attackType.item_hp - basicAttacks[1].attack_damage <= 0) {
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
                starterOneHp + attackType.item_hp - enemyOne.attack_damage <= 0 &&
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
                  starterOneHp + attackType.item_hp - basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (
                starterOneHp + attackType.item_hp - basicAttacks[0].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.item_hp - basicAttacks[0].attack_damage <=
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
                  starterOneHp + attackType.item_hp - basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (
                starterOneHp + attackType.item_hp - basicAttacks[1].attack_damage <= 0 &&
                starterTwoHp <= 0
              ) {
                setStarterOneHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterOneHp + attackType.item_hp - basicAttacks[1].attack_damage <=
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
                starterTwoHp + attackType.item_hp - enemyOne.attack_damage <= 0 &&
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
                  starterTwoHp + attackType.item_hp - basicAttacks[0].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[0].attack_stamina);
              }

              if (
                starterTwoHp + attackType.item_hp - basicAttacks[0].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.item_hp - basicAttacks[0].attack_damage <=
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
                  starterTwoHp + attackType.item_hp - basicAttacks[1].attack_damage
                );
                setEnemyStamina(enemyStamina - basicAttacks[1].attack_stamina);
              }

              if (
                starterTwoHp + attackType.item_hp - basicAttacks[1].attack_damage <= 0 &&
                starterOneHp <= 0
              ) {
                setStarterTwoHp(0);
                clearTimeout(characterAttackTimeOut);
                setLoserOpen(true);
              } else if (
                starterTwoHp + attackType.item_hp - basicAttacks[1].attack_damage <=
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
      setTextBox(`${enemyOne.name} used ${enemyOne.attack_name}`);
    } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
      setTextBox(`${enemyOne.name} used ${basicAttacks[0].attack}`);
    } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
      setTextBox(`${enemyOne.name} used ${basicAttacks[1].attack}`);
    } else if (enemyStamina === 0) {
      setTextBox(
        `${enemyOne.name} tried to attack but it failed. They have no more stamina and could not move.`
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
            className="projectile"
            // className={
            //   starter.length === 1
            //     ? starterOne.attack_type
            //     : currentId === starterOne.id
            //     ? starterOne.attack_type
            //     : starterTwo.attack_type
            // }
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
            // className="tackele"
            className="summon"
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
            className="physical"
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
                        usersConsumables.speed === 0
                          ? ""
                          : `| +${usersConsumables.speed} speed`
                      }`}
                    />
                    <Button
                      id="consumable"
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
                <button
                  id="starterOne"
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
                  primary={`starter 1: ${starterOne.name}`}
                  secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina | ${starterOne.speed} speed`}
                />
                <button
                  id="starterOne"
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
                  primary={`starter 2: ${starterTwo.name}`}
                  secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.stamina} stamina | ${starterTwo.speed} speed`}
                />
                <button
                  id="starterTwo"
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

  // console.log("current speed", currentSpeed);

  // the canvas function
  const battleCanvasRef = useRef(null);
  useEffect(() => {
    if (battleCanvasRef.current) {
      const canvas = battleCanvasRef.current;
      const c = canvas.getContext("2d");

      const backgroundImage = new Image();
      backgroundImage.src = battleBackground;
      // console.log(backgroundImage);

      const enemyImage = new Image();
      enemyImage.src = enemyPicture;
      // console.log('enemySpriteImage', enemySpriteImage);

      const starterImage = new Image();
      starterImage.src = characterPicture;
      // console.log('starterSpriteImage', starterSpriteImage);

      class Sprite {
        constructor({
          position,
          velocity,
          image,
          frames = { max: 1, hold: 10, alignment: 0, attackFx: false },
          sprites,
          animate = false,
          isEnemy = false,
          rotation = 0,
          name,
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
          this.rotation = rotation;
          this.name = name;
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
          let rotation = 1;
          if (this.isEnemy) rotation = -2.2;

          if (attack === "physical") {
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
          } else if (attack === "projectile") {
            const fireballImage = new Image();
            fireballImage.src = fireballSpriteImage;
            // console.log(fireballSpriteImage);

            const fireball = new Sprite({
              position: {
                x: this.position.x,
                y: this.position.y,
              },
              image: fireballImage,
              frames: {
                max: 8,
                hold: 5,
                attackFx: true,
              },
              animate: true,
              rotation,
            });

            renderedSprites.splice(1, 0, fireball);

            gsap.to(fireball.position, {
              x: recipient.position.x,
              y: recipient.position.y,
              onComplete: () => {
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
          } else if (attack === "summon") {
            const iceImage = new Image();
            iceImage.src = iceSpriteImage;
            // console.log(iceSpriteImage);

            const ice = new Sprite({
              position: {
                x: recipient.position.x + 10,
                y: recipient.position.y + 30,
              },
              image: iceImage,
              frames: {
                max: 8,
                hold: 10,
                attackFx: true,
              },
              animate: true,
            });

            renderedSprites.splice(2, 0, ice);

            gsap.to(ice.position, {
              x: recipient.position.x + 10,
              y: recipient.position.y + 30,
              duration: 1.3,
              onComplete: () => {
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
          } else if (attack === "tired") {
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
      });

      const renderedSprites = [enemy, starter];

      function animateBattle() {
        window.requestAnimationFrame(animateBattle);
        background.draw();

        renderedSprites.forEach((sprite) => {
          sprite.draw();
        });
      }
      animateBattle();

      document.querySelectorAll("button").forEach((button) => {
        console.log("button", button);

        button.addEventListener("click", (e) => {
          console.log("button id", button.id);

          if (button.id === "attackButton") {
            // console.log(button);
            const characterSelectedAttack = button.className;

            let enemySelectedAttack = "physical";

            // if (enemyStamina >= enemyOne.attack_stamina) {
            //   enemySelectedAttack = enemyOne.attack_type;
            // } else if (enemyStamina >= basicAttacks[0].attack_stamina) {
            //   enemySelectedAttack = basicAttacks[0].attack_type;
            // } else if (enemyStamina >= basicAttacks[1].attack_stamina) {
            //   enemySelectedAttack = basicAttacks[1].attack_type;
            // } else if (enemyStamina === 0) {
            //   enemySelectedAttack = "tired";
            // }

            console.log("enemySelectedAttack", enemySelectedAttack);

            document.getElementById("dialogueBox").style.display = "block";

            if (currentSpeed >= enemyOne.speed) {
              starter.attack({
                attack: characterSelectedAttack,
                recipient: enemy,
                renderedSprites,
              });

              setTimeout(() => {
                enemy.attack({
                  attack: enemySelectedAttack,
                  recipient: starter,
                  renderedSprites,
                });
              }, 2700);
            } else if (
              button.id === "starterOne" ||
              button.id === "starterTwo" ||
              button.id == "consumable"
            ) {
              console.log("in switch");

              if (button.id === "starterOne") {
                this.image = starterOne.battle_pic;
              } else if (button.id === "starterTwo") {
                this.image = starterTwo.battle_pic;
              }

              setTimeout(() => {
                enemy.attack({
                  attack: enemySelectedAttack,
                  recipient: starter,
                  renderedSprites,
                });
              }, 2700);
            } else {
              enemy.attack({
                attack: enemySelectedAttack,
                recipient: starter,
                renderedSprites,
              });

              setTimeout(() => {
                starter.attack({
                  attack: characterSelectedAttack,
                  recipient: enemy,
                  renderedSprites,
                });
              }, 2700);
            }
            setTimeout(() => {
              setTextBox("");
              document.getElementById("dialogueBox").style.display = "none";
            }, 4500);
          }
        });
      });
    }
  }, [pokeAttack]);

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
          <h1 style={{ margin: 0 }}>{enemyOne.name}</h1>

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
            {textBox}
          </div>

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
                          primary={usersConsumables.item_name}
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
