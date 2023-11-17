import Error404Icon from '../../components/UI/SVG/Icons/Error404Icon';
import Title from '../../components/UI/Title/Title.component';

export default function NotFound() {
    return (
        <main className='flex w-full h-screen justify-center items-center flex-col'>
            <Title>Ops...</Title>
            <Error404Icon />
            <span className='font-semibold'>
                Parece que não deveríamos ter clicado ali
            </span>
            <span className='text-sm'>
                Essa tela vai ser implementada em breve (eu juro)
            </span>
        </main>
    );
}
