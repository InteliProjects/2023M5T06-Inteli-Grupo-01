import { useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompCompetenceService from '../../../services/omp/competence/OmpCompetenceService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';

export default function CompetenceCreatePage() {
    const [name, setName] = useState<string>('');
    const [description, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompCompetenceService.create({
                    name,
                    description,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Competência criada com sucesso!',
                }).then(() => {
                    navigator('/competences');
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
            title='Criar Competência'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <TextArea
                label='Descrição'
                onChange={setObservation}
                value={description}
                required={true}
            />
        </SkeletonCreatePage>
    );
}
