import "./CongratsComponent.css";
import React from "react";
import congrats from "../../assets/images/congrats.png";
import {Link} from "react-router-dom";

function CongratsComponent() {
  return (
      <div className="congratulation-container">
              <h1>Congratulations!</h1>
              <img src={congrats} alt="logo" />
          <p>Your  account has successfully been set up</p>
          <Link to="/">
          <button type="submit"
                  className="btn-start">Start now</button>
          </Link>
      </div>
  );
}
export default CongratsComponent;
