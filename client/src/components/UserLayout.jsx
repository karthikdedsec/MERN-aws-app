import { BiUser } from "react-icons/bi";
import SideMenu from "./SideMenu";
import { RxAvatar } from "react-icons/rx";
import { AiFillLock } from "react-icons/ai";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: <BiUser />,
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: <BiUser />,
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: <RxAvatar />,
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: <AiFillLock />,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="mt-2 mb-2 pt-24 pb-7">
          <h2 className="text-center font-bold">User Settings</h2>
        </div>
        <div className="">
          <div className="flex flex-row gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-1">
              <SideMenu menuItems={menuItems} />
            </div>
            <div className="grid flex-1 grid-cols-1 lg:grid-cols-1 user-dashboard">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLayout;
