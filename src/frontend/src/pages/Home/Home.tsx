import { useEffect, useState } from 'react';
import ompCourseService from '../../services/omp/course/OmpCourseService';
import { ITreeMapData } from '../../components/UI/Charts/TreeMap/ITreeMap';
import TreeMap from '../../components/UI/Charts/TreeMap/TreeMap';
import Section from '../../components/UI/Section/Section';
import ClassesModulesTables from '../../components/pages/Home/Tables/ClassesModulesTables/ClassesModulesTables';
import LoadingIcon from '../../components/UI/SVG/Icons/LoadingIcon';
import ompClassService from '../../services/omp/class/OmpClassService';
import Dropdown from '../../components/UI/Input/Dropdown/Dropdown';

export default function Home() {
    const [isLoadingCourse, setIsLoadingCourse] = useState<boolean>(false);
    const [coursesInfo, setCoursesInfo] = useState<any[]>([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState<boolean>(false);
    const [classesInfo, setClassesInfo] = useState<any[]>([]);
    const [companyCaracteristic, setCompanyCaracteristic] =
        useState<ICompanyCaracteristic>('sector');

    useEffect(() => {
        (async () => {
            setIsLoadingClasses(true);
            try {
                const classes = await ompClassService.list();
                setClassesInfo(classes.data);
            } catch (error) {}
            setIsLoadingClasses(false);
        })();
        (async () => {
            setIsLoadingCourse(true);
            try {
                const courses = await ompCourseService.list();
                setCoursesInfo(courses.data);
            } catch (error) {}
            setIsLoadingCourse(false);
        })();
    }, []);

    function getCoursesWithKPIsToTreeMapData(courses: any[]): ITreeMapData[] {
        return courses.map((course) => {
            const childrens = [];

            function getCaracteristicArr(arr: any) {
                return arr.map((element: any) => {
                    return {
                        ...element,
                        size: element.amount,
                    };
                });
            }

            switch (companyCaracteristic) {
                case 'sector':
                    childrens.push(
                        ...getCaracteristicArr(
                            course.projectsKPIs.companySectors
                        )
                    );
                    break;
                case 'activity':
                    childrens.push(
                        ...getCaracteristicArr(
                            course.projectsKPIs.companyActivities
                        )
                    );
                    break;
                case 'branch':
                    childrens.push(
                        ...getCaracteristicArr(
                            course.projectsKPIs.companyBranches
                        )
                    );
                    break;
                case 'size':
                    childrens.push(
                        ...getCaracteristicArr(course.projectsKPIs.companySizes)
                    );
                    break;
            }

            const total = childrens.reduce(
                (total, element) => total + element.size,
                0
            );

            return {
                name: course.name,
                tagColor: course.tagColor,
                children: childrens.map((children) => {
                    return {
                        ...children,
                        realSize: children.size,
                        size: (children.amount / total) * 100,
                    };
                }),
            };
        });
    }
    return (
        <>
            <Section flexDirection='col'>
                <div className='w-full flex'>
                    <h2 className='font-semibold text-3xl mb-5'>
                        PROJETOS POR TURMA
                    </h2>
                </div>
                <div className='overflow-x-auto w-full'>
                    {isLoadingClasses || isLoadingCourse ? (
                        <div className='h-full w-full flex justify-center items-center'>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <ClassesModulesTables
                            classes={classesInfo}
                            courses={coursesInfo}
                        />
                    )}
                </div>
            </Section>
            <Section flexDirection='col'>
                <div className='w-full flex justify-between'>
                    <h2 className='font-semibold text-3xl mb-5 w-4/6'>
                        CARACTERÍSTICAS DE PROJETO POR CURSO
                    </h2>
                    <div className='w-3/12'>
                        <Dropdown
                            selected={companyCaracteristic}
                            onChange={setCompanyCaracteristic}
                            options={[
                                { text: 'Setor', value: 'sector' },
                                { text: 'Ramo', value: 'branch' },
                                { text: 'Atividade', value: 'activity' },
                                { text: 'Tamanho', value: 'size' },
                            ]}
                        />
                    </div>
                </div>
                {isLoadingCourse ? (
                    <LoadingIcon />
                ) : (
                    <TreeMap
                        data={getCoursesWithKPIsToTreeMapData(coursesInfo)}
                        singularItemName='Projeto'
                        pluralItemName='Projetos'
                    />
                )}
            </Section>
        </>
    );
}

type ICompanyCaracteristic = 'branch' | 'activity' | 'sector' | 'size';
