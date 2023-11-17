import snakeToCamel from './snakeToCamel.util';

describe('[snakeToCamel]', () => {
    it('have to return createdAt', () => {
        expect(snakeToCamel('created_at')).toBe('createdAt');
    });

    it('have to return oneTwoThreeFourFiveSixSeven', () => {
        expect(snakeToCamel('one_two_three_four_five_six_seven')).toBe('oneTwoThreeFourFiveSixSeven');
    });

    it('have to return ""', () => {
        expect(snakeToCamel('')).toBe('');
    });
});
