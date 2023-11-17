import { uuidv4 } from '../../../../helpers/uuidv4.ts';
import IPaginationButtons from './IPaginationButton.component.ts';
import PaginationButton from './PaginationButton/PaginationButton.component.tsx';

export default function PaginationButtons({
    page,
    pageSize,
    total,
    maxButtons = 5,
    onClick,
}: IPaginationButtons) {
    const pagesNumber = Math.ceil(total / pageSize);

    const buttons = [];

    let start = 1;
    let end = pagesNumber;

    if (pagesNumber > maxButtons) {
        const middleButton = Math.floor(maxButtons / 2);

        if (page <= middleButton) {
            end = maxButtons;
        } else if (page >= pagesNumber - middleButton) {
            start = pagesNumber - maxButtons + 1;
        } else {
            start = page - middleButton;
            end = page + middleButton;
        }
    }

    for (let i = start; i <= end; i++) {
        buttons.push(
            <PaginationButton
                onClick={onClick}
                text={i}
                active={i === page}
                key={uuidv4()}
            />
        );
    }

    return (
        <div className='flex justify-around items-center my-2'>
            {buttons.length == 1 ? [] : buttons}
        </div>
    );
}
