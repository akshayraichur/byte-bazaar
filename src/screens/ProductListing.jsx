import { Alert, Container, Grid, Snackbar, Typography } from "@mui/material";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ListingCard from "../Components/ProductListingCard/ProductListingCard";
import { useEffect, useState } from "react";
import { getAPI } from "../Utils/ApiCalls";
import { GET_PRODUCTS } from "../Constants/URLs";
import { useSearchParams } from "react-router-dom";
import Shimmer from "../Components/Shimmer";

const ProductListingStyles = styled.div`
  h2 {
    font-family: "Lora", serif;
    font-weight: 900;
    font-size: 1.8rem;
  }

  .filter-container {
    background-color: ${(props) => props.theme.colors.containerColor};
    border-radius: ${(props) => props.theme.borderRadius.card};
    padding: 1rem;
    margin: 1rem 0 0 0;

    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`;

const ProductListing = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [filters, setFitlers] = useState({ c: searchParams.get("c") });
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    severity: "success",
    message: "",
    autoCloseDuration: 6000,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let result = await getAPI(GET_PRODUCTS);
      if (Array.isArray(result)) {
        let filteredProducts = result;
        if (filters.c) {
          filteredProducts = result.filter((product) => product.category === filters.c);
        }
        setProducts(filteredProducts);
      } else {
        setSnackbarConfig((p) => ({
          ...p,
          open: true,
          severity: "error",
          message: "There was some problem loading the data.",
        }));
      }
    } catch (error) {
      setSnackbarConfig((p) => ({ ...p, open: true, severity: "error", message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarConfig({
      open: false,
      severity: "success",
      message: "",
      autoCloseDuration: 6000,
    });
  };
  return (
    <>
      <Container maxWidth="xl">
        <ProductListingStyles>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={2.5}>
              <div className="filter-container">
                <h2>Filters</h2>
              </div>
              <Accordion expanded={true} onChange={() => null}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Collapsible Group Item #1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                    blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <br />
            </Grid>

            <Grid item xs={12} sm={9} md={9.5}>
              <h1>Product Details 🔍</h1>
              {(loading || !products.length) &&
                [1, 2, 3, 4, 5].map((item) => <Shimmer key={item} variant="product-listing" />)}
              {products.map((product) => (
                <ListingCard
                  key={product.id}
                  title={product.title}
                  img={product.img}
                  details={product.details}
                  id={product.id}
                  price={product.price}
                />
              ))}
            </Grid>
          </Grid>

          {snackbarConfig.open && (
            <Snackbar
              open={snackbarConfig.open}
              autoHideDuration={snackbarConfig.autoCloseDuration}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={snackbarConfig.severity} onClose={handleSnackbarClose}>
                {snackbarConfig.message}
              </Alert>
            </Snackbar>
          )}
        </ProductListingStyles>
      </Container>
    </>
  );
};

export default ProductListing;
