import { useSelector } from "react-redux";
import UserLayout from "../UserLayout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-8 lg:px-32">
        <div className="flex justify-center">
          <img
            className="w-32 h-32 mt-8 rounded-full"
            src={
              user?.avatar
                ? user?.avatar?.url
                : "https://th.bing.com/th/id/OIP.4nSiPjYiNOlvj6KJiw2UTAAAAA?rs=1&pid=ImgDetMain"
            }
            alt="User Avatar"
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">
            Joined on: {user?.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </UserLayout>
  );
};
export default Profile;
