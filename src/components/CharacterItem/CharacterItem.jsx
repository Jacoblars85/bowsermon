import { useState, Fragment, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

const InfoTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CharacterItem({ character }) {
  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);
  const usersHeldItems = useSelector((store) => store.inventory.usersHeldItems);

  const dispatch = useDispatch();

  const [openSell, setOpenSell] = useState(false);

  // console.log("character", character);
  //  console.log("usersHeldItems", usersHeldItems);

  const handleSellClose = () => {
    setOpenSell(false);
  };

  const confirmSale = () => {
    setOpenSell(true);
  };

  const setStarterOne = () => {
    if (starter.length === 0) {
      dispatch({
        type: "SAGA_SET_STARTER_ONE",
        payload: character.id,
      });
    } else if (starter.length === 1) {
      if (character.starter_2 === true) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 1,
            otherStarter: 2,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_ONE",
          payload: character.id,
        });
      }
    } else if (starter.length === 2) {
      if (character.id === starter[1].id) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 1,
            otherStarter: 2,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_ONE",
          payload: character.id,
        });
      }
    }
  };

  const setStarterTwo = () => {
    if (starter.length === 0) {
      dispatch({
        type: "SAGA_SET_STARTER_TWO",
        payload: character.id,
      });
    } else if (starter.length === 1) {
      if (character.starter_1 === true) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 2,
            otherStarter: 1,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_TWO",
          payload: character.id,
        });
      }
    } else if (starter.length === 2) {
      if (character.id === starter[0].id) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 2,
            otherStarter: 1,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_TWO",
          payload: character.id,
        });
      }
    }
  };

  const clearStarter = () => {
    dispatch({
      type: "SAGA_CLEAR_STARTER",
      payload: character.id,
    });
  };

  const sellCharacter = () => {
    if (starter.length === 2) {
      if (character.id === starter[0].id || character.id === starter[1].id) {
        setOpenSell(false);
        return alert("you can't sell your starter");
      } else {
        dispatch({
          type: "SAGA_SELL_CHARACTER",
          payload: {
            characterID: character.id,
          },
        });
      }
    } else if (starter.length === 1) {
      if (character.id === starter[0].id) {
        setOpenSell(false);
        return alert("you can't sell your starter");
      } else {
        dispatch({
          type: "SAGA_SELL_CHARACTER",
          payload: {
            characterID: character.id,
          },
        });
      }
    } else {
      dispatch({
        type: "SAGA_SELL_CHARACTER",
        payload: {
          characterID: character.id,
        },
      });
    }
    setOpenSell(false);
  };

  const toggleNewClass = () => {
    dispatch({
      type: "SAGA_SET_OLD",
      payload: character.id,
    });
  };

  const doNothing = () => {};

  const [openInfo, setOpenInfo] = useState(false);

  const handleInfoClickOpen = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const [openEquip, setOpenEquip] = useState(false);

  const [newItemId, setNewItemId] = useState(0);

  const handleEquipClickOpen = (newItem) => {
    setNewItemId(newItem);
    setOpenEquip(true);
  };

  const handleEquipClose = () => {
    setOpenEquip(false);
  };

  const equipItem = () => {
    dispatch({
      type: "SAGA_EQUIP_ITEM",
      payload: {
        itemId: newItemId,
        characterID: character.id,
        oldItemId: character.item_id,
      },
    });
    setOpenEquip(false);
  };

  const removeItem = () => {
    dispatch({
      type: "SAGA_REMOVE_ITEM",
      payload: {
        characterID: character.id,
        oldItemId: character.item_id,
      },
    });
  };

  const [openNickname, setOpenNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(character.name);

  const handleClickOpenNickname = () => {
    setOpenNickname(true);
  };

  const handleNicknameClose = () => {
    setOpenNickname(false);
  };

  const editCharacterName = () => {
    if (newNickname.length >= 15 || newNickname.length === 0) {
      alert("The nickname cannot be longer than 15 characters")
    } else {
      dispatch({
        type: "SAGA_EDIT_CHARACTERS_NAME",
        payload: {
          characterID: character.id,
          newCharacterName: newNickname,
        },
      });
      setOpenNickname(false);
    }
  };

  return (
    <div className="singleArea">
      <div>
        <p className={character.new ? "newPTag" : "starterPTag"}>
          {character.new
            ? "new"
            : character.starter_1
            ? "Starter 1"
            : character.starter_2
            ? "Starter 2"
            : ""}
        </p>
      </div>

      <div
        className={character.new ? "new" : "single-box"}
        onMouseOver={character.new ? toggleNewClass : doNothing}
      >
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <h5 style={{ width: "130px", marginRight: "0px" }}>
            {character.nickname === null ? character.name : character.nickname}
          </h5>
          {character.item_id === null ? (
            <CloseIcon
              sx={{
                height: "35px",
                width: "35px",
                color: "grey",
                paddingRight: "3px",
              }}
              fontSize="100px"
            />
          ) : (
            <img
              src={character.item_pic}
              height={35}
              width={35}
              style={{ paddingRight: "3px" }}
            />
          )}
        </Box>

        <img
          style={{ cursor: "pointer" }}
          height="140px"
          width="140px"
          onClick={handleInfoClickOpen}
          src={character.profile_pic}
        />
      </div>

      <div className="buttonBox">
        <button id={character.id} onClick={setStarterOne}>
          Set Starter 1
        </button>
        <button id={character.id} onClick={setStarterTwo}>
          Set Starter 2
        </button>
        <button id={character.id} onClick={clearStarter}>
          Remove
        </button>
      </div>

      {/* sell conformation dialog */}
      <Dialog
        open={openSell}
        onClose={handleSellClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
        >
          {`Are you sure you want to sell ${character.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            You will receive 10 coins if you sell {character.name}. If you have
            an item on this character, the item will be lost too. You will have
            to buy the new character box to have the chance to get{" "}
            {character.name} back.
          </DialogContentText>
        </DialogContent>
        <DialogActions
         sx={{
          justifyContent: "center",
        }}>
          <Button
            sx={{
              color: "black",
              fontSize: 20,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            color="error"
              variant="contained"
            onClick={sellCharacter}
            autoFocus
          >
            Sell
          </Button>
          <Button
            sx={{
              color: "black",
              fontSize: 20,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            variant="outlined"
            onClick={handleSellClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* item conformation dialog */}
      <Dialog
        open={openEquip}
        onClose={handleEquipClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          textAlign: "center",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
        >
          {`Are you sure you want to equip this item?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            You can change the item at any time.
          </DialogContentText>
        </DialogContent>
        <DialogActions
         sx={{
          justifyContent: "center",
        }}>
          <Button
            sx={{
              color: "whitesmoke",
              fontSize: 20,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            color="success"
              variant="contained"
            onClick={equipItem}
            autoFocus
          >
            Equip
          </Button>
          <Button
            sx={{
              color: "black",
              fontSize: 20,
              fontFamily: "New Super Mario Font U",
              borderColor: "black"
            }}
            variant="outlined"
            onClick={handleEquipClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* nickname form dialog */}
      <Dialog
        open={openNickname}
        onClose={handleNicknameClose}
      >
        <DialogTitle
          sx={{
            fontFamily: "New Super Mario Font U",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          Do you want to give {character.name} a nickname?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            To give {character.name} a new name, fill out textfield below with
            the name you want to give it and click submit. You can always change
            it later.
          </DialogContentText>
          <TextField
            color="info"
            autoFocus
            required
            margin="dense"
            id="name"
            name="nickname"
            label="nickname"
            type="nickname"
            fullWidth
            variant="standard"
            onChange={(e) => setNewNickname(e.target.value)}
            value={newNickname}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              color: "whitesmoke",
              fontSize: 16,
              borderColor: "black"
            }}
            color="success"
              variant="contained"
            onClick={editCharacterName}
          >
            Submit
          </Button>
          <Button
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              color: "black",
              fontSize: 16,
              borderColor: "black"
            }}
            variant="outlined"
            onClick={handleNicknameClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full screen dialog */}
      <Dialog
        fullScreen
        open={openInfo}
        onClose={handleInfoClose}
        TransitionComponent={InfoTransition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ backgroundColor: "gray" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleInfoClose}
              aria-label="close"
              sx={{ boxShadow: "0px 0px 0px 0px"}}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, fontFamily: "New Super Mario Font U", }} variant="h6" component="div">
              {character.nickname === null
                ? character.name
                : character.nickname}{" "}
              <EditIcon
                fontSize="small"
                onClick={handleClickOpenNickname}
                sx={{ cursor: "pointer" }}
              />
            </Typography>
            <Typography sx={{ ml: 2, flex: 1, fontFamily: "New Super Mario Font U", }} variant="h6" component="div">
              {character.starter_1 === true
                ? "Starter 1"
                : character.starter_2 === true
                ? "Starter 2"
                : ""}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingBottom={3}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              columnGap={2}
            >
              <img src={character.profile_pic} height={350} width={350} />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                alignSelf="flex-end"
                height={140}
                width={100}
              >
                <h4 style={{ margin: "0px", fontSize: "20px" }}>Held Item</h4>
                <Box height={100} width={100} border="1px solid black">
                  {character.item_id === null ? (
                    <CloseIcon
                      sx={{ height: "100%", width: "100%", color: "grey" }}
                      fontSize="100px"
                    />
                  ) : (
                    <img src={character.item_pic} height={100} width={100} />
                  )}
                </Box>
                {character.item_id === null ? (
                  ""
                ) : (
                  <button onClick={removeItem}>Remove Item</button>
                )}
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" border="2px solid black">
              <ListItemText primary="Hp" secondary={character.hp} sx={{ backgroundColor: "whitesmoke", margin: 0 }} />
              {/* <Divider /> */}
              <ListItemText primary="Stamina" secondary={character.stamina} sx={{ backgroundColor: "lightgrey", margin: 0 }} />
              {/* <Divider /> */}
              <ListItemText primary="Speed" secondary={character.speed} sx={{ backgroundColor: "whitesmoke", margin: 0 }} />
              {/* <Divider /> */}
              <ListItemText
                primary="Special Attack"
                secondary={character.unique_attack}
                sx={{ backgroundColor: "lightgrey", margin: 0  }}
              />
              {/* <Divider /> */}
              <ListItemText
                primary="Special Attack Damage"
                secondary={character.unique_damage}
                sx={{ backgroundColor: "whitesmoke", margin: 0 }}
              />
              {/* <Divider /> */}
              <ListItemText
                primary="Special Attack Cost"
                secondary={character.unique_stamina}
                sx={{ backgroundColor: "lightgrey", margin: 0 }}
              />
            </Box>

            <Divider />
          </Box>

          <Divider />

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            paddingBottom={2}
            paddingTop={2}
          >
            <Button
              style={{ color: "black", fontFamily: "New Super Mario Font U", }}
              variant="contained"
              color="inherit"
              onClick={confirmSale}
            >
              Sell Character
            </Button>
            <Button
              style={{ color: "black", fontFamily: "New Super Mario Font U", }}
              variant="contained"
              color="inherit"
              onClick={setStarterOne}
            >
              Set Starter 1
            </Button>
            <Button
              style={{ color: "black", fontFamily: "New Super Mario Font U", }}
              variant="contained"
              color="inherit"
              onClick={setStarterTwo}
            >
              Set Starter 2
            </Button>
            <Button
              style={{ color: "black", fontFamily: "New Super Mario Font U", }}
              variant="contained"
              color="inherit"
              onClick={clearStarter}
            >
              Remove Starter
            </Button>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <h1 style={{ paddingLeft: "10px" }}>Held Items</h1>
            <Divider />
            {usersHeldItems.length === 0 ? "You do not have any held items, go to the shop to buy held items" : ""}
            {usersHeldItems &&
              usersHeldItems.map((usersHeld) => {
                return (
                  <div key={usersHeld.id}>
                    <ListItemButton
                      onClick={() => handleEquipClickOpen(usersHeld.items_id)}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        columnGap={20}
                        justifyContent="space-around"
                        alignItems="center"
                        height={75}
                      >
                        <Box
                          display="flex"
                          flexDirection="row"
                          columnGap={5}
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <p
                            style={{
                              color: usersHeld.color,
                              fontSize: "25px",
                            }}
                          >
                            {usersHeld.number}X
                          </p>
                          <img height={70} width={70} src={usersHeld.pic} />
                        </Box>
                        <h4
                          style={{
                            color: usersHeld.color,
                            fontSize: "25px",
                            width: "100px",
                          }}
                        >
                          {usersHeld.name}
                        </h4>

                        <Box
                          display="flex"
                          flexDirection="column"
                          flexWrap="wrap"
                          columnGap={3}
                          justifyContent="center"
                          alignItems="space-around"
                          height={75}
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
                            {usersHeld.hp === 0 ? "" : `+${usersHeld.hp} hp`}
                          </p>

                          <p
                            style={{
                              color: "limegreen",
                              textShadow: "1px 1px black",
                              fontSize: "25px",
                              fontWeight: "bold",
                              fontFamily: "New Super Mario Font U",
                              margin: 0,
                            }}
                          >
                            {usersHeld.stamina === 0
                              ? ""
                              : `+${usersHeld.stamina} stamina`}
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
                            {usersHeld.speed === 0
                              ? ""
                              : `+${usersHeld.speed} speed`}
                          </p>

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
                            {usersHeld.attack === 0
                              ? ""
                              : `+${usersHeld.attack} damage`}
                          </p>
                        </Box>
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </div>
                );
              })}
          </Box>
        </List>
      </Dialog>
    </div>
  );
}

export default CharacterItem;
