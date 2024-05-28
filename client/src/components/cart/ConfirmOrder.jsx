import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";

const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const { deliveryInfo, cartItems } = useSelector((state) => state.cart);

  const { itemsPrice, deliveryFee, taxAmount, totalPrice } =
    calculateOrderCost(cartItems);

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="flex flex-col md:flex-row justify-between mt-16">
          <div className="w-full md:w-8/12 mt-5 order-confirm">
            <h4 className="mb-3 text-2xl font-bold">Delivery Info</h4>
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Phone:</b> {deliveryInfo?.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {deliveryInfo?.address}, {deliveryInfo?.city},{" "}
              {deliveryInfo?.zipCode}, {deliveryInfo?.country}
            </p>

            <hr className="my-4 border-gray-300" />

            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems?.map((item) => (
              <>
                <hr className="my-4 border-gray-300" />

                <div className="cart-item my-1 flex">
                  <div className="w-1/4 md:w-1/6">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="w-3/4 md:w-4/6">
                    <Link to={`/menu/${item?.product}`}>{item?.name}</Link>
                  </div>

                  <div className="w-full md:w-1/4 mt-4 md:mt-0">
                    <p>
                      {item?.quantity} x ${item?.price} ={" "}
                      <b>${(item?.quantity * item?.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />
              </>
            ))}
          </div>

          <div className="w-full md:w-3/12 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr className="my-4 border-gray-300" />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${itemsPrice}</span>
              </p>
              <p>
                DeliveryFee:{" "}
                <span className="order-summary-values">${deliveryFee}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxAmount}</span>
              </p>

              <hr className="my-4 border-gray-300" />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr className="my-4 border-gray-300" />
              <Link
                to="/payment_method"
                id="checkout_btn"
                className="btn bg-bGreen w-full text-white"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmOrder;
