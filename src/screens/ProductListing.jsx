import { Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ListingCard from "../Components/ProductListingCard/ProductListingCard";
import { PRODUCTS } from "../Constants/products";

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
            </Grid>

            <Grid item xs={12} sm={9} md={9.5}>
              <h1>Product Details 🔍</h1>
              {PRODUCTS.map((product) => (
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
        </ProductListingStyles>
      </Container>
    </>
  );
};

export default ProductListing;
