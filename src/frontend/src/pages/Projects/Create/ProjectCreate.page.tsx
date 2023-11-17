import { useEffect, useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import Dropdown from '../../../components/UI/Input/Dropdown/Dropdown';
import ompCompanyService from '../../../services/omp/company/OmpCompanyService';
import Radio from '../../../components/UI/Input/Radio/Radio';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompProjectService from '../../../services/omp/project/OmpProjectService';
import ompClassService from '../../../services/omp/class/OmpClassService';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import ompInitiativeService from '../../../services/omp/initiative/OmpInitiativeService';
import { uuidv4 } from '../../../helpers/uuidv4';
import ompModuleService from '../../../services/omp/module/OmpModuleService';
import ompTeacherService from '../../../services/omp/teacher/OmpTeacherService';

export default function ProjectCreatePage() {
    const [name, setName] = useState<string>('');
    const [observation, setObservation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('PENDING');

    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

    const [competences, setCompetences] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);

    const [modules, setModules] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [modulesWithCompetences, setModulesWithCompetences] = useState<any[]>(
        []
    );

    const [initiative, setInitiative] = useState<any | null>(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initiativeId = queryParams.get('initiativeId');

    const navigator = useNavigate();

    function onSubmitHandler() {
        (async () => {
            try {
                const ompProject = await ompProjectService.create({
                    name,
                    observation: observation || undefined,
                    description,
                    status,
                    companyId: selectedCompany,
                    moduleId: selectedModule,
                    classId: selectedClass,
                    initiativeId: initiative?.id || undefined,
                });

                if (initiative) {
                    await ompInitiativeService.updateById(initiative.id, {
                        status: 'ACCEPTED',
                    });
                }

                await ompProjectService.createCompetenceRelations(
                    ompProject.id,
                    competences
                );

                if (selectedTeacher) {
                    await ompProjectService.createTeacherRelations(
                        ompProject.id,
                        [{ id: selectedTeacher, role: 'Orientador' }]
                    );
                }

                await Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Projeto criado com sucesso!',
                }).then(() => {
                    navigator('/projects');
                });
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de projeto',
                });
            }
        })();
    }

    function handleChangeCourse(value: number | string) {
        setSelectedModule(null);
        setSelectedClass(null);
        setSelectedCourse(value as number);
        setModulesFromCourse();
    }

    function setCompetenceHandler(id: number, value: number) {
        setCompetences(
            competences.map((competence) => {
                if (competence.id == id) {
                    competence.value = value;
                }

                return competence;
            })
        );
    }

    function setModulesFromCourse() {
        modules;
        if (selectedCourse) {
            setModules(
                courses.find((course) => course.id == selectedCourse)
                    ?.modules || []
            );
        } else {
            const modulesArr: any[] = [];
            courses.forEach((course) => modulesArr.push(...course.modules));
            setModules(modulesArr);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const companiesList = await ompCompanyService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setCompanies(companiesList.data);
            } catch (error) {
                console.error(error);
            }
        })();

        (async () => {
            try {
                const coursesList = await ompCourseService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setCourses(coursesList.data);

                const modulesArr: any[] = [];
                coursesList.data.forEach((course: any) =>
                    modulesArr.push(...course.modules)
                );
                setModules(modulesArr);
            } catch (error) {
                console.error(error);
            }
        })();

        (async () => {
            try {
                const teachersList = await ompTeacherService.list(
                    undefined,
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setTeachers(teachersList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        try {
            (async () => {
                const modulesArr = await ompModuleService.list([], [], {
                    page: 1,
                    pageSize: 99999,
                });

                console.log(modulesArr.data, 'opa');
                setModulesWithCompetences(modulesArr.data);

                if (initiativeId) {
                    const initiative = await ompInitiativeService.getById(
                        initiativeId
                    );

                    if (initiative) {
                        setInitiative(initiative);

                        setName(initiative.name);
                        setDescription(initiative.description);
                        setObservation(initiative.observation);
                        setSelectedCompany(initiative.company.id);
                        setSelectedCourse(initiative.module.course.id);
                        setSelectedModule(initiative.module.id);

                        const moduleInfo = modulesArr.data.find(
                            (mod: any) => mod.id == initiative.module.id
                        );

                        setCompetences(
                            moduleInfo.competences.map((comp: any) => {
                                const initiativeComp =
                                    initiative.competences.find(
                                        (compI: any) => compI.id == comp.id
                                    );
                                return {
                                    id: comp.id,
                                    name: comp.name,
                                    value: initiativeComp
                                        ? initiativeComp.value
                                        : null,
                                };
                            })
                        );

                        console.log(
                            'hahahah',
                            moduleInfo.competences.map((comp: any) => {
                                const initiativeComp =
                                    initiative.competences.find(
                                        (compI: any) => compI.id == comp.id
                                    );
                                return {
                                    id: comp.id,
                                    name: comp.name,
                                    value: initiativeComp
                                        ? initiativeComp.value
                                        : null,
                                };
                            })
                        );
                    }
                }
            })();
        } catch (error) {
            console.error(error);
        }
    }, [initiativeId]);

    useEffect(() => {
        (async () => {
            try {
                const classesList = await ompClassService.list(
                    [{ field: 'ompCourseId', value: selectedCourse }],
                    [{ field: 'name', order: 'DESC' }],
                    { page: 1, pageSize: 999 }
                );

                setClasses(classesList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [selectedCourse]);

    function setModuleHandler(id: number) {
        setSelectedModule(id);
        setCompetences(
            getCompetencesByModuleID(id).map((competence) => {
                return {
                    id: competence.id,
                    name: competence.name,
                    value: 0,
                };
            })
        );
    }

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Projeto'
        >
            <InputText
                label='Nome'
                onChange={setName}
                value={name}
                required={true}
            />
            <Dropdown
                label='Empresa'
                placeholder='Selecione uma empresa'
                selected={selectedCompany}
                onChange={setSelectedCompany}
                options={companies.map((company) => {
                    return {
                        text: company.name,
                        value: company.id,
                    };
                })}
                required
            />
            <Radio
                label='Curso'
                options={courses.map((course) => {
                    return {
                        text: course.name,
                        value: course.id,
                    };
                })}
                onChange={handleChangeCourse}
                selected={selectedCourse}
                required
            ></Radio>

            {selectedCourse ? (
                <>
                    <Dropdown
                        label='Módulo'
                        placeholder='Selecione um módulo'
                        selected={selectedModule}
                        onChange={setModuleHandler}
                        options={getModulesByCourse(selectedCourse).map(
                            (module: any) => {
                                return {
                                    text: module.name,
                                    value: module.id,
                                };
                            }
                        )}
                        required
                    />

                    <div className='flex justify-center flex-col'>
                        <span className='text-bold'>Competências</span>
                        <div className='w-full flex justify-around flex-wrap'>
                            {competences.map((competence) => {
                                return (
                                    <div className='w-1/2 px-2' key={uuidv4()}>
                                        <Dropdown
                                            onChange={(value: any) =>
                                                setCompetenceHandler(
                                                    competence.id,
                                                    value
                                                )
                                            }
                                            options={['1', '2', '3', '4', '5']}
                                            selected={competence.value}
                                            label={competence.name}
                                            placeholder='Nota'
                                            required
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Dropdown
                        label='Turma'
                        placeholder='Selecione uma turma'
                        selected={selectedClass}
                        onChange={setSelectedClass}
                        options={classes.map((classEntity: any) => {
                            return {
                                text: classEntity.name,
                                value: classEntity.id,
                            };
                        })}
                        required
                    />
                </>
            ) : null}

            <Dropdown
                label='Professor Orientador'
                placeholder='Selecione'
                selected={selectedTeacher}
                onChange={setSelectedTeacher}
                options={teachers.map((teacher) => {
                    return {
                        text: teacher.name,
                        value: teacher.id,
                    };
                })}
                required
            />

            <Dropdown
                label='Status'
                placeholder='Status'
                selected={status}
                onChange={setStatus}
                options={[
                    { text: 'Completo', value: 'COMPLETED' },
                    { text: 'Em vigor', value: 'CURRENT' },
                    { text: 'Pendente', value: 'PENDING' },
                    { text: 'Pronto e aguardando', value: 'AWAITING' },
                    { text: 'Cancelado', value: 'CANCELED' },
                ]}
                required
            />

            <TextArea
                label='Observação'
                placeholder='Observação'
                value={observation}
                onChange={setObservation}
            />

            <TextArea
                label='Descrição'
                placeholder='Descrição'
                value={description}
                onChange={setDescription}
            />
        </SkeletonCreatePage>
    );

    function getCompetencesByModuleID(id: number): any[] {
        console.log('modules with competences', id, modulesWithCompetences);
        return (
            modulesWithCompetences.find((module) => module.id == id)
                ?.competences || []
        );
    }

    function getModulesByCourse(id?: number): any[] {
        if (id) {
            return courses.find((course) => course.id == id)?.modules || [];
        } else {
            const modulesArr: any[] = [];
            courses.forEach((course) => modulesArr.push(...course.modules));
            return modulesArr;
        }
    }
}
