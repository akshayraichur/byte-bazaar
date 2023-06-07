import { Avatar, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";
import Button from "../Components/Button/Button";
import { Modal } from "antd";
import AddressFormInputs from "../Components/AddressFormInputs";

const ProfileStyles = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius.card};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.containerColor};

  .input-container {
    /* width: 40%; */
    margin: 0.5rem 0;
    padding: 0.8rem;
    font-family: "Inter";
    border-radius: ${(props) => props.theme.borderRadius.card};
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.text};
    border: 1px solid ${(props) => props.theme.colors.text};

    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.text};
    }

    :focus {
      outline: 1px solid ${(props) => props.theme.colors.text};
    }

    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  .w-50 {
    width: 50%;
    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  .w-30 {
    width: 30%;
    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  .w-20 {
    width: 20%;
    @media only screen and (width <= 599px) {
      width: 100%;
    }
  }

  .address-management {
    margin: 1rem 0;
    border-radius: ${(props) => props.theme.borderRadius.card};
    border: 1px solid ${(props) => props.theme.colors.containerColor};
    padding: 1rem;
  }

  .address-management button {
    margin-right: 1rem;
  }
`;

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [addAddressBtn, setAddAddressBtn] = useState(false);
  const [addAddress, setAddAddress] = useState({
    address: "",
    city: "",
    houseNo: "",
    name: "",
    pincode: "",
    state: "",
    userId: user?.uid,
  });
  const [addMoreAdd, setAddMoreAdd] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editAddress, setEditAddress] = useState({
    address: "",
    city: "",
    houseNo: "",
    name: "",
    pincode: "",
    state: "",
    userId: user?.uid,
  });
  const [refreshPage, setRefreshPage] = useState(false);

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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAddAddressBtn(false);
      setRefreshPage((p) => !p);
      setAddAddress({
        address: "",
        city: "",
        houseNo: "",
        name: "",
        pincode: "",
        state: "",
        userId: user?.uid,
      });
    }
  };

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchAddressDetails();
  }, [refreshPage]);

  const handleEditAddress = (address) => {
    setEditModal(true);
    setEditAddress({
      address: address.address,
      city: address.city,
      houseNo: address.houseNo,
      name: address.name,
      pincode: address.pincode,
      state: address.state,
      userId: user?.uid,
      id: address.id,
    });
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    try {
      const addressDoc = doc(firebaseDB, "address", editAddress.id);
      await updateDoc(addressDoc, editAddress);
      // succcess
      toast.success("Address Updated");
      setEditModal(false);
      setRefreshPage((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeAddress = async (address) => {
    toast.info(`Removing address`);
    const addressRef = doc(firebaseDB, "address", address.id);
    try {
      await deleteDoc(addressRef);
      toast.success("Address removed");
      setRefreshPage((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <ProfileStyles>
          <AuthError page="profile" />
        </ProfileStyles>
      </Container>
    );
  }

  const AddAddress = (
    <div>
      <br />
      <p>Add address</p>
      <AddressFormInputs
        uploadAddress={uploadAddress}
        addAddress={addAddress}
        setAddAddress={setAddAddress}
        addAddressBtn={addAddressBtn}
      />
    </div>
  );

  const displayAddress = (
    <>
      <div>
        {addressData.map((address) => (
          <div key={address.name} className="address-management">
            <h4>{address.name}</h4>
            <p># {address.houseNo}</p>
            <p>{address.address}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.pincode}</p>
            <div>
              <Button variant="filled" color="green" onClick={() => handleEditAddress(address)}>
                Edit
              </Button>
              <Button variant="outlined" color="orange" onClick={() => removeAddress(address)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => setAddMoreAdd((p) => !p)}>{addMoreAdd ? "Close" : "Add Address"}</Button>
      {addMoreAdd ? AddAddress : ""}
    </>
  );

  return (
    <>
      <Container maxWidth="xl">
        <ProfileStyles>
          <div className="profile-container">
            <Avatar sx={{ bgcolor: "#4f46e5", width: 100, height: 100 }} style={{ fontSize: "2.2rem" }}>
              {user.name?.charAt(0)}
            </Avatar>

            <br />
            <h2>Hi, {user.name}</h2>
            <p>Email: {user?.email}</p>
            <p>Hope you are having a great day so far!</p>

            <br />

            <h3>Address Management</h3>
            <div>{addressData.length === 0 ? AddAddress : displayAddress}</div>

            <div>
              <Modal open={editModal} centered onCancel={() => setEditModal(false)} footer={null}>
                <h2>Edit Address</h2>
                <AddressFormInputs
                  addAddress={editAddress}
                  setAddAddress={setEditAddress}
                  addAddressBtn={addAddressBtn}
                  uploadAddress={updateAddress}
                />
              </Modal>
            </div>
          </div>
        </ProfileStyles>
      </Container>
    </>
  );
};

export default Profile;
