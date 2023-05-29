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
  removeProduct,
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
        <Button color="orange" variant="outlined" onClick={removeProduct}>
          Remove
        </Button>
      </>
    )}

    {page === "wishlist" && (
      <>
        <Button variant="filled" color="green" onClick={handleCartUpdate} isLoading={addToCartBtnLoading}>
          Add to cart
        </Button>
        <Button color="orange" variant="outlined" onClick={removeProduct}>
          Remove
        </Button>
      </>
    )}
  </>
);

const CardContents = ({
  id,
  page,
  title,
  details,
  quantity,
  price,
  rating,
  handleIncrementProduct,
  handleDecrementProduct,
}) => {
  return (
    <>
      {page === "cart" && (
        <div className="details-container">
          <div className="details">
            <NavLink to={`/details/${id}`} className="navlink w-100">
              <h2>{title}</h2>
            </NavLink>
            <ul className="description">
              {details?.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className="cart-quantity-container">
              <Button
                small={true}
                variant="outlined"
                color="orange"
                disabled={quantity === 1}
                onClick={handleDecrementProduct}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                small={true}
                variant="outlined"
                color="green"
                disabled={quantity === 10}
                onClick={handleIncrementProduct}
              >
                +
              </Button>
            </div>
          </div>
          <div className="pricing-details">
            <p className="price-text">Rs {price.toLocaleString("en-IN")} /-</p>
            <Chip variant="outlined" color="success" label={rating} icon={<StarIcon />} />
          </div>
        </div>
      )}

      {page === "product-listing" && (
        <>
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
                <p className="price-text">Rs {price.toLocaleString("en-IN")} /-</p>
                <Chip variant="outlined" color="success" label={rating} icon={<StarIcon />} />
              </div>
            </div>
          </NavLink>
        </>
      )}

      {page === "wishlist" && (
        <div className="details-container">
          <div className="details">
            <NavLink to={`/details/${id}`} className="navlink w-100">
              <h2>{title}</h2>
            </NavLink>
          </div>
          <div className="pricing-details">
            <p className="price-text">Rs {price.toLocaleString("en-IN")} /-</p>
            <Chip variant="outlined" color="success" label={rating} icon={<StarIcon />} />
          </div>
        </div>
      )}
    </>
  );
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
  removeProduct,
  handleIncrementProduct,
  handleDecrementProduct,
}) => {
  return (
    <ListingCardStyles>
      <div className="img-container">
        <img src={img} alt={title} className="img" />
      </div>

      <div style={{ width: "100%" }}>
        <CardContents
          page={page}
          title={title}
          details={details}
          quantity={quantity}
          price={price}
          rating={rating}
          id={id}
          handleIncrementProduct={handleIncrementProduct}
          handleDecrementProduct={handleDecrementProduct}
        />
        <div className="btn-container">
          <CardCTAButtons
            handleCartUpdate={handleCartUpdate}
            handleWishlistUpdate={handleWishlistUpdate}
            addToCartBtnLoading={addToCartBtnLoading}
            addToWishlistBtbLoading={addToWishlistBtbLoading}
            page={page}
            removeProduct={removeProduct}
          />
        </div>
      </div>
    </ListingCardStyles>
  );
};

CardContents.propTypes = {
  page: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  details: PropTypes.array,
  rating: PropTypes.number.isRequired,
  handleCartUpdate: PropTypes.func,
  handleWishlistUpdate: PropTypes.func,
  addToCartBtnLoading: PropTypes.bool,
  addToWishlistBtbLoading: PropTypes.bool,
  handleRemoveItem: PropTypes.func,
  quantity: PropTypes.number,
  id: PropTypes.string,
  handleIncrementProduct: PropTypes.func,
  handleDecrementProduct: PropTypes.func,
};

CardCTAButtons.propTypes = {
  page: PropTypes.string,
  handleCartUpdate: PropTypes.func,
  addToCartBtnLoading: PropTypes.bool,
  handleWishlistUpdate: PropTypes.func,
  addToWishlistBtbLoading: PropTypes.bool,
  removeProduct: PropTypes.func,
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
  removeProduct: PropTypes.func,
  handleIncrementProduct: PropTypes.func,
  handleDecrementProduct: PropTypes.func,
};

ProductListingCard.defaultProps = {
  page: "product-listing",
};

export default ProductListingCard;
