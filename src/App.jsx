import styled from "styled-components";
import Button from "./Components/Button/Button";

const Container = styled.section`
  font-family: "Inter", sans-serif;
  margin: 1rem;
  padding: 2rem;
  border-radius: ${(props) => props.theme.borderRadius.card};
  border: 2px solid #0284c7;
  background-color: ${(props) => props.theme.colors.background};

  .btn {
    padding: 0.8rem 1.4rem;
    margin: 1rem 0.5rem 1rem 0;
    background-color: ${(props) => props.theme.colors.btnBgColor};
    border: 2px solid ${(props) => props.theme.colors.btnBgColor};
    cursor: pointer;
    color: white;
    border-radius: ${(props) => props.theme.borderRadius.btn};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    font-size: 0.85rem;
    font-family: inherit;

    transition: all 0.3s ease;

    &:active {
      transform: scale(0.9);
    }
  }

  .btn-open {
    padding: 0.8rem 1.4rem;
    margin: 1rem 0;
    background-color: inherit;
    border: 2px solid ${(props) => props.theme.colors.btnBgColor};
    cursor: pointer;
    color: ${(props) => props.theme.colors.text};
    border-radius: ${(props) => props.theme.borderRadius.btn};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    font-size: 0.85rem;
    font-family: inherit;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.9);
    }
  }
`;

function App() {
  return (
    <>
      <div>
        <h1>A retro themed tech store</h1>

        <h1>Byte Bazaar</h1>

        <h1>iPhone 14 Pro</h1>

        <h1>Category</h1>
      </div>

      <Container>
        <h3>Lorem, ipsum dolor.</h3>
        <h4>Byte Bazaar</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis officiis a unde beatae sit suscipit
          repellendus enim nam voluptates, sint, nesciunt blanditiis recusandae eius rem odio aliquid voluptatum nulla,
          officia modi dolorem cupiditate! Nostrum ipsam tempore, tenetur saepe neque doloribus explicabo, minima, ut
          vero qui numquam est suscipit consequatur totam.
        </p>

        <Button variant="filled">Buy Now</Button>
        <Button variant="outlined">Add to cart</Button>
      </Container>

      <Container>
        <h1>Lorem ipsum dolor</h1>
        <h2>Lorem ipsum dolor sit.</h2>
        <h3>Lorem ipsum dolor sit amet.</h3>
        <h4>Lorem ipsum dolor, sit amet consectetur adipisicing.</h4>
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ad!</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur numquam, similique et iure accusamus modi
          repudiandae possimus vero, necessitatibus adipisci aliquam eaque, optio molestias consequuntur beatae! Neque
          consequatur ducimus nobis eos debitis molestias, vitae voluptatem animi possimus impedit porro eveniet
          perferendis expedita quisquam labore. Maiores, esse. Vel facilis incidunt consequuntur.
        </p>
      </Container>
    </>
  );
}

export default App;
