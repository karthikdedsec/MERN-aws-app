export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = itemsPrice > 50 ? 0 : 1.99;
  const taxAmount = Number((0.08 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + deliveryFee + taxAmount).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    deliveryFee,
    taxAmount,
    totalPrice,
  };
};
