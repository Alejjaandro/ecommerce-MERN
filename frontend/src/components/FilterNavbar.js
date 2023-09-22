import { useState, useEffect } from "react";

export default function FilterNavbar({ useProducts, onFilter }) {
    // We extract what we need from context
    const {
        getCategoriesAndBrands,
        categoriesAndBrands,
        brands,
        categories,
        categoryFilter,
        brandFilter,
        setCategoryFilter,
        setBrandFilter
    } = useProducts();

    // We use useEffect to call getCategoriesAndBrands function
    // when the component mounts.
    useEffect(() => { getCategoriesAndBrands() }, []);

    // Functions to update categoryFilter and brandFilter respectively 
    // when the user selects a different category or brand.
    const handleCategories = (e) => {
        setCategoryFilter(e.target.value);
    }
    const handleBrands = (e) => {
        setBrandFilter(e.target.value);
    }

    // We call onFilter when categoryFilter or brandFilter change.
    useEffect(() => { onFilter(categoryFilter, brandFilter) }, [categoryFilter, brandFilter]);

    // We reset the filters when the component unmounts.
    useEffect(() => { return () => { setCategoryFilter('All'); setBrandFilter('All') } }, []);

    return (
        <div className='filter'>
            <span className='filter-text'>Filter Products:</span>

            {/* Category selector */}
            <select className='select' onChange={handleCategories} defaultValue="Category:">
                <option disabled>Category:</option>
                <option>All</option>
                {categories.map((category, index) => {
                    return <option key={index}>{category}</option>
                })}
            </select>

            {/* Brand selector */}
            {categoryFilter && (categoryFilter !== "All") ? (
                // If the user selects a category, we show the brands of that category.
                <select className='select' onChange={handleBrands} defaultValue="Brand:">
                    <option disabled>Brand:</option>
                    <option>All</option>
                    {/* 
                    We search on {categoriesAndBrands} what matches with the value of {categoryFilter},
                    we transform it into an array so we can map it and return an option for
                    each brand of that category.
                    */}
                    {Array.from(categoriesAndBrands[categoryFilter]).map((brand, index) => {
                        return <option key={index}>{brand}</option>
                    })}
                </select>
            ) : (
                // If the user selects "All" in the category selector, we show all brands.
                <select className='select' onChange={handleBrands} defaultValue="Brand:">
                    <option disabled>Brand:</option>
                    <option>All</option>
                    {brands.map( (brand, index) => {
                        return <option key={index}>{brand}</option>
                    })}
                </select>

            )}
        </div>
    );
}