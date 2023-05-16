import { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "./firebase";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserDetails = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", token: null });
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((res) => {
      setUser({ name: res?.displayName, email: res?.email, token: res?.accessToken });
    });
  }, []);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

UserDetails.propTypes = {
  children: PropTypes.node,
};

export default UserDetails;
