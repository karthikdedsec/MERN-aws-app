import { AiFillLock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const SideMenu = ({ menuItems }) => {
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (url) => {
    setActiveMenuItem(url);
  };

  return (
    <div className="mt-5 pl-4 space-y-8">
      {menuItems.map((item, index) => (
        <>
          <Link
            key={index}
            to={item.url}
            className={`font-semibold  py-2 px-3 border flex items-center border-gray-300 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 ${
              activeMenuItem.includes(item.url) ? "active" : ""
            }`}
            aria-current={activeMenuItem.includes(item.url) ? "true" : "false"}
            onClick={() => handleMenuItemClick(item.url)}
          >
            {item.icon}
            <span className="ml-4 hidden md:inline-block align-middle">
              {item.name}
            </span>
          </Link>
        </>
      ))}
    </div>
  );
};
export default SideMenu;
