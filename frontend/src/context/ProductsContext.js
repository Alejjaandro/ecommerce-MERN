import { createContext, useContext, useState } from "react";
import axios from '../api/axios.js';

export const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within an AuthProvider");
    }
    return context;
}

export const ProductsProvider = ({ children }) => {

    // ========== FUNCTION TO GET ALL PRODUCTS & CATEGORY PRODUCTS ========== //
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const getProducts = async (category) => {

        try {
            // Make a get petition to the URL stablished in "/backend/routes/Product.js".
            const res = await axios.get('/products');
            const resProducts = res.data;

            // If we choose a category filter or there is a category in the URL params, 
            // then we filter the products and we save the ones that matches the category.
            if (category && (category !== "All")) {

                setFilteredProducts(resProducts.filter(prod => prod.category === category));

                // If not, then we save all products.
            } else {
                setProducts(resProducts);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO GET A SINGLE PRODUCT ========== //
    const [product, setProduct] = useState({});
    // Works similar to "getProducts" but with the product id.
    const getProduct = async (id) => {
        try {
            const res = await axios.get(`/products/find/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO MODIIFY A PRODUCT ========== //
    const [success, setSuccess] = useState();
    const updateProduct = async (productId, data) => {
        try {
            const res = await axios.put(`/products/${productId}`, data);
            console.log(res.data);
            setSuccess(res.data.message);

            // Timer to clear success message.
            setTimeout(() => {
                setSuccess();
            }, 5000);

        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO DELETE A PRODUCT ========== //
    const deleteProduct = async (productId) => {
        try {
            const res = await axios.delete(`/products/${productId}`);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO GET THUMBNAIL IMGS ========== //
    const [sliderImages, setSliderImages] = useState([]);

    const getSliderImages = async () => {

        try {
            const res = await axios.get('/products');
            const products = res.data;

            // We only want 5 of them for the slider.
            const someProd = products.splice(0, 5);

            setSliderImages(someProd.map((prod) => prod.thumbnail));

        } catch (error) {
            console.log(error);
        }
    };

    // ========== FUNCTION TO GET A PRODUCT FOR EACH CATEGORY ========== //
    const [prodForCategory, setProdForCategory] = useState([]);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {

        try {
            // We get all products.
            const res = await axios.get('/products');
            const products = res.data;

            // We extract the categories.
            // we use Set to create an array with the unique categories.
            const categories = [...new Set(products.map(product => product.category))];
            setCategories(categories);

            // We save the first product that matches each category.
            setProdForCategory(categories.map(category => products.find(product => product.category === category)));

        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO GET CATEGORIES & BRANDS ========== //
    const [categoriesAndBrands, setCategoriesAndBrands] = useState();
    const [brands, setBrands] = useState([]);

    const getCategoriesAndBrands = async () => {
        await getCategories();

        const res = await axios.get('/products');
        const products = res.data;

        const catAndBrands = {};
        const brands = [];

        products.forEach(product => {

            const { category, brand } = product;

            if (!catAndBrands[category]) {

                catAndBrands[category] = [brand];

            } else if (!catAndBrands[category].includes(brand)) {

                catAndBrands[category].push(brand);

            }
        });

        setCategoriesAndBrands(catAndBrands);

        for (const category in categoriesAndBrands) {
            brands.push(...categoriesAndBrands[category]);
        }

        setBrands(brands);
    };

    return (
        <ProductsContext.Provider value={{
            getProducts,
            products,
            filteredProducts,

            getProduct,
            product,

            updateProduct,
            deleteProduct,
            success,

            getSliderImages,
            sliderImages,

            getCategories,
            prodForCategory,
            categories,
            brands,

            categoriesAndBrands,
            getCategoriesAndBrands
        }}>
            {children}
        </ProductsContext.Provider>
    )
};