import { useEffect, useState } from 'react';
import axios from 'axios';

// ========== FUNCTION TO GET ALL PRODUCTS ========== //
function useProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {

            try {
                // Make a get petition to the URL stablished in "/backend/routes/Product.js".
                const res = await axios.get('http://localhost:4000/api/products');
                setProducts(res.data);

            } catch (error) {

            }
        };

        getProducts();

    }, []);

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
                const someProd = res.data.splice(0,5);

                setImages( someProd.map( (prod) =>  prod.thumbnail) );

            } catch (error) {

            }
        };

        getImages();

    }, []);

    return images
};

export {useProducts, useImages};