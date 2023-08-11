import { useEffect, useState } from 'react';
import axios from 'axios';

// ========== FUNCTION ALL PRODUCTS & CATEGORY PRODUCTS ========== //
function useProducts(category) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getProducts = async () => {
    
          try {
            // Make a get petition to the URL stablished in "/backend/routes/Product.js".
            const res = await axios.get('http://localhost:4000/api/products');
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
    
        getProducts();
    
      }, [category]);
    
    // console.log(products);
    return products;
};

// ========== FUNCTION TO GET THUMBNAIL IMGS ========== //
function useImages() {

    const [images, setImages] = useState([]);

    useEffect(() => {

        const getImages = async () => {

            try {
                const res = await axios.get('http://localhost:4000/api/products');

                // We only want 5 of them for the slider.
                const someProd = res.data.splice(0, 5);

                setImages(someProd.map((prod) => prod.thumbnail));

            } catch (error) {
                console.log(error);
            }
        };

        getImages();

    }, []);

    return images
};


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOT WORKING !!!!!!!!!!!!!!!!!!!!!!!!!! */
// ========== FUNCTION TO GET A PRODUCT FOR EACH CATEGORY ========== //
function useProdForCategory() {

    const [categories, setCategories] = useState([]);
    const [prodForCategory, setProdForCategory] = useState([]);

    useEffect(() => {

        const getProdForCategory = async () => {

            try {

                const res = await axios.get('http://localhost:4000/api/products');
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

        getProdForCategory();

    }, []);

    return prodForCategory;
};

// ========== FUNCTION TO GET CATEGORIES & BRANDS ========== //
function useCategoriesAndBrands() {

    const [products, setProducts] = useState([]);
    const categoriasConMarcas = {};

    useEffect(() => {

        const getProducts = async () => {

            try {

                const res = await axios.get('http://localhost:4000/api/products');
                setProducts(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        getProducts();

    }, []);

    products.forEach(product => {

        const { category, brand } = product;

        if (!categoriasConMarcas[category]) {

            return categoriasConMarcas[category] = [brand];

        } else if (!categoriasConMarcas[category].includes(brand)) {

            return categoriasConMarcas[category].push(brand);

        }
    });

   return categoriasConMarcas;
};


export {
    useProducts,
    useImages,
    useProdForCategory,
    useCategoriesAndBrands
};