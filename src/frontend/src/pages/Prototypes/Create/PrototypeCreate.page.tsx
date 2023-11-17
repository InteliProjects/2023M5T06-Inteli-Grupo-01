import { useEffect, useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import ompProjectService from '../../../services/omp/project/OmpProjectService';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompPrototypeService from '../../../services/omp/prototype/OmpPrototypeService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import Dropdown from '../../../components/UI/Input/Dropdown/Dropdown';

export default function PrototypeCreatePage() {
    const [name, setName] = useState<string>('');
    const [groupName, setGroupName] = useState<string>('');
    const [githubLink, setGithubLink] = useState<string>('');
    const [deployLink, setDeployLink] = useState<string>('');
    const [observation, setObservation] = useState<string>('');
    const [projectId, setProjectId] = useState<number>(0);

    const [projects, setProjects] = useState<any[]>([]);

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompPrototypeService.create({
                    name,
                    groupName,
                    githubLink,
                    deployLink,
                    projectId,
                    observation,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Módulo criado com sucesso!',
                }).then(() => {
                    navigator('/prototypes');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de módulo',
                });
            }
        })();
    }

    useEffect(() => {
        (async () => {
            try {
                const projectsList = await ompProjectService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 99999 }
                );

                setProjects(projectsList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Protótipo'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />

            <InputText
                label='Nome do Grupo'
                onChange={setGroupName}
                value={groupName}
            />

            <InputText
                label='Link do Github'
                onChange={setGithubLink}
                value={githubLink}
                type='url'
            />

            <InputText
                label='Link de Deploy'
                onChange={setDeployLink}
                value={deployLink}
                type='url'
            />

            <Dropdown
                label='Projeto'
                options={projects.map((project) => {
                    return {
                        text: `${project.class.name} - M${project.module.order} ${project.company.name}`,
                        value: project.id,
                    };
                })}
                placeholder='Selecione um Projeto'
                required
                selected={projectId}
                onChange={setProjectId}
            />

            <TextArea
                label='Observação'
                onChange={setObservation}
                value={observation}
            />
        </SkeletonCreatePage>
    );
}
