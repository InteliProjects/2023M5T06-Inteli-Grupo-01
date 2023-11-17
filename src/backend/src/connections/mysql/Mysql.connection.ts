import mysql from 'mysql';
import IMysqlConnection, { IMysqlConnectionConfig } from './IMysql.connection';

export default class MysqlConnection implements IMysqlConnection {
    private mysqlConnection: mysql.Pool;

    constructor(mysqlConnectionConfig: IMysqlConnectionConfig) {
        this.mysqlConnection = mysql.createPool({ ...mysqlConnectionConfig });
    }

    connect = async (): Promise<IMysqlConnection> => {
        return await new Promise((resolve, reject) => {
            this.mysqlConnection.getConnection((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`Conected to database`);
                    resolve(this);
                }
            });
        });
    };

    close = async (): Promise<IMysqlConnection> => {
        return await new Promise((resolve, reject) => {
            this.mysqlConnection.end((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`Disconnected to database`);
                    resolve(this);
                }
            });
        });
    };

    doQuery = <T = any>(query: string): Promise<{ results: T; fields?: mysql.FieldInfo[] }> => {
        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, (error, results, fields) => {
                console.log(`Query: `, query);
                if (error) reject(error);
                resolve({ results, fields });
            });
        });
    };

    async doSelect<T = any>(query: string): Promise<T[]> {
        const result = await this.doQuery<T[]>(query);
        return result.results;
    }

    async doSelectOne<T = any>(query: string): Promise<T | null> {
        const result = await this.doQuery<T[]>(query);
        return result.results[0];
    }

    async doCreate(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.insertId;
    }

    async doUpdate(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.affectedRows;
    }

    async doDelete(query: string): Promise<number> {
        const result = await this.doQuery<mysql.OkPacket>(query);
        return result.results.affectedRows;
    }
}
