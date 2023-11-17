import ISearchFilterPill from './ISearchFilterPill';

export default function SearchFilterPill({
    text,
    value,
    onClick,
}: ISearchFilterPill) {
    function onClickHandler() {
        if (onClick) {
            onClick();
        }
    }

    return (
        <div
            className={`px-1 bg-lightGray border-lightGray border-[1px] text-gray text-xs flex justify-center items-center mr-2 ${
                onClick
                    ? 'cursor-pointer hover:border-red hover:border-[1px] hover:text-red'
                    : ''
            }`}
            onClick={onClickHandler}
        >
            <span className='flex w-full justify-center'>
                <span className=''>{text}=</span>
                <span className='font-bold'>{value}</span>
                {onClick ? <span className='font-bold ml-1'>X</span> : null}
            </span>
        </div>
    );
}
