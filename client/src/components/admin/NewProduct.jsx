import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";

import { useCreateProductMutation } from "../../redux/api/productsApi";
import AdminLayout from "../AdminLayout";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const NewProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    recipe: "",
    price: "",
    stock: "",
    category: "",
  });

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess]);

  const { name, recipe, price, stock, category } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div className="w-full  mt-5">
          <form
            onSubmit={submitHandler}
            className="shadow-lg rounded bg-white p-6"
          >
            <h2 className="text-2xl mb-4">New Product</h2>
            <div className="mb-4">
              <label
                htmlFor="name_field"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="mt-1 block w-full outline-none rounded-md border-gray-300 border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description_field"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe
              </label>
              <textarea
                className="mt-1 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id="description_field"
                rows="8"
                name="recipe"
                value={recipe}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row mb-4">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  htmlFor="price_field"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="number"
                  id="price_field"
                  className="mt-1 block border-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-4 md:ml-2 md:mb-0">
                <label
                  htmlFor="stock_field"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Stock{" "}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="mt-1 block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-4">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  htmlFor="category_field"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Category{" "}
                </label>
                <select
                  className="mt-1 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 md:ml-2 md:mb-0">
                <label
                  htmlFor="seller_field"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Seller Name{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="mt-1 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="seller"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn bg-bGreen text-white py-2 rounded-md "
              disabled={isLoading}
            >
              {isLoading ? "CREATING" : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
export default NewProduct;
