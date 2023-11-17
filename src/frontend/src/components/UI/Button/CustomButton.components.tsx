import { ICustomButton } from './ICustomButton.components';

export default function CustomButton({
    children,
    onClick,
    className,
    active = false,
    type = 'button',
}: ICustomButton) {
    function onClickHandler() {
        if (onClick) {
            onClick();
        }
    }

    return (
        <button
            className={
                className ||
                `flex justify-between p-3 ${
                    active ? `border-2 border-black` : ``
                }`
            }
            onClick={onClickHandler}
            type={type}
        >
            {children}
        </button>
    );
}
