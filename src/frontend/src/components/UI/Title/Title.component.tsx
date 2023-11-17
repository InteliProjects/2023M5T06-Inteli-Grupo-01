import ITitle from './ITitle.component';

export default function Title({ children }: ITitle) {
    return (
        <h1 className='font-semibold text-5xl'>
            {typeof children == 'string' ? children.toUpperCase() : children}
        </h1>
    );
}
