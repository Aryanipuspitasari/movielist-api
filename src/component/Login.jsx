import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css"


export default function Login({ setUser }) {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const userNameInput = useRef(null);
    const passwordInput = useRef(null);
    
    function checkLogin(e) {
      e.preventDefault();
      
      if(!username || !password){
        alert ("Please fill in your name and password")
        return;
      }
  
  
      if (username !== "ary") {
        setError("Wrong username");
        userNameInput.current.focus();
         setUsername("")
         setPassword("")
      } else if (password === "1234") {
        setError("That's the old password");
        passwordInput.current.focus();
        setUsername("")
        setPassword("")
      } else if (password !== "567890") {
        setError("Wrong password");
        passwordInput.current.focus();
        setUsername("")
        setPassword("")
      } else {
        setError("");
        setUser(username, password);
      }
  
    }
  
    const passwordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  
    return (
      <div className="LogInContainer">
      <h1>Please log in first</h1>
        <form onSubmit={checkLogin}>
          <p className="error">{error}</p>
  
          <label>
            User 
            <div className="pass-input-container">
  
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={userNameInput}
              />
              </div>
          </label>
  
          <label>
            Pass
            <div className="pass-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInput}
              />
              <span onClick={passwordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />  }
              </span>
  
            </div>
          </label>
  
          <button type="submit">Login</button>
  
          <p className="error">{error}</p>
        </form>
      </div>
    );
  }