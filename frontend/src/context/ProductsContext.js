import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [sliderImages, setSliderImages] = useState([]);

    const [categories, setCategories] = useState([]);
    const [prodForCategory, setProdForCategory] = useState([]);


    // ========== FUNCTION ALL PRODUCTS & CATEGORY PRODUCTS ========== //
    const getProducts = async (category) => {

        try {
            // Make a get petition to the URL stablished in "/backend/routes/Product.js".
            const res = await axios.get('http://localhost:8000/api/products');
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

    // ========== FUNCTION TO GET THUMBNAIL IMGS ========== //
    const getSliderImages = async () => {

        try {
            const res = await axios.get('http://localhost:8000/api/products');

            // We only want 5 of them for the slider.
            const someProd = res.data.splice(0, 5);

            setSliderImages(someProd.map((prod) => prod.thumbnail));

        } catch (error) {
            console.log(error);
        }
    };

    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOT WORKING !!!!!!!!!!!!!!!!!!!!!!!!!! */
    // ========== FUNCTION TO GET A PRODUCT FOR EACH CATEGORY ========== //
    const getProdForCategory = async () => {

        try {
            const res = await axios.get('http://localhost:8000/api/products');
            const products = res.data;

            setCategories([...new Set(products.map((prod) => prod.category))]);

            setProdForCategory(
                categories.map(category => {
                    return products.find(product => product.category === category);
                })
            );

        } catch (error) {
            console.log(error);
        }
    };

    // ============================ REVISE ============================================
    // ========== FUNCTION TO GET CATEGORIES & BRANDS ========== //
    // const categoriesAndBrands = () => {

    //     const categoriasConMarcas = {};

    //     useEffect(() => {

    //         const getProducts = async () => {

    //             try {

    //                 const res = await axios.get('http://localhost:8000/api/products');
    //                 setProducts(res.data);

    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         };

    //         getProducts();

    //     }, []);

    //     products.forEach(product => {

    //         const { category, brand } = product;

    //         if (!categoriasConMarcas[category]) {

    //             return categoriasConMarcas[category] = [brand];

    //         } else if (!categoriasConMarcas[category].includes(brand)) {

    //             return categoriasConMarcas[category].push(brand);

    //         }
    //     });

    //     return categoriasConMarcas;
    // };


    return (
        <ProductsContext.Provider value={{
            getProducts,
            getSliderImages,
            getProdForCategory,
            // categoriesAndBrands
        }}>
            {children}
        </ProductsContext.Provider>
    )

};

