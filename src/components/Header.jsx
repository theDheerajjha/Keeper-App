import React from "react";
import {useHistory} from "react-router-dom";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  const history = useHistory();
  const navigateTo = () => history.push('/');
  return (
    <header>
      <h1>
        <HighlightIcon style={{ fontSize: 50}} /> Keeper
      </h1>
      <button className="headerbutton"onClick={navigateTo} > Log out </button>
    </header>
  );
}


export default Header;
