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
  useDeleteAdminUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi";

const ListUsers = () => {
  const { isLoading, error, data } = useGetAdminUsersQuery();

  const users = data?.users || {};

  const [
    deleteAdminUser,
    { isLoading: loading, error: deleteError, isSuccess },
  ] = useDeleteAdminUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("user deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteAdminUser(id);
  };

  const dataSource =
    data?.users?.map((user) => ({
      key: user?._id,
      id: user?._id,
      name: `${user?.name}`,
      email: user?.email,
      role: user?.role,
      actions: (
        <div className="flex gap-2">
          <Link to={`/admin/users/${user?._id}`} className="btn">
            <BiPencil />
          </Link>

          <button
            className="btn btn-outline"
            disabled={loading}
            onClick={() => deleteUserHandler(user?._id)}
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.stock.localeCompare(b.stock),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      <h1 className="mt-20 text-3xl font-bold">{users?.length} Users</h1>
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

export default ListUsers;
