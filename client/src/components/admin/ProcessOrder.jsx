import { Link, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const params = useParams();

  const { data } = useOrderDetailsQuery(params.id);

  const [updateOrder, { isLoading, error, isSuccess }] =
    useUpdateOrderMutation();

  useEffect(() => {
    if (data?.order?.orderStatus) {
      setStatus(data?.order?.orderStatus);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("order updated");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const orderData = { status };

    updateOrder({ id, body: orderData });
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-around">
        <div className="w-full lg:w-8/12 order-details pr-7">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table-auto w-full">
            <tbody className="">
              <tr className="bg-slate-100">
                <th className="font-semibold border-2 text-left" scope="row">
                  ID
                </th>
                <td className="text-right border-2">{data?.order?._id}</td>
              </tr>
              <tr>
                <th className="font-semibold text-left border-2" scope="row">
                  Status
                </th>
                <td className="text-right border-2 text-green-500">
                  <b>{data?.order?.orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table-auto w-full">
            <tbody>
              <tr className="bg-slate-100">
                <th className="font-semibold text-left border-2" scope="row">
                  Name
                </th>
                <td className="text-right border-2">
                  {data?.order?.user?.name}
                </td>
              </tr>
              <tr>
                <th className="font-semibold border-2 text-left" scope="row">
                  Phone No
                </th>
                <td className="text-right border-2">
                  {data?.order?.deliveryInfo?.phoneNo}
                </td>
              </tr>
              <tr className="bg-slate-100">
                <th className="font-semibold text-left border-2" scope="row">
                  Address
                </th>
                <td className="text-right border-2">
                  {data?.order?.deliveryInfo?.address},
                  {data?.order?.deliveryInfo?.city},
                  {data?.order?.deliveryInfo?.zipCode},
                  {data?.order?.deliveryInfo?.country},
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table-auto w-full">
            <tbody>
              <tr className="bg-slate-100">
                <th className="font-semibold border-2 text-left" scope="row">
                  Status
                </th>
                <td className="text-right border-2 text-green-500">
                  <b>{data?.order?.paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th className="font-semibold border-2 text-left" scope="row">
                  Method
                </th>
                <td className="text-right border-2">
                  {data?.order?.paymentMethod}
                </td>
              </tr>
              <tr className="bg-slate-100">
                <th className="font-semibold border-2 text-left" scope="row">
                  Stripe ID
                </th>
                <td className="text-right border-2">
                  {data?.order?.paymentInfo?.id || "Nill"}
                </td>
              </tr>
              <tr>
                <th className="font-semibold border-2 text-left" scope="row">
                  Amount
                </th>
                <td className="text-right border-2">
                  ${data?.order?.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          {data?.order?.orderItems?.map((item) => (
            <>
              <hr className="my-1" />
              <div className="cart-item my-5">
                <div className="flex flex-wrap items-center">
                  <div className="w-1/2 lg:w-1/6">
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 lg:h-20 w-full"
                    />
                  </div>
                  <div className="w-1/2 lg:w-2/6">
                    <a href="" className="text-left">
                      {item.name}
                    </a>
                  </div>
                  <div className="w-1/2 lg:w-1/6 mt-4 lg:mt-0 text-right">
                    <p>${item.price}</p>
                  </div>
                  <div className="w-1/2 lg:w-2/6 mt-4 lg:mt-0 text-right">
                    <p>{item.quantity} Piece(s)</p>
                  </div>
                </div>
              </div>
            </>
          ))}

          <hr className="my-1" />
        </div>

        <div className="w-full lg:w-4/12 mt-5 lg:mt-0">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select w-full"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            onClick={() => updateOrderHandler(data?.order?._id)}
            className="bg-green-700 text-white font-bold py-2 px-4 w-full"
          >
            Update Status
          </button>

          <h4 className="mt-5 mb-3">Order Invoice</h4>
          <Link
            to={`/invoice/order/${data?.order?._id}`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full text-left"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProcessOrder;
