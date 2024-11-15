import PropTypes from 'prop-types';

function ProductCard({ product }) {
    return (
        <div className='border border-gray-300 p-4'>
            <img src={`/${product.thumbnail}`} alt={product.title} className='w-full h-52 object-contain' />
            <a href='/' className='text-lg font-semibold mt-2 hover:underline'>{product.title}</a>
            <p className='text-sm font-light mt-2'>${product.price}</p>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard