import { FaPrint } from "react-icons/fa";
import { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Table } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const MyOrders = () => {
  const { isLoading, error, data } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  const dataSource =
    data?.order?.map((order) => ({
      key: order?._id,
      id: order?._id,
      amount: `$${order?.totalAmount}`,
      status: order?.paymentInfo?.status?.toUpperCase(),
      orderStatus: order?.orderStatus,
      actions: (
        <div className="flex gap-2">
          <Link to={`/me/order/${order?._id}`} className="btn">
            <AiFillEye />
          </Link>
          <Link to={`/invoice/order/${order?._id}`} className="btn btn-success">
            <FaPrint />
          </Link>
        </div>
      ),
    })) || [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Amount Paid",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.localeCompare(b.amount),
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <h1 className="mt-20 text-3xl font-bold">
          {data?.order?.length} Orders
        </h1>
        <div className="table-responsive overflow-x-auto">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
