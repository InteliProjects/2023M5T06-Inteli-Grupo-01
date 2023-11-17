import supertest from 'supertest';
import app from '../../src';

describe('[initiative integration]', () => {
    const prefix = '/initiatives';

    beforeAll(async () => {
        await app.getConnectionPromise();
    });
    describe('[list]', () => {
        it('has to return a 200', async () => {
            const response = await supertest(app.getExpress()).get(
                `${prefix}?orderBy=id-desc&search=Test&paginationPageSize=1&paginationPage=2`,
            );
            expect(response.statusCode).toBe(200);
            expect(typeof response.body.qt).toBe('number');
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('[create]', () => {
        const initiativesToDelete: number[] = [];
        it('should create an initiative', async () => {
            const completeData = {
                name: 'Criação de um game',
                description: 'Melhor iniciativa',
                observation: 'Nem tanto',
                status: 'PENDING',
                companyId: 1,
                moduleId: 1,
            };

            const response = await supertest(app.getExpress()).post(`${prefix}`).send(completeData);
            expect(typeof response?.body?.id).toBe('number');
            initiativesToDelete.push(response.body.id);
            expect(typeof response?.body).toBe('object');
            expect(typeof response?.body?.company?.id).toBe('number');
            expect(response?.body?.company?.id).toEqual(completeData.companyId);
            expect(typeof response?.body?.module?.id).toBe('number');
            expect(response?.body?.module?.id).toEqual(completeData.moduleId);
            expect(response.body.name).toEqual(completeData.name);
            expect(response.body.description).toEqual(completeData.description);
            expect(response.body.observation).toEqual(completeData.observation);
            expect(response.body.status).toEqual(completeData.status);
        });

        it('Whitout status', async () => {
            const withoutStatusData = {
                name: 'Criação de um game',
                description: 'Melhor iniciativa',
                observation: 'Nem tanto',
                companyId: 1,
                moduleId: 1,
            };

            const response = await supertest(app.getExpress()).post(`${prefix}`).send(withoutStatusData);
            expect(typeof response?.body?.id).toBe('number');
            initiativesToDelete.push(response.body.id);
            expect(typeof response?.body).toBe('object');
            expect(typeof response?.body?.company?.id).toBe('number');
            expect(response?.body?.company?.id).toEqual(withoutStatusData.companyId);
            expect(typeof response?.body?.module?.id).toBe('number');
            expect(response?.body?.module?.id).toEqual(withoutStatusData.moduleId);
            expect(response.body.name).toEqual(withoutStatusData.name);
            expect(response.body.description).toEqual(withoutStatusData.description);
            expect(response.body.observation).toEqual(withoutStatusData.observation);
            expect(response.body.status).toEqual('PENDING');
        });

        it('Empty data should create an error', async () => {
            const emptyData = {};
            const response = await supertest(app.getExpress()).post(`${prefix}`).send(emptyData);
            expect(response.statusCode).toBe(400);
        });

        it('onlyStrings data should create an error', async () => {
            const onlyStringsData = {
                name: 'Criação de um game',
                description: 'Melhor iniciativa',
                observation: 'Nem tanto',
                status: 'WAITING',
                companyId: 'um',
                moduleId: 'um',
            };
            const response = await supertest(app.getExpress()).post(`${prefix}`).send(onlyStringsData);
            expect(response.statusCode).toBe(400);
        });

        it('onlyIntegers data should create an error', async () => {
            const onlyIntegers = {
                name: 1,
                description: 1,
                observation: 1,
                status: 1,
                companyId: 1,
                moduleId: 1,
            };
            const response = await supertest(app.getExpress()).post(`${prefix}`).send(onlyIntegers);
            expect(response.statusCode).toBe(400);
        });

        afterAll(async () => {
            await Promise.all(
                initiativesToDelete.map((id) => {
                    return supertest(app.getExpress()).delete(`${prefix}/${id}`);
                }),
            );
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
