import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";
import RouteDetails from "./Utils/Routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <RouteDetails></RouteDetails>
      <ToastContainer theme="dark" autoClose={2500} />
    </>
  );
}

export default App;
