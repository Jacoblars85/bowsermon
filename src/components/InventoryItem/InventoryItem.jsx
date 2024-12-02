import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function InventoryItem({ inventoryItem }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);

  const [isPicture, setIsPicture] = useState(false);
  const [open, setOpen] = useState(false);

  // console.log('inventoryItem', inventoryItem);

  const handleClose = () => {
    setOpen(false);
  };

  const sellPot = (potValue) => {
    dispatch({
      type: "SAGA_SELL_ITEM",
      payload: {
        itemId: inventoryItem.items_id,
        amountNum: potValue,
        totalCoins: Math.floor(potValue * inventoryItem.cost / 2),
      },
    });
    setOpen(false);
  };

  const potValuetext = (value) => {
    return value;
  };

  const [potValue, setPotValue] = useState(1);

  const handlePotChange = (event, newPotValue) => {
    setPotValue(newPotValue);
  };

  const confirmSale = () => {
    setOpen(true);
  };

  const togglePicture = () => {
    setIsPicture(!isPicture);
  };

  const displayText = () => {
    if (isPicture) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          flexWrap:"nowrap",
          justifyContent: "center",
          height: "125px",
          width: "125px",
        }}
        >
          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {inventoryItem.hp === 0 ? "" : `+${inventoryItem.hp} hp`}
          </p>

          <p
            style={{
              color: "limegreen",
              textShadow: "1px 1px black",
              fontSize: "22px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {inventoryItem.stamina === 0
              ? ""
              : `+${inventoryItem.stamina} stamina`}
          </p>

          <p
            style={{
              color: "yellow",
              textShadow: "1px 1px black",
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {inventoryItem.speed === 0 ? "" : `+${inventoryItem.speed} speed`}
          </p>

          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "23px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {inventoryItem.attack === 0
              ? ""
              : `+${inventoryItem.attack} damage`}
          </p>
        </div>
      );
    } else {
      return (
        <>
          <img height={125} width={125} src={inventoryItem.pic} />
        </>
      );
    }
  };

  return (
    <div className={"item_box"}>
      <div className="headerLine">
        <h3>{inventoryItem.name}</h3>

        <p className="amountOfItems">{inventoryItem.number}X</p>
      </div>

      <ul className="singleItemBoxUl" onClick={togglePicture}>
        {" "}
        {displayText()}{" "}
      </ul>

      <div className="slider">
        <Box sx={{ width: 170 }}>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            value={potValue}
            onChange={handlePotChange}
            getAriaValueText={potValuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={inventoryItem.number}
            sx={{ color: inventoryItem.color }}
          />
        </Box>
      </div>

      <button className="sellButton" onClick={confirmSale}>
        Sell
      </button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            {`Are you sure you want to sell ${potValue} ${inventoryItem.name}s`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              You will receive {Math.floor(potValue * inventoryItem.cost / 2)} coins if
              you sell {inventoryItem.name}s.
            </DialogContentText>
          </DialogContent>
          <DialogActions
           sx={{
            justifyContent: "center",
          }}>
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
                borderColor: "black"
              }}
              color="error"
              variant="contained"
              onClick={() => sellPot(potValue)}
              autoFocus
            >
              Sell
            </Button>
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
                borderColor: "black"
              }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default InventoryItem;
