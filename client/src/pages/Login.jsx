import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, error, data }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // console.log(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  return (
    <div className="min-h-screen ">
      {/* menu banner */}
      <div className="lg:max-w-screen-md md:max-w-lg max-w-lg container mx-auto xl:px-24 px-4">
        <div className="mx-auto pt-32">
          <h2 className="text-center text-2xl font-bold text-[#151515] py-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-20">
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">Email</span>
              <input
                type="email"
                placeholder="Type Here"
                className="border border-gray-200 p-3 text-sm rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">
                Password
              </span>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="border border-gray-200 p-3 text-sm rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                to="/forgotPassword"
                className="flex justify-end text-sm font-medium text-[#656565]"
              >
                Forgot password?
              </Link>
            </label>
            <button
              type="submit"
              className="font-Poppins font-medium p-3 bg-[#39DB4A] text-white text-center mt-5 rounded-md"
              disabled={isLoading}
            >
              Sign in
            </button>
            <div className="text-center flex items-center justify-center gap-2">
              <p>New Here?</p>
              <Link to="/sign-up" className="font-semibold text-[#656565]">
                Create A New Account
              </Link>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <p className="text-center">Or sign in with</p>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
