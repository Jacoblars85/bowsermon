import React, { useState, useEffect, Fragment, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import Nav from "../Nav/Nav";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InfoIcon from "@mui/icons-material/Info";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

function MysteryBoxItem({ mysteryBoxItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.userCharacters);
  const allCharacters = useSelector((store) => store.character.allCharacters);
  const consumables = useSelector((store) => store.inventory.consumables);
  const held = useSelector((store) => store.inventory.held);
  const allItems = useSelector((store) => store.inventory.allItems);

  const [randomOpen, setRandomOpen] = useState(false);

  const handleRandomClickOpen = () => {
    setRandomOpen(true);
  };

  const handleRandomClose = () => {
    setRandomOpen(false);
  };

  const [newRewardPic, setNewRewardPic] = useState("");
  const [newRewardName, setNewRewardName] = useState("");
  const [newRewardId, setNewRewardId] = useState();

  const openBox = (rewardId) => {
    let randomNum;

    if (user.coins < mysteryBoxItem.cost) {
      setRandomOpen(false);
      return alert("you are broke, sorry");
    } else {
      if (mysteryBoxItem.id === 1) {
        if (characters.length >= 20) {
          return alert("you can only have 20 characters");
        } else {
          // character box
          randomNum = Math.floor(Math.random() * 9 + 1);

          const newCharacter = allCharacters.find(
            (Characters) => Characters.id === randomNum
          );

          setNewRewardPic("images/mysteryBoxGif.gif");
          setNewRewardName("...");

          setTimeout(() => {
            setNewRewardPic(newCharacter.profile_pic);
            setNewRewardName(newCharacter.name);
          }, 2000);

          setNewRewardId(randomNum);

          setOpenAnimation(true);
        }
      } else if (mysteryBoxItem.id === 2) {
        // held item box
        randomNum = Math.floor(Math.random() * (16 - 7) + 7);

        const newHeld = held.find((heldItem) => heldItem.id === randomNum);

        setNewRewardPic("images/mysteryBoxGif2.gif");
        setNewRewardName("...");

        setTimeout(() => {
          setNewRewardPic(newHeld.pic);
          setNewRewardName(newHeld.name);
        }, 2000);

        setNewRewardId(randomNum);

        setOpenAnimation(true);
      } else if (mysteryBoxItem.id === 3) {
        // consumable box
        randomNum = Math.floor(Math.random() * 6 + 1);

        const newConsumable = consumables.find(
          (consumableItem) => consumableItem.id === randomNum
        );

        setNewRewardPic("images/mysteryBoxGif2.gif");
        setNewRewardName("...");

        setTimeout(() => {
          setNewRewardPic(newConsumable.pic);
          setNewRewardName(newConsumable.name);
        }, 2000);

        setNewRewardId(randomNum);

        setOpenAnimation(true);
      } else if (mysteryBoxItem.id === 4) {
        // all item box
        randomNum = Math.floor(Math.random() * 15 + 1);

        const newItem = allItems.find((item) => item.id === randomNum);

        setNewRewardPic("images/mysteryBoxGif2.gif");
        setNewRewardName("...");

        setTimeout(() => {
          setNewRewardPic(newItem.pic);
          setNewRewardName(newItem.name);
        }, 2000);

        setNewRewardId(randomNum);

        setOpenAnimation(true);
      }
    }
  };

  const [openAnimation, setOpenAnimation] = useState(false);

  const handleClickOpenAnimation = () => {
    setOpenAnimation(true);
  };

  const handleCloseAnimation = () => {
    if (mysteryBoxItem.id === 1) {
      // character box

      dispatch({
        type: "SAGA_BUY_NEW_CHARACTER",
        payload: {
          characterID: newRewardId,
          characterCost: mysteryBoxItem.cost,
        },
      });
    } else if (mysteryBoxItem.id === 2) {
      // held item box

      dispatch({
        type: "SAGA_BUY_ITEM",
        payload: {
          itemId: newRewardId,
          amountNum: 1,
          totalCoins: mysteryBoxItem.cost,
        },
      });
    } else if (mysteryBoxItem.id === 3) {
      // consumable box

      dispatch({
        type: "SAGA_BUY_ITEM",
        payload: {
          itemId: newRewardId,
          amountNum: 1,
          totalCoins: mysteryBoxItem.cost,
        },
      });
    } else if (mysteryBoxItem.id === 4) {
      // all item box

      dispatch({
        type: "SAGA_BUY_ITEM",
        payload: {
          itemId: newRewardId,
          amountNum: 1,
          totalCoins: mysteryBoxItem.cost,
        },
      });
    }

    setOpenAnimation(false);
    setRandomOpen(false);
  };

  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <img
          onClick={handleRandomClickOpen}
          height={150}
          width={150}
          src={mysteryBoxItem.pic}
        />
      </div>

      <h4
        style={{ fontSize: "25px", textShadow: "1px 1px white", width: "40%" }}
      >
        {mysteryBoxItem.name}
      </h4>

      <div style={{ marginRight: "10px" }}>
        <h5
          style={{
            fontSize: "25px",
            textShadow: "1px 1px black",
            color: "#FEF202",
            margin: 0,
          }}
        >
          {mysteryBoxItem.cost}x{" "}
          <img
            className="randomCharacterCoins"
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />
        </h5>

        <button onClick={() => setRandomOpen(true)} disabled={user.coins >= mysteryBoxItem.cost ? false : true} style={{ width: "100%" }}>Buy</button>
      </div>

      {/* random item dialog */}
      <Dialog
        open={randomOpen}
        onClose={handleRandomClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "New Super Mario Font U",
            textAlign: "center",
            fontSize: "30px",
          }}
        >
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            This will cost {mysteryBoxItem.cost} coins and you may get multiple
            of the same {mysteryBoxItem.id === 1 ? "character" : "item"}.
          </DialogContentText>
        </DialogContent>
        <DialogActions
         sx={{
          justifyContent: "center",
        }}>
          <Button
            sx={{
              color: "whitesmoke",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            color="success"
              variant="contained"
            onClick={openBox}
            autoFocus
          >
            Buy
          </Button>
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            variant="outlined"
            onClick={handleRandomClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* mystery box animation dialog */}
      <Dialog
        open={openAnimation}
        onClose={handleCloseAnimation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          textAlign: "center",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "New Super Mario Font U",
            textAlign: "center",
            fontSize: "30px",
            width: "420px",
            height: "65px",
            marginBottom: "20px",
          }}
        >
          {`Congrats, you got ${newRewardName}`}
        </DialogTitle>
        <DialogContent>
          <img height={200} width={200} src={newRewardPic} />
        </DialogContent>
        <DialogActions
          sx={{
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            variant="outlined"
            onClick={handleCloseAnimation}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MysteryBoxItem;
