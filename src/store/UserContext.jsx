import { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";

export const UserContext = createContext();

const UserDetails = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", token: null });
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((res) => {
      // if (!res?.accessToken) {
      //   toast.info("You have been logged out! please login again.");
      // }
      setUser({ name: res?.displayName, email: res?.email, token: res?.accessToken });
    });
  }, []);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

UserDetails.propTypes = {
  children: PropTypes.node,
};

export default UserDetails;
