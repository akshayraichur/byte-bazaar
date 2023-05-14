import styled, { css } from "styled-components";
import { FadeInAnimation } from "../../Utils/GlobalStyles";

export const StyledCard = styled.div`
  cursor: pointer;
  padding: 1rem;
  border: 2px solid transparent;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.card};
  transition: all 0.2s ease;
  ${FadeInAnimation}

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

  .img-container {
    height: 150px;
    width: 100%;
  }

  .category-img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .category-title {
    margin: 1rem 0 0.4rem 0;
  }

  .category-subtitle {
    color: ${(props) => props.theme.colors.green};
  }
`;
