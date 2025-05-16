"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideArrowDownWideNarrow } from "lucide-react";
import Product from "@/app/_components/Product";

const ProductsContent = ({ byPrice, byRating, byBestSelling, products }) => {
  const [sortedByPrice, setSortedByPrice] = useState(true);
  const [sortedByRating, setSortedByRating] = useState(false);
  const [sortedByBestSelling, setSortedByBestSelling] = useState(false);
  const [sortedByAll, setSortedByAll] = useState(false);

  console.log('byPrice', byPrice);

  const sortByPrice = () => {
    setSortedByPrice(true);
    setSortedByRating(false);
    setSortedByBestSelling(false);
    setSortedByAll(false);
  };

  const byBest = () => {
    setSortedByPrice(false);
    setSortedByRating(false);
    setSortedByBestSelling(true);
    setSortedByAll(false);
    // console.log(byBestSelling);
  };

  const topRated = () => {
    setSortedByPrice(false);
    setSortedByRating(true);
    setSortedByBestSelling(false);
    setSortedByAll(false);
  };

  const byAll = () => {
    setSortedByPrice(false);
    setSortedByRating(false);
    setSortedByBestSelling(false);
    setSortedByAll(true);
  };

  return (
    <>
      <div>
        <div className="mt-9">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="flex items-center gap-2">
                Sort By <LucideArrowDownWideNarrow />{" "}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button onClick={() => byAll()}>All</button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button onClick={() => sortByPrice()}>By Price</button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button onClick={() => byBest()}>Best Seller</button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button onClick={() => topRated()}>Top Rated</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border border-black p-3 rounded-2xl my-3">
          {sortedByPrice &&
            byRating?.length > 0 &&
            byPrice.map((item) => <Product key={item._id} product={item} />)}
        </div>
      </div>
    </>
  );
};

export default ProductsContent;
