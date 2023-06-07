import PropTypes from "prop-types";
import Button from "./Button/Button";

const AddressFormInputs = ({ uploadAddress, setAddAddress, addAddress, addAddressBtn }) => {
  return (
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
  );
};

AddressFormInputs.propTypes = {
  uploadAddress: PropTypes.func,
  setAddAddress: PropTypes.func,
  addAddress: PropTypes.object,
  addAddressBtn: PropTypes.bool,
};

export default AddressFormInputs;
