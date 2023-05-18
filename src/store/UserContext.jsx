import { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";

export const UserContext = createContext();

const UserDetails = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", token: null, uid: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((res) => {
      setUser({ name: res?.displayName, email: res?.email, token: res?.accessToken, uid: res.uid });
      if (res?.accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

UserDetails.propTypes = {
  children: PropTypes.node,
};

export default UserDetails;
