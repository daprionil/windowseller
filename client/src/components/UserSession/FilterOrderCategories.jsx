import { useState } from "react";
import { FaArrowDown19, FaArrowUp91, FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';
import { typeOrders } from "../../stores/useCategoriesUserStore";

const optionsSelected = {
    [typeOrders.countDownProducts]:
        <>
            Productos <FaArrowDown19 />
        </>,
    [typeOrders.countUpProducts]:
        <>
            Productos <FaArrowUp91 />
        </>,
    [typeOrders.countDownCatalogs]:
        <>
            Catalogos <FaArrowDown19 />
        </>,
    [typeOrders.countUpCatalogs]:
        <>
            Catalogos <FaArrowUp91 />
        </>,
    [typeOrders.downCreated]:
        <>
            Creación <FaArrowDownWideShort />
        </>,
    [typeOrders.upCreaded]:  <>
            Creación <FaArrowUpShortWide />
        </>
}

const FilterOrderCategories = ({setSelectedTypeOrder, selectedTypeOrder}) => {
    const [isOpenSelect, setIsOpenSelect] = useState(false);

    const handleOpenSelect = () => {
        setIsOpenSelect(state => !state);
    };

    const setOptionOrder = (valueOrderOption) => {
        if(isNaN(valueOrderOption) || valueOrderOption === undefined) return;

        setSelectedTypeOrder(valueOrderOption);
        handleOpenSelect();
    };

    return (
        <div
            className='min-w-[150px] relative cursor-pointer bg-stone-200 rounded-t-lg shadow-lg'
        >
            <div
                className='flex justify-center items-center gap-2 px-2 pb-1 pt-2'
                onClick={handleOpenSelect}
            >
                {
                    optionsSelected[selectedTypeOrder]
                }
            </div>
            <div
                className={`absolute top-full transition-all duration-300 ease-in ${isOpenSelect ? 'h-64' : 'h-0'} mt-2 shadow-lg [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:gap-2 [&>div]:cursor-pointer [&>div]:text-sm [&>div]:p-2 [&>div:hover]:bg-slate-300 rounded-b-lg overflow-hidden w-full left-0`}
            >
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.countDownProducts)}
                >
                    <p>Productos</p>
                    <FaArrowDown19 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.countUpProducts)}
                >
                    <p>Productos</p>
                    <FaArrowUp91 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.countDownCatalogs)}
                >
                    <p>Catalogos</p>
                    <FaArrowDown19 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.countUpCatalogs)}
                >
                    <p>Catalogos</p>
                    <FaArrowUp91 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.downCreated)}
                >
                    <p>Creación</p>
                    <FaArrowDownWideShort />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(typeOrders.upCreaded)}
                >
                    <p>Creación</p>
                    <FaArrowUpShortWide />
                </div>
            </div>
        </div>
    )
}

export default FilterOrderCategories