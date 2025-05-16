import axios from "axios";
import toast from "react-hot-toast";
// ***************************************************************************

const globalUrl = axios.create({
  baseURL: "https://ecommerce.routemisr.com",
});

// ***************************************************************************

const getAllCategories = () =>
  globalUrl
    .get(`/api/v1/categories`)
    .then((res) => res.data.data)
    .catch((err) => err);

const getSpecificCategory = (id) =>
  globalUrl
    .get(`/api/v1/categories/${id}`)
    .then((res) => res.data.data)
    .catch((err) => err);

const getSubCategoriesOnCategory = (id) =>
  globalUrl
    .get(`/api/v1/categories/${id}/subcategories`)
    .then((res) => res.data.data)
    .catch((err) => err);

// ***************************************************************************

const getBrands = () =>
  globalUrl
    .get(`/api/v1/brands`)
    .then((res) => res.data.data)
    .catch((err) => err);

const getSpecificBrand = (id) =>
  globalUrl
    .get(`/api/v1/brands/${id}`)
    .then((res) => res.data.data)
    .catch((err) => err);

// ***************************************************************************

const getProducts = () =>
  globalUrl
    .get(`/api/v1/products`)
    .then((res) => res.data.data)
    .catch((err) => err);

// ***************************************************************************



// ***************************************************************************
export default {
  getAllCategories,
  getProducts,
  getSpecificCategory,
  getSubCategoriesOnCategory,
  getBrands,
  getSpecificBrand,
  // getProduct,

  // addToCart,
};
