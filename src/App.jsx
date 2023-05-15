import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";
import RouteDetails from "./Utils/Routes";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <RouteDetails />
      <Footer />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
