import { Chip, Container, Grid, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAPI } from "../Utils/ApiCalls";
import { GET_PRODUCTS } from "../Constants/URLs";
import { toast } from "react-toastify";
import styled from "styled-components";
import Shimmer from "../Components/Shimmer";
import Footer from "../Components/Footer";
import Button from "../Components/Button/Button";

const ProductDetailStyles = styled.div`
  padding: 1rem 0;
  margin: 1rem 0;
  .image-container {
    width: 100%;
    min-height: 65vh;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: ${(props) => props.theme.borderRadius.card};
    border: 1px solid ${(props) => props.theme.colors.containerColor};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .image-container img {
    width: 60%;
    transition: 0.3s all ease;
    cursor: zoom-in;
  }

  .image-container img:hover {
    transform: scale(1.2);
  }

  .details-container {
    padding: 1rem;
  }

  .d-title {
    font-size: 2rem;
    font-family: "Lora", serif;
  }

  .d-desc {
    margin: 1rem 0;
  }

  .rating-container {
    display: flex;
    column-gap: 1rem;
    align-items: center;

    p {
      font-size: 0.8rem;
    }
  }

  .category-chip {
    margin-top: 1rem;
    background-color: ${(props) => props.theme.colors.text};
    color: white;
    text-transform: capitalize;
    margin-right: 1rem;
  }

  .d-price {
    margin-top: 1rem;

    h2 {
      font-size: 2rem;
    }
  }

  .d-details {
    margin-left: 1rem;
    ul {
      margin: 1.5rem 0;
    }
    li {
      list-style: circle;
      padding: 0.5rem 0 0.5rem 0rem;
    }
  }

  .btn-container {
    button {
      margin-right: 0.5rem;
    }
  }
`;

const ProductDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [noProductFound, setNoProductFound] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let result = await getAPI(GET_PRODUCTS);

      if (Array.isArray(result)) {
        let filteredProduct = result.find((p) => p.id === id);

        if (!filteredProduct) {
          toast.info("No product found!");
          setNoProductFound(true);
          setLoading(false);
          return;
        }

        setProduct(filteredProduct);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <ProductDetailStyles>
          <Shimmer variant="product-details" />
        </ProductDetailStyles>
      </Container>
    );
  }

  if (noProductFound) {
    return (
      <Container maxWidth="xl">
        <center>
          <h1>No product found! ☹️</h1>
        </center>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <ProductDetailStyles>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={5}>
              {/* Image container */}
              <div className="image-container">
                <img src={product?.img} alt={product?.title} />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={7}>
              {/* Description container */}
              <div className="details-container">
                <h2 className="d-title">{product?.title}</h2>
                <p className="d-desc">{product?.desc}</p>
                <div className="rating-container">
                  <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                  <p>450+ ratings</p>
                </div>
                <Chip variant="filled" label={`Category: ${product?.category}`} className="category-chip" />

                {product?.tag && <Chip variant="outlined" label={product?.tag} className="category-chip" />}
                <div className="d-price">
                  <h2>₹ {product?.price?.toLocaleString("en-IN")}/-</h2>
                </div>
                <div className="d-details">
                  <ul>
                    {product?.details?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-container">
                  <Button color="orange">Add to cart</Button>
                  <Button color="green">Add to wishlist</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </ProductDetailStyles>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
