import { BiSearchAlt2 } from 'react-icons/bi';
import InputText from '../Text/InputText.component';
import { ISearchBar } from './ISearchBar.component';
import { useState } from 'react';
export default function SearchBar({
    onSubmit,
    onChange,
    value,
    placeholder = 'Pesquise Aqui!',
}: ISearchBar) {
    const [searchValue, setSearchValue] = useState<string>(
        value ? String(value) : ''
    );

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        if (onSubmit) {
            e.preventDefault();
            onSubmit(searchValue);
        }
    }

    function changeHandler(inputValue: string) {
        if (onChange) {
            onChange(inputValue);
        }
        setSearchValue(inputValue);
    }

    return (
        <form
            action=''
            className='w-full max-w-md shadow-md'
            onSubmit={submitHandler}
        >
            <div className='flex items-center relative'>
                <InputText
                    placeholder={placeholder}
                    onChange={changeHandler}
                    value={searchValue}
                    // value={value}
                />
                <button className='ml-auto px-2' type='submit'>
                    <BiSearchAlt2 />
                </button>
            </div>
        </form>
    );
}
