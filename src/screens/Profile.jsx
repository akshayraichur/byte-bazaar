import { Container } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Container maxWidth="xl">
        <h1>Hi there</h1>
      </Container>
    </>
  );
};

export default Profile;
