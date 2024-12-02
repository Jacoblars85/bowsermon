import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
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

export default RegisterPage;
