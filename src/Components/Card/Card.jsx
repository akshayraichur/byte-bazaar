import { StyledCard, StyledCategoryContents } from "./Card.styles";
import PropTypes from "prop-types";

const CategoryContents = ({ title, img, subtitle }) => {
  return (
    <StyledCategoryContents>
      <div className="img-container">
        <img src={img} alt={title} className="category-img" />
      </div>
      <h2 className="category-title">{title}</h2>
      <p className="category-subtitle">{subtitle}</p>
    </StyledCategoryContents>
  );
};

const Card = (props) => {
  const { children, variant, title, img, subtitle } = props;
  return (
    <StyledCard>
      {variant === "category" && <CategoryContents title={title} img={img} subtitle={subtitle} />}
      {children}
    </StyledCard>
  );
};

CategoryContents.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  subtitle: PropTypes.string,
};

Card.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.string,
  height: PropTypes.string,
  subtitle: PropTypes.string,
};

Card.defaultProps = {
  children: <div></div>,
  variant: "category",
  title: "Cart Title",
  img: "",
};

export default Card;
