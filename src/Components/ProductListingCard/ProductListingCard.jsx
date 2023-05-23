import { NavLink } from "react-router-dom";
import { ListingCardStyles } from "./ProductListingCard.styles";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const CardCTAButtons = ({
  page,
  handleCartUpdate,
  addToCartBtnLoading,
  handleWishlistUpdate,
  addToWishlistBtbLoading,
  handleRemoveItem,
}) => (
  <>
    {page === "product-listing" && (
      <>
        <Button variant="filled" color="orange" onClick={handleCartUpdate} isLoading={addToCartBtnLoading}>
          Add to cart
        </Button>
        <Button variant="filled" onClick={handleWishlistUpdate} isLoading={addToWishlistBtbLoading}>
          Add to wishlist
        </Button>
      </>
    )}

    {page === "cart" && (
      <>
        <Button variant="filled" onClick={handleWishlistUpdate} isLoading={addToWishlistBtbLoading}>
          Add to wishlist
        </Button>
        <Button color="orange" variant="outlined" onClick={handleRemoveItem}>
          Remove
        </Button>
      </>
    )}

    {page === "wishlist" && (
      <>
        <Button variant="filled" color="orange" onClick={handleCartUpdate} isLoading={addToCartBtnLoading}>
          Add to cart
        </Button>
      </>
    )}
  </>
);

const CardContents = ({ page }) => {
  return <>{page === "cart" && <></>}</>;
};

const ProductListingCard = ({
  title,
  img,
  details,
  id,
  price,
  rating,
  handleCartUpdate,
  handleWishlistUpdate,
  addToCartBtnLoading,
  addToWishlistBtbLoading,
  page,
  quantity,
}) => {
  return (
    <ListingCardStyles>
      <div className="img-container">
        <img src={img} alt={title} className="img" />
      </div>

      <div style={{ width: "100%" }}>
        <NavLink to={`/details/${id}`} className="navlink w-100">
          <div className="details-container">
            <div className="details">
              <h2>{title}</h2>
              <ul className="description">
                {details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {page === "cart" && (
                <div className="cart-quantity-container">
                  <Button small={true} variant="outlined" color="orange" disabled={quantity === 1}>
                    -
                  </Button>
                  <span>{quantity}</span>
                  <Button small={true} variant="outlined" color="green" disabled={quantity === 10}>
                    +
                  </Button>
                </div>
              )}
            </div>
            <div className="pricing-details">
              <p className="price-text">Rs {price.toLocaleString("en-IN")} /-</p>
              <Chip variant="outlined" color="success" label={rating} icon={<StarIcon />} />
            </div>
          </div>
        </NavLink>
        <div className="btn-container">
          <CardCTAButtons
            handleCartUpdate={handleCartUpdate}
            handleWishlistUpdate={handleWishlistUpdate}
            addToCartBtnLoading={addToCartBtnLoading}
            addToWishlistBtbLoading={addToWishlistBtbLoading}
          />
        </div>
      </div>
    </ListingCardStyles>
  );
};

CardContents.propTypes = {
  page: PropTypes.string,
};

CardCTAButtons.propTypes = {
  page: PropTypes.string,
  handleCartUpdate: PropTypes.func,
  addToCartBtnLoading: PropTypes.bool,
  handleWishlistUpdate: PropTypes.func,
  addToWishlistBtbLoading: PropTypes.bool,
  handleRemoveItem: PropTypes.func,
};

ProductListingCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  details: PropTypes.array,
  rating: PropTypes.number.isRequired,
  handleCartUpdate: PropTypes.func,
  handleWishlistUpdate: PropTypes.func,
  addToCartBtnLoading: PropTypes.bool,
  addToWishlistBtbLoading: PropTypes.bool,
  page: PropTypes.string,
  handleRemoveItem: PropTypes.func,
  quantity: PropTypes.number,
};

ProductListingCard.defaultProps = {
  page: "product-listing",
};

export default ProductListingCard;
