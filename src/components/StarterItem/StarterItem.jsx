import { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

function StarterItem({ start }) {
  const [isPicture, setIsPicture] = useState(false);

  const togglePicture = () => {
    setIsPicture(!isPicture);
  };

  const displayText = () => {
    if (isPicture) {
      return (
        <div className="descriptionForStarters">
          <div className="mainStatTextForStarter">
            <p className="starterTextHp">{start.hp} hp</p>
            <p className="starterTextStamina">{start.stamina} stamina</p>
            <p className="starterTextSpeed">{start.speed} speed</p>
          </div>

          <p className="starterTextAttack">{start.unique_attack}</p>
          <p className="starterDamageTextHp">{start.unique_damage} damage</p>
          <p className="starterTextTakenStamina">
            {start.unique_stamina} stamina
          </p>
        </div>
      );
    } else {
      return (
        <div className="starterPictures">
          <img src={start.profile_pic} />
        </div>
      );
    }
  };

  return (
    <div className="starterSingleBoxUl" >
      <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <h5 style={{ width: "170px", marginRight: "0px" }}>
          {start.nickname === null ? start.name : start.nickname}
          </h5>
          {start.item_id === null ? (
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
              src={start.item_pic}
              height={35}
              width={35}
              style={{ paddingRight: "3px" }}
            />
          )}
        </Box>
      <h4  onClick={togglePicture}>
        {" "}
        {displayText()}{" "}
      </h4>
    </div>
  );
}

export default StarterItem;
