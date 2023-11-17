import { useState } from 'react';
import IDropdown from './IDropdown';
import OpenIcon from '../../SVG/Icons/OpenIcon';
import CheckIcon from '../../SVG/Icons/CheckIcon';
import { uuidv4 } from '../../../../helpers/uuidv4';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function Dropdown(props: IDropdown) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    let state = props.state;

    function handleOpen() {
        setIsOpen(!isOpen);
    }

    function handleClickOption(option: string | number) {
        setIsOpen(false);
        props.onChange(option);
    }

    const options = props.options || [];

    let selectedText: string | number = '';
    if (props.selected) {
        const selectedOption = options.find((option) =>
            typeof option === 'string'
                ? option === props.selected
                : option.value === props.selected
        );

        if (typeof selectedOption == 'string') {
            selectedText = selectedOption;
        } else if (selectedOption) {
            selectedText = selectedOption.text;
        }
    }

    const id = `button-${uuidv4()}`;

    let complementText = props.complementText;
    if (props.required) {
        if (!selectedText) {
            complementText = 'Esse campo deve ser preenchido.';
            state = 'error';
        }
    }

    return (
        <div
            className={`flex-none relative w-full ${
                state == 'error' ? 'text-red' : ''
            }`}
        >
            {props.label ? (
                <label htmlFor={id} className='font-semibold'>
                    {props.label} {props.required ? '*' : ''}
                </label>
            ) : null}
            <button
                id={id}
                type='button'
                onClick={handleOpen}
                className={`flex items-center justify-between p-2 bg-white border-2 ${
                    state == 'error' ? 'border-red' : 'border-lightGray'
                } rounded-md shadow w-full focus:outline-none`}
            >
                <span>{selectedText || props.placeholder}</span>

                {state == 'error' ? <PiWarningCircleBold /> : <OpenIcon />}
            </button>
            {isOpen ? (
                <div
                    id='options'
                    className='py-2 mt-2 bg-white rounded-lg shadow-xl absolute z-10 border-px border-gray w-full max-h-40 overflow-auto'
                >
                    {options.map((option) => {
                        let value: string | number;
                        let text;

                        if (typeof option == 'string') {
                            value = option;
                            text = option;
                        } else {
                            value = option.value;
                            text = option.text;
                        }

                        return (
                            <span
                                onClick={() => handleClickOption(value)}
                                className='block px-4 py-2 text-gray-800 hover:bg-purple hover:text-white w-full'
                                key={uuidv4()}
                            >
                                <span className='flex items-center'>
                                    {text}
                                    {value == props.selected ? (
                                        <span className='ml-auto'>
                                            <CheckIcon />
                                        </span>
                                    ) : null}
                                </span>
                            </span>
                        );
                    })}
                </div>
            ) : null}
            {complementText ? (
                <span className='text-sm'>{String(complementText)}</span>
            ) : null}
            <select
                required={!!props.required}
                className='hidden'
                value={String(props.selected)}
                onChange={() => {}}
            >
                {props.options.map((option) => {
                    let value: string | number;

                    if (typeof option == 'string') {
                        value = option;
                    } else {
                        value = option.value;
                    }

                    return <option value={value} key={uuidv4()}></option>;
                })}
            </select>
        </div>
    );
}
