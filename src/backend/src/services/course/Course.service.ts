import {
    IConditionInput,
    IOrders,
    IPagination,
} from '../../connections/mysql/queryBuilder/IMysqlQueryBuilder.connection';
import { ICourseEntity, ICourseEntityCreate, ICourseEntityUpdate } from '../../dto/entities/ICourse.entity.dto';
import CourseRepository from '../../repositories/course/Course.repository';
import Service from '../Service';

export default class CourseService extends Service<
    ICourseEntity,
    ICourseEntityCreate,
    ICourseEntityUpdate,
    CourseRepository
> {
    listWithKpis = async (filters?: IConditionInput, orders?: IOrders, pagination?: IPagination): Promise<any> => {
        const courseCompanyKpis = await this.repository.getCompanyTypesAndSectorCounts();
        return (await this.list(filters, orders, pagination)).map((course) => {
            return {
                ...course,
                projectsKPIs: {
                    companySectors: courseCompanyKpis
                        .filter((courseKpi) => courseKpi.column_type == 'sector' && courseKpi.course_id == course.id)
                        .map((courseKpiType) => {
                            return { name: courseKpiType.name, amount: courseKpiType.qt };
                        }),
                    companyBranches: courseCompanyKpis
                        .filter((courseKpi) => courseKpi.column_type == 'branch' && courseKpi.course_id == course.id)
                        .map((courseKpiType) => {
                            return { name: courseKpiType.name, amount: courseKpiType.qt };
                        }),
                    companySizes: courseCompanyKpis
                        .filter((courseKpi) => courseKpi.column_type == 'size' && courseKpi.course_id == course.id)
                        .map((courseKpiType) => {
                            return { name: courseKpiType.name, amount: courseKpiType.qt };
                        }),
                    companyActivities: courseCompanyKpis
                        .filter((courseKpi) => courseKpi.column_type == 'activity' && courseKpi.course_id == course.id)
                        .map((courseKpiType) => {
                            return { name: courseKpiType.name, amount: courseKpiType.qt };
                        }),
                },
            };
        });
    };
}
