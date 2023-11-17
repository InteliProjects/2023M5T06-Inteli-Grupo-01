import supertest from 'supertest';
import app from '../../src';

describe('[company teacher]', () => {
    const prefix = '/teachers';

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

    afterAll(async () => {
        await app.close();
    });
});
