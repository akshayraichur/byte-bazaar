import { Avatar, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";

const ProfileStyles = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius.card};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.containerColor};
`;

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.token]);

  const ProfilePage = (
    <div className="profile-container">
      <Avatar sx={{ bgcolor: "#4f46e5", width: 100, height: 100 }} style={{ fontSize: "2.2rem" }}>
        {user.name?.charAt(0)}
      </Avatar>

      <h2>Hi, {user.name}</h2>
      <p>Hope you are having a great day so far!</p>
    </div>
  );

  return (
    <>
      <Container maxWidth="xl">
        <ProfileStyles>{isAuthenticated ? ProfilePage : <AuthError page="profile" />}</ProfileStyles>
      </Container>
    </>
  );
};

export default Profile;
