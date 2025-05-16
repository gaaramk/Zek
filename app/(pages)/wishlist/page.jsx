import { Heart } from "lucide-react";
import WishlistContent from "../_components/WishLisctContent";

const Wishlist = () => {
  return (
    <div className="container py-6">
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-2xl flex items-center gap-3 mb-6">
        <Heart className="text-red-500" />
        <h2 className="text-xl font-bold">Wishlist Products</h2>
      </div>

      <WishlistContent />
    </div>
  );
};

export default Wishlist;
