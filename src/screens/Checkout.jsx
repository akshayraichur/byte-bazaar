import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";
import { UserContext } from "../store/UserContext";
import AuthError from "../Components/AuthError";

const CheckoutStyles = styled.div`
  margin: 1rem 0;

  .address-container {
    margin: 1rem 0;
    display: flex;
    column-gap: 1rem;
    border: 1px solid ${(props) => props.theme.colors.border};
    padding: 1rem;
    cursor: pointer;
    border-radius: ${(props) => props.theme.borderRadius.card};
  }

  .address-container label {
    width: 100%;
    cursor: pointer;
  }

  .cart-price {
    padding: 1rem;
    border-radius: ${(props) => props.theme.borderRadius.card};
    border: 1px solid ${(props) => props.theme.colors.containerColor};
  }

  .price-breakup-container {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Checkout = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const location = useLocation();
  const [addressData, setAddressData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addAddress, setAddAddress] = useState({
    address: "",
    city: "",
    houseNo: "",
    name: "",
    pincode: "",
    state: "",
    userId: user?.uid,
  });
  const [addAddressBtn, setAddAddressBtn] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate();

  const fetchAddressDetails = async () => {
    try {
      const addressRef = collection(firebaseDB, "address");
      const response = await getDocs(addressRef);
      const data = response.docs.map((item) => ({ ...item.data(), id: item.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);

      setAddressData(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location]);

  useEffect(() => {
    fetchAddressDetails();
  }, [refreshState]);

  const uploadAddress = async (e) => {
    e.preventDefault();
    setAddAddressBtn(true);

    const addressRef = collection(firebaseDB, "address");
    try {
      await addDoc(addressRef, {
        address: addAddress.address,
        city: addAddress.city,
        houseNo: addAddress.houseNo,
        name: addAddress.name,
        pincode: addAddress.pincode,
        state: addAddress.state,
        userId: user?.uid,
        userName: user?.name,
      });
      toast.success("Address added successfully");
      setRefreshState((p) => !p);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddAddressBtn(false);
    }
  };

  const handlePlaceOrder = () => {
    // check if address is selected or not.
    if (selectedAddress) {
      toast.success("Order Successfully placed");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      toast.error("Please choose an address to deliver to");
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <CheckoutStyles>
          <AuthError page="checkout" />
        </CheckoutStyles>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <CheckoutStyles>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={9}>
            <h1>Checkout</h1>
            <div>
              {addressData.map((item) => (
                <div key={item.name} className="address-container" onClick={() => setSelectedAddress(item.id)}>
                  <input
                    type="radio"
                    id={item.id}
                    name="address"
                    value={item.id}
                    checked={selectedAddress === item.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <label htmlFor={item.name}>
                    <h2>{item.name}</h2>
                    <p># {item.houseNo}</p>
                    <p>{item.address}</p>
                    <p>{item.city}</p>
                    <p>{item.state}</p>
                    <p>{item.pincode}</p>
                  </label>
                </div>
              ))}

              <div>
                <Button onClick={() => setOpenModal((p) => !p)}>{openModal ? "Close Address" : "Add Address"}</Button>
                {openModal && (
                  <div>
                    <form onSubmit={uploadAddress}>
                      <label htmlFor="name"></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Address Name"
                        className="input-container w-30"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, name: e.target.value }))}
                        value={addAddress.name}
                      />
                      <br />
                      <label htmlFor="house-no"></label>
                      <input
                        type="text"
                        id="house-no"
                        className="input-container w-20"
                        placeholder="Enter House/Plot No"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, houseNo: e.target.value }))}
                        value={addAddress.houseNo}
                      />
                      <br />
                      <label htmlFor="city"></label>
                      <input
                        type="text"
                        id="city"
                        className="input-container w-20"
                        placeholder="Enter City"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, city: e.target.value }))}
                        value={addAddress.city}
                      />

                      <br />
                      <label htmlFor="address"></label>
                      <input
                        type="text"
                        id="address"
                        className="input-container w-50"
                        placeholder="Enter Adress"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, address: e.target.value }))}
                        value={addAddress.address}
                      />

                      <br />
                      <label htmlFor="state"></label>
                      <input
                        type="text"
                        id="state"
                        className="input-container w-20"
                        placeholder="Enter State"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, state: e.target.value }))}
                        value={addAddress.state}
                      />

                      <br />
                      <label htmlFor="pincode"></label>
                      <input
                        type="text"
                        id="pincode"
                        className="input-container w-20"
                        placeholder="Enter Pincode"
                        required
                        onChange={(e) => setAddAddress((p) => ({ ...p, pincode: e.target.value }))}
                        value={addAddress.pincode}
                      />

                      <br />
                      <Button variant="filled" color="green" type="submit" isLoading={addAddressBtn}>
                        Add
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <div className="cart-price">
              <h2>Cart Details</h2>
              <div className="price-breakup-container">
                <p>Price</p>
                <p>₹ {location.state?.totalCartPrice?.toLocaleString("en-IN")}/-</p>
              </div>

              <div className="price-breakup-container">
                <p>Discount</p>
                <p>₹ 0/-</p>
              </div>

              <hr style={{ margin: "1rem 0", border: "1px solid #e0e7ff" }} />
              <div className="price-breakup-container">
                <p>Total</p>
                <p>
                  <b>₹ {location.state?.totalCartPrice?.toLocaleString("en-IN")}/-</b>
                </p>
              </div>

              <input className="input-container" type="text" placeholder="Add coupon" onKeyDown={""} />

              <Button fullWidth={true} variant="filled" color="orange" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </Grid>
        </Grid>
      </CheckoutStyles>
    </Container>
  );
};

export default Checkout;
