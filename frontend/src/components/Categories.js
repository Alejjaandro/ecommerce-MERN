import { categories } from "../data/hardCodedData";
import CategoryItem from "./CategoryItem";

import './styles/Categories.css'

export default function Categories() {

    return (
        <div className="cat-container">

            {categories.map(item => (
                <CategoryItem item={item} key={item.id}/>
            ))}

        </div>
    )
}
