import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import video from "./Bowsermon-ending-credits.mp4";
import "./endingCredits.css";

function EndingCredits() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [skipText, setSkipText] = useState("");
  const [allowingSkip, setAllowingSkip] = useState();

  const goHome = () => {
    dispatch({
      type: "SAGA_USER_WATCHED_CREDITS",
    });
    history.push(`/home`);
  };

  setTimeout(() => {
    setSkipText("Click anywhere to skip");
    setAllowingSkip(() => goHome);
  }, 10000);

  return (
    <div onClick={allowingSkip} className="endingCreditsArea">
      <video autoPlay className="endingCredits">
        <source src={video} type="video/mp4" />
      </video>

      <h3 className="skipText">{skipText}</h3>
    </div>
  );
}

export default EndingCredits;
