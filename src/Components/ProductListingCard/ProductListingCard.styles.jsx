import styled from "styled-components";
import { cardImageContainer, cardImageStyles } from "../Card/Card.styles";

export const ListingCardStyles = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.containerColor};
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  column-gap: 2rem;

  .img-container {
    ${cardImageContainer}
    display: block;
    width: 200px;

    @media only screen and (width < 799px) {
      width: 90px;
    }
  }

  .img {
    ${cardImageStyles}
  }

  .details-container {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    h2 {
      text-decoration: none;
    }

    @media only screen and (width < 799px) {
      h2 {
        font-size: 1.2rem;
      }
    }
  }

  .description {
    margin: 0.4rem 0 0 1rem;
  }

  .description li {
    margin: 0.2rem 0 0 0rem;
  }

  .price-text {
    font-weight: 900;
    font-size: 1.7rem;

    @media only screen and (width <= 799px) {
      font-size: 1.2rem;
    }
  }
`;
