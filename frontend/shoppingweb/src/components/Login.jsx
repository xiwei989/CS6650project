import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import {http} from "../utils/http";
import '../Styles/Login.css';

function Login() {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function login(event) {
        event.preventDefault();
        try {
          await http.post("/api/user/login", {
            username: username,
            password: password,
            }).then((res) => 
            {
             if (res.data.message === "username not exists") 
             {
               alert("username not exists");
               navigate("/register");
             } 
             else if(res.data.message === "login success")
             { 
                localStorage.setItem('userId', JSON.stringify(res.data.userId));
                navigate('/home', { state:{userId: res.data.userId }});
             } 
              else 
             { 
                alert("password not match");
             }
          }, fail => {
           console.error(fail); // Error!
  });
        }
 
         catch (err) {
          alert(err);
        }
      
      }

      const goToRegister = () => {
        navigate("/register");
      }

    return (
      <div className="signin-page">
      <div className="signin-container">
        <div className="title">
          <h2>Welcome to Shopping Web</h2>
        </div>
        <div className="signin-form">
          <form onSubmit={login}>
            <div className="field">
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input type="text" placeholder="Username" required name="username" value={username} onChange={(event) => {setUsername(event.target.value);}}  />
              </div>
            </div>
            <div className="field">
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" required name="password" value={password} onChange={(event) => {setPassword(event.target.value);}} />
              </div>
            </div>
            <button type="submit" className="signin-btn">Sign In</button>
          </form>
        </div>
        <div className="alternative-signup">
          <span>or</span>
          <p>Not have an account?</p>
          <button className="signup-btn" onClick={goToRegister}>Sign Up</button>
        </div>
      </div>
    </div>
    //    <div>
    //         <div class="container">
    //         <div class="row">
    //             <h2>Login</h2>
    //          <hr/>
    //          </div>
    //          <div class="row">
    //          <div class="col-sm-6">
 
    //         <form>
    //     <div class="form-group">
    //       <label>Username</label>
    //       <input type="username"  class="form-control" id="username" placeholder="Enter Username"
          
    //       value={username}
    //       onChange={(event) => {
    //         setUsername(event.target.value);
    //       }}
          
    //       />
    //     </div>
    //     <div class="form-group">
    //         <label>password</label>
    //         <input type="password"  class="form-control" id="password" placeholder="Enter Password"
            
    //         value={password}
    //         onChange={(event) => {
    //           setPassword(event.target.value);
    //         }}
            
    //         />
    //       </div>
    //               <button type="submit" class="btn btn-primary" onClick={login} >Login</button>
    //           </form>
    //         </div>
    //         </div>
    //         <div className="alternative-signup">
    //       <span>or</span>
    //       <p>Not have an account?</p>
    //       <button className="signup-btn" onClick={goToRegister}>Sign Up</button>
    //     </div>
    //         </div>
    //  </div>
    );
  }
  
  export default Login;
