"use client";

import { useContext } from "react";
import { cartContext } from "@/app/_context/CartContext";
import Counter from "./Counter";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";

const CartCard = () => {
  const {
    cartProducts,
    totalCartPrice,
    numOfCartItem,
    removeProductFromCart,
    clearCart,
  } = useContext(cartContext);

  const handleRemoveFromCart = async (productId) => {
    const res = await removeProductFromCart(productId);
    if (res) {
      toast.success("Product removed from cart", { duration: 2000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
  };

  const handleClearCart = async () => {
    const res = await clearCart();
    if (!res) {
      toast.success("Cart cleared", { duration: 2000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold py-3">Shopping Cart</h2>

      {cartProducts && cartProducts.length > 0 ? (
        <>
          {/* Header Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="py-2">
                Items: <b>{numOfCartItem}</b>
              </p>
              <p>
                Total: <b>{totalCartPrice} $</b>
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/payment">
                <Button>Checkout</Button>
              </Link>
              <Button variant="destructive" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6 mt-6">
            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl shadow-md border p-4 flex flex-col md:flex-row gap-4"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-36 h-36 object-cover rounded-xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.product.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.product.category.name}
                  </p>
                  <p className="text-sm">
                    Unit Price: <b>{item.price} $</b>
                  </p>
                  <p className="text-sm">
                    Quantity: <b>{item.count}</b>
                  </p>
                  <p className="text-sm">
                    Subtotal: <b>{item.price * item.count} $</b>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between md:flex-col gap-2">
                  <Counter item={item} />
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveFromCart(item.product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Final Checkout Button */}
          <div className="mt-6">
            <Link href="/payment">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default CartCard;
