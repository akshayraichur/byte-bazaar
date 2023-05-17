import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

const StyledShimmer = styled.div`
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;

  .details {
    width: 47%;
  }

  .listing {
    width: 75%;
  }
`;

const Shimmer = (props) => {
  const ProductListingShimmer = (
    <StyledShimmer>
      <Skeleton width="20%" variant="h1" height="200px" />
      <div className="listing">
        <Skeleton variant="h1" width="100%" height="50px" />
        <br />
        <Skeleton variant="h2" height="20px" />
        <br />
        <Skeleton variant="h2" height="20px" />
        <br />
        <Skeleton variant="h2" height="20px" />
      </div>
    </StyledShimmer>
  );

  const ProductDetailsShimmer = (
    <StyledShimmer>
      <Skeleton width="50%" variant="h1" height="500px" />
      <div className="details">
        <Skeleton variant="h1" width="100%" height="50px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
        <br />
        <Skeleton variant="h2" height="30px" />
      </div>
    </StyledShimmer>
  );

  return (
    <>
      {props.variant === "product-listing" && ProductListingShimmer}

      {props.variant === "product-details" && ProductDetailsShimmer}
      <Skeleton />
    </>
  );
};

Shimmer.propTypes = {
  variant: PropTypes.string.isRequired,
};

Shimmer.defaultProps = {
  variant: "product-listing",
};

export default Shimmer;
