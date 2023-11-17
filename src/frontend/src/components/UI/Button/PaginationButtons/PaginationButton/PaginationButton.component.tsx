import CustomButton from '../../CustomButton.components';
import IPaginationButton from './IPaginationButton.component';

export default function PaginationButton({
    text,
    active,
    onClick,
}: IPaginationButton) {
    function onClickHandler() {
        if (onClick) {
            onClick(text);
        }
    }

    return (
        <CustomButton
            className={`flex justify-center items-center rounded-full text-2xl font-bold text-white hover:bg-red ${
                active ? 'bg-red w-12 h-12' : 'bg-purple w-10 h-10'
            }`}
            onClick={onClickHandler}
        >
            {text}
        </CustomButton>
    );
}
