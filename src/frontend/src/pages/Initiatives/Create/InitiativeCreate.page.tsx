import { useEffect, useState } from 'react';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import Dropdown from '../../../components/UI/Input/Dropdown/Dropdown';
import ompCompanyService from '../../../services/omp/company/OmpCompanyService';
import Radio from '../../../components/UI/Input/Radio/Radio';
import ompCourseService from '../../../services/omp/course/OmpCourseService';
import TextArea from '../../../components/UI/Input/TextArea/TextArea.component';
import ompInitiativeService from '../../../services/omp/initiative/OmpInitiativeService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PerfilAlunoIcon from '../../../components/UI/SVG/Icons/PerfilAlunoIcon';
import SkeletonCreatePage from '../../../components/Skeleton/Create/SkeletonCreatePage.component';
import { uuidv4 } from '../../../helpers/uuidv4';
import ompModuleService from '../../../services/omp/module/OmpModuleService';
import CustomButton from '../../../components/UI/Button/CustomButton.components';

export default function InitiativeCreatePage() {
    const [name, setName] = useState<string>('');
    const [observation, setObservation] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [selectedModule, setSelectedModule] = useState<number | null>(null);

    const [competences, setCompetences] = useState<any[]>([]);

    const [companies, setCompanies] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [modulesWithCompetences, setModulesWithCompetences] = useState<any[]>(
        []
    );

    const navigator = useNavigate();

    function getCompetencesByModuleID(id: number): any[] {
        return (
            modulesWithCompetences.find((module) => module.id == id)
                ?.competences || []
        );
    }

    useEffect(() => {
        setCompetences(
            getCompetencesByModuleID(selectedModule as number).map(
                (competence) => {
                    return {
                        id: competence.id,
                        name: competence.name,
                        value: null,
                    };
                }
            )
        );
    }, [selectedModule]);

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

    function getModulesByCourse(id?: number): any[] {
        if (id) {
            return courses.find((course) => course.id == id)?.modules || [];
        } else {
            const modulesArr: any[] = [];
            courses.forEach((course) => modulesArr.push(...course.modules));
            return modulesArr;
        }
    }

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

    function onSubmitHandler(createAndGoToProject: boolean = false) {
        (async () => {
            try {
                const initiative = await ompInitiativeService.create({
                    name,
                    observation,
                    description,
                    status: createAndGoToProject ? 'ACCEPTED' : undefined,
                    companyId: selectedCompany,
                    moduleId: selectedModule,
                });

                await ompInitiativeService.createCompetenceRelations(
                    initiative.id,
                    competences
                );

                if (!createAndGoToProject) {
                    Swal.fire({
                        title: 'Sucesso!',
                        icon: 'success',
                        text: 'Iniciativa criada com sucesso!',
                    }).then(() => {
                        navigator('/initiatives');
                    });
                } else {
                    Swal.fire({
                        title: 'Sucesso!',
                        icon: 'success',
                        text: 'Iniciativa criada e aceita com sucesso! Você será redirecionado (a) para projetos!',
                    }).then(() => {
                        navigator(
                            `/projects/create?initiativeId=${initiative.id}`
                        );
                    });
                }
            } catch (error) {
                console.error(error);

                Swal.fire({
                    title: 'Algo deu errado :(',
                    icon: 'error',
                    text: 'Algo deu errado na criação de iniciativa',
                });
            }
        })();
    }

    function handleChangeCourse(value: number | string) {
        setSelectedCourse(value as number);
        setSelectedModule(null);
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
            } catch (error) {
                console.error(error);
            }
        })();

        (async () => {
            try {
                const modulesList = await ompModuleService.list([], [], {
                    page: 1,
                    pageSize: 999,
                });

                setModulesWithCompetences(modulesList.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <SkeletonCreatePage
            onSubmitHandler={onSubmitHandler}
            image={<PerfilAlunoIcon />}
            title='Criar Iniciativa'
            sideChildren={
                <TextArea
                    label='Observações'
                    placeholder='Observações aqui!'
                    value={observation}
                    onChange={setObservation}
                />
            }
            footerChildren={
                <TextArea
                    label='Proposta'
                    placeholder='Sua proposta aqui!'
                    value={description}
                    required={true}
                    onChange={setDescription}
                />
            }
            rigthButton={
                <CustomButton
                    onClick={() => onSubmitHandler(true)}
                    className='bg-purple mt-4 text-white p-2 flex justify-between items-center'
                >
                    Criar e ir para projeto
                </CustomButton>
            }
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
                </>
            ) : null}
        </SkeletonCreatePage>
    );
}
