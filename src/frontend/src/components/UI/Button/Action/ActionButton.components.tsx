import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton.components';
import { IActionButton } from './IActionButton.components';
import { AiOutlinePlus } from 'react-icons/ai';

export default function ActionButton({
    link,
    text,
    icon,
    type = 'button',
}: IActionButton) {
    let buttonIcon = undefined;

    switch (icon) {
        case 'CREATE':
            buttonIcon = <AiOutlinePlus />;
            break;
    }

    return (
        <Link to={link} className=''>
            <CustomButton
                type={type}
                className='bg-purple text-white align-center rounded-md shadow-md flex flex-nowrap items-center px-2 hover:px-3 hover:py-1'
            >
                <span>{text}</span>
                {icon ? (
                    <span className='ml-5 text-red'>{buttonIcon}</span>
                ) : null}
            </CustomButton>
        </Link>
    );
}
