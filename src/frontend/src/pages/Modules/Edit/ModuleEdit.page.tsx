import { useEffect, useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import Radio from '../../../components/UI/Input/Radio/Radio';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompModuleService from '../../../services/omp/module/OmpModuleService';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import InputNumber from '../../../components/UI/Input/Number/InputNumber.component';
import ompCompetenceService from '../../../services/omp/competence/OmpCompetenceService';
import { uuidv4 } from '../../../helpers/uuidv4';

export default function ModuleEditPage() {
    const [module, setModule] = useState<any>('');

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [order, setOrder] = useState<number>(0);
    const [competencesRelations, setCompetencesRelations] = useState<
        { id: number; name: string }[]
    >([]);

    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

    const [courses, setCourses] = useState<any[]>([]);
    const [competences, setCompetences] = useState<any[]>([]);

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                await ompModuleService.updateById(module.id, {
                    name,
                    description: description || '',
                    order,
                    courseId: selectedCourse,
                });

                await Promise.all(
                    module.competences.map(async (comp: any) => {
                        return await ompModuleService.deleteCompetenceRelation(
                            module.id,
                            comp.id
                        );
                    })
                );

                await ompModuleService.createCompetenceRelations(
                    module.id,
                    competencesRelations
                );

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Módulo editado com sucesso!',
                }).then(() => {
                    navigator('/modules');
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

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const moduleInfo = await ompModuleService.getById(id as string);
                setModule(moduleInfo);

                setName(moduleInfo.name);
                setDescription(moduleInfo.description);
                setOrder(moduleInfo.order);
                setSelectedCourse(moduleInfo.course.id);
                setCompetencesRelations(moduleInfo.competences);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            try {
                const coursesList = await ompCourseService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setCourses(coursesList.data);
            } catch (error) {
                console.error(error);
            }
        })();

        (async () => {
            try {
                const competencesList = await ompCompetenceService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setCompetences(competencesList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    function deleteCompetenceRelationHandler(id: number | string) {
        setCompetencesRelations(
            competencesRelations.filter((comp) => comp.id != id)
        );
    }

    function createCompetenceRelationHandler(competence: any) {
        setCompetencesRelations([
            ...competencesRelations,
            { id: competence.id, name: competence.name },
        ]);
    }

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Editar Módulo'
            buttonText='Editar'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <InputNumber
                label='Ordem'
                onChange={setOrder}
                value={order}
                required={true}
            />
            <Radio
                label='Curso'
                options={courses.map((course) => {
                    return {
                        text: course.name,
                        value: course.id,
                    };
                })}
                onChange={setSelectedCourse}
                selected={selectedCourse}
                required
            />
            <div className='flex justify-center flex-col'>
                <span className='font-bold'>Competências Relacionadas</span>
                <div className='w-full flex flex-wrap'>
                    {competencesRelations.map((competence: any) => {
                        return (
                            <div
                                className='w-1/4 m-1 shadow-md flex px-2 justify-center items-center cursor-pointer text-center bg-purple text-white'
                                key={uuidv4()}
                                onClick={() =>
                                    deleteCompetenceRelationHandler(
                                        competence.id
                                    )
                                }
                            >
                                {competence.name}
                            </div>
                        );
                    })}
                </div>
                <span className='font-bold'>Competências Não Relacionadas</span>
                <div className='w-full flex flex-wrap'>
                    {getCompetencesWithoutRelation().map((competence: any) => {
                        return (
                            <div
                                className='w-1/4 m-1 shadow-md flex px-2 justify-center items-center cursor-pointer text-center bg-purple text-white'
                                key={uuidv4()}
                                onClick={() =>
                                    createCompetenceRelationHandler(competence)
                                }
                            >
                                {competence.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <TextArea
                label='Descrição'
                onChange={setDescription}
                value={description}
            />
        </SkeletonCreatePage>
    );

    function getCompetencesWithoutRelation() {
        return competences.filter((comp) => {
            const competenceRelation = competencesRelations.find(
                (compR) => compR.id == comp.id
            );

            return !competenceRelation;
        });
    }
}
