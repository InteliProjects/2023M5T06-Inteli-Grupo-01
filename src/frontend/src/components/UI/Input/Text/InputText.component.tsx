import { ChangeEvent } from 'react';
import IInputText from './IInputText.component';
import { uuidv4 } from '../../../../helpers/uuidv4';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function InputText({
    placeholder = 'Escreva aqui!',
    value,
    label,
    icon,
    onChange,
    state,
    complementText,
    required,
    type = 'text',
}: IInputText) {
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
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

    if (state == 'error') {
        icon = <PiWarningCircleBold />;
    }


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
                <input
                    id={inputId}
                    className={`w-full border-0 outline-0 p-1 rounded-md ${state == 'disabled' ? 'bg-slate-50'  : 'bg-transparent'}`}
                    disabled={state === 'disabled'}
                    type={type}
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={changeHandler}
                    required={!!required}
                />
                {icon ? <span className='ml-auto'>{icon}</span> : null}
            </div>
            {complementText ? (
                <span className='text-sm'>{String(complementText)}</span>
            ) : null}
        </div>
    );
}
