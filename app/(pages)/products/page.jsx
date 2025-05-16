import AllProducts from "../_components/AllProducts";

const page = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 p-4 rounded-2xl mb-6 shadow-sm bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            All Products
          </h2>
        </div>

        <AllProducts />
      </div>
    </>
  );
};

export default page;
