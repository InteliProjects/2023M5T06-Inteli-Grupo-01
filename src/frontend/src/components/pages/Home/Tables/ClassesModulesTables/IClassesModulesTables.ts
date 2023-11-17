import {
    IClassWithModulesAndProjects,
    ICourseWithModules,
} from './ClassModulesTable/IClassModulesTable';

export default interface IClassesModulesTables {
    courses: ICourseWithModules[];
    classes: IClassWithModulesAndProjects[];
}
