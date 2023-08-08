import CategoryItem from "./CategoryItem";
import './styles/Categories.css';

import { hardCategories } from "../data/hardCodedData";

export default function Categories() {
    
    return (
        <div className="cat-container">

            {hardCategories.map(item => (
                <CategoryItem item={item} key={item._id}/>
            ))}

        </div>
    )
}
