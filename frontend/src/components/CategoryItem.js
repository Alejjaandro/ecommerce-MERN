import './styles/CategoryItem.css'

export default function CategoryItem({ item }) {

    return (

        <div className="cat-container">

            <img className="cat-image" src={item.img} alt="No Image" />

            <div className="cat-info">

                <h3 className='cat-title'>{item.title}</h3>
                <button className="cat-button">See now</button>
            </div>
        
        </div>
    )
}