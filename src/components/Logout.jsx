import React from "react";

const Logout = () => {
  // suppression du jwt du localstorage
  const handleSubmit = () => {
    localStorage.removeItem("TOKEN");
    alert("Vous etes deconnecté");
  };

  return (
    <form>
      <button type="button" onClick={handleSubmit}>
        Disconnect
      </button>
    </form>
  );
};

export default Logout;
