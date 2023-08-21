import { createContext, useContext, useState } from "react";
import axios from '../api/axios.js';

export const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const ProductsProvider = ({ children }) => {

    // ========== FUNCTION TO GET ALL PRODUCTS & CATEGORY PRODUCTS ========== //
    const [products, setProducts] = useState([]);

    const getProducts = async (category) => {

        try {
            // Make a get petition to the URL stablished in "/backend/routes/Product.js".
            const res = await axios.get('/products');
            const resProducts = res.data;

            // If we choose a category filter or there is a category in the URL params, 
            // then we filter the products and we save the ones that matches the category.
            if (category && (category !== "All")) {

                setProducts(resProducts.filter(prod => prod.category === category));

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

    // ========== FUNCTION TO GET THUMBNAIL IMGS ========== //
    const [sliderImages, setSliderImages] = useState([]);

    const getSliderImages = async () => {

        try {
            const res = await axios.get('/products');

            // We only want 5 of them for the slider.
            const someProd = res.data.splice(0, 5);

            setSliderImages(someProd.map((prod) => prod.thumbnail));

        } catch (error) {
            console.log(error);
        }
    };

    // ========== FUNCTION TO GET A PRODUCT FOR EACH CATEGORY ========== //
    const [prodForCategory, setProdForCategory] = useState([]);

    const getCategories = async () => {

        try {
            // We get all products.
            const res = await axios.get('/products');
            const products = res.data;

            // We extract the categories.
            // we use Set to create an array with the unique categories.
            const categories = [...new Set(products.map(product => product.category))]

            // We save the first product that matches each category.
            setProdForCategory(categories.map(category => products.find(product => product.category === category)));

        } catch (error) {
            console.log(error);
        }
    }

    // ========== FUNCTION TO GET CATEGORIES & BRANDS ========== //
    const [categoriesAndBrands, setCategoriesAndBrands] = useState();

    const getCategoriesAndBrands = async () => {
        const res = await axios.get('/products');
        const products = res.data;

        const brands = {};

        products.forEach(product => {

            const { category, brand } = product;

            if (!brands[category]) {

                return brands[category] = [brand];

            } else if (!brands[category].includes(brand)) {

                return brands[category].push(brand);

            }
        });

        setCategoriesAndBrands(brands);
    };


    return (
        <ProductsContext.Provider value={{
            products,
            getProducts,

            getProduct,
            product,

            getSliderImages,
            sliderImages,

            getCategories,
            prodForCategory,

            categoriesAndBrands,
            getCategoriesAndBrands
        }}>
            {children}
        </ProductsContext.Provider>
    )

};

