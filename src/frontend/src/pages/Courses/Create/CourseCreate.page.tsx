import { useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';

export default function CourseCreatePage() {
    const [name, setName] = useState<string>('');
    const [observation, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompCourseService.create({
                    name,
                    observation,
                    order: 0,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Curso criado com sucesso!',
                }).then(() => {
                    navigator('/courses');
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
            title='Criar Curso'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <TextArea
                label='Observação'
                onChange={setObservation}
                value={observation}
                required={true}
            />
        </SkeletonCreatePage>
    );
}
