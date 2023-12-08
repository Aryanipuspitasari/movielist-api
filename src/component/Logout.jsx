import "./Logout.css"

// handleLogOut is passed as the onLogOut prop to HandleLogOutComponent.
function HandleLogOutComponent({ onLogOut }) {
  const handleLogout = () => {
    onLogOut();
  };

  {/*
in the handleLogout function, it calls onLogOut(), which, in , corresponds to the handleLogOut function defined in App.jsx. This function sets the user state to null and updates logInConfirmed to false, effectively logging the user out.

*/}
  return (
    <button className="logOut" onClick={handleLogout}>
      Log out
    </button>
  );
}

export default HandleLogOutComponent;
