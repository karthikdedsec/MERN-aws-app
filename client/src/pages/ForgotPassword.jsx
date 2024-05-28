import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [forgotPassword, { isLoading, error, data }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (data) {
      toast.success(data?.message);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    forgotPassword(data);
  };

  return (
    <div className="min-h-screen ">
      {/* menu banner */}
      <div className="lg:max-w-screen-md md:max-w-lg max-w-lg container mx-auto xl:px-24 px-4">
        <div className="mx-auto pt-32">
          <h2 className="text-center text-2xl font-bold text-[#151515] py-6">
            Forgot Password?
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4 mb-20">
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="border border-gray-200 p-3 text-sm rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="font-Poppins font-medium p-3 bg-[#39DB4A] text-white text-center mt-5 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "sending mail" : "send mail"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
