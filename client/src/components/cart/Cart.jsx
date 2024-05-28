import { HiTrash } from "react-icons/hi";
import { useSelector } from "react-redux";
import { removeCartItem, setCartItem } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) {
      return;
    } else {
      setItemToCart(item, newQty);
    }
  };

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty < 1) {
      return;
    } else {
      setItemToCart(item, newQty);
    }
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };
    dispatch(setCartItem(cartItem));
  };

  const removeCartHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  // Calculate total price
  // const totalPrice = cartItems?.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    navigate("/shipping");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-screen-xl py-11 flex flex-col md:flex-row justify-between flex-nowrap items-center gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className=" container mx-auto mt-8 flex-1">
          {cartItems?.length !== 0 && (
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          )}
          {cartItems?.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <div>
              {cartItems?.map((item) => (
                <div
                  key={item?.product}
                  className="flex items-center justify-start border-b border-gray-200 py-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item?.name}</p>
                      <p className="text-gray-600">${item?.price}</p>
                    </div>
                    <div className="flex gap-2 ">
                      <span
                        className="btn btn-danger h-12 w-12 rounded-full minus"
                        onClick={() => decreaseQty(item, item.quantity)}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-input count w-8 text-center"
                        value={item?.quantity}
                        readOnly
                      />
                      <span
                        className="btn text-white bg-green-500 h-12 w-12 rounded-full plus"
                        onClick={() => increaseQty(item, item.quantity)}
                      >
                        +
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => removeCartHandler(item?.product)}
                        className="text-red-500 pl-5"
                      >
                        <HiTrash className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems?.length !== 0 && (
          <div className="w-full lg:w-2/4 md:w-1/4">
            <div className="bg-gray-100 p-9 rounded-lg ">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between">
                <span>quantity:</span>
                <span>
                  {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between mt-2"></div>
              <div className="border-t flex flex-col border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Est Total:</span>
                  <span className="font-semibold">
                    $
                    {cartItems
                      ?.reduce(
                        (acc, item) => acc + item?.quantity * item?.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-bGreen p-4 rounded-lg text-white text-center mt-8"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
