import ISidebar from './ISidebar';
import ISidebarItem from './SidebarItem/ISidebarItem';
import SidebarItem from './SidebarItem/SidebarItem';
import inteliLogo from '/imagens/inteliLogoClara.png';
import { useLocation } from 'react-router-dom';

import { AiOutlineHome, AiOutlineRobot } from 'react-icons/ai';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { IoSchoolOutline } from 'react-icons/io5';
import { LiaChalkboardTeacherSolid, LiaSchoolSolid } from 'react-icons/lia';
import { RiRobotLine } from 'react-icons/ri';
import { LuGitBranch } from 'react-icons/lu';

import { uuidv4 } from '../../../helpers/uuidv4';
import { BsPinMap, BsRobot } from 'react-icons/bs';
import HomeIcon from '../SVG/Icons/HomeIcon';
import InitiativeIcon from '../SVG/Icons/InitiativeIcon';
import ProjetosIcon from '../SVG/Icons/ProjetosIcon';
import TurmaIcon from '../SVG/Icons/TrumaIcon';
import CompanyIcon from '../SVG/Icons/CompanyIcon';
import CompetenceIcon from '../SVG/Icons/CompetenceIcon';
import CursosIcon from '../SVG/Icons/CursosIcon';
import PrototypeIcon from '../SVG/Icons/PrototypeIcon';
import ModuleIcon from '../SVG/Icons/ModuleIcon';
import TeacherIcon from '../SVG/Icons/TeacherIcon';
import TurmaIconAlternative from '../SVG/Icons/TurmaIconAlternative';
import InitiativeIconAlt from '../SVG/Icons/InitiativeIconAlt';
import ProjetosIconAlt from '../SVG/Icons/ProjetosIconAlt';
import CompanyIconAlt from '../SVG/Icons/CompanyIconAlt';
import CompetenceIconAlt from '../SVG/Icons/CompetenceIconAlt';
import CursosIconAlt from '../SVG/Icons/CursosIconAlt';
import PrototypeIconAlt from '../SVG/Icons/PrototypeIconAlt';
import ModuleIconAlt from '../SVG/Icons/ModuleIconAlt';
import TeacherIconAlt from '../SVG/Icons/TeacherIconAlt';
import HomeIconAlt from '../SVG/Icons/HomeIconAlt';

export default function Sidebar(props: ISidebar) {
    const location = useLocation();
    const itens: ISidebarItem[] = props.itens
        ? props.itens
        : [
              {
                  text: 'Home',
                  link: '/',
                  icon: <HomeIcon width={20} />,
                  alternativeIcon: <HomeIconAlt width={20} />,
              },
              {
                  text: 'Iniciativas',
                  link: '/initiatives',
                  icon: <InitiativeIcon width={20} />,
                  alternativeIcon: <InitiativeIconAlt width={20} />
              },
              {
                  text: 'Projetos',
                  link: '/projects',
                  icon: <ProjetosIcon width={20} />,
                  alternativeIcon: <ProjetosIconAlt width={20} />
              },
              {
                  text: 'Turmas',
                  link: '/classes',
                  icon: <TurmaIcon width={20} />,
                  alternativeIcon: <TurmaIconAlternative width={20}/>
              },
              {
                  text: 'Empresas',
                  link: '/companies',
                  icon: <CompanyIcon width={20} />,
                  alternativeIcon: <CompanyIconAlt width={20} />,
              },
              {
                  text: 'Competências',
                  link: '/competences',
                  icon: <CompetenceIcon width={20} />,
                  alternativeIcon: <CompetenceIconAlt width={20} />,
              },
              {
                  text: 'Cursos',
                  link: '/courses',
                  icon: <CursosIcon width={20} />,
                  alternativeIcon: <CursosIconAlt width={20} />,
              },
              {
                  text: 'Protótipos',
                  link: '/prototypes',
                  icon: <PrototypeIcon width={20} />,
                  alternativeIcon: <PrototypeIconAlt width={20} />,
              },
              {
                  text: 'Módulos',
                  link: '/modules',
                  icon: <ModuleIcon width={20} />,
                  alternativeIcon: <ModuleIconAlt width={20} />,
              },
              {
                  text: 'Professores',
                  link: '/teachers',
                  icon: <TeacherIcon width={20} />,
                  alternativeIcon: <TeacherIconAlt width={20} />,
              },
          ];

    for (let i = 1; i < itens.length; i++) {
        if (location.pathname.includes(itens[i].link)) {
            itens[i].active = true;
        }
    }

    if (!itens.find((item) => item.active)) {
        itens[0].active = true;
    }

    return (
        <nav
            className={
                'w-2/12 h-screen border border-black items-center bg-purple text-white rounded-r-sm font-inteli font-semibold flex flex-col gap-4'
            }
        >
            <img className={'my-5 w-24'} src={inteliLogo} />
            <ul
                className='my-6 flex flex-col gap-6 text-md w-full px-4 overflow-auto'
                key={uuidv4()}
            >
                {itens.map((item) => (
                    <SidebarItem {...item} key={uuidv4()} />
                ))}
            </ul>
        </nav>
    );
}
