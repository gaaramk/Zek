import Product from "@/app/_components/Product";
import Api from "@/app/_utils/Api";
import axios from "axios";
import { Star } from "lucide-react";
import ButtonAdd from "../../_components/ButtonAdd";
import SwiperGallery from "../../_components/Swiper";

const ProductDetails = async ({ params }) => {
  const allProducts = await Api.getProducts();

  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
  );

  //   the same product
  const sameProduct = allProducts.filter(
    (product) => product.category._id === res.data.data.category._id
  );

  return (
    <>
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Product Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Gallery */}
          <div className="col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <SwiperGallery images={res.data.data.images} />
            </div>
          </div>

          {/* Details */}
          <div className="col-span-2 space-y-4">
            {/* Title & Category */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {res.data.data.title}
              </h1>
              <span className="inline-block mt-1 text-sm text-gray-500 dark:text-gray-400">
                {res.data.data.category.name}
              </span>
            </div>

            {/* Description */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {res.data.data.description}
              </p>
            </div>

            {/* Price & Rating & Stock */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  ${res.data.data.price.toFixed(2)}
                </div>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(res.data.data.ratingsAverage)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {res.data.data.ratingsAverage.toFixed(1)} (
                    {res.data.data.ratingsQuantity})
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {res.data.data.quantity}{" "}
                  {res.data.data.quantity > 1 ? "items" : "item"} in stock
                </div>
              </div>

              {/* Add to Cart */}
              <div>
                <ButtonAdd
                  id={res.data.data._id}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white"
                >
                  Add to Cart
                </ButtonAdd>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Similar Products
          </h2>
          {sameProduct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {sameProduct.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No similar products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
