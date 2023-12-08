import "./App.css";
import { Main } from "./component/Main.jsx";
import Login from "./component/Login.jsx";
import { useState } from "react";
import HandleLogOutComponent from "./component/Logout.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [logInConfirmed, setLogInConfirmed] = useState(false);

  const handleLogIn = (username, password) => {
    if (username === "ary" && password === "567890") {
      setUser(username);
      setLogInConfirmed(true);
    } else {
      setUser(null);
      setLogInConfirmed(false);
    }
  };

  const handleLogOut = () => {
    setUser(null)
    setLogInConfirmed(false)
  }
  return (
    <>
      {!logInConfirmed ? <Login setUser={handleLogIn} /> : <Main user={user}> <HandleLogOutComponent onLogOut={handleLogOut} /> </Main>}
      
    </>
  );
}

export default App;


// the onLogOut function is a prop passed to the HandleLogOut component
// 