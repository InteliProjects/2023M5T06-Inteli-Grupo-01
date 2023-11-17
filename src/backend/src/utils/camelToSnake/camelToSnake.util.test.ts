import camelToSnake from './camelToSnake.util';

describe('[camelToSnake]', () => {
    it('have to return created_at', () => {
        expect(camelToSnake('createdAt')).toBe('created_at');
    });

    it('have to return oneTwoThreeFourFiveSixSeven', () => {
        expect(camelToSnake('oneTwoThreeFourFiveSixSeven')).toBe('one_two_three_four_five_six_seven');
    });

    it('have to return ""', () => {
        expect(camelToSnake('')).toBe('');
    });
});
