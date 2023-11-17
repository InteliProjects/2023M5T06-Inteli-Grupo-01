import { useNavigate, useParams } from "react-router-dom";
import SkeletonCreatePage from "../../../components/Skeleton/Create/SkeletonCreatePage.component";
import InputText from "../../../components/UI/Input/Text/InputText.component";
import TextArea from "../../../components/UI/Input/TextArea/TextArea.component";
import PerfilAlunoIcon from "../../../components/UI/SVG/Icons/PerfilAlunoIcon";
import { useEffect, useState } from "react";
import ompTeacherService from "../../../services/omp/teacher/OmpTeacherService";
import Swal from "sweetalert2";

export default function TeacherEditPage () {
    
    const [teacher, setTeacher] = useState<any>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [observation, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompTeacherService.updateById(teacher.id,{
                    
                    name: name,
                    observation: observation,
                    email:email,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Professor atualizado com sucesso!',
                }).then(() => {
                    navigator('/teachers');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na atualização do professor',
                });
            }
        })();
    }

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (async () => {
            try {
                const teacherInfo = await ompTeacherService.getById(id as string);
                setTeacher(teacherInfo);

                setEmail(teacherInfo.email);
                setName(teacherInfo.name);
                setObservation(teacherInfo.observation);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id]);


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