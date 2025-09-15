import { Flip, toast, ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div className="text-pink-600">
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
      <button type="button" onClick={() => toast.success("Yayyy")}>
        Click for toast
      </button>
    </div>
  );
};

export default App;
