import React, { useState } from "react";
import Notes from "./Notes";
import Login from "./Login";
import Signuphead from "./Signuphead";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


export default function App() {
  const[username,change_username]=useState("");
  
  function getusername(name){
    console.log(name);
    
     change_username(()=>(name))
  }

  return(
    <div>
    <Router>
    <Switch>
    <Route path="/" exact>
            <Signuphead/>
            <Login senddata={getusername}/>
    </Route>
    <Route path="/note">
      <Notes user_name={username} />
    </Route>
    </Switch>
    </Router>
    </div>
  );

  

 
}