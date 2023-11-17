import Area from '../../../components/Skeleton/Specific/Class/Area/Area';
import SkeletonClassSpecific from '../../../components/Skeleton/Specific/Class/SkeletonClassSpecific';
import Title from '../../../components/UI/Title/Title.component';
import Card from '../../../components/UI/Card/Card.component';
import InputText from '../../../components/UI/Input/Text/InputText.component';
import CustomButton from '../../../components/UI/Button/CustomButton.components';
import { useEffect, useState } from 'react';
import ompClassService from '../../../services/omp/class/OmpClassService';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClassSpecific() {
    const { id } = useParams<{ id: string }>();

    const navigator = useNavigate();

    const [classEntity, setClassEntity] = useState<any>(null);

    useEffect(() => {
        async function fetchClass() {
            try {
                const response = await ompClassService.list([
                    { field: 'id', value: id as string },
                ]);
                if (!response.data[0]) {
                    navigator('/classes');
                }
                setClassEntity(response.data[0]);
            } catch (error) {
                console.error(error);
                navigator('/classes');
            }
        }
        fetchClass();
    }, []);

    console.log(classEntity)

    return classEntity ? (
        <SkeletonClassSpecific>
            <div className='col-span-6 grid grid-cols-12 '>
                <div className='col-span-full h-40    flex items-center justify-center'>
                    <Title>{classEntity.name}</Title>
                </div>

                <div className='col-span-full h-96 '>GRAFICO</div>
            </div>

            <div className='col-span-6 grid grid-cols-12 '>
                <div className='h-40'></div>

                <div className='col-span-full h-96  flex flex-col gap-4 items-center'>
                    <div className='w-80 '>
                        <InputText
                            placeholder={classEntity.name}
                            label='Turma'
                            state='disabled'
                        />
                    </div>
                    <div className='w-80'>
                        <InputText
                            placeholder={classEntity.studentQuantity}
                            label='Quantidade de estudantes'
                            state='disabled'
                        />
                    </div>
                    <div className='w-80'>
                        <InputText
                            placeholder={classEntity.course.name}
                            label='Curso'
                            state='disabled'
                        />
                    </div>
                    <div className='w-80'>
                        <InputText
                            placeholder={classEntity.current.module.name}
                            label='Módulo atual'
                            state='disabled'
                        />
                    </div>
                    <div className='w-80'>
                        <InputText
                            placeholder={classEntity.status}
                            label='Status da turma'
                            state='disabled'
                        />
                    </div>
                </div>
            </div>

            <div className='col-span-12 flex flex-col justify-center items-center gap-10'>
                <div className='w-full h-16 flex items-center justify-center'>
                    <h1 className='font-semibold text-4xl text-center mt-6'>
                        Linha de Tempo da Turma
                    </h1>
                </div>

                <div className='w-full  flex'>
                    <div className='flex gap-2 flex-wrap justify-evenly'>
                        {classEntity.modules.map((modulo:any) => {
                            return(
                            <div>
                            <Card
                                module={`Modulo ${modulo.order}`}
                                project={modulo.name}
                                company={(modulo?.project?.company?.name || "Missing")}
                                githubLink='https://github.com/Intelihub'
                            />
                            </div>
                            )})
                        }
                        
                    </div>
                </div>
            </div>

            <div className='col-span-12 h-40  flex justify-evenly items-center'>
                <div className='w-80'>
                    <InputText
                        placeholder={classEntity.createdAt.substring(0,10)}
                        label='Data de criação'
                        state='disabled'
                    />
                </div>
                <div className='w-80'>
                    <InputText
                        placeholder={classEntity.updatedAt.substring(0,10)}
                        label='Data da última edição'
                        state='disabled'
                    />
                </div>
            </div>

            <div className='col-span-12 h-20  flex justify-center items-center'>
                <CustomButton
                    type='submit'
                    className='bg-red mt-4 text-white p-2 flex justify-between items-center rounded-md'
                    onClick={() => {
                        window.location.href = '/classes'
                    }}
                    >
                    <span className='mx-2'>VOLTAR</span>{' '}
                </CustomButton>
            </div>
        </SkeletonClassSpecific>
    ) : null;
}
