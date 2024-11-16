import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrand, filterByCategory, getProducts } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.allCategories)
    const brands = useSelector(state => state.products.allBrands)

    const products = useSelector(state => state.products.filteredProducts)
    const allProductsLoaded = useSelector(state => state.products.allProducts)

    const categoryParam = window.location.pathname.split('/')[2];

    // Variable to store the selected brand for the brand filter. The default value is "all".
    const [selectedBrand, setSelectedBrand] = useState("all");

    useEffect(() => {
        // If all products are not loaded, get all products and filter by category. Otherwise, filter by category.
        if (!allProductsLoaded) {
            dispatch(getProducts()).then(() => {
                dispatch(filterByCategory(categoryParam));
            });
        } else {
            dispatch(filterByCategory(categoryParam));
        }
    }, [categoryParam, dispatch, allProductsLoaded]);

    const changeBrand = (e) => {
        dispatch(filterByBrand(e.target.value))
        setSelectedBrand(e.target.value);
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] bg-white'>
                <h1 className='text-4xl my-4 md:my-10 font-bold text-center uppercase'>Check all our {categoryParam}!</h1>

                <div className="hidden bg-gray-200 uppercase gap-2 md:flex md:justify-center md:text-base lg:gap-6 lg:text-xl">
                    <a className='p-2 hover:text-white hover:bg-black' href='/products'>All</a>
                    {categories.map((category, index) => (
                        <a key={index} href={`/products/${category.toLowerCase()}`}
                            className={categoryParam === (category).toLowerCase()
                                ? 'p-2 text-white bg-black'
                                : 'p-2 hover:text-white hover:bg-black'}
                        >
                            {category}
                        </a>
                    ))}
                </div>

                {products ? (
                    <div className='p-4'>
                        <div className='md:text-xl'>
                            {/* Brand filter */}
                            <div className='flex flex-col'>
                                <select value={selectedBrand} className='bg-gray-200' onChange={changeBrand}>
                                    <option value="all">All</option>
                                    {brands.map((brand, index) => (
                                        <option key={index} value={brand} className='capitalize'>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )
                    : <h1 className='h-1/2 text-4xl text-center flex justify-center items-center'>Loading products...</h1>
                }
            </div>
        </div>
    )
}

export default CategoryPage