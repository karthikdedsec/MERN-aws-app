import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineFileImage } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Table } from "antd";
import { Link } from "react-router-dom";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/api/productsApi";
import AdminLayout from "../AdminLayout";

const ListProducts = () => {
  const { isLoading, error, data } = useGetProductsQuery();

  const [deleteProduct, { isLoading: loading, error: deleteError, isSuccess }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("product deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteProducts = (id) => {
    deleteProduct(id);
  };

  const dataSource =
    data?.products?.map((product) => ({
      key: product?._id,
      id: product?._id,
      name: `${product?.name}`,
      stock: product?.stock,
      actions: (
        <div className="flex gap-2">
          <Link to={`/admin/product/${product?._id}`} className="btn">
            <BiPencil />
          </Link>
          <Link
            to={`/admin/product/${product?._id}/upload_images`}
            className="btn btn-success"
          >
            <AiOutlineFileImage />
          </Link>
          <button
            className="btn btn-outline"
            onClick={() => deleteProducts(product?._id)}
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
        {data?.products?.length} Products
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

export default ListProducts;
