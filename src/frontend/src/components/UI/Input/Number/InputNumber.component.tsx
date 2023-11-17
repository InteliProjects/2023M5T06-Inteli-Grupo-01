import { ChangeEvent } from 'react';
import IInputNumber from './IInputNumber.component';
import { uuidv4 } from '../../../../helpers/uuidv4';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function InputNumber({
    placeholder = 'Seu número aqui!',
    value,
    label,
    icon,
    onChange,
    state,
    complementText,
    required,
    min,
    max,
}: IInputNumber) {
    value = Number(value);
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

    if (min) {
        if (value && value < min) {
            complementText = `Valor precisa ser maior que ${min}`;
        }
    }

    if (max) {
        if (value && value > max) {
            complementText = `Valor precisa ser menor que ${max}`;
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
                    className='w-full border-0 outline-0 bg-transparent'
                    disabled={state === 'disabled'}
                    type='number'
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={changeHandler}
                    required={!!required}
                    min={min}
                    max={max}
                />
                {icon ? <span className='ml-auto'>{icon}</span> : null}
            </div>
            {complementText ? (
                <span className='text-sm'>{String(complementText)}</span>
            ) : null}
        </div>
    );
}
