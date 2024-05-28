import { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import NewReview from "../../components/reviews/NewReview";
import ListReviews from "../../components/reviews/ListReviews";
import NotFound from "../../components/NotFound";

const MenuItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params.id
  );
  const product = data?.product;

  // console.log(product);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (product?.image?.length > 0) {
      setActiveImg(product?.image[0]?.url);
    } else {
      setActiveImg("/images/default_product.png");
    }
  }, [product]);
  // console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product?.stock) {
      return;
    } else {
      const qty = count.valueAsNumber + 1;
      setQuantity(qty);
    }
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) {
      return;
    } else {
      const qty = count.valueAsNumber - 1;
      setQuantity(qty);
    }
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.image[0]?.url,
      stock: product?.stock,
      quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success("Item added to cart");
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen ">
      {/* menu banner */}
      <div className="max-w-screen-xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className=" mx-auto pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:flex flex-col lg:flex-row-reverse gap-6 md:items-center">
              <div className="mx-auto">
                <img
                  className=" md:max-w-lg mx-auto max-w-72 max-h-72"
                  src={activeImg}
                  alt="Product Image"
                />
              </div>
              <div className="flex flex-row lg:flex-col mt-5">
                {product?.image?.map((img) => (
                  <div key={img?._id} className="col-2 ms-4 mt-2">
                    <a role="button">
                      <img
                        className={`block border rounded p-3 cursor-pointer ${
                          img?.url === activeImg ? "border-warning" : ""
                        }`}
                        height="100"
                        width="100"
                        src={img?.url}
                        alt={img?.url}
                        onClick={() => setActiveImg(img?.url)}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:flex md:flex-col md:justify-center">
              <h2 className="text-3xl font-semibold mb-4">{product?.name}</h2>
              <p className="text-gray-600" id="product_id">
                Product # {product?._id}
              </p>
              <hr className="my-4" />
              <div className="flex items-center mb-4">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="1px"
                />
                <span
                  id="no-of-reviews"
                  className="pt-1 ps-2 text-[#807E7E] text-sm"
                >
                  ({product?.numOfReviews}{" "}
                  {product?.numOfReviews > 1 ? "Reviews" : "review"})
                </span>
              </div>
              <p className="text-lg font-semibold mb-2" id="product_price">
                ${product?.price}
              </p>
              <div className="flex gap-2 mb-4">
                <span
                  className="btn btn-danger rounded-full w-12 h-12 minus"
                  onClick={decreaseQty}
                >
                  -
                </span>
                <input
                  type="number"
                  className="form-input count w-10 text-center"
                  value={quantity}
                  readOnly
                />
                <span
                  className="btn text-white bg-green-500 rounded-full w-12 h-12 plus"
                  onClick={increaseQty}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="bg-[#39DB4A] font-Poppins font-medium text-white px-6 py-3 rounded-full mb-4 hover:cursor-pointer shadow-lg"
                disabled={product?.stock === 0}
                onClick={setItemToCart}
              >
                Add to Cart
              </button>
              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={`${
                    product?.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product?.stock > 0 ? "In Stock" : "Out Of Stock"}
                </span>
              </p>
              <hr className="my-4" />
              <h3 className="text-xl font-semibold mb-2">Recipe:</h3>
              <p className="text-[#555] text-sm font-semibold leading-relaxed mb-4">
                {product?.recipe}
              </p>
              {/* <p id="product_seller" className="mb-4">
                Sold by: <strong>Tech</strong>
              </p> */}
              {isAuthenticated ? (
                <NewReview productId={params.id} />
              ) : (
                <div className="alert alert-danger" role="alert">
                  Login to post your review.
                </div>
              )}
            </div>
          </div>
        </div>
        {product?.reviews?.length > 0 && (
          <ListReviews reviews={product?.reviews} />
        )}
      </div>
    </div>
  );
};
export default MenuItem;
