import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

const StyledShimmer = styled.div`
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  align-items: center;

  div {
    width: 75%;
  }
`;

const Shimmer = (props) => {
  return (
    <>
      {props.variant === "product-listing" && (
        <StyledShimmer>
          <Skeleton width="20%" variant="h1" height="200px" />
          <div>
            <Skeleton variant="h1" width="100%" height="50px" />
            <br />
            <Skeleton variant="h2" height="20px" />
            <br />
            <Skeleton variant="h2" height="20px" />
            <br />
            <Skeleton variant="h2" height="20px" />
          </div>
        </StyledShimmer>
      )}
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
