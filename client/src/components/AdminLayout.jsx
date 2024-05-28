import { AiOutlineStar } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsReceipt } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { BiTachometer } from "react-icons/bi";

import SideMenu from "./SideMenu";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <BiTachometer />,
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: <BiPlus />,
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: <RiProductHuntLine />,
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: <BsReceipt />,
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: <BiUser />,
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: <AiOutlineStar />,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="mt-2 mb-2 pt-24 pb-7">
          <h2 className="text-center font-bold">Admin Dashboard</h2>
        </div>
        <div className="mx-auto">
          <div className="flex md:flex-row gap-5">
            <div className="flex md:flex-col">
              <SideMenu menuItems={menuItems} />
            </div>
            <div className="grid grid-cols-1 flex-1 lg:grid-cols-1 user-dashboard">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
