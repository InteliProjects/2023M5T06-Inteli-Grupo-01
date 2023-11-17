import { useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompTeacherService from '../../../services/omp/teacher/OmpTeacherService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';

export default function TeacherCreatePage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [observation, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompTeacherService.create({
                    name,
                    email,
                    observation,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Professor criado com sucesso!',
                }).then(() => {
                    navigator('/teachers');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de curso',
                });
            }
        })();
    }

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Professor'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <InputText
                label='email'
                onChange={setEmail}
                value={email}
                type='email'
            />
            <TextArea
                label='Observação'
                onChange={setObservation}
                value={observation}
            />
        </SkeletonCreatePage>
    );
}
