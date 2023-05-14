import styled, { css } from "styled-components";
import { FadeInAnimation } from "../../Utils/GlobalStyles";

export const cardImageStyles = css`
  height: 100%;
  width: 100%;
  object-fit: contain;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const cardImageContainer = css`
  height: 200px;
  width: 100%;
`;

export const StyledCard = styled.div`
  cursor: pointer;
  padding: 1rem;
  border: 2px solid transparent;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.card};
  transition: all 0.2s ease;
  ${FadeInAnimation}

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.borderHoverColor};
  }

  .img-container {
    ${cardImageContainer}
  }

  .img {
    ${cardImageStyles}
  }

  .card-title {
    margin: 1rem 0 0.4rem 0;
  }

  .card-subtitle {
    color: ${(props) => props.theme.colors.green};
  }

  ${(props) =>
    props.height === "h-300" &&
    css`
      height: 300px;
    `}
`;

export const StyledCategoryContents = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease;
`;

export const StyledProductContents = styled.div`
  cursor: auto;
  .img-container {
    display: flex;
    justify-content: center;
  }
  .img {
    width: 80%;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-price {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.5rem 0 0 0;
  }

  .btn-container {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;
