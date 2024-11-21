import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/productsSlice'


function AdminCreateProduct() {

    const dispatch = useDispatch()
    const error = useSelector(state => state.products.error)
    const success = useSelector(state => state.products.success)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Removing empty fields and converting fields to numbers.
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            } else if (!isNaN(data[key])) {
                data[key] = Number(data[key]);
            }
        }
                
        dispatch(createProduct(data))
    }
    
    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] p-4 bg-white md:h-[50%] rounded-md'>
                <h1 className='my-4 text-4xl md:mt-10 uppercase text-center'>Settings</h1>
                <div className='mt-6'>
                    <form method='POST' onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Thumbnail Image: </label>
                            <input placeholder="AsusVivabook.jpg" type='text' name='thumbnail' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Product Title: </label>
                            <input placeholder="ASUS TUF A23T" type='text' name='title' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Price: </label>
                            <input placeholder="1230" type='number' name='price' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Category: </label>
                            <input placeholder="Laptops" type='text' name='category' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Brand: </label>
                            <input placeholder="Asus" type='text' name='brand' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Discount %: </label>
                            <input placeholder="25" type='number' name='discountPercentage' className='p-2 bg-gray-200 rounded-md' max={100} min={0} step={1}/>
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Stock: </label>
                            <input placeholder="67" type='number' name='stock' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                            <label>Description: </label>
                            <textarea placeholder="Description of the product features" name='description' className='p-2 bg-gray-200 rounded-md' />
                        </div>

                        {error && <div className='text-red-500'>{error}</div>}
                        {success && <div className='text-green-500'>{success}</div>}

                        <div className="my-4 w-full md:w-3/4 text-center grid grid-cols-2 gap-4">
                            <a href='/admin-all-products' className="p-2 md:p-4 bg-blue-400 hover:bg-blue-700">Back to products</a>
                            <button type='submit' className="p-2 md:p-4 bg-green-400 hover:bg-green-700">Create Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateProduct