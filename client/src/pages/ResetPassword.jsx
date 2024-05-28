import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/api/userApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  //   console.log(params.token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password updated");
      navigate("/");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      password,
      confirmPassword,
    };

    resetPassword({ token: params?.token, body: data });
  };

  return (
    <div className="min-h-screen ">
      {/* menu banner */}
      <div className="lg:max-w-screen-md md:max-w-lg max-w-lg container mx-auto xl:px-24 px-4">
        <div className="mx-auto pt-32">
          <h2 className="text-center text-2xl font-bold text-[#151515] py-6">
            Reset Password
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4 mb-20">
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">
                New Password
              </span>
              <input
                type="password"
                value={password}
                placeholder="Enter new password"
                className="border border-gray-200 p-3 text-sm rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">
                Confirm Password
              </span>
              <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                className="border border-gray-200 p-3 text-sm rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="font-Poppins font-medium p-3 bg-[#39DB4A] text-white text-center mt-5 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
