import { FaPrint } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import Loader from "../Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params.id);
  const orderDetails = data?.order;

  const { orderItems } = orderDetails || {};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="container mx-auto px-4">
          <div className="row justify-center">
            <div className="col-12 lg:col-9 mt-5 order-details">
              <div className="flex justify-between items-center mb-6">
                <h3 className="mt-5 mb-4">Your Order Details</h3>
                <Link
                  to={`/invoice/order/${orderDetails?._id}`}
                  className="btn btn-success text-white"
                >
                  <FaPrint /> Invoice
                </Link>
              </div>
              <table className="table table-striped table-bordered mb-8">
                <tbody>
                  <tr>
                    <th className="w-1/3">ID</th>
                    <td className="w-2/3">{orderDetails?._id}</td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Status</th>
                    <td
                      className={`w-2/3 ${
                        orderDetails?.orderStatus.includes("Delivered")
                          ? "text-green-500"
                          : "text-red-600"
                      } ${
                        orderDetails?.orderStatus.includes(
                          "Out for Delivery"
                        ) && "text-orange-500"
                      }`}
                    >
                      <b>{orderDetails?.orderStatus}</b>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Date</th>
                    <td className="w-2/3">
                      {new Date(orderDetails?.createdAt).toLocaleString(
                        "en-US"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 mb-4">Delivery Info</h3>
              <table className="table table-striped table-bordered mb-8">
                <tbody>
                  <tr>
                    <th className="w-1/3">Name</th>
                    <td className="w-2/3">{orderDetails?.user?.name}</td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Phone No</th>
                    <td className="w-2/3">
                      {orderDetails?.deliveryInfo?.phoneNo}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Address</th>
                    <td className="w-2/3">
                      {orderDetails?.deliveryInfo?.address},{" "}
                      {orderDetails?.deliveryInfo?.city},{" "}
                      {orderDetails?.deliveryInfo?.zipCode},{" "}
                      {orderDetails?.deliveryInfo?.country}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 mb-4">Payment Info</h3>
              <table className="table table-striped table-bordered mb-8">
                <tbody>
                  <tr>
                    <th className="w-1/3">Status</th>
                    <td
                      className={`w-2/3 ${
                        orderDetails?.paymentInfo?.status === "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <b>{orderDetails?.paymentInfo?.status}</b>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Method</th>
                    <td className="w-2/3">{orderDetails?.paymentMethod}</td>
                  </tr>
                  <tr>
                    <th className="w-1/3">Stripe ID</th>
                    <td className="w-2/3">
                      {orderDetails?.paymentInfo?.id || "Nill"}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/3">
                      {orderDetails?.paymentInfo?.status === "Paid"
                        ? "Amount Paid"
                        : "Amount to be Paid"}
                    </th>
                    <td className="w-2/3">${orderDetails?.totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="mt-5 mb-4">Order Items:</h3>
              {orderDetails?.orderItems?.map((item) => (
                <>
                  <hr />
                  <div className="cart-item my-1">
                    <div className="flex flex-col lg:flex-row my-5">
                      <div className="w-full lg:w-1/4 lg:mr-4">
                        <img
                          src={item.image}
                          alt="Product Name"
                          className="h-16 w-full lg:h-24 lg:w-auto"
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row w-full lg:w-3/4">
                        <div className="lg:w-1/2">
                          <a
                            href="/products/product-id"
                            className="text-blue-600 hover:underline"
                          >
                            {item.name}
                          </a>
                        </div>
                        <div className="lg:w-1/4 mt-2 lg:mt-0">
                          <p>${item.price}</p>
                        </div>
                        <div className="lg:w-1/4 mt-2 lg:mt-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    </div>
                    {/* Repeat the above structure for each order item */}
                  </div>
                </>
              ))}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
