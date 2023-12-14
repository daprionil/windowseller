import { RxReset } from 'react-icons/rx';

const SearchBar = ({valueSearch, setValueSearch}) => {
    
    const handleChangeBar = evt => {
        const valueFromSearchBar = evt.target.value.trimStart();
        setValueSearch(valueFromSearchBar);
    };

    //* To clear the search bar
    const handleClearSearchBar = () => {
        setValueSearch('');
    };

    return (
        <div className="rounded-lg overflow-hidden shadow flex bg-white">
            <input
                type="search"
                placeholder="Busca entre tus productos"
                className=" w-full p-2 h-full focus:outline-none placeholder:font-bold font-bold outline-none border-none"
                name="searchValueProduct"
                onChange={handleChangeBar}
                value={valueSearch}
            />
            <button
                className="bg-slate-100 [&>svg]:transition [&>svg]:duration-200 [&>svg]:transform [&:hover>svg]:scale-110  px-4"
                onClick={handleClearSearchBar}
            >
                <RxReset />
            </button>
        </div>
    )
}

export default SearchBar