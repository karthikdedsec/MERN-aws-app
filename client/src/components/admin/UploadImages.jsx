import { AiFillCloseCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import AdminLayout from "../AdminLayout";
import { useEffect, useRef, useState } from "react";
import {
  useDeleteProductImagesMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const params = useParams();

  const { data } = useGetProductDetailsQuery(params.id);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImages,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImagesMutation();

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.image);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("images uploaded");
    }
  }, [data, error, isSuccess, deleteError]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]); // Corrected typo here
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != image);

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImages({ id: params?.id, body: { imgId } });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row mt-5 lg:mt-0">
        <div className="w-full lg:w-8/12 mx-auto lg:mx-0 lg:ml-auto lg:mr-auto lg:mt-0 mt-5">
          <form
            className="shadow rounded bg-white p-6"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4 text-2xl font-bold">Upload Product Images</h2>

            <div className="mb-6">
              <label htmlFor="customFile" className="block mb-2 font-semibold">
                Choose Images
              </label>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-yellow-500 font-semibold">New Images:</p>
                  <div className="flex flex-wrap mt-4 gap-5">
                    {imagesPreview?.map((img, i) => (
                      <div key={i} className="w-full md:w-1/4 mt-2">
                        <div className="bg-white rounded-lg shadow-md">
                          <img
                            src={img}
                            alt="Card"
                            className="w-full h-32 object-cover"
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="block w-full text-white bg-red-500 border border-red-500 rounded-b-none py-1 px-2 text-center"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <AiFillCloseCircle />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {/* End New Images */}

              {/* Uploaded Images */}
              <div className="uploaded-images my-4">
                <p className="text-green-500 font-semibold">
                  Product Uploaded Images:
                </p>
                <div className="flex flex-wrap gap-5 mt-1">
                  {uploadedImages?.map((img, i) => (
                    <div key={i} className="w-full md:w-1/4 mt-2">
                      <div className="bg-white rounded-lg shadow-md">
                        <img
                          src={img?.url}
                          alt="Card"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          className="block w-full text-white bg-red-500 border border-red-500 rounded-b-none py-1 px-2 text-center"
                          disabled={isLoading || isDeleteLoading}
                          onClick={() => deleteImage(img.public_id)}
                          type="button"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* End Uploaded Image 1 */}
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="bg-bGreen btn text-white font-bold py-2 px-4 rounded w-full"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "uploading" : "upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
export default UploadImages;
