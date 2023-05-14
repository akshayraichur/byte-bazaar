import { StyledCard, StyledCategoryContents, StyledProductContents } from "./Card.styles";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const CardImageContainer = ({ img, title }) => (
  <div className="img-container">
    <img src={img} alt={title} className="img" loading="lazy" />
  </div>
);

const CategoryContents = ({ title, subtitle, children }) => {
  return (
    <StyledCategoryContents>
      {children}
      <h2 className="card-title">{title}</h2>
      <p className="card-subtitle">{subtitle}</p>
    </StyledCategoryContents>
  );
};

const ProductContents = ({ title, price, children }) => {
  return (
    <StyledProductContents>
      {children}
      <h3 className="card-title">{title}</h3>
      <h4 className="card-price">₹{price}/-</h4>
      <div className="btn-container">
        <Button variant="filled" color="orange">
          Add to Cart
        </Button>
      </div>
    </StyledProductContents>
  );
};

const Card = (props) => {
  const { children, variant, title, img, subtitle, price } = props;
  return (
    <StyledCard>
      {variant === "category" && (
        <CategoryContents title={title} img={img} subtitle={subtitle}>
          <CardImageContainer img={img} title={title} />
        </CategoryContents>
      )}
      {variant === "product" && (
        <ProductContents title={title} img={img} price={price}>
          <CardImageContainer img={img} title={title} />
        </ProductContents>
      )}
      {children}
    </StyledCard>
  );
};

CardImageContainer.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.node,
};

CategoryContents.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

ProductContents.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.string,
  height: PropTypes.string,
  subtitle: PropTypes.string,
  price: PropTypes.string,
};

Card.defaultProps = {
  children: <div></div>,
  variant: "category",
  title: "Cart Title",
  img: "",
};

export default Card;
