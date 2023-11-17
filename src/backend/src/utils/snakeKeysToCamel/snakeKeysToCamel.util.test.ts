import snakeKeysToCamel from './snakeKeysToCamel.util';

describe('[snakeKeysToCamel]', () => {
    it('have to transform a one layer object to snakeCase', () => {
        const date = new Date();

        expect(
            snakeKeysToCamel({
                id: 1,
                name: 'test here!',
                cause_of_death: 'testingTooMuch',
                created_at: date,
            }),
        ).toEqual({
            id: 1,
            name: 'test here!',
            causeOfDeath: 'testingTooMuch',
            createdAt: date,
        });
    });

    it('have to transform a multi layer object to snakeCase', () => {
        const date = new Date();

        expect(
            snakeKeysToCamel({
                id: 1,
                name: 'test here!',
                current_module: {
                    id: 3,
                    name: 'testingTooMuch',
                    my_module: {
                        id: 4,
                        name: 'testing.... haHaha',
                        created_at: date,
                    },
                },
                created_at: date,
            }),
        ).toEqual({
            id: 1,
            name: 'test here!',
            currentModule: {
                id: 3,
                name: 'testingTooMuch',
                myModule: {
                    id: 4,
                    name: 'testing.... haHaha',
                    createdAt: date,
                },
            },
            createdAt: date,
        });
    });

    it('have to transform an empty object to an empty object', () => {
        expect(snakeKeysToCamel({})).toEqual({});
    });

    it('transform a snake string to camel string', () => {
        expect(snakeKeysToCamel('teste_aqui_opa')).toEqual('testeAquiOpa');
    });

    it('transform an Array to camel', () => {
        const date = new Date();

        expect(
            snakeKeysToCamel([
                [
                    {
                        id: 1,
                        name: 'test here!',
                        cause_of_death: 'testingTooMuch',
                        created_at: date,
                    },
                    {
                        id: 2,
                        name: 'test here!',
                        cause_of_death: 'testingTooMuch',
                        created_at: date,
                    },
                ],
            ]),
        ).toEqual([
            [
                {
                    id: 1,
                    name: 'test here!',
                    causeOfDeath: 'testingTooMuch',
                    createdAt: date,
                },
                {
                    id: 2,
                    name: 'test here!',
                    causeOfDeath: 'testingTooMuch',
                    createdAt: date,
                },
            ],
        ]);
    });
});
