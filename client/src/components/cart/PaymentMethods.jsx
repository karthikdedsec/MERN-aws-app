import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const { deliveryInfo, cartItems } = useSelector((state) => state.cart);
  const { itemsPrice, deliveryFee, taxAmount, totalPrice } =
    calculateOrderCost(cartItems);

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkOutData, isLoading: stripeLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkOutData) {
      window.location.href = checkOutData?.url;
    }
  }, [checkOutData]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("order placed");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (method === "COD") {
      //create COD order
      const orderData = {
        deliveryInfo,
        orderItems: cartItems,
        itemsPrice,
        deliveryFee,
        taxAmount,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }
    if (method === "Card") {
      //stripe checkout
      const orderData = {
        deliveryInfo,
        orderItems: cartItems,
        itemsPrice,
        deliveryFee,
        taxAmount,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="flex justify-center items-center">
          <div className="row wrapper my-64 w-full md:w-1/2">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg p-8 rounded bg-body"
                onSubmit={submitHandler}
              >
                <h2 className="mb-4">Select Payment Method</h2>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="codradio"
                    value="COD"
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="codradio">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="cardradio"
                    value="Card"
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cardradio">
                    Card - VISA, MasterCard
                  </label>
                </div>

                <button
                  id="shipping_btn"
                  type="submit"
                  className="btn py-2 w-full mt-4 bg-bGreen text-white"
                  disabled={isLoading || stripeLoading}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentMethods;
