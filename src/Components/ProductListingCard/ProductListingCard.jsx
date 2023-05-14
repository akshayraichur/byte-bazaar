import { NavLink } from "react-router-dom";
import { ListingCardStyles } from "./ProductListingCard.styles";
import PropTypes from "prop-types";

const ProductListingCard = ({ title, img, details, id, price }) => {
  console.log(details);
  return (
    <ListingCardStyles>
      <div className="img-container">
        <img src={img} alt={title} className="img" />
      </div>

      <NavLink to={`/details/${id}`} className="navlink w-100">
        <div className="details-container">
          <div className="details">
            <h2>{title}</h2>
            <ul className="description">
              {details?.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="pricing-details">
            <p className="price-text">Rs {price} /-</p>
          </div>
        </div>
      </NavLink>
    </ListingCardStyles>
  );
};

ProductListingCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  details: PropTypes.array,
};

export default ProductListingCard;
