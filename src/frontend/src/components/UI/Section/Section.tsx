import ISection from './ISection';

export default function Section(props: ISection) {
    return (
        <section
            className={`flex ${
                props.flexDirection == 'col' ? 'flex-col' : 'flex-row'
            } items-center min-h-screen max-h-screen p-5 overflow-auto`}
        >
            {props.children}
        </section>
    );
}
