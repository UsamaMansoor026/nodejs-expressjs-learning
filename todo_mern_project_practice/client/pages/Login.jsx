import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
        { withCredentials: true }
      );

      if (!response.data.success) {
        return toast.error(response.data.message);
      }

      /* Fetching current user */
      const currentUser = await axios.get("http://localhost:3000/auth/user", {
        withCredentials: true,
      });

      if (currentUser.data.success) {
        setUser(currentUser.data.user);
      }
      toast.success("User Login successfully");

      navigate("/home");
    } catch (err) {
      console.log("Error occured: ", err);
    } finally {
      setFormData({
        userName: "",
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    }
  }, [user]);

  return (
    <section className="px-3 bg-stone-500 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full border border-stone-100 p-6 rounded shadow-2xs shadow-stone-50"
      >
        <h2 className="text-center text-2xl mb-3 font-semibold">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-stone-200">
          Login to your account
        </p>
        <hr className="border-none h-[1px] bg-stone-100 my-4 max-w-full md:max-w-[60%] mx-auto" />

        {/* Input fields */}
        {/* Email */}
        <div className="flex flex-col space-y-1 mb-3">
          <label htmlFor="email" className="text-sm">
            Your Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleOnChange}
            placeholder="example@gmail.com"
            className="border border-stone-100 outline-none py-2.5 px-3 rounded-md"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1 mb-3">
          <label htmlFor="password" className="text-sm">
            Your Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter your account password"
            className="border border-stone-100 outline-none py-2.5 px-3 rounded-md"
          />
        </div>

        {/* Submit button */}
        <div className="mb-3">
          <input
            type="submit"
            value="Login"
            className="border border-stone-500 bg-stone-500 outline-none py-2.5 px-3 rounded-md w-full text-lg text-white font-semibold duration-300 hover:bg-stone-600 cursor-pointer"
          />
        </div>

        {/* Navigate to Register Page */}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-white underline">
            Register now
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
