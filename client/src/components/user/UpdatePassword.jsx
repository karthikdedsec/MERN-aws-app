import { useEffect, useState } from "react";
import UserLayout from "../UserLayout";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("password updated");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passData = {
      oldPassword,
      password,
    };
    updatePassword(passData);
  };

  return (
    <UserLayout>
      <div className="container mx-auto xl:px-24 px-4 bg-white shadow-lg">
        <div className="mx-auto">
          <h2 className="text-center text-2xl font-bold text-[#151515] py-6">
            Update Password
          </h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-4 mb-20">
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">
                Password
              </span>
              <input
                type="password"
                placeholder="Type Here"
                className="border border-gray-200 p-3 text-sm rounded-md"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">
                New Password
              </span>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="border border-gray-200 p-3 text-sm rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="font-Poppins font-medium p-3 bg-[#39DB4A] text-white text-center mt-8 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "Update"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};
export default UpdatePassword;
