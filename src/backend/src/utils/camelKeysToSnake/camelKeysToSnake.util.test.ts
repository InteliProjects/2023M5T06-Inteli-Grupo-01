import camelKeysToSnake from './camelKeysToSnake.util';

describe('[camelKeysToSnake]', () => {
    it('have to transform a one layer object to snakeCase', () => {
        const date = new Date();

        expect(
            camelKeysToSnake({
                id: 1,
                name: 'test here!',
                causeOfDeath: 'testingTooMuch',
                createdAt: date,
            }),
        ).toEqual({
            id: 1,
            name: 'test here!',
            cause_of_death: 'testingTooMuch',
            created_at: date,
        });
    });

    it('have to transform a multi layer object to snakeCase', () => {
        const date = new Date();

        expect(
            camelKeysToSnake({
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
            }),
        ).toEqual({
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
        });
    });

    it('have to transform an empty object to an empty object', () => {
        expect(camelKeysToSnake({})).toEqual({});
    });

    it('transform a camel string to snake string', () => {
        expect(camelKeysToSnake('testeAquiOpa')).toEqual('teste_aqui_opa');
    });

    it('transform an Array to snake', () => {
        const date = new Date();

        expect(
            camelKeysToSnake([
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
            ]),
        ).toEqual([
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
        ]);
    });
});
