import Product from "@/app/_components/Product";
import Api from "@/app/_utils/Api";



export async function generateStaticParams() {
  const categories = await Api.getAllCategories();
  return categories.map((category) => ({
    id: category._id,
  }));
}


const Categories = async ({ params }) => {
  const category = await Api.getSpecificCategory(params.id);
  const subCategories = await Api.getSubCategoriesOnCategory(params.id);
  const products = await Api.getProducts();
  const productsByCategory = products.filter(
    (item) => item.category.name === category.name
  );


  return (
    <>
      <div className="container">
        <div className="border border-black p-3 rounded-2xl grid grid-cols-12 items-center">
          <h2 className="col-span-2">{category.name}</h2>


          <ul className="flex gap-3 col-span-10">
              {subCategories.map((item) => (
                <li key={item._id} className="px-3">{item.name}</li>
              ))}
          </ul>


        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border border-black p-3 rounded-2xl my-3">
          {productsByCategory.length > 0 ? (
            productsByCategory.map((item) => (
              <Product key={item._id} product={item} />
            ))
          ) : (
            <p>no products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
