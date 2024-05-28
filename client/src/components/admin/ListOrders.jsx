import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineFileImage } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Table } from "antd";
import { Link } from "react-router-dom";

import AdminLayout from "../AdminLayout";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";

const ListOrders = () => {
  const { isLoading, error, data } = useGetAdminOrdersQuery();

  const [deleteOrder, { isLoading: loading, error: deleteError, isSuccess }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("order deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  const dataSource =
    data?.orders?.map((order) => ({
      key: order?._id,
      id: order?._id,
      paymentStatus: `${order?.paymentInfo?.status}`,
      orderStatus: order?.orderStatus,
      actions: (
        <div className="flex gap-2">
          <Link to={`/admin/orders/${order?._id}`} className="btn">
            <BiPencil />
          </Link>

          <button
            className="btn btn-outline"
            onClick={() => deleteOrderHandler(order?._id)}
            disabled={loading}
          >
            <BiTrashAlt />
          </button>
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
      title: "payment status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "order status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      sorter: (a, b) => a.stock.localeCompare(b.stock),
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
    <AdminLayout>
      <h1 className="mt-20 text-3xl font-bold">
        {data?.orders?.length} Orders
      </h1>
      <div className="table-responsive overflow-x-auto">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={{ pageSize: 6 }}
        />
      </div>
    </AdminLayout>
  );
};

export default ListOrders;
