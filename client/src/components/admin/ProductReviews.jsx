import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { BiTrashAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Table } from "antd";
import {
  useDeleteProductReviewMutation,
  useLazyGetProductReviewQuery,
} from "../../redux/api/productsApi";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getProductReview, { isLoading, error, data }] =
    useLazyGetProductReviewQuery();

  const [
    deleteProductReview,
    { isLoading: deleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("review deleted");
    }
  }, [error, deleteError, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReview(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteProductReview({ productId, id });
  };

  const dataSource =
    data?.reviews?.map((review) => ({
      key: review?._id,
      id: review?._id,
      rating: `${review?.rating}`,
      comment: review?.comment,
      user: review?.user?.name,
      actions: (
        <div className="flex gap-2">
          <button
            className="btn btn-outline"
            onClick={() => deleteReviewHandler(review?._id)}
            disabled={deleteLoading}
          >
            <BiTrashAlt />
          </button>
        </div>
      ),
    })) || [];

  const columns = [
    {
      title: "Review ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      sorter: (a, b) => a.stock.localeCompare(b.stock),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
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
      <div className="flex justify-center my-5">
        <div className="w-3/4 lg:w-1/2">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label
                htmlFor="productId_field"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{ pageSize: 6 }}
      />
    </AdminLayout>
  );
};
export default ProductReviews;
