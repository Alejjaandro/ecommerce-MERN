import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNavbar";

import "./styles/AllProducts.css";

import { useProducts } from "../../context/ProductsContext";
import { useEffect } from "react";

export default function AllProducts() {

    const { getProducts, products } = useProducts();

    useEffect(() => { getProducts() }, []);

    return (
        <>
            <AdminNav />

            <div className="allProducts-container">
                <h1>All Products</h1>

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
                        {products.map((product) => (
                            <tr>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td className="td-category">{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="btn-edit">Edit</button>
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