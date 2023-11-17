import { useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompCompanyService from '../../../services/omp/company/OmpCompanyService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import Dropdown from '../../../components/UI/Input/Dropdown/Dropdown';

export default function CompanyCreatePage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [sector, setSector] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [activity, setActivity] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [observation, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompCompanyService.create({
                    name,
                    email,
                    password,
                    sector,
                    branch,
                    activity,
                    size,
                    observation,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Empresa criada com sucesso!',
                }).then(() => {
                    navigator('/companies');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de empresa',
                });
            }
        })();
    }

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Empresa'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <InputText
                label='Email'
                onChange={setEmail}
                value={email}
                required={true}
            />
            <InputText
                label='Senha'
                onChange={setPassword}
                value={password}
                required={true}
                type='password'
            />
            <Dropdown
                label='Setor'
                onChange={setSector}
                placeholder='Selecione um setor'
                options={[
                    { text: 'Setor Privado', value: 'Privado' },
                    { text: 'Governo', value: 'GOV' },
                    { text: 'ONG', value: 'ONG' },
                ]}
                selected={sector}
                required={true}
            />
            <InputText
                label='Atividade'
                onChange={setActivity}
                value={activity}
                required={true}
            />
            <InputText
                label='Ramo'
                onChange={setBranch}
                value={branch}
                required={true}
            />
            <Dropdown
                label='Porte'
                onChange={setSize}
                placeholder='Selecione um porte'
                options={[
                    { text: 'Grande', value: 'Grande porte' },
                    { text: 'Médio', value: 'Médio porte' },
                    { text: 'Pequeno', value: 'Pequeno porte' },
                ]}
                selected={size}
                required={true}
            />
            <TextArea
                label='Observação'
                onChange={setObservation}
                value={observation}
            />
        </SkeletonCreatePage>
    );
}
