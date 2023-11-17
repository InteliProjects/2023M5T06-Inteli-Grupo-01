export default function TreeMapCustomTooltip(props: any) {
    const item =
        props && props.payload && props.payload[0] ? props.payload[0] : null;

    const name = item ? (item.payload ? item.payload.name : item.name) : '';

    const root = item ? item.payload.root : null;
    const size = root
        ? getSizeByRootChildren(name, item ? item.value : 0, root)
        : 0;

    const rootName = root ? root.name : '';
    const rootSize = root ? root.value : 0;

    let percentageOfTotal = root ? (size / rootSize) * 100 : 100;

    if (size != (item ? item.value : 0)) {
        percentageOfTotal = item.value;
    }

    return (
        <div className='bg-white p-2 rounded-md w-64 flex flex-col'>
            <span className='font-semibold w-100 text-center'>{name}</span>
            <span className='font-light text-sm w-100 text-center'>
                {rootName ? `(${rootName})` : ''}
            </span>
            <span className='mt-2 w-100 text-center'>
                {size}{' '}
                {size == 1 ? props.singularItemName : props.pluralItemName}
            </span>
            <span className='w-100 text-center text-sm'>
                ({percentageOfTotal.toFixed(2)}%)
            </span>
        </div>
    );
}

function getSizeByRootChildren(name: string, value: number, element: any) {
    if (element.name === name && value === element.size) {
        return element.realSize || element.size;
    } else if (element.children && Array.isArray(element.children)) {
        return element.children
            .map((child: any) => getSizeByRootChildren(name, value, child))
            .find((e: number) => e != 0);
    } else {
        return 0;
    }
}
