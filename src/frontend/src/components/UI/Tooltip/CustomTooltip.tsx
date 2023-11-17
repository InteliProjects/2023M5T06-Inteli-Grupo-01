import { Tooltip } from 'react-tooltip';
import ICustomTooltip from './ICustomTooltip';
import { uuidv4 } from '../../../helpers/uuidv4';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export default function CustomTooltip({
    text,
    place = 'right',
    icon,
    color,
    width,
}: ICustomTooltip) {
    const tooltipId = `tooltip-${uuidv4()}`;

    return (
        <span
            className={`text-${color || 'purple'}`}
            data-tooltip-id={tooltipId}
            data-tooltip-content={text}
            data-tooltip-place={place || 'right'}
        >
            {icon || <BsFillQuestionCircleFill />}
            <Tooltip
                className='text-xs'
                style={{ width: width || '500px', zIndex: '99999' }}
                id={tooltipId}
            />
        </span>
    );
}
