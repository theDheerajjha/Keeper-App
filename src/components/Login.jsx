import React,{useState} from "react";
import Input from "./Input";
import {Redirect,useHistory} from "react-router-dom";

export default function Login(props){

    const initialstate = {
        username:"",
        password:"",
        confirm_password:"",
        username_error:"",
        password_error:"",
        confirm_password_error:""
    }

    //to keep track of user_inputs
    const [user_details,change_details] = useState(initialstate);

    //to keep tarck of login and register
    const[state,change_state]=useState(true)
    //ture = login
    //false= register

    function change_to_register(){
        change_state(prev_value =>(!prev_value))
        change_details(()=>{
            return initialstate;
        }); 
    }

    function handle_change(event){
        const {name,value} = event.target;
        change_details(prev_value =>{
            return({
                ...prev_value,
                [name]:value
            });
        })
    }
    function validate(){
        let username_error=true;
        let password_error=true;
        let confirm_password_error=true;

        if(user_details.username.length < 3){
            username_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    username_error:"Username should consist atleast 3 characters!"
                });
            })
        }
        if(user_details.username.length >= 3 && user_details.username_error){
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    username_error:""
                });
            })
        }
        
        if(user_details.password.length < 8){
            password_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    password_error:"password field should consist atleast 8 characters!"
                });
            })
        }

        if(user_details.password === user_details.username){
            password_error=false;
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    password_error:"username cannot be password"
                });
            })
        }

        if(user_details.password.length >= 8 && user_details.password_error){
            change_details(prev_value =>{
                return({
                    ...prev_value,
                    password_error:""
                });
            })
        }

        if(state === false)
        {
            if( user_details.password !== user_details.confirm_password){
                confirm_password_error=false;
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:"passwords does'nt match"
                    });
                })
            }
            if( user_details.password === user_details.confirm_password && user_details.confirm_password_error){
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:""
                    });
                })
            }
            if(user_details.confirm_password.length===0){
                confirm_password_error=false;
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:"confirm your password"
                    });
                })
            }
            if(user_details.confirm_password.length>=8 && user_details.confirm_password_error){
                change_details(prev_value =>{
                    return({
                        ...prev_value,
                        confirm_password_error:""
                    });
                })
            }
        }

 
        if(state){
            if(username_error && password_error)  {
                return true;
            }
        }
        if(!state){
            if(username_error && password_error && confirm_password_error)  {
                return true;
            }
        }
        else{
            return false;
        }
    }
    const history = useHistory();
    const navigateTo = () => history.push('/note');

    function validate_user(event){
        event.preventDefault()
        if(validate()){ 
            props.senddata(user_details.username);
            change_details(()=>{
                return initialstate;
            });
            navigateTo();
        }
    }

    return(
        <div className="login">
          <h1 style={{marginBottom:"7vh"}}>
          {state ? "Login" : "Register"}
          </h1>
          <form onSubmit={validate_user}>
          <Input 
              placeholder="Username"
              type="text"
              func={handle_change}
              name="username"
              value={user_details.username}
          />
            <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.username_error}
            </div>
              <Input 
              placeholder="your password"
              type="password"
              func={handle_change}
              name="password"
              value={user_details.password}
          />
          <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.password_error}
            </div>

            {state ? null :   
             <div>   
            <Input 
              placeholder="confirm password"
              type="password"
              func={handle_change}
              name="confirm_password"
              value={user_details.confirm_password}
             />
            <div style={{color:"#fff", fontSize:15,marginBottom:7 }} >
              {user_details.confirm_password_error}</div> 
            </div>}

            <button className="loginbutton" type="submit">
            {state ? "Login" : "Register"}
            </button>
          </form>
          {state ? <div><a href="#" onClick={change_to_register} > Register </a></div> : 
           <div><a href="#" onClick={change_to_register} > Login </a></div>}
          
        </div>
    );
}
