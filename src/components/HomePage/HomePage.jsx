import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import Nav from "../Nav/Nav";
import StarterItem from "../StarterItem/StarterItem";
import SwitchStarterButton from "../SwitchStarterButton/SwitchStarterButton";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  return (
    <div>
      <Nav />

      <div className="bowserLogo"></div>

      <div className="homePage">
        <div className="bigStarterHomeView">
          <div className="switchButtonHomePage">
            {starter.length === 2 ? <SwitchStarterButton /> : ""}
          </div>

          <div className="starterHomeView">
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
                  <StarterItem key={start.id} start={start} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="characterButton"
          onClick={() => history.push(`/characters`)}
        >
          Characters
        </button>
        <button className="shopButton" onClick={() => history.push(`/shop`)}>
          Shop
        </button>
        <button
          className="inventoryButton"
          onClick={() => history.push(`/inventory`)}
        >
          Inventory
        </button>

        <button
          className="campaignButton"
          onClick={() => history.push(`/campaign`)}
        >
          Campaign
        </button>
      </div>
    </div>
  );
}

export default HomePage;
