import { Container } from "@mui/material";
import styled from "styled-components";
import Button from "../Components/Button/Button";

const StyledHome = styled.div`
  .card {
    border: 2px solid ${(props) => props.theme.colors.border};
    padding: 8px;
    border-radius: 8px;
  }
`;

const Home = () => {
  return (
    <Container maxWidth="xl">
      <StyledHome>
        <h1>Byte Bazaar</h1>

        <div className="card">
          <h1>Category</h1>
        </div>

        <Button>Add to cart</Button>
        <Button variant="outlined" color="green">
          Add to cart
        </Button>

        <Button variant="filled" color="green">
          Buy Now
        </Button>

        <Button variant="outlined" color="orange">
          Add to cart
        </Button>

        <Button variant="filled" color="orange">
          Buy Now
        </Button>
      </StyledHome>
    </Container>
  );
};

export default Home;
