import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  useGetSpecificAdminUserQuery,
  useUpdateAdminUserMutation,
} from "../../redux/api/userApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const params = useParams();

  const { data } = useGetSpecificAdminUserQuery(params.id);

  const [updateAdminUser, { isLoading, error, isSuccess }] =
    useUpdateAdminUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("user updated");
    }
  }, [error, isSuccess]);

  const updateUserHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateAdminUser({ id: params.id, body: userData });
  };

  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div className="w-full lg:w-8/12">
          <form onSubmit={updateUserHandler} className="shadow-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>

            <div className="mb-4">
              <label
                htmlFor="name_field"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="name"
                id="name_field"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_field"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="role_field"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role_field"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-bGreen btn text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
export default UpdateUser;
