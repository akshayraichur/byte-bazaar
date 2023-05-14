import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import Card from "../Components/Card/Card";
import { CATEGORY } from "../Constants/category";
import { NavLink } from "react-router-dom";
import { PRODUCTS } from "../Constants/products";

const StyledHome = styled.div`
  transition: all 0.3s ease;
  text-decoration: none;

  .header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 1rem 0;
    background-color: ${(props) => props.theme.colors.containerColor};
    border-radius: ${(props) => props.theme.borderRadius.card};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .header-text-container {
    padding: 2rem 1rem;
    width: 60%;
  }

  .header-title {
    font-family: "Lora", serif;
    font-size: 2rem;
  }

  .header-description {
    font-family: "Lora", serif;
    font-size: 1.3rem;
    margin: 1rem 0;
  }

  .image-container {
    width: 40%;
    height: 100%;
    overflow: hidden;
    border-top-right-radius: ${(props) => props.theme.borderRadius.card};
    border-bottom-right-radius: ${(props) => props.theme.borderRadius.card};

    @media only screen and (width < 999px) {
      display: none;
    }
  }

  .header-image {
    width: 100%;
    height: 100%;
  }

  .card {
    border: 2px solid ${(props) => props.theme.colors.border};
    padding: 8px;
    border-radius: 8px;
    margin: 1rem 0 0 0;
  }

  .navlink {
    text-decoration: none;
    color: inherit;
  }

  @media only screen and (width < 999px) {
    .header-text-container {
      width: 100%;
    }

    .header-title {
      font-size: 1rem;
    }

    .header-description {
      font-size: 0.9rem;
    }
  }
`;

const Home = () => {
  return (
    <>
      <Container maxWidth="xl">
        <StyledHome>
          <div className="header">
            <div className="header-text-container">
              <h2 className="header-title">
                Welcome to our tech-savvy world! <br />
              </h2>
              <p className="header-description">
                We are thrilled to have you, Our platform is designed to provide you with a seamless shopping
                experience, ensuring that you have access to a wide range of top-quality tech products at your
                fingertips.
              </p>

              <p className="header-description">
                From state-of-the-art smartphones and powerful laptops to innovative smart home devices and
                high-performance gaming gear, {"we've"} got it all.
              </p>
            </div>

            <div className="image-container">
              <img
                className="header-image"
                src="https://images.pexels.com/photos/8939564/pexels-photo-8939564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="header-image"
                loading="lazy"
              />
            </div>
          </div>
          <h1>Category🎗️</h1>
          <br />

          <Grid container spacing={1}>
            {CATEGORY.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
                <NavLink to={`/products?c=${category.title.toLowerCase()}`} className="navlink">
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

          <h1>Best seller🏷️</h1>
          <Grid container spacing={1}>
            {PRODUCTS.filter((products) => products.tag === "best-seller").map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  variant="product"
                  height="h-300"
                  title={product.title}
                  img={product.img}
                  subtitle={product.subtitle}
                  price={product.price}
                  hrefLink={`/details/`}
                />
              </Grid>
            ))}
          </Grid>
        </StyledHome>
      </Container>
      <footer className="footer">
        <div className="footer-company">
          <h2 className="footer-company-name">Byte Bazaar</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque provident nobis asperiores hic repellat
            ab, laboriosam fugit est dolorum debitis nisi.
          </p>
          <p>Belagavi, Karnataka, India.</p>
        </div>
        <div className="footer-company-details">
          <h2 className="footer-company-name">Company</h2>
          <p className="footer-company-details-text">About us</p>
          <p className="footer-company-details-text">Careers</p>
        </div>
        <div className="footer-company-details">
          <h2 className="footer-company-name">Social</h2>
          <p className="footer-company-details-text">Linkedin</p>
          <p className="footer-company-details-text">Instagram</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
