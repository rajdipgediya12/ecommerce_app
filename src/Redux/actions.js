export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: {
    id: product.id,
  },
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});
