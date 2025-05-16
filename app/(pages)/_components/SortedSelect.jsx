"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideArrowDownWideNarrow } from "lucide-react";

const SortedSelect = () => {
  return (
    <>
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
              <button onClick={() => ByPrice()}>By Price</button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button onClick={() => ByBest()}>Best Seller</button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button onClick={() => TopRated()}>Top Rated</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default SortedSelect;
