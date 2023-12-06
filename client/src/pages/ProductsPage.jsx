import useCategoriesUserStore from "../stores/useCategoriesUserStore"

const ProductsPage = () => {
    const userCategories = useCategoriesUserStore(({userCategories}) => userCategories);
    
    return (
        <div>ProductsPage</div>
    )
}

export default ProductsPage