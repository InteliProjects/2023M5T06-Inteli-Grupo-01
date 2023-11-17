import { uuidv4 } from '../../../../helpers/uuidv4';
import IRadio from './IRadio';

export default function Radio(props: IRadio) {
    let state = props.state;

    const handleOptionChange = (option: string | number) => {
        if (props.onChange) {
            props.onChange(option);
        }
    };

    let complementText = props.complementText;
    if (props.required) {
        if (!props.selected) {
            complementText = 'Esse campo deve ser preenchido.';
            state = 'error';
        }
    }

    const name = `radio-name-${uuidv4()}`;

    return (
        <div className={`flex flex-col ${state == 'error' ? 'text-red' : ''}`}>
            <label className='text-sm font-semibold mb-1'>
                {props.label} {props.required ? '*' : ''}
            </label>
            <ul className='space-y-2 divide-y divide-neutral-300'>
                {props.options.map((option) => {
                    const selected = props.selected === option.value;

                    return (
                        <li key={option.value} className=''>
                            <label
                                htmlFor={String(option.value)}
                                className='cursor-pointer flex items-center justify-between mb-1 gap-3'
                            >
                                <span>{option.text}</span>
                                <div
                                    className={`rounded-full w-4 h-4 border-4 ${
                                        selected
                                            ? 'border-purple bg-red'
                                            : 'border-gray bg-ligthGray'
                                    }`}
                                />
                            </label>
                            <input
                                type='radio'
                                id={String(option.value)}
                                value={option.value}
                                checked={selected}
                                required={props.required}
                                name={name}
                                onChange={() =>
                                    handleOptionChange(option.value)
                                }
                                className='hidden'
                            />
                        </li>
                    );
                })}
            </ul>
            {complementText ? (
                <span className='text-sm'>{String(complementText)}</span>
            ) : null}
        </div>
    );
}
