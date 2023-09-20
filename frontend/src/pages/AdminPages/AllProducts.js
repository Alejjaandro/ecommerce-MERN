import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FilterNavbar from "../../components/FilterNavbar";

import "./styles/AllProducts.css";

import { useProducts } from "../../context/ProductsContext";
import { useAdmin } from "../../context/AdminContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProducts() {

    const { products, getProducts, categoryFilter, brandFilter } = useProducts();
    const { deleteProduct, success } = useAdmin();
    
    useEffect(() => { getProducts() }, []);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const onFilter = (category, brand) => {
        let filtered = products;

        if (category && (category !== "All")) {
            filtered = filtered.filter(product => product.category === category);
        }
        if (brand && (brand !== "All")) {
            filtered = filtered.filter(product => product.brand === brand);
        }
        setFilteredProducts(filtered);
    }

    // We use useEffect to update the filteredProducts after deleting a product.
    useEffect(() => {onFilter(categoryFilter, brandFilter)}, [products]);

    return (
        <>
            <Navbar />

            <div className="allProducts-container">
                <h1>All Products</h1>

                <FilterNavbar useProducts={useProducts} onFilter={onFilter} />
                
                {/* Success */}
                {success && (
                    <div className='allProducts-success'>
                        <p>{success}</p>
                    </div>
                )}

                <div className="allProducts-table-container">
                    <table className="allProducts-table">
                        <thead className="allProducts-table-head">
                            <tr>
                                <th className="allProducts-id">ID</th>
                                <th>Name</th>
                                <th className="allProducts-price">Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th className="allProducts-stock">Stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="allProducts-table-body">
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td className="allProducts-id">{product._id}</td>
                                    <td>{product.title}</td>
                                    <td className="allProducts-price">${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td className="allProducts-stock">{product.stock}</td>
                                    <td className="allProducts-options">
                                        <Link to={`/edit-product/${product._id}`} className="allProducts-link-edit">Edit</Link>
                                        <button className="allProducts-btn-remove" onClick={() => deleteProduct(product._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    )
}