import './CategoryItem.css';

export default function CategoryItem({ item }) {

    return (

        <div className="item-container">

            <img className="image" src={item.img} alt="No Image" />

            <div className="info">

                <h3 className='title'>{item.title}</h3>
                <button className="button">See now</button>
            </div>
        
        </div>
    )
}