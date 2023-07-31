import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';

function App() {
  return (

    <BrowserRouter>

    <main className=''>
      
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product" element={<Product />} />
        
      </Routes>
    </main>

  </BrowserRouter>
);
}

export default App;
