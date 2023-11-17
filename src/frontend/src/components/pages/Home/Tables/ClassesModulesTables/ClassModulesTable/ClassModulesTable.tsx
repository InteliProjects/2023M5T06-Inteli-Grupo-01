import { Link } from 'react-router-dom';
import { uuidv4 } from '../../../../../../helpers/uuidv4';
import IClassModulesTable from './IClassModulesTable';
export default function ClassModulesTable(props: IClassModulesTable) {
    return (
        <table className={`table-auto w-full my-5`}>
            <thead className='bg-purple text-white'>
                <tr key={uuidv4()} className={`bg-${props.course.tagColor}`}>
                    <th colSpan={props.course.modules.length + 1} className=''>
                        {props.course.name.toUpperCase()}
                    </th>
                </tr>
                <tr key={uuidv4()}>
                    <th className={`font-semibold w-[10%]`}>TURMA</th>
                    {props.course.modules
                        .sort((a, b) => a.order - b.order)
                        .map((module) => (
                            <th
                                key={uuidv4()}
                                className={`$font-normal px-2 w-[${
                                    props.course.modules.length / 9
                                }%]`}
                            >
                                <span className='block text-sm font-semibold'>
                                    MÓDULO {module.order}
                                </span>
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {props.classes.map((classe) => (
                    <tr
                        key={uuidv4()}
                        className='overflow-x-auto border-b-2 border-purple'
                    >
                        <td className='text-sm'>
                            <Link to={`/classes/${classe.id}`}>
                                <span className={`w-[10%]`}></span>
                                {classe.name}
                            </Link>
                        </td>
                        {props.course.modules
                            .sort((a, b) => a.order - b.order)
                            .map((module) => {
                                const classModule = classe.modules.find(
                                    (classModule) => classModule.id == module.id
                                );

                                const project = classModule
                                    ? classModule.project
                                    : null;
                                const company = project
                                    ? project.company
                                    : null;

                                let projectStatusTagColor = 'bg-gray';

                                switch (project?.status) {
                                    case 'COMPLETED':
                                        projectStatusTagColor =
                                            'bg-lightPurple';
                                        break;
                                    case 'PENDING':
                                        projectStatusTagColor = 'bg-yellow';
                                        break;
                                    case 'AWAITING':
                                        projectStatusTagColor = 'bg-lightGreen';
                                        break;
                                    case 'CURRENT':
                                        projectStatusTagColor = 'bg-blackGreen';
                                        break;
                                    case 'CANCELED':
                                        projectStatusTagColor = 'bg-red';
                                        break;
                                }

                                let moreTags = '';
                                if (!project && classe.current.module.order) {
                                    if (
                                        classe.current.module.order ==
                                        module.order
                                    ) {
                                        moreTags = `bg-[#FF7377]`;
                                    } else if (
                                        classe.current.module.order ==
                                        module.order - 1
                                    ) {
                                        moreTags = `bg-[#FF7377]`;
                                    } else if (
                                        classe.current.module.order ==
                                        module.order - 2
                                    ) {
                                        moreTags = `bg-[#fafaca]`;
                                    } else if (
                                        classe.current.module.order ==
                                        module.order - 3
                                    ) {
                                        moreTags = `bg-[#fafaca]`;
                                    }
                                }

                                return (
                                    <td
                                        key={uuidv4()}
                                        className={`text-center py-1 ${moreTags}`}
                                    >
                                        {project ? (
                                            <Link
                                                to={`/projects/${project?.id}/edit`}
                                                className={`${projectStatusTagColor} flex flex-col py-1 text-white mx-1 w-[${
                                                    props.course.modules
                                                        .length / 9
                                                }%]`}
                                            >
                                                <span className='text-xs'>
                                                    {project?.name}
                                                </span>
                                                <span className='text-xs block font-semibold'>
                                                    {company?.name}
                                                </span>
                                            </Link>
                                        ) : classModule?.initiatives &&
                                          classModule.initiatives.length ? (
                                            <Link
                                                to={'/initiatives'}
                                                className='flex flex-col bg-gray py-1 mx-1 text-white text-xs w-[${
                                                    props.course.modules.length / 9
                                                }%]'
                                            >
                                                <span className='font-semibold text-sm'>
                                                    {
                                                        classModule.initiatives
                                                            .length
                                                    }
                                                </span>
                                                <span>
                                                    {classModule.initiatives
                                                        .length == 1
                                                        ? 'Iniciativa'
                                                        : 'Iniciativas'}
                                                </span>
                                            </Link>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                );
                            })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
