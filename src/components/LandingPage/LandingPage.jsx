import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const history = useHistory();

  return (
    <div>
      <div className="bowsermonMainHeader">
        <img
          src="images/bowserLogoRedCircle.webp"
          height="150px"
          width="150px"
        />

        <h1>Bowsermon</h1>
      </div>

      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default LandingPage;
