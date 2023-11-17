import ITableTd from './ITableTd.component';

export default function TableTd({ children, onDoubleClick }: ITableTd) {
    let customChilderen = children;

    function getDefaultFalseChildren() {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                -
            </div>
        );
    }

    if (Array.isArray(children) && !children.length) {
        customChilderen = getDefaultFalseChildren();
    } else if (typeof children == 'string' && !children) {
        customChilderen = getDefaultFalseChildren();
    } else if (children === null) {
        customChilderen = getDefaultFalseChildren();
    }

    return (
        <td
            className={`text-sm border-b-2 border-black px-2 py-2 ${
                onDoubleClick ? `cursor-pointer hover:text-[#124AED]` : ''
            }`}
            onClick={onDoubleClick}
        >
            {customChilderen}
        </td>
    );
}
