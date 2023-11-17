import { useEffect, useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import ompClassService from '../../../services/omp/class/OmpClassService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import Dropdown from '../../../components/UI/Input/Dropdown/Dropdown';

export default function ClassCreatePage() {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('CURRENT');
    const [studentQuantity, setStudentQuantity] = useState<number>(0);
    const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);
    const [courseId, setCourseId] = useState<number>(0);

    const [courses, setCourses] = useState<any[]>([]);
    const [modules, setModules] = useState<any[]>([]);

    const navigator = useNavigate();

    function setCourseHandle(courseId: number) {
        setCourseId(courseId);
        setModules(courses.find((course) => course.id == courseId).modules);
        setCurrentModuleId(0);
    }

    function onSubmitHandler() {
        (async () => {
            try {
                await ompClassService.create({
                    name,
                    status,
                    studentQuantity,
                    currentModuleId,
                    courseId,
                });

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Turma criado com sucesso!',
                }).then(() => {
                    navigator('/classes');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de Turma',
                });
            }
        })();
    }

    useEffect(() => {
        (async () => {
            try {
                const coursesList = await ompCourseService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 99999 }
                );

                setCourses(coursesList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Turma'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />

            <InputText
                label='Quantidade de alunos'
                onChange={setStudentQuantity}
                value={studentQuantity}
            />

            <Dropdown
                label='Curso'
                options={courses.map((course) => {
                    return {
                        text: course.name,
                        value: course.id,
                    };
                })}
                placeholder='Selecione um Curso'
                required
                selected={courseId}
                onChange={setCourseHandle}
            />

            <Dropdown
                label='Módulo Atual'
                options={[
                    { text: 'Não está em um módulo', value: null },
                    ...modules.map((module) => {
                        return {
                            text: module.name,
                            value: module.id,
                        };
                    }),
                ]}
                placeholder='Selecione um módulo'
                selected={currentModuleId}
                required
                onChange={setCurrentModuleId}
            />

            <Dropdown
                label='Status'
                placeholder='Status'
                onChange={setStatus}
                options={[
                    { text: 'Formada', value: 'COMPLETED' },
                    { text: 'Cursando', value: 'CURRENT' },
                    { text: 'Criada', value: 'PENDING' },
                ]}
                selected={status}
                required
            />
        </SkeletonCreatePage>
    );
}
