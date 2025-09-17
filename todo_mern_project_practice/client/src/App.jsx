import { Route, Routes } from "react-router";
import { Flip, ToastContainer } from "react-toastify";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />

      {/* Routes */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
