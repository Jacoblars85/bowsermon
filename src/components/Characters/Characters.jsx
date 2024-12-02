import React, { useEffect } from "react";
import BackButton from "../BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import CharacterItem from "../CharacterItem/CharacterItem";
import "./Characters.css";
import Nav from "../Nav/Nav";
import StarterItem from "../StarterItem/StarterItem";
import SwitchStarterButton from "../SwitchStarterButton/SwitchStarterButton";

function Characters() {
  const dispatch = useDispatch();

  const userCharacters = useSelector((store) => store.character.userCharacters);
  const starter = useSelector((store) => store.character.starter);
  const user = useSelector((store) => store.user.userReducer);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  return (
    <div>
      <Nav />

      <div className="characters">
        <h2>Characters</h2>
        <div className="bigCharacterBox">
          <div className="characterBox">
            {userCharacters.map((character) => {
              return (
                <div key={character.id}>
                  <CharacterItem character={character} />
                </div>
              );
            })}
          </div>

          <div className="switchButtonBox">
            {starter.length === 2 ? <SwitchStarterButton /> : ""}
          </div>

          <div className="starterBox">
            {starter.map((start) => {
              return (
                <div className="starter-single-box" key={start.id}>
                  <h2>
                    Starter{" "}
                    {start.starter_1 === true
                      ? "1"
                      : start.starter_2
                      ? "2"
                      : ""}
                  </h2>
                  <StarterItem start={start} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BackButton />
    </div>
  );
}

export default Characters;
