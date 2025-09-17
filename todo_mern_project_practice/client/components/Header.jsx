import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log("Response in logout: ", response);

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      toast.success(response.data.message);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error while logging out: ", error);
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-16 py-3  shadow-2xs shadow-stone-50 ">
      <h1 className="text-2xl font-bold">MERN To-Do</h1>

      <nav className="flex items-center gap-3">
        {/* User Info */}
        <div className="flex items-center gap-2 border border-stone-100 p-2 rounded overflow-hidden group">
          <span className="capitalize">
            {user !== null ? user.userName : "John Doe"}
          </span>
        </div>
        <button
          type="button"
          className="bg-stone-500 text-white px-4 py-2 rounded cursor-pointer duration-300 hover:bg-stone-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
