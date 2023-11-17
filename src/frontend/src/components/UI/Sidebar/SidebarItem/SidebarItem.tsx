import { Link } from 'react-router-dom';
import ISidebarItem from './ISidebarItem';

export default function SidebarItem(props: ISidebarItem) {
    return (
        <li className={'gap-6'}>
            <Link
                to={props.link}
                className={`transition-all flex font-bold items-center p-2 gap-1 hover:text-lg  ${
                    props.active ? 'text-black bg-white' : ''
                }`}
            >
                {props.active ? props.alternativeIcon : (props.icon ? props.icon : null)} {props.text}

            </Link>
        </li>
    );
}
