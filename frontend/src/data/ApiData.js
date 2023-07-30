// Url from wich we will take the datas.
const url = 'https://dummyjson.com/products';

// =================== PRODUCTS ==================== //
// Fetch to the url.
const response = await fetch(url).then(res => res.json());
// Save the fetch response. Now we have all the products info.
const prod = response.products;

// =================== IMAGES ==================== //
// We create an array for the images, initially empty.
const images = [];

// We go through the array of products and push the images into our {prodImgs} array.
prod.map((prod, index) => {
    return images.push(
        {
            src: prod.images,
            alt: `Image ${index}`
        }
    );
})

// =================== CATEGORIES ==================== //

// We do the same as with images. This will save every category, so many of them will be the same.
const allCategories = [];
prod.map((prod) => { return allCategories.push(prod.category) });

// We use Set method to create a new array with the unique categories.
const categories = [...new Set(allCategories)];


// We export the info to use it in "/Slider.js".
export { prod, images, categories };