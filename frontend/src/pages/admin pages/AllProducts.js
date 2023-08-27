import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNavbar";
import FilterNavbar from "../../components/FilterNavbar";

import "./styles/AllProducts.css";

import { useProducts } from "../../context/ProductsContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProducts() {

    let { products, getProducts } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => { getProducts() }, []);

    const onFilter = ({ category, brand }) => {
        let filtered = products;

        if (category && (category !== "All")) {
            filtered = filtered.filter(product => product.category === category);
        }
        if (brand && (brand !== "All")) {
            filtered = filtered.filter(product => product.brand === brand);
        }
        setFilteredProducts(filtered);
    }

    return (
        <>
            <AdminNav />

            <div className="allProducts-container">
                <h1>All Products</h1>

                <FilterNavbar useProducts={useProducts} onFilter={onFilter} />

                <table className="products-table">
                    <thead className="products-table-head">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className="products-table-body">
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td className="td-category">{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="btn-edit"><Link to={`/edit-product/${product._id}`}>Edit</Link></button>

                                    <button className="btn-remove">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    )
}