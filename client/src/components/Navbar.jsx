import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogOutQuery } from "../redux/api/authApi";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const { isLoading } = useGetUserQuery();
  const [logOut] = useLazyLogOutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(data);

  //handle scroll functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={`/menu`}>Menu</Link>
      </li>
      <li>
        <Link>Services</Link>
      </li>
      <li>
        <Link>Offers</Link>
      </li>
    </>
  );

  const logoutHandler = () => {
    logOut();
    navigate(0);
  };

  const cartButton = () => {
    navigate("/cart");
  };
  return (
    <header className=" mx-auto fixed top-0 left-0 right-0 transition-all duration-400 ease-in-out z-40">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-400 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* search button */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* cartitems */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-3 items-center  md:flex"
            onClick={cartButton}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <button className="badge badge-sm indicator-item">
                {cartItems?.length}
              </button>
            </div>
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className=" m-1 border-bGreen rounded-full border-2 overflow-hidden w-9 h-9"
              >
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "https://th.bing.com/th/id/OIP.4nSiPjYiNOlvj6KJiw2UTAAAAA?rs=1&pid=ImgDetMain"
                  }
                  alt="avatar"
                  className="object-cover"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <p className="text-sm">@{user?.name}</p>
                {user?.role === "admin" ? (
                  <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <Link to="/me/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/me/profile">Profile</Link>
                </li>
                <li className="text-red-600" onClick={logoutHandler}>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-bGreen text-white rounded-full flex items-center px-6"
            >
              {/* <BiPhoneCall className="text-lg" /> */}
              <BsFillPersonFill className="text-lg" />
              <span className="font-Poppins font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
