import { AiOutlinePlus } from 'react-icons/ai';
import CustomButton from '../../UI/Button/CustomButton.components';
import Title from '../../UI/Title/Title.component';
import ISkeletonCreatePage from './ISkeletonCreatePage.component';

export default function SkeletonCreatePage({
    title,
    onSubmitHandler,
    buttonIcon = <AiOutlinePlus />,
    buttonText = 'Criar',
    image,
    children,
    footerChildren,
    sideChildren,
    rigthButton,
}: ISkeletonCreatePage) {
    function submitHandler(e: any) {
        e.preventDefault();
        if (onSubmitHandler) {
            onSubmitHandler();
        }
    }

    return (
        <main>
            <div className='flex m-2 mt-5'>
                <Title>{title}</Title>
            </div>
            <form
                onSubmit={submitHandler}
                className='w-full flex flex-wrap justify-between'
            >
                <div className='w-3/5 p-3 flex flex-col gap-5'>{children}</div>
                <div className='w-2/6 p-3'>
                    {image}
                    {sideChildren}
                </div>
                <div className='w-full p-3'>
                    {footerChildren}
                    <div className='flex justify-center'>
                        <CustomButton
                            type='submit'
                            className='bg-purple mt-4 text-white p-2 flex justify-between items-center mx-3'
                        >
                            {buttonText} {buttonIcon}
                        </CustomButton>
                        {rigthButton}
                    </div>
                </div>
            </form>
        </main>
    );
}
