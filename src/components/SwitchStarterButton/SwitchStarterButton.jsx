import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';

function SwitchStarterButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  function switchStarters() {
    dispatch({
      type: "SAGA_SWITCH_STARTERS",
      payload: {
        starterOneId: starter[0].id,
        starterTwoId: starter[1].id,
      },
    });
  }

  return (
    <div>
      <button onClick={switchStarters}><SwapVerticalCircleOutlinedIcon fontSize="large"/></button>
    </div>
  );
}

export default SwitchStarterButton;
