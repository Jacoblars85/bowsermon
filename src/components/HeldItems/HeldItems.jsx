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

import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";

const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  border: 2px solid black;
  display: grid;
  grid-template-columns: 10.5px 0px;
  grid-template-rows: 25px 20px;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  width: 20px;
  height: 40px;
  background: gray;
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  width: 12px;
  height: 10px;
  grid-column: 1/2;
  grid-row: 1/3;
  color: black;
  background: inherit;
  border: 0px;
  margin-top: 13.7px;
  margin-left: 4px;
  &:focus {
    outline-width: 0;
  }
  &:hover {
    cursor: default;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px
  width: 5px;
  height: 10px;
  font-family: system-ui, sans-serif;
  font-size: 30px;
  line-height: 1.5;
  border: 0;
  color: black;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    &:hover {
      cursor: pointer;
      color: lightgrey;
    }
  }
  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    &:hover {
      cursor: pointer;
      color: lightgrey;
    }
  }
  & .arrow {
    transform: translateY(-1px);
  }
`
);

function HeldItems({ heldItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);

  // console.log("heldItem", heldItem);

  const [heldOpen, setHeldOpen] = useState(false);

  const handleHeldClickOpen = () => {
    setHeldOpen(true);
  };

  const handleHeldClose = () => {
    setHeldOpen(false);
  };

  const buyHeld = (heldAmount) => {
    if (user.coins < heldAmount * heldItem.cost) {
      setHeldOpen(false);
      return alert("you are broke broke, sorry");
    } else {
      setOpenHeldSnack(true);

      dispatch({
        type: "SAGA_BUY_ITEM",
        payload: {
          itemId: heldItem.id,
          amountNum: heldAmount,
          totalCoins: heldAmount * heldItem.cost,
        },
      });

      //         axios({
      //     method: "PUT",
      //     url: "/api/inventory/buy/item",
      //     data: {
      //       itemId: heldItem.id,
      //     amountNum: heldAmount,
      //     totalCoins: heldAmount * heldItem.cost,
      //     },
      //   })
      //     .then((responses) => {
      //         dispatch({
      //   type: "FETCH_USER",
      // });
      //     })
      //     .then((responses) => {
      //       setOpenHeldSnack(true);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

    }
  };

  const heldValuetext = (heldvalues) => {
    return heldvalues;
  };

  const [heldValue, setHeldValue] = useState(1);

  const handleHeldChange = (event, newHeldValue) => {
    setHeldValue(newHeldValue);
  };

  const [anchorElHeld, setAnchorElHeld] = useState(false);
  const openHeldInfo = Boolean(anchorElHeld);

  const handleHeldInfoClick = (event) => {
    setAnchorElHeld(event.currentTarget);
  };
  const handleHeldInfoClose = () => {
    setAnchorElHeld(null);
  };

  const [openHeldSnack, setOpenHeldSnack] = useState(false);

  const handleHeldSnackClick = () => {
    setOpenHeldSnack(true);
  };

  const handleHeldSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenHeldSnack(false);
  };

  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <img height={70} width={70} src={heldItem.pic} />
      </div>

      <div style={{ width: "100px", marginLeft: "5px" }}>
        <h4 style={{ color: heldItem.color, width: "100px" }}>
          {heldItem.name}
        </h4>
      </div>

      <div
        style={{
          width: "150px",
          height: "122px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.hp === 0 ? "" : `+${heldItem.hp} hp`}
          </p>

          <p
            style={{
              color: "limegreen",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.stamina === 0 ? "" : `+${heldItem.stamina} stamina`}
          </p>

          <p
            style={{
              color: "yellow",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.speed === 0 ? "" : `+${heldItem.speed} speed`}
          </p>

          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.attack === 0 ? "" : `+${heldItem.attack} damage`}
          </p>
        </div>
      </div>

      <div style={{ marginRight: "10px" }}>
        <h5
          style={{
            color: "#FEF202",
            fontSize: 25,
            textShadow: "2px 2px black",
          }}
        >
          {heldItem.cost}x{" "}
          <img
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

        <button
        style={{ width: "100%"}}
          disabled={user.coins < heldItem.cost ? true : false}
          onClick={handleHeldClickOpen}
        >
          Buy
        </button>
      </div>

      {/* held item dialog */}
      <Dialog
        open={heldOpen}
        onClose={handleHeldClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
        >
          {`Are you sure you want ${heldValue} of the ${heldItem.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
            }}
          >
            This will cost {heldValue * heldItem.cost} coins and you can not get
            a refund.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <NumberInput
            aria-label="Compact number input"
            placeholder="Type a number…"
            readOnly
            value={heldValue}
            onChange={(event, val) => setHeldValue(val)}
            min={1}
            max={Math.floor(user.coins / heldItem.cost)}
          />
          <Button
            sx={{
              color: "whitesmoke",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            color="success"
              variant="contained"
            onClick={() => buyHeld(heldValue)}
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
            onClick={handleHeldClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Button onClick={handleHeldSnackClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={openHeldSnack}
        autoHideDuration={4000}
        onClose={handleHeldSnackClose}
        message={`Your ${heldItem.name} has been Sent to Your Inventory`}
        // action={action}
      />
    </>
  );
}

export default HeldItems;
