import { useState } from "react";
import { IoFilter } from 'react-icons/io5';
import { FaArrowDown19, FaArrowUp91, FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';

const optionsSelected = {
    1:
        <>
            Ordenar <IoFilter />
        </>,
    2:
        <>
            Productos <FaArrowDown19 />
        </>,
    3:
        <>
            Productos <FaArrowUp91 />
        </>,
    4:
        <>
            Catalogos <FaArrowDown19 />
        </>,
    5:
        <>
            Catalogos <FaArrowUp91 />
        </>,
    6:
        <>
            Creación <FaArrowDownWideShort />
        </>,
    7:  <>
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
                className={`absolute top-full transition-all duration-300 ease-in ${isOpenSelect ? 'h-72' : 'h-0'} mt-2 shadow-lg [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:gap-2 [&>div]:cursor-pointer [&>div]:text-sm [&>div]:p-2 [&>div:hover]:bg-slate-300 rounded-b-lg overflow-hidden w-full left-0`}
            >
                <div
                    className='px-2 py-1 bg-slate-200 border-b-2 border-slate-400'
                    onClick={() => setOptionOrder(1)}
                >
                    <p>Ordenar</p>
                    <IoFilter />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(2)}
                >
                    <p>Productos</p>
                    <FaArrowDown19 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(3)}
                >
                    <p>Productos</p>
                    <FaArrowUp91 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(4)}
                >
                    <p>Catalogos</p>
                    <FaArrowDown19 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(5)}
                >
                    <p>Catalogos</p>
                    <FaArrowUp91 />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(6)}
                >
                    <p>Creación</p>
                    <FaArrowDownWideShort />
                </div>
                <div
                    className='px-2 py-1 bg-slate-200'
                    onClick={() => setOptionOrder(7)}
                >
                    <p>Creación</p>
                    <FaArrowUpShortWide />
                </div>
            </div>
        </div>
    )
}

export default FilterOrderCategories