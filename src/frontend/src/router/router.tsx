import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';

import ModuleListPage from '../pages/Modules/List/ModuleList.page';
import InitiativeListPage from '../pages/Initiatives/List/InitiativeList.page';
import ProjectListPage from '../pages/Projects/List/ProjectList.page';
import ClassListPage from '../pages/Classes/List/ClassList.page';
import CompanyListPage from '../pages/Companies/List/CompanyList.page';
import CompetenceListPage from '../pages/Competences/List/CompetenceList.page';
import CourseListPage from '../pages/Courses/List/CourseList.page';
import TeacherListPage from '../pages/Teachers/List/TeacherList.page';
import PrototypeListPage from '../pages/Prototypes/List/PrototypeList.page';
import Home from '../pages/Home/Home';
import InitiativeCreatePage from '../pages/Initiatives/Create/InitiativeCreate.page';
import InitiativeEditPage from '../pages/Initiatives/Edit/InitiativeEdit.page';
import ClassSpecific from '../pages/Classes/Specific/ClassSpecific.page';
import ModuleCreatePage from '../pages/Modules/Create/ModuleCreate.page';
import CourseCreatePage from '../pages/Courses/Create/CourseCreate.page';
import CompetenceCreatePage from '../pages/Competences/Create/CompetenceCreate.page';
import TeacherCreatePage from '../pages/Teachers/Create/TeacherCreate.page';
import CompanyCreatePage from '../pages/Companies/Create/CompanyCreate.page';
import PrototypeCreatePage from '../pages/Prototypes/Create/PrototypeCreate.page';
import ClassCreatePage from '../pages/Classes/Create/ClassCreate.page';
import ProjectCreatePage from '../pages/Projects/Create/ProjectCreate.page';
import ModuleEditPage from '../pages/Modules/Edit/ModuleEdit.page';
import CompanyEditPage from '../pages/Companies/Edit/CompanyEdit.page';
import CourseEditPage from '../pages/Courses/Edit/CourseEditPage';
import TeacherEditPage from '../pages/Teachers/Edit/TeacherEdit.page';
import CompetenceEditPage from '../pages/Competences/Edit/CompetencesEdit.page';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />

            <Route path='/initiatives' element={<InitiativeListPage />} />
            <Route
                path='/initiatives/create'
                element={<InitiativeCreatePage />}
            />
            <Route
                path='/initiatives/:id/edit'
                element={<InitiativeEditPage />}
            />

            <Route path='/projects' element={<ProjectListPage />} />
            <Route path='/projects/create' element={<ProjectCreatePage />} />

            <Route path='/modules' element={<ModuleListPage />} />
            <Route path='/modules/create' element={<ModuleCreatePage />} />
            <Route path='/modules/:id/edit' element={<ModuleEditPage />} />

            <Route path='/classes' element={<ClassListPage />} />
            <Route path='/classes/create' element={<ClassCreatePage />} />
            <Route path='/classes/:id' element={<ClassSpecific />} />

            <Route path='/competences' element={<CompetenceListPage />} />
            <Route
                path='/competences/create'
                element={<CompetenceCreatePage />}
            />
            <Route path='/competences/:id/edit' element={<CompetenceEditPage />} />

            <Route path='/companies' element={<CompanyListPage />} />
            <Route path='/companies/create' element={<CompanyCreatePage />} />
            <Route path='/companies/:id/edit' element={<CompanyEditPage />} />

            <Route path='/courses' element={<CourseListPage />} />
            <Route path='/courses/create' element={<CourseCreatePage />} />
            <Route path='/courses/:id/edit' element={<CourseEditPage />} />

            <Route path='/teachers' element={<TeacherListPage />} />
            <Route path='/teachers/create' element={<TeacherCreatePage />} />
            <Route path='/teachers/:id/edit' element={<TeacherEditPage />} />

            <Route path='/prototypes' element={<PrototypeListPage />} />
            <Route
                path='/prototypes/create'
                element={<PrototypeCreatePage />}
            />

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
