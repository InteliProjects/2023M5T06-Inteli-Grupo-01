import ClassModulesTable from './ClassModulesTable/ClassModulesTable';
import { ICourseWithModules } from './ClassModulesTable/IClassModulesTable';
import IClassesModulesTables from './IClassesModulesTables';

export default function ClassesModulesTables(props: IClassesModulesTables) {
    const uniqueCourseIds: number[] = [];

    props.classes.filter((classe) => {
        if (!uniqueCourseIds.includes(classe.course.id)) {
            uniqueCourseIds.push(classe.course.id);
            return true;
        }

        return false;
    });

    return uniqueCourseIds
        .map((id) => props.courses.find((course) => course.id == id))
        .filter((course) => course)
        .sort((a, b) => (a?.id as number) - (b?.id as number))
        .map((course) => {
            course = course as ICourseWithModules;
            return (
                <ClassModulesTable
                    key={course.id}
                    course={course}
                    classes={props.classes.filter(
                        (classe) => classe.course.id == course?.id
                    )}
                />
            );
        });
}
