import CountListIcon from '../SVG/Icons/CountListIcon';
import IKpi from './IKpi.component';

export default function Kpi({
    number,
    title,
    icon = <CountListIcon />,
    totalNumber,
}: IKpi) {
    return (
        <div className='p-2 flex flex-col justify-center items-center shadow-md rounded-md shadow-md w-32 bg-[#E5E7EB]'>
            {icon ? icon : null}
            <div className='font-bold text-gray'>{title}</div>
            <div className='font-bold'>
                {number}
                {typeof totalNumber == 'number' ? `/${totalNumber}` : ''}
            </div>
        </div>
    );
}
