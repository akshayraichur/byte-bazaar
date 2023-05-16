import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Components/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../store/firebase";
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
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: ${(props) => props.theme.borderRadius.card};
    padding: 1rem;
    width: 40%;
    text-align: center;

    @media only screen and (width < 899px) {
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

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(firebaseAuth, inputValues.email, inputValues.password)
      .then((res) => {
        toast(`Welcome ${res?.user?.displayName}!`);
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
            <h1>Login 🕵🏻‍♂️</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
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
                  placeholder="Enter Password"
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
                Login
              </Button>
            </form>
            <small>
              Dont have an account yet? <NavLink to="/signup">Create one here!</NavLink>
            </small>
          </div>
        </StyledLogin>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
