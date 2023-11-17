import { useEffect, useState } from "react";
import SkeletonCreatePage from "../../../components/Skeleton/Create/SkeletonCreatePage.component";
import InputText from "../../../components/UI/Input/Text/InputText.component";
import TextArea from "../../../components/UI/Input/TextArea/TextArea.component";
import PerfilAlunoIcon from "../../../components/UI/SVG/Icons/PerfilAlunoIcon";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ompCourseService from "../../../services/omp/course/OmpCourseService";

export default function CourseEditPage () {

    const [course, setCourse] = useState<any>('');
    const [name, setName] = useState<string>('');
    const [observation, setObservation] = useState<string>('');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompCourseService.updateById(course.id,{
                    
                    name: name,
                    observation: observation,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Curso atualizado com sucesso!',
                }).then(() => {
                    navigator('/courses');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na atualização do curso',
                });
            }
        })();
    }


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (async () => {
            try {
                const courseInfo = await ompCourseService.getById(id as string);
                setCourse(courseInfo);

                setName(courseInfo.name);
                setObservation(courseInfo.observation);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id]);


    return(
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Editar Curso'
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
    )
}