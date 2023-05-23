import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Components/Button/Button";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { GoogleProvider, firebaseAuth } from "../config/firebase";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const StyledLogin = styled.div`
  width: 100%;
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 2rem;
  }

  @media only screen and (width < 899px) {
    height: 70vh;
  }

  .login-container {
    border: 1px solid ${(props) => props.theme.colors.containerColor};
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: ${(props) => props.theme.borderRadius.card};
    padding: 1rem;
    width: 40%;
    text-align: center;

    @media only screen and (width < 999px) {
      width: 100%;
    }
  }

  .login-input-container {
    width: 70%;
    margin: 0.5rem 0;
    padding: 0.8rem;
    font-family: "Inter";
    border-radius: ${(props) => props.theme.borderRadius.card};
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.text};
    border: 1px solid ${(props) => props.theme.colors.text};

    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.text};
    }

    :focus {
      outline: 1px solid ${(props) => props.theme.colors.text};
    }

    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  .login-btn {
    width: 70%;

    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  #show-p {
    margin-right: 0.4rem;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, inputValues.email, inputValues.password)
      .then(async (res) => {
        await updateProfile(firebaseAuth.currentUser, { displayName: inputValues.name });
        toast(`Welcome ${inputValues.name}!`);
        let userDetails = {
          displayName: res.user.displayName,
          email: res.user.email,
          token: res.user.accessToken,
          refreshToken: res.user.stsTokenManager.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(userDetails));
        navigate("/");
      })
      .catch((e) => {
        toast(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, GoogleProvider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((res) => {
      if (res?.accessToken) {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <Container maxWidth="xl">
        <StyledLogin>
          <div className="login-container">
            <h1>Signup 📝</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name *"
                className="login-input-container"
                required
                onChange={(e) => setInputValues((p) => ({ ...p, name: e.target.value }))}
                value={inputValues.name}
              />
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email *"
                className="login-input-container"
                required
                onChange={(e) => setInputValues((p) => ({ ...p, email: e.target.value }))}
                value={inputValues.email}
              />

              <div>
                <label htmlFor="password"></label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password *"
                  className="login-input-container password-styles"
                  required
                  onChange={(e) => setInputValues((p) => ({ ...p, password: e.target.value }))}
                  value={inputValues.password}
                />
                <br />
                <div>
                  <input
                    type="checkbox"
                    value={showPassword}
                    id="show-p"
                    onClick={(e) => setShowPassword(e.target.checked ? true : false)}
                  />
                  <label htmlFor="show-p">Show Password</label>
                </div>
              </div>

              <Button color="green" type="submit" variant="filled" className="login-btn" isLoading={isLoading}>
                Create my account
              </Button>
            </form>
            <div>
              <small>Dont like typing? We have got you covered!</small>
              <Button type="submit" color="orange" variant="outlined" className="login-btn" onClick={signInWithGoogle}>
                Signup with Google
              </Button>
            </div>
            <small>
              Remember creating an account? <NavLink to="/login">Login instead!</NavLink>
            </small>
          </div>
        </StyledLogin>
      </Container>
      <Footer />
    </>
  );
};

export default Signup;
