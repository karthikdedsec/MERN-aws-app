import { useSelector } from "react-redux";
import UserLayout from "../UserLayout";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Profile Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const handleUpdateHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    updateUser(userData);
  };

  return (
    <UserLayout>
      <div className=" container mx-auto xl:px-24 px-4 bg-white shadow-lg">
        <div className="">
          <h2 className="text-center text-2xl font-bold text-[#151515] py-6">
            Update Profile
          </h2>
          <form
            onSubmit={handleUpdateHandler}
            className="flex flex-col gap-4 mb-20"
          >
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">Name</span>
              <input
                type="text"
                placeholder="Type Here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 p-3 text-sm rounded-md"
              />
            </label>
            <label className="flex flex-col gap-4">
              <span className="text-[#444] text-base font-semibold">Email</span>
              <input
                type="email"
                placeholder="Enter Your Password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 p-3 text-sm rounded-md"
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
export default UpdateProfile;
