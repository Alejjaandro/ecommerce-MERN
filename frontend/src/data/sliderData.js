// Url from wich we will take the datas.
const url = 'https://dummyjson.com/products';

// Fetch to the url.
const response = await fetch(url).then(res => res.json());
// Save the fetch response. Now we have all the products info.
const prod = response.products;

// We create an array for the images, initially empty.
const prodImgs = [];

// We go through the array of products and push the images into our {prodImgs} array.
prod.map((prod, index) => {
    return prodImgs.push(
        {
            src: prod.images, 
            alt: `Image ${index}`
        }
    );
})

// This is a handmade example to see if the slider works.
const productsEx = {

    "slides": [
        {
            "src": "https://i.ibb.co/231k5Hz/cyber-monday.jpg",
            "alt": "Image 1"
        },
        {
            "src": "https://i.ibb.co/72bjXb5/Phone-1.jpg",
            "alt": "Image 2"
        },
        {
            "src": "https://i.ibb.co/Vx323j3/Laptop-1.jpg",
            "alt": "Image 3"
        }
    ]
}

// We export the info to use it in "/Slider.js".
export { productsEx, prod, prodImgs };