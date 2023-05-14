import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import Card from "../Components/Card/Card";
import { CATEGORY } from "../Constants/category";
import { NavLink } from "react-router-dom";
// import Button from "../Components/Button/Button";

const StyledHome = styled.div`
  transition: all 0.3s ease;

  .card {
    border: 2px solid ${(props) => props.theme.colors.border};
    padding: 8px;
    border-radius: 8px;
    margin: 1rem 0 0 0;
  }
`;

const Home = () => {
  return (
    <Container maxWidth="xl">
      <StyledHome>
        <h1>category🎗️</h1>
        <br />

        <Grid container spacing={1}>
          {CATEGORY.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
              <NavLink to={`/products?category=${category.title.toLowerCase()}`}>
                <Card
                  variant="category"
                  height="h-300"
                  title={category.title}
                  img={category.img}
                  subtitle={category.subtitle}
                />
              </NavLink>
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <br />
        <h1>best seller🏷️</h1>
      </StyledHome>
    </Container>
  );
};

export default Home;
