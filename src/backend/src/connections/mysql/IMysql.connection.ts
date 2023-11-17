import mysql from 'mysql';
import { IConditionInput } from './queryBuilder/IMysqlQueryBuilder.connection';

export default interface IMysqlConnection {
    doQuery(query: string): Promise<{ results: any; fields?: mysql.FieldInfo[] }>;
    connect(): Promise<IMysqlConnection>;
    close(): Promise<IMysqlConnection>;
    doSelect<T = any>(query: string): Promise<T[]>;
    doSelectOne<T = any>(query: string): Promise<T | null>;
    doCreate(query: string): Promise<number>;
    doUpdate(query: string): Promise<number>;
    doDelete(query: string): Promise<number>;
}

export interface IMysqlConnectionConfig {
    host: string;
    port: number;
    user: string;
    database: string;
    password: string;
}
