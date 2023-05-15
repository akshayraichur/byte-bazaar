/* eslint-disable no-unused-vars */
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ListingCard from "../Components/ProductListingCard/ProductListingCard";
import { useEffect, useState } from "react";
import { getAPI } from "../Utils/ApiCalls";
import { GET_CATEGORIES, GET_PRODUCTS } from "../Constants/URLs";
import { useSearchParams } from "react-router-dom";
import Shimmer from "../Components/Shimmer";
// import { PRODUCTS } from "../Constants/products";
import Button from "../Components/Button/Button";
import { toast } from "react-toastify";
import { FILTER_NAMES } from "../Constants/ProductListing";

const ProductListingStyles = styled.div`
  margin: 1rem 0 0 0;

  @media only screen and (width < 499px) {
    margin: 0.5rem 0 0 0;
  }

  h2 {
    font-family: "Lora", serif;
    font-weight: 900;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.text};
  }

  .filter-container {
    background-color: ${(props) => props.theme.colors.containerColor};
    border-radius: ${(props) => props.theme.borderRadius.card};
    margin: 1rem 0 0 0;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .category-filter {
    margin: 0rem 0 0 0;
  }
  .category-list-container {
    margin: 0.4rem 0;
  }
  .category-list {
    display: flex;
    column-gap: 10px;
  }

  .price-filter {
    margin: 1rem 0 0 0;
  }

  .price-list-container {
    margin: 0.4rem 0;
  }

  .rating-filter {
    margin: 1rem 0;
  }

  .rating-input {
    width: 100%;
    margin: 0.5rem 0 0 0;
  }

  /* data set for rating input */
  datalist {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    writing-mode: vertical-lr;
    width: 100%;
  }

  option {
    padding: 0;
    font-size: 0.6rem;
  }

  input[type="range"] {
    width: 100%;
    margin: 0;
  }
`;

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFitlers] = useState({ c: [], price: false, rating: 0 });
  const [expandAccordion, setExpandAccordion] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let result = await getAPI(GET_PRODUCTS);

      if (Array.isArray(result)) {
        let filteredProducts = [];

        if (searchParams.get("c")?.trim()) {
          let filters = searchParams.get("c")?.split(",");

          filters.forEach((filter) => {
            filteredProducts.push(...result.filter((product) => product.category === filter));
          });

          setProducts(filteredProducts);
        } else {
          setProducts(result);
        }
      } else {
        toast.error("There was some problem loading the products data.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      let result = await getAPI(GET_CATEGORIES);
      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        toast.error("There was some problem loading the category data.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("c")) {
      setFitlers((p) => ({ ...p, c: searchParams.get("c").split(",") ?? [] }));
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.c]);

  const updateFilter = (e, type) => {
    if (type === FILTER_NAMES.CATEGORY) {
      let filteredArray = [...filters.c];
      if (e.target.name && e.target.checked) {
        filteredArray.push(e.target.name);
      }
      if (!e.target.checked && filteredArray.includes(e.target.name)) {
        let index = filteredArray.indexOf(e.target.name);
        console.log(index);
        filteredArray.splice(index, 1);
        console.log(filteredArray);
      }
      setFitlers((p) => ({ ...p, c: filteredArray }));
      setSearchParams({ c: filteredArray.length ? filteredArray.join(",") : "" });
    }
  };

  const clearFilters = () => {
    setFitlers({ c: "", price: false, rating: 0 });
    setSearchParams({});
  };

  return (
    <>
      <Container maxWidth="xl">
        <ProductListingStyles>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={2.5}>
              <Accordion expanded={expandAccordion} className="filter-container">
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => setExpandAccordion((p) => !p)}
                >
                  <h2>Filters</h2>
                </AccordionSummary>
                <hr />
                <AccordionDetails>
                  <div className="category-filter">
                    <p>
                      <b>Category</b>
                    </p>
                    {/* List all the categories */}
                    <div className="category-list-container">
                      {categories.map((item) => (
                        <div key={item.id} className="category-list">
                          <input
                            type="checkbox"
                            name={item.title.toLowerCase()}
                            id={`${item.title}-checkbox`}
                            defaultChecked={filters.c?.includes(item.title.toLowerCase())}
                            onChange={(e) => updateFilter(e, FILTER_NAMES.CATEGORY)}
                          />
                          <label htmlFor={`${item.title}-checkbox`}>{item.title}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr />

                  <div className="price-filter">
                    <p>
                      <b>Price</b>
                    </p>
                    <div className="price-list-container">
                      <label htmlFor="price-filter-low">
                        <input type="radio" name="price-filter" id="price-filter-low" /> Low to High
                      </label>
                      <br />
                      <label htmlFor="price-filter-high">
                        <input type="radio" name="price-filter" id="price-filter-high" /> High to Low
                      </label>
                    </div>
                  </div>
                  <hr />

                  <div className="rating-filter">
                    <p>
                      <b>Rating</b>
                    </p>
                    <div className="rating-list-container">
                      <label htmlFor="rating-filter"></label>
                      <input
                        type="range"
                        id="rating-filter"
                        className="rating-input"
                        min="0"
                        max="5"
                        step="0.5"
                        list="markers"
                      />

                      <datalist id="markers">
                        <option value="0" label="0"></option>
                        <option value="0.5" label="0.5"></option>
                        <option value="1" label="1"></option>
                        <option value="1.5" label="1.5"></option>
                        <option value="2" label="2"></option>
                        <option value="2.5" label="2.5"></option>
                        <option value="3" label="3"></option>
                        <option value="3.5" label="3.5"></option>
                        <option value="4" label="4"></option>
                        <option value="4.5" label="4.5"></option>
                        <option value="5" label="5"></option>
                      </datalist>
                    </div>
                  </div>

                  <Button variant="outlined" color="green" onClick={clearFilters}>
                    Clear
                  </Button>
                </AccordionDetails>
              </Accordion>
              <br />
            </Grid>

            <Grid item xs={12} sm={9} md={9.5}>
              <h1>Product Listing 🔍</h1>
              {loading
                ? [1, 2, 3, 4, 5].map((item) => <Shimmer key={item} variant="product-listing" />)
                : /* TODO: Change this to products */
                  products.map((product) => (
                    <ListingCard
                      key={product.id}
                      title={product.title}
                      img={product.img}
                      details={product.details}
                      id={product.id}
                      price={product.price}
                    />
                  ))}

              {!loading && !products.length && (
                <>
                  <h2>No Products to show ☹️</h2>
                  <p>Please clear the filters and try again.</p>
                </>
              )}
            </Grid>
          </Grid>
        </ProductListingStyles>
      </Container>
    </>
  );
};

export default ProductListing;
