"use client";

import { useContext, useState } from "react";
import { cartContext } from "@/app/_context/CartContext";
import Product from "@/app/_components/Product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideArrowDownWideNarrow } from "lucide-react";

const AllOrderContent = () => {
  const { ordersProduct } = useContext(cartContext);
  const [filterMode, setFilterMode] = useState("all");

  const filteredOrders = ordersProduct?.filter((item) => {
    if (filterMode === "all") return true;
    return item.paymentMethodType === filterMode;
  });

  const renderOrder = (item) => (
    <Accordion key={item._id} type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="text-gray-700 dark:text-gray-300 shadow-xl p-4 rounded-lg w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Order Info */}
            <div>
              <h2 className="font-bold text-base text-black dark:text-white mb-2">
                Order Info
              </h2>
              <p>
                Order Count: <b>{item.cartItems?.length}</b>
              </p>
              <p>
                Date: <b>{new Date(item.createdAt).toLocaleString()}</b>
              </p>
              <p>
                Delivered: <b>{item.isDelivered ? "Yes" : "No"}</b>
              </p>
              <p>
                Paid: <b>{item.isPaid ? "Yes" : "No"}</b>
              </p>
              <p>
                Payment: <b>{item.paymentMethodType}</b>
              </p>
              <p>
                Total: <b>{item.totalOrderPrice} $</b>
              </p>
              <p>
                Shipping: <b>{item.shippingPrice} $</b>
              </p>
              <p>
                Tax: <b>{item.taxPrice} $</b>
              </p>
            </div>

            {/* User Info */}
            <div>
              <h2 className="font-bold text-base text-black dark:text-white mb-2">
                User Info
              </h2>
              <p>
                Name: <b>{item.user.name}</b>
              </p>
              <p>
                Email: <b>{item.user.email}</b>
              </p>
              <p>
                Phone: <b>{item.user.phone}</b>
              </p>
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="font-bold text-base text-black dark:text-white mb-2">
                Shipping Info
              </h2>
              <p>
                Details: <b>{item.shippingAddress.details}</b>
              </p>
              <p>
                City: <b>{item.shippingAddress.city}</b>
              </p>
              <p>
                Phone: <b>{item.shippingAddress.phone}</b>
              </p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {item.cartItems?.map((cartItem) => (
              <Product key={cartItem._id} product={cartItem.product} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="mt-8">
      {/* Dropdown Filter */}
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium flex items-center gap-2">
            Filter by Payment <LucideArrowDownWideNarrow size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterMode("card")}>
              Card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMode("cash")}>
              Cash
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMode("all")}>
              All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders */}
      {filteredOrders?.length > 0 ? (
        filteredOrders.map((item) => renderOrder(item))
      ) : (
        <p className="text-center text-gray-500 mt-10">No orders available.</p>
      )}
    </div>
  );
};

export default AllOrderContent;
