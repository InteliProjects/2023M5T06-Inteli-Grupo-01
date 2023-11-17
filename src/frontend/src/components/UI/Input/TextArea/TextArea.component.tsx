import { ChangeEvent } from 'react';
import ITextArea from './ITextArea.component';
import { uuidv4 } from '../../../../helpers/uuidv4';

export default function TextArea({
    placeholder = 'Escreva aqui!',
    value,
    label,
    onChange,
    state,
    complementText,
    required,
}: ITextArea) {
    function changeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) {
            onChange(e.target.value);
        }
    }

    if (required) {
        if (!value) {
            complementText = 'Esse campo deve ser preenchido.';
            state = 'error';
        }
    }

    const inputId = `input-${uuidv4()}`;

    return (
        <div className={`w-full ${state == 'error' ? 'text-red' : ''}`}>
            {label ? (
                <label className='font-semibold' htmlFor={inputId}>
                    {label} {required ? '*' : ''}
                </label>
            ) : null}
            <div
                className={`w-full flex items-center border-[1px] rounded-md ${
                    state == 'error' ? 'border-red' : 'border-gray'
                }`}
            >
                <textarea
                    id={inputId}
                    className='w-full border-0 outline-0 bg-transparent'
                    disabled={state === 'disabled'}
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={changeHandler}
                >
                    {value}
                </textarea>
            </div>
            {complementText ? (
                <span className='text-sm'>{String(complementText)}</span>
            ) : null}
        </div>
    );
}
