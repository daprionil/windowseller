import { IconContext } from "react-icons/lib";
import TrowCategoryCard from "./TrowCategoryCard";

const ListCategories = ({ userCategories }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Categoría
                    </th>
                    <th>
                        Productos
                    </th>
                    <th>
                        Catalogos
                    </th>
                    <th>
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-slate-100 [&>tr:nth-child(odd)]:bg-slate-200">
                <IconContext.Provider value={{size: '25px'}}>
                    {
                        userCategories.map((category, idx) => (
                            <TrowCategoryCard {...category} key={idx}/>
                        ))
                    }
                </IconContext.Provider>
            </tbody>
        </table>
    )
}

export default ListCategories;