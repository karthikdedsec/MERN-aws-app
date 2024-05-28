import { useEffect, useState } from "react";
import UserLayout from "../UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar
      ? user?.avatar?.url
      : "https://th.bing.com/th/id/OIP.4nSiPjYiNOlvj6KJiw2UTAAAAA?rs=1&pid=ImgDetMain"
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Avatar Uploaded");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    console.log(userData);
    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Avatar</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="avatar" className="block mb-2">
              Choose Avatar:
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="w-full border rounded-md py-2 px-3"
              onChange={onChange}
            />
          </div>

          <div className="mb-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-md object-cover"
            />
          </div>

          <button
            type="submit"
            className="bg-bGreen text-white py-2 px-4 rounded-md hover:bg-slate-300"
            disabled={isLoading}
          >
            {isLoading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};
export default UploadAvatar;
