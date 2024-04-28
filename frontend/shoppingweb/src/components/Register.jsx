import {  useState } from "react";
import {http} from "../utils/http";
import { useNavigate } from 'react-router-dom';
import '../Styles/SignUp.css';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function save(event) {
        event.preventDefault();
        try {
          await http.post("/api/user/register", {
          username: username,
          email: email,
          password: password,
          });
          alert("User Registation Successfully");
          navigate("/");
        } catch (err) {
          alert(err);
        }
      }

    return (
    <div class="signup-container" >
    <div class="title">
        <h2>User Registation</h2>
    </div>
    <div className="signup-form">
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-user-circle"></i> {/* Font Awesome Username icon */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-envelope"></i> {/* Font Awesome Email icon */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-lock"></i> {/* Font Awesome Password icon */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
            </div>
            <button type="submit"   onClick={save}  className="signup-btn">
                Sign Up
            </button>
        </div>
    </div>
    ); 
    // {/* <form>
    //     <div class="form-group">
    //       <label>Username</label>
    //       <input type="text"  class="form-control" id="username" placeholder="Enter Username"
          
    //       value={username}
    //       onChange={(event) => {
    //         setUsername(event.target.value);
    //       }}
    //       />
    //     </div>
    //     <div class="form-group">
    //       <label>email</label>
    //       <input type="email"  class="form-control" id="email" placeholder="Enter Email"
          
    //       value={email}
    //       onChange={(event) => {
    //         setEmail(event.target.value);
    //       }}
          
    //       />
 
    //     </div>
    //     <div class="form-group">
    //         <label>password</label>
    //         <input type="password"  class="form-control" id="password" placeholder="Enter password"
            
    //         value={password}
    //         onChange={(event) => {
    //           setPassword(event.target.value);
    //         }}
            
    //         />
    //       </div>
    //     <button type="submit" class="btn btn-primary mt-4" onClick={save} >Save</button>
       
    //   </form>
    // </div>
    // </div>
    //  </div> */}
  }
export default Register;