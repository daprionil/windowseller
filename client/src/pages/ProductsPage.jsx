import useProductUserStore from "../stores/useProductUserStore";

const ProductsPage = () => {
    const userProducts = useProductUserStore(({userProducts}) => userProducts);

    return (
        <div>ProductsPage</div>
    );
};

export default ProductsPage;