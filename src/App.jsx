import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";
import RouteDetails from "./Utils/Routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  return (
    <>
      <Navbar />
      <RouteDetails />
      <ToastContainer theme="dark" autoClose={2500} />
    </>
  );
}

export default App;
